import { ClassifiedHazard } from "../hooks/useHazardPipeline";

export interface NavigationScreenProps {
  hazards: ClassifiedHazard[];
  onReportPress: () => void;
  fps?: number;
  depthAvailable?: boolean;
}

export interface HazardAlertProps {
  hazard: ClassifiedHazard;
}

export interface ReportSheetProps {
  visible: boolean;
  onClose: () => void;
  onReport: (type: string) => void;
}
export { ContributorWebViewScreen } from "./ContributorWebViewScreen";

export { NavigationScreen } from "./NavigationScreen";
export { HazardAlert } from "./HazardAlert";
export { ReportSheet } from "./ReportSheet";
