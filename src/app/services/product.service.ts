import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url:any = environment.apiUrl;

  constructor(private httpClitn:HttpClient) { }

  add(data:any){
    return this.httpClitn.post(this.url="/product/add", data);
  }
  
  update(data:any){
    return this.httpClitn.patch(this.url="/product/update", data);
  }

  getProduct(){
   return this.httpClitn.get(this.url + "/product/get");
  }


  updateStatus(data:any){
    return this.httpClitn.patch(this.url="/product/updateStatus", data);
  }


  delete(id:any){
    return this.httpClitn.delete(this.url+'/product/delete/'+id);
  }

}
