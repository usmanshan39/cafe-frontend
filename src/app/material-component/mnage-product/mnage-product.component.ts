import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-mnage-product',
  templateUrl: './mnage-product.component.html',
  styleUrls: ['./mnage-product.component.scss']
})
export class MnageProductComponent implements OnInit {

  displayedColumns:string[]=['name', 'categoryName', 'description', 'price', 'edit'];
  dataSource:any;
  responseMessage:any;

  constructor(private productService:ProductService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(){
    this.productService.getProduct().subscribe((res:any)=>{
      if(res.status){
        this.dataSource= new MatTableDataSource(res.products);
      }
    },(error:any)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackbar(this.responseMessage, GlobalConstants.error);
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }


  handleAddAction(){
    
  }

}
