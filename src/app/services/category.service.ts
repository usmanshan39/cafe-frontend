import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

// add new category

  add(data:any){
    return this.httpClient.post(this.url + "/category/add", data);
  }

// update category

update(data:any){
  return this.httpClient.patch(this.url + "/category/update", data);
}

// get category

getCategory(){
  return this.httpClient.get(this.url + '/category/get');
}

}
