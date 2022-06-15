import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:any = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  // signup

  signup(data:any){
    return this.httpClient.post(this.url+"/user/signup", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    });
  }


  // forgot password

  forgot(data:any){
    return this.httpClient.post(this.url+"/user/forgotPassword", data)
  }

}
