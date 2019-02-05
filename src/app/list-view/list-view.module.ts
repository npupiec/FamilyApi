import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { ListViewComponent } from './list-view.component';
import { HighlightDirective } from '../list-view/directives/highlight.directive';
import { EditFamilyComponent } from '../list-view/edit-family/edit-family.component';

import { FamilyService } from  '../list-view/services/family.service';
import { NewFamilyComponent } from './new-family/new-family.component';

import { MalePipe } from './pipe/male.pipe';
import { FemalePipe } from './pipe/female.pipe';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    ListViewComponent,
    HighlightDirective,
    EditFamilyComponent,
    NewFamilyComponent,
    MalePipe,
    FemalePipe
  ],
  providers: [FamilyService],
  exports: [ListViewComponent]
})
export class ListViewModule { }
