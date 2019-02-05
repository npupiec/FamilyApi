import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { ListViewComponent } from './list-view/list-view.component';
import { EditFamilyComponent } from './list-view/edit-family/edit-family.component';
import { NewFamilyComponent } from './list-view/new-family/new-family.component';

const routes: Routes = [
  { path: 'family', component: ListViewComponent},
  { path: 'newFamily', component: NewFamilyComponent },
  { path: 'family/:id', component: EditFamilyComponent },
  { path: '', redirectTo: 'family', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
