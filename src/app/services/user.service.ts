import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  _id?: string;
  userId: string;
  name: string;
  branch: string;
  createdAt?: string;
  updatedAt?: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

   private apiUrl = 'http://localhost:3200/api/users';

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateUser(id: string, user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
