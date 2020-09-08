import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {


  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     var guard =  localStorage.getItem('rauteGaurd');

  //   var tok = localStorage.getItem('token') ;
     var department = localStorage.getItem('department');
     var departments = localStorage.getItem('departments');
  if(department != 'null' || departments != 'null' )
  
   return true;
  this.router.navigate(['/login']);
  return false;
  



    if(guard == 'true')
    {
      return true;
    }
  }

  constructor(private router: Router) { }
}
