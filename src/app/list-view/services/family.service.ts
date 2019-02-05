import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Family } from '../models/family.model';

// RxJS
import { Observable } from 'rxjs';

@Injectable()
export class FamilyService {

  constructor(private http: HttpClient) { }

  familyUrl = "http://localhost:3000/family/";

  getFamily(): Observable<Family[]> {
    return this.http.get<Family[]>(this.familyUrl)
  }

  editFamily(id: number): Observable<Family> {
    return this.http.get<Family>(this.familyUrl + `${encodeURIComponent(id.toString())}`);
  }

  updateFamily(obj: Family): Observable<Family> {
    console.log(obj)
    return this.http.put<Family>(this.familyUrl + `${encodeURIComponent(obj.id.toString())}`, obj);
  }

  removeFamily(id: number): Observable<Object> {
    return this.http.delete(this.familyUrl + id)
  }

  create(obj: Family): Observable<Family> {
    return this.http.post<Family>(this.familyUrl, obj);
  }
}
