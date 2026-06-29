export type ServiceID =
  | "top-loading"
  | "front-loading"
  | "semi-automated"
  | "fully-automated"
  | "loud-noise"
  | "does-not-run";

export interface ServiceDetail {
  id: ServiceID;
  title: string;
  shortDesc: string;
  fullDesc: string;
  commonIssues: string[];
  solutions: string[];
  repairTime: string;
  priceEstimate: string;
  imageUrl: string;
}

export interface WashingMachineType {
  id: string;
  name: string;
  description: string;
  keyFeatures: string[];
  commonProblems: string[];
  imageUrl: string;
}
