import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
  {
    path : '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  {
    path : 'users',
    component : UserListComponent 
  },{
    path: 'users/add',
    component: UserFormComponent
  },
  {
    path: 'users/meetings/:id',
    component: UserFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
