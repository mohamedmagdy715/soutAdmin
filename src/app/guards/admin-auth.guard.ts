import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {


  loginFlag :boolean = false;

  constructor(private router: Router,
              private auth : AngularFireAuth){
  
  this.auth.onAuthStateChanged((admin)=>{
      if (admin){
         this.loginFlag = true
      }
      else
         this.loginFlag = false;
    })
              }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(this.loginFlag){
        return true
      }
      else {
        this.router.navigate(['/login']);
          return false;
      }
      
  }
  
  
}
