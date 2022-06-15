import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  // signup model open
  signupAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(SignupComponent, dialogConfig);
  }


  // forgotpassword modal
  forgotPasswordMethod(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width ="550px";
    this.dialog.open(ForgotPasswordComponent, dialogConfig);
  }

  // login model

  loginAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width="550px";
    this.dialog.open(LoginComponent, dialogConfig);
  }

}
