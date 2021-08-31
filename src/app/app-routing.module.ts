import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { AppareilComponent } from './appareil/appareil.component';
import { AuthComponent } from './auth/auth.component';
import { SingleAppareilComponent } from './single-appareil/single-appareil.component';

const routes: Routes = [
  { path: 'appareils', component: AppareilViewComponent },
  // L'utilisation des deux-points  :  avant un fragment de route déclare ce fragment comme étant un paramètre
  { path: 'appareils/:id', component: SingleAppareilComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', component: AppareilViewComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
