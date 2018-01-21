import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {AppMaterialModule} from './app-material.module';
import {StoreModule} from '@ngrx/store';
import {quotesReducer} from './ngrx/quotes.reducer';
import {ListPageComponent} from './components/list-page/list-page.component';
import {ViewPageComponent} from './components/view-page/view-page.component';
import {AboutPageComponent} from './components/about-page/about-page.component';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  declarations: [
    ToolbarComponent,
    FooterComponent,
    ListPageComponent,
    ViewPageComponent,
    AboutPageComponent
  ],
  exports: [
    ToolbarComponent,
    FooterComponent,
    ListPageComponent,
    ViewPageComponent,
    AboutPageComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
