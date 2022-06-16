import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:any=FormGroup;
  responseMessage:any;
  btnDisable:boolean=false;

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    private dialogRef:MatDialogRef<LoginComponent>,
    private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password:[null, [Validators.required]]
    })
  }

  // handle login

  handleSubmit(){
    this.btnDisable = true;
    var formData= this.loginForm.value;
    var data = {
      email:formData.email,
      password:formData.password
    };

    this.userService.login(data).subscribe((res:any)=>{
      if(res.status){
        this.btnDisable = false;
        this.dialogRef.close();
        localStorage.setItem('token', res.token);
        this.router.navigate(['/cafe/dashboard']);
      }
    },(error:any)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.btnDisable = false;
      this.snackbarService.openSnackbar(this.responseMessage , GlobalConstants.error);
    })
  }

}
