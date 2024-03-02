/* eslint-disable prettier/prettier */
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function headerInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const newRequest = request.clone({
    setHeaders: {
      'x-Test': 'test',
    },
  });
  return next(newRequest);
}
