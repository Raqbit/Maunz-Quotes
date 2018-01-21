import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListPageComponent} from './core/components/list-page/list-page.component';
import {ViewPageComponent} from './core/components/view-page/view-page.component';
import {AboutPageComponent} from './core/components/about-page/about-page.component';

const routes: Routes = [
  {
    path: 'guild/:guildid',
    children: [
      {
        path: 'list',
        component: ListPageComponent
      },
      {
        path: 'view/:quoteid',
        component: ViewPageComponent
      }
    ]
  },
  {
    path: 'about',
    component: AboutPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
