import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'admin/home', pathMatch: 'full' },

  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },

  { path: 'admin', canActivate: [AuthGuard], loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },

  { path: '**', redirectTo: 'admin/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
