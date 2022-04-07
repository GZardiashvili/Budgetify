import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UtilsService} from '../../shared/utils/utils.service';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  loginClicked = false;
  accountId: string = this.utilsService.getAccountId || '';
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
        ).pipe(takeUntil(this.componentIsDestroyed$))
        .subscribe(
          () => {
            this.router.navigate(['/transactions', this.accountId]);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
