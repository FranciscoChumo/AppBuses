import { Routes } from '@angular/router';
import { permissionGuard } from './guard/permission.guard';
import { loginGuard } from './guard/login.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    //canActivate:[loginGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  
  {
    path: 'pag',
    loadComponent: () => import('./pag/pag.page').then( m => m.PagPage),
    //canActivate:[loginGuard]
  },
  {
    path: 'create',
    loadComponent: () => import('./create/create.page').then( m => m.CreatePage)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.page').then( m => m.AdminPage)
  },
  {
    path: 'person',
    loadComponent: () => import('./person/person.page').then( m => m.PersonPage)
  },
  {
    path: 'edituser',
    loadComponent: () => import('./edituser/edituser.page').then( m => m.EdituserPage)
  },
  {
    path: 'ibus',
    loadComponent: () => import('./ibus/ibus.page').then( m => m.IbusPage),
    canActivate:[permissionGuard ]
  },
  {
    path: 'search',
    loadComponent: () => import('./search/search.page').then( m => m.SearchPage)
  },
  {
    path: 'editbus',
    loadComponent: () => import('./editbus/editbus.page').then( m => m.EditbusPage)
  },

];
