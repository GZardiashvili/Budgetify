import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup = new FormGroup({
    emailControl: new FormControl('', [Validators.required, Validators.email]),
    passwordControl: new FormControl('', [Validators.required, Validators.minLength(4)])
  });


  constructor(private authService: AuthService, private router: Router) {

  }


  ngOnInit(): void {
    this.loginFormGroup.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  login() {
    this.authService.login(this.loginFormGroup.value.emailControl, this.loginFormGroup.value.passwordControl).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/home']).then();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
