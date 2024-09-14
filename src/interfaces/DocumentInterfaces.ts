import { Dayjs } from 'dayjs';

export interface AudotoryInfo {
  number: number;
  days: string[];
  timeFrom: Dayjs | null;
  timeTo: Dayjs | null;
  allWeek: boolean;
}

export interface Report {
  approver: string;
  sender: string;
  firstPrefix: string;
  event: string;
  eventOrg: string;
  secondPrefix: string;
  action: string;
  auds: AudotoryInfo[];
}
