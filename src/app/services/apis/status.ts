export enum ApiStatus {
  OK = 0,
}

export class ApiException extends Error {
  status: number;
  data: any;

  constructor(status: number, data?: any) {
    super(`ApiException: ${status}`);
    this.data = data;
    this.name = 'ApiException';
    this.status = status;

    // 👇 让 TypeScript 正确识别为 ApiException
    Object.setPrototypeOf(this, ApiException.prototype);
  }
}
