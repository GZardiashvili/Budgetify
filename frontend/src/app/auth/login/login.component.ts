import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UtilsService} from '../../shared/utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginClicked = false;
  accountId: string | null = this.utilsService.getAccountId;
  loginFormGroup: FormGroup = new FormGroup({
    emailControl: new FormControl('', [Validators.required, Validators.email]),
    passwordControl: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(private authService: AuthService, private router: Router, private utilsService: UtilsService) {
  }

  login() {
    if (this.loginFormGroup.invalid) {
      this.loginClicked = true;
    }
    if (this.loginFormGroup.valid) {
      this.authService
        .login(
          this.loginFormGroup.value.emailControl,
          this.loginFormGroup.value.passwordControl
        )
        .subscribe(
          (data) => {
            if (this.accountId) {
              this.router.navigate(['/home', this.accountId]);
            }
            this.router.navigate(['/home']);
          },
          (error) => {
            console.log(error);
          }
        );
    }

  }
}
