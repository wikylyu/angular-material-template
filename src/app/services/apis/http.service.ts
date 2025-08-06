import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  fetchMap: any = {};

  buildurl(path: string, queryMap: any = null): string {
    let query = '';
    if (queryMap) {
      const queries = [];
      for (const k of Object.keys(queryMap)) {
        const v = queryMap[k];
        if (v === null || v === undefined) {
          continue;
        }
        if (v instanceof Array) {
          for (const vv of v) {
            queries.push(k + '=' + encodeURIComponent(vv));
          }
        } else {
          queries.push(k + '=' + encodeURIComponent(queryMap[k]));
        }
      }
      query = '?' + queries.join('&');
    }
    return environment.api.host + path + query;
  }

  put(url: string, body: any): Promise<any> {
    return lastValueFrom(this.http.put(url, body, { withCredentials: true }));
  }

  post(url: string, body: any): Promise<any> {
    return lastValueFrom(this.http.post(url, body, { withCredentials: true }));
  }

  get(url: string): Promise<any> {
    return lastValueFrom(
      this.http.get(url, {
        withCredentials: true,
      })
    );
  }

  delete(url: string): Promise<any> {
    return lastValueFrom(this.http.delete(url, { withCredentials: true }));
  }

  fget(url: string) {
    return this.fetch(url, () => this.get(url));
  }

  reset() {
    this.fetchMap = {};
  }
  async fetch(name: string, func: () => Promise<any>) {
    try {
      let doing = this.fetchMap[name];
      if (!doing) {
        doing = func();
        this.fetchMap[name] = doing;
      }
      const r = await doing;
      return r;
    } catch (error) {
      throw error;
    } finally {
      delete this.fetchMap[name];
    }
  }
}
