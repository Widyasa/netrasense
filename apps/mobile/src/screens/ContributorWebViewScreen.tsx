import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export const ContributorWebViewScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const uri = process.env.EXPO_PUBLIC_WEB_DAPP_URL || 'http://localhost:3000';

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: `${uri}?source=mobile-app` }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          Alert.alert('Error', 'Failed to load dApp. Check connection.', [
            { text: 'Retry', onPress: () => setLoading(true) }
          ]);
        }}
      />
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
});
