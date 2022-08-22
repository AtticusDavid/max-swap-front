export interface ErrorResponse {
  description: string;
  code: number;
  message: string;
  details: {
    typeUrl: string;
    value: string;
  }[];
}

export type APIResponseType<T = unknown> = {
  result: T;
  error?: ErrorResponse;
  ts: string;
};
