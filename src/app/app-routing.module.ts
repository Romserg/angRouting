import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'welcome', component: WelcomeComponent },
      {
        path: 'products',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./products/product.module').then(m => m.ProductModule),
      },
      { path: '**', component: PageNotFoundComponent },
    ], {preloadingStrategy: PreloadAllModules}),
  ],
  exports: [RouterModule],
})

export class AppRoutingModule {

}
