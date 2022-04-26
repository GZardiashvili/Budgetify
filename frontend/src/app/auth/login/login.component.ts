import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {IconProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  loginClicked = false;
  loginFormGroup: FormGroup = new FormGroup({
    emailControl: new FormControl('', [Validators.required, Validators.email]),
    passwordControl: new FormControl('', [Validators.required]),
  });
  type = {
    label: 'show',
    type: 'password'
  }
  faExclamationCircle: IconProp = faExclamationCircle;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
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
        .pipe(takeUntil(this.componentIsDestroyed$))
        .subscribe(
          () => {
            this.router.navigate(['/']);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  showHide() {
    if (this.type.type === 'password') {
      this.type.label = 'hide';
      this.type.type = 'text';
    } else {
      this.type.label = 'show';
      this.type.type = 'password';
    }
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
