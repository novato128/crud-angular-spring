import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseToken } from '../model/responseToken';
import { Authentication } from '../model/authentication';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<User[]>(this.API);
  }

  save(user: Partial<User>){
    return this.httpClient.post<User>(this.API, user);
  }

  update(id: number, user: Partial<User>){
    return this.httpClient.put<User>(`${this.API}/${id}`, user);
  }

  findById(id: number){
    return this.httpClient.get<User>(`${this.API}/${id}`);
  }

  removeById(id: number){
    return this.httpClient.delete<User>(`${this.API}/${id}`);
  }

  login(authentication : Authentication) {
    return this.httpClient.post<ResponseToken>(`${this.API}/signin`, authentication);
  }

}
