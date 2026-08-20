package expo.modules.arcoredepth

import android.os.Handler
import android.os.HandlerThread
import com.google.ar.core.ArCoreApk
import com.google.ar.core.Config
import com.google.ar.core.Frame
import com.google.ar.core.Session
import com.google.ar.core.exceptions.CameraNotAvailableException
import com.google.ar.core.exceptions.NotYetAvailableException
import com.google.ar.core.exceptions.UnavailableException
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import kotlinx.coroutines.suspendCancellableCoroutine
import java.nio.ByteBuffer
import java.nio.ByteOrder
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException

/**
 * Native Expo module exposing Google ARCore's Depth API to JS.
 *
 * ARCore needs its own [Session] bound to the camera, which conflicts with the
 * vision-camera preview session already driving the app's frame processor.
 * Callers MUST treat every result as best-effort: `getDepthAtPoint` returns
 * `null` whenever the session cannot be created/resumed (device unsupported,
 * camera busy, depth not yet available for the current frame, etc.), and the
 * app falls back to the bounding-box distance heuristic in that case.
 */
class ARCoreDepthModule : Module() {
  private var session: Session? = null
  private var thread: HandlerThread? = null
  private var handler: Handler? = null

  override fun definition() = ModuleDefinition {
    Name("ARCoreDepth")

    OnCreate {
      thread = HandlerThread("ARCoreDepthThread").also { it.start() }
      handler = Handler(thread!!.looper)
    }

    OnActivityEntersForeground {
      runOnArThread { resumeSession() }
    }

    OnActivityEntersBackground {
      runOnArThread { pauseSession() }
    }

    OnDestroy {
      runOnArThread { destroySession() }
      thread?.quitSafely()
      thread = null
      handler = null
    }

    AsyncFunction("isDepthAvailable") { promise: expo.modules.kotlin.Promise ->
      runOnArThread {
        promise.resolve(checkDepthAvailability())
      }
    }

    AsyncFunction("getDepthAtPoint") { x: Double, y: Double, promise: expo.modules.kotlin.Promise ->
      runOnArThread {
        promise.resolve(sampleDepthAtPoint(x, y))
      }
    }
  }

  private fun runOnArThread(block: () -> Unit) {
    val activeHandler = handler
    if (activeHandler == null) {
      block()
    } else {
      activeHandler.post(block)
    }
  }

  private fun checkDepthAvailability(): Boolean {
    val context = appContext.reactContext ?: return false
    val availability = ArCoreApk.getInstance().checkAvailability(context)
    if (!availability.isSupported) {
      return false
    }
    val activeSession = ensureSession() ?: return false
    return activeSession.isDepthModeSupported(Config.DepthMode.AUTOMATIC)
  }

  private fun ensureSession(): Session? {
    val context = appContext.reactContext ?: return null
    val existing = session
    if (existing != null) {
      return existing
    }

    val availability = ArCoreApk.getInstance().checkAvailability(context)
    if (!availability.isSupported) {
      return null
    }

    return try {
      val newSession = Session(context)
      val config = Config(newSession).apply {
        if (newSession.isDepthModeSupported(Config.DepthMode.AUTOMATIC)) {
          depthMode = Config.DepthMode.AUTOMATIC
        }
        focusMode = Config.FocusMode.AUTO
        updateMode = Config.UpdateMode.LATEST_CAMERA_IMAGE
      }
      newSession.configure(config)
      newSession.resume()
      session = newSession
      newSession
    } catch (error: UnavailableException) {
      null
    } catch (error: CameraNotAvailableException) {
      // The vision-camera preview session already owns the camera device.
      null
    } catch (error: SecurityException) {
      null
    }
  }

  private fun resumeSession() {
    try {
      session?.resume()
    } catch (error: CameraNotAvailableException) {
      // Camera is owned by vision-camera; leave the session paused.
    }
  }

  private fun pauseSession() {
    session?.pause()
  }

  private fun destroySession() {
    session?.close()
    session = null
  }

  private fun sampleDepthAtPoint(normalizedX: Double, normalizedY: Double): Double? {
    val activeSession = ensureSession() ?: return null

    val frame: Frame = try {
      resumeSession()
      activeSession.update()
    } catch (error: CameraNotAvailableException) {
      return null
    } catch (error: Exception) {
      return null
    }

    val depthImage = try {
      frame.acquireDepthImage16Bits()
    } catch (error: NotYetAvailableException) {
      return null
    } catch (error: Exception) {
      return null
    }

    val image = depthImage
    try {
      val plane = image.planes[0]
      val pixelX = (normalizedX.coerceIn(0.0, 1.0) * (image.width - 1)).toInt()
      val pixelY = (normalizedY.coerceIn(0.0, 1.0) * (image.height - 1)).toInt()

      val buffer: ByteBuffer = plane.buffer.duplicate().order(ByteOrder.nativeOrder())
      val byteOffset = pixelY * plane.rowStride + pixelX * plane.pixelStride
      if (byteOffset < 0 || byteOffset + 1 >= buffer.capacity()) {
        return null
      }

      // Depth samples are little-endian 16-bit unsigned millimeters.
      val depthMillimeters = buffer.getShort(byteOffset).toInt() and 0xFFFF
      if (depthMillimeters <= 0) {
        return null
      }
      return depthMillimeters / 1000.0
    } finally {
      image.close()
    }
  }
}
