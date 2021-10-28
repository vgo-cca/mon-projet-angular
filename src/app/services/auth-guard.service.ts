import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// Pour injecter un service dans un autre service, 
// il faut que le service dans lequel on injecte l'autre ait le décorateur  @Injectable
@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  // Une guard est en effet un service qu'Angular exécutera au moment où l'utilisateur essaye de naviguer vers la route sélectionnée.
  // Ce service implémente l'interface  canActivate , et donc doit contenir une méthode du même nom qui prend les arguments
  // ActivatedRouteSnapshot  et  RouterStateSnapshot  (qui lui seront fournis par Angular au moment de l'exécution) 
  // et retourne une valeur booléenne, soit de manière synchrone (boolean), soit de manière asynchrone (sous forme de Promise ou d'Observable) :
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean  {
    // verification de l'état d'authentification
      if(this.authService.isAuth){
        return true;
      } else {
        this.router.navigate(['/auth']);
        return false;
      }
  }
}