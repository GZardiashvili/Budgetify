import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { UserService } from './services/user/user.service';
import { BehaviorSubject } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../auth/services/auth.service';

describe('Header Component', () => {
  let spectator: Spectator<HeaderComponent>;
  const createComponent = createComponentFactory({
    component: HeaderComponent,
    declarations: [],
    providers: [
      mockProvider(HttpClient),
      {
        provide: UserService,
        useValue: {
          getUserProfile: () => {
            return new BehaviorSubject({
              email: 'email',
              password: 'psw',
              role: 'role',
              firstName: 'firstName',
              lastName: 'lastName',
              gender: 'gender',
              dateOfBirth: new Date('Tue Jun 19 1999 22:33:53 GMT+0400 (Georgia Standard Time)'),
              countryOfResidence: 'countryOfResidence',
            }).asObservable();
          }
        }
      }
    ],
    imports: [RouterTestingModule, MatMenuModule],
  });

  beforeEach(() => spectator = createComponent()
  );

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
  it('should be defined profile', () => {
    expect(spectator.component.profile.name).toEqual('firstName lastName');
    expect(spectator.component.profile.pfpUrl).toEqual('../../assets/default-pfp.png');
    expect(spectator.component.profile.account.url).toEqual('/account');
    expect(spectator.component.profile.display.url).toEqual('/display');
  });

  it('should call logout ', () => {
    let authService = spectator.inject(AuthService);
    const spyLogout = spyOn(authService, 'logout').and.callThrough();
    spectator.component.logout();
    expect(spyLogout).toHaveBeenCalled();
  });
});
