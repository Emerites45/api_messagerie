import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionService } from '../services/session.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(SessionService);

  // Get the auth token from the service.
  const authToken = sessionService.token;

  // Clone the request and replace the original headers with
  // cloned headers, updated with the authorization.
  if (authToken != '') {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
  }
  // send cloned request with header to the next handler.
  return next(req);
};
