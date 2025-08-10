import { Injectable } from '@angular/core';
import { UploadedFile } from '../../models/file';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class FileApiService {
  constructor(private http: HttpService) {}

  buildurl(path: string, queryMap: any = null): string {
    return this.http.buildurl('/file' + path, queryMap);
  }

  upload(file: any): Promise<UploadedFile> {
    const url = this.buildurl('/');
    const form = new FormData();
    form.set('file', file);
    return this.http.post(url, form);
  }

  fileurl(id: string) {
    if (id.startsWith('http') || id.startsWith('blob')) {
      return id;
    }
    return this.buildurl(`/${id}`);
  }
}
