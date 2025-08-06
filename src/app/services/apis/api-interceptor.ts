import { isPlatformBrowser } from '@angular/common';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject, PLATFORM_ID, REQUEST } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { MessageService } from '../message.service';
import { ApiException, ApiStatus } from './status';
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const messageService = inject(MessageService);
  const router = inject(Router);
  const dialog = inject(MatDialog);
  const request = inject(REQUEST);
  if (!isPlatformBrowser(platformId) && request) {
    const cookie = request.headers.get('cookie') ?? '';
    req = req.clone({
      withCredentials: true,
      setHeaders: {
        cookie: cookie,
      },
    });
  }
  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const body = event.body;
        if (!body) {
          return event;
        }
        // 👉 如果 status === 0，返回 data
        if (body.status === ApiStatus.OK) {
          return event.clone({ body: body.data });
        } else {
          // 👉 如果状态码不是 0，抛出异常（用于全局捕获
          throw new ApiException(body?.status, body?.data);
        }
      }
      return event;
    }),
    catchError((err: any) => {
      if (!(err instanceof HttpErrorResponse)) {
        return throwError(() => err);
      }
      if (err.status === 400) {
        messageService.open(`Client Error`, 'OK');
      } else if (err.status === 403) {
      } else if (err.status === 401) {
        const url = new URL(req.url);
        if (
          !url.pathname.startsWith('/api/auth/') &&
          !router.url.startsWith('/login') &&
          !router.url.startsWith('/signup')
        ) {
          router.navigate(['/login'], {
            replaceUrl: true,
            queryParams: { redirect: router.url },
          });
          dialog.closeAll();
        }
      } else if (err.status === 0) {
        messageService.open('Network Error', 'OK');
      } else {
        messageService.open(`Server Error`, 'OK');
      }
      return throwError(() => err);
    })
  );
};
