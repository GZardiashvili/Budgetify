import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {NopagefoundComponent} from "./nopagefound/nopagefound.component";
import {MainPageComponent} from "./main-page/main-page.component";

@NgModule({
  declarations: [MainPageComponent, HeaderComponent, SidebarComponent, NopagefoundComponent],
  imports: [
    CommonModule,
  ]
})
export class LayoutModule {
}
