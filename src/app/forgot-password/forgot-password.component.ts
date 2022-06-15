import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm:any= FormGroup;
  responseMessage:any;
  btnDiasable:boolean=false;

  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private dialogRef:MatDialogRef<ForgotPasswordComponent>,
    private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email:[null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]]
    });
  }

  handleSubmit(){
    this.btnDiasable=true;
    var formData = this.forgotPasswordForm.value;
    var data={
      email:formData.email
    };
    this.userService.forgot(data).subscribe((res:any)=>{
      if(res.status){
        this.btnDiasable = false;
        this.responseMessage = res?.message;
        this.dialogRef.close;
        this.snackbarService.openSnackbar(this.responseMessage, "");
      }
    },(error:any)=>{
      this.btnDiasable= false;
      // if(error.error?.message){
      //   this.responseMessage = error.error?.message;
      // }
      // else{
      //   this.responseMessage = GlobalConstants.genericError;
      // }
      // this.snackbarService.openSnackbar(this.responseMessage, GlobalConstants.error);
      this.snackbarService.openSnackbar("here", GlobalConstants.error);
    })
  }

}
