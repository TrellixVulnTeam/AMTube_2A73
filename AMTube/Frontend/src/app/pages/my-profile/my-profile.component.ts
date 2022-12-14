import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  userFormModel!: FormGroup;
  username: FormControl = new FormControl("");
  email: FormControl = new FormControl("");
  newPassword: FormControl = new FormControl("");
  newPassConfirmed: FormControl = new FormControl("");
  user: User;

  constructor(
    private router: Router,
    private userService: UserService, private matSnackBar: MatSnackBar) {
    this.userFormModel = new FormGroup({
      username: this.username,
      email: this.email,
      newPassword: this.newPassword,
      newPassConfirmed: this.newPassConfirmed
    })
  }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(data => {
      this.user = data;
      console.log(this.user);
    });
  }

  submit() {
    console.log(this.userFormModel.value)
    if (this.userFormModel.value.username != "") {
      this.user.username = this.userFormModel.value.username
    }
    if (this.userFormModel.value.email != "") {
      this.user.email = this.userFormModel.value.email
    }
    if (this.checkPassword() && this.userFormModel.value.newPassword != "") {
      this.user.password = this.userFormModel.value.newPassword
    }
    else{
      this.matSnackBar.open("Please input the correct password", "OK");
    }
    this.userService.putUser(this.user).subscribe(data=>{ //NB: funziona, ma non aggiorna la password: la imposta a null
      this.matSnackBar.open("Your profile has been successfully updated: a new login is required to verify your identity.", "OK");
      //Nota: in questa linea è necessario aggiornare (il token bearer?) affinché sia associato al nuovo username altrimenti crasha perché continua a inviare la richiesta con il vecchio username
      console.log(data);
      this.userService.logout();
      this.router.navigateByUrl("login");
    })
  }

  checkPassword() {
    return this.userFormModel.value.newPassword == this.userFormModel.value.newPassConfirmed; //&& check per controllare se la password è corretta
  }

  onDelete() {
    this.userService.deleteUser().subscribe( () => {
      this.matSnackBar.open("We have successfully deleted your account!", "OK");
      this.router.navigateByUrl('login');
    })
  }
}
