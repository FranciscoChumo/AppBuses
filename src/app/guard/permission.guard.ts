import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class permissionGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const idtu = localStorage.getItem('idtu');
    if (idtu != "1") {
      this.router.navigate(['/admin']);
      return false;
    }
    return true;
  } 
}