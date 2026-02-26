export interface VisitorData {
  type: string;
  visitorId: string;
  welcome: string;
  version: string;
}

export interface VisitorResponse {
  code: number;
  description: string;
  data: VisitorData;
}
