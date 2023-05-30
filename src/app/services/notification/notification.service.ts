import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/models/notification';
import { Apiresponse } from 'src/app/ratelist-models';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private http: HttpClient
  ) { }
  sendNotification(notification: Notification): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(`${environment.acogsApiUrl}/notification/save`, notification);
  }
}
