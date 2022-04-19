import {createComponentFactory, mockProvider, Spectator} from "@ngneat/spectator";
import {LayoutComponent} from "./layout.component";
import {HeaderComponent} from "./components/header/header.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {PiggyBankComponent} from "../features/piggy-bank/piggy-bank.component";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./components/header/services/user/user.service";
import {Observable, of} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {MatMenuModule} from "@angular/material/menu";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {AccountsComponent} from "./components/sidebar/accounts/accounts.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {AccountService} from "./components/sidebar/accounts/services/account.service";
import {DetailsComponent} from "../shared/details/details.component";

describe('layout component',  ()=> {
  let spectator: Spectator<LayoutComponent>;
  const createComponent = createComponentFactory({
    component: LayoutComponent,
    detectChanges: false,
    declarations: [HeaderComponent, SidebarComponent,PiggyBankComponent,DetailsComponent ,AccountsComponent],
    providers:[
      mockProvider(HttpClient),
      mockProvider(FormBuilder),
      {
        provide:AccountService,
        useValue: {
          getAccounts: () => of([]),
          getAccountById: () => of([]),
        }
      },
      {
        provide: UserService,
        useValue: {
          getUserProfile: () => {
            return new Observable()
          }
        }
      }
    ],
    imports: [RouterTestingModule, MatMenuModule, MatSidenavModule,FontAwesomeTestingModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

});
