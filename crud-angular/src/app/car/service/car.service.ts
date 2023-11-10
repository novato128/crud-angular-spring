import { ResponseToken } from './../../user/model/responseToken';
import { Car } from './../model/car';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { UserService } from 'src/app/user/service/user.service';
import { Authentication } from 'src/app/user/model/authentication';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private readonly API = 'http://localhost:8080/api/cars';
  token: ResponseToken | undefined ;

  constructor(private httpClient: HttpClient, private userService: UserService) {
  }
  onError(arg0: string) {
    // throw new Error('Method not implemented.');
  }

  list(auth_token: any){
    const reqHeader = new HttpHeaders().set('Authorization', auth_token);
    return this.httpClient.get<Car[]>(this.API, { headers: reqHeader });
  }

  save(car: Car, auth_token: any){
    const reqHeader = new HttpHeaders().set('Authorization', auth_token);
    return this.httpClient.post<Car>(this.API, car, { headers: reqHeader });
  }

  findById(id: number, auth_token: any){
    const reqHeader = new HttpHeaders().set('Authorization', auth_token);
    return this.httpClient.get<Car>(`${this.API}/${id}`, { headers: reqHeader });
  }

  removeById(id: number, auth_token: any){
    const reqHeader = new HttpHeaders().set('Authorization', auth_token);
    return this.httpClient.delete<Car>(`${this.API}/${id}`, { headers: reqHeader });
  }

}
