import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { AuthComponent } from './auth/auth.component';
import { EditAppareilComponentComponent } from './edit-appareil-component/edit-appareil-component.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { NewUserComponent } from './new-user/new-user.component';
import { AuthGuard } from './services/auth-guard.service';
import { SingleAppareilComponent } from './single-appareil/single-appareil.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  //guard 
  { path: 'appareils', canActivate: [AuthGuard], component: AppareilViewComponent },
  { path: 'appareils/:id', canActivate: [AuthGuard], component: SingleAppareilComponent },
  { path: 'edit', canActivate: [AuthGuard], component: EditAppareilComponentComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'users', component: UserListComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: '', component: AppareilViewComponent},
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
