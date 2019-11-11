import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
// import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient } from '@angular/common/http';
import {  Detail } from 'src/app/model/detail';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  public API1 = 'http://localhost:3000/posts';
  public API = 'http://localhost:3000/data';

  constructor(private http: HttpClient) { }
  // Get all
  getDetails(): Observable<any> {
    return this.http.get(this.API);
  }
  getAllDetailById(detailsId: string): Observable<any> {
    // alert('${this.API}/${detailsId}')
    return this.http.get(`${this.API}/${detailsId}`);
  }
  updateDetails(detail: Detail, detailsId: string) {
    return this.http.put(`${this.API}/${detailsId}`,detail);
  }
}
