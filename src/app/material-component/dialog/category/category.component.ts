import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm:any=FormGroup;
  dialLogAction:any='Add';
  action:any="Add";
  responseMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  private categoryService:CategoryService,
  public dialogRef:MatDialogRef<CategoryComponent>,
  private snackbarService:SnackbarService ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name:[null,[Validators.required]]
    });
    if(this.dialogData.action == 'Edit'){
      this.dialLogAction = "Edit";
      this.action = "Update";
      // this line is used for show data inside name input filed that we send in manage category component when we open this model
      this.categoryForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit(){
    if(this.dialLogAction==="Edit"){
      this.edit();
    }
    else{
      this.add();
    }
  }

  add(){
    var formData = this.categoryForm.value;
    var data= {
      name : formData.name
    };
    this.categoryService.add(data).subscribe((res:any)=>{
      if(res.status){
        this.dialogRef.close();
        this.onAddCategory.emit();
        this.responseMessage = res.message;
        this.snackbarService.openSnackbar(this.responseMessage, "");
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

  edit(){
    var formData = this.categoryForm.value;
    var data= {
      id: this.dialogData.data.id,
      name : formData.name
    };
    this.categoryService.update(data).subscribe((res:any)=>{
      if(res.status){
        this.dialogRef.close();
        this.onEditCategory.emit();
        this.responseMessage = res.message;
        this.snackbarService.openSnackbar(this.responseMessage, "");
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

}
