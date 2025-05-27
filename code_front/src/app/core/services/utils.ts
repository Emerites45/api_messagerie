import { HttpHeaders } from '@angular/common/http';

export class Utils {
  static buildHeader(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', `application/json`)
      .set('Accept', `application/json`);
    return headers;
  }
}
