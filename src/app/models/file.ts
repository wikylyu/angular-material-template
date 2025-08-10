import { BaseModel } from './base';

export interface UploadedFile extends BaseModel {
  id: string;
  content_type: string;
  size: number;
  filename: string;
}
