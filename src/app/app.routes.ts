import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'pag',
    pathMatch: 'full',
  },
  {
    path: 'pag',
    loadComponent: () => import('./pag/pag.page').then( m => m.PagPage)
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
];
