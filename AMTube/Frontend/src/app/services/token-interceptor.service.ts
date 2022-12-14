import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, switchMap, take} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return this.userService.getJwtToken().pipe(
          take(1),
          switchMap(
              token => {
                  if(token) {
                      let { headers } = req;
                      headers = headers.set('Authorization', "Bearer " + token);
                      return next.handle(
                          req.clone({
                              headers
                          })
                      );
                  } else {
                      return next.handle(req);
                  }
              }
          )
      )
  }
}
