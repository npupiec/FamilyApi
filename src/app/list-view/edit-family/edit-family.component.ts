import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { FamilyService } from '../services/family.service';
import { Family } from '../models/family.model';

import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-edit-family',
  templateUrl: './edit-family.component.html',
  styleUrls: ['./edit-family.component.css']
})
export class EditFamilyComponent implements OnInit {
  familyItem;
  routeItem;
  
  public gender= ['male', 'female'];

  constructor(private route: ActivatedRoute, private router: Router, private familyService: FamilyService) { }

  ngOnInit() {
    this.routeItem = this.route.paramMap
    .pipe(switchMap((params: ParamMap) => this.familyService.editFamily(+params.get('id'))))
    .subscribe(
      data => {
        this.familyItem = data;
        console.log(this.familyItem)
      },
      error => {
        console.error(error);
      });
  }

  changeDate(e: string) {
    for (let item of this.familyItem.kids) {
      for (let a of item) {
        a.birth= new Date(e);
      }
    }
  }

  editFile(event) {
    const reader = new FileReader();
    let file = event.target.files[0]
    reader.readAsDataURL(file);
    reader.onload = () => {
      for (let item of this.familyItem.kids) {
        item.file= (reader.result).toString().split(',')[1];
      }
    }
  }

  updateFamily(obj: Family): void {
    this.familyService.updateFamily(obj)
      .subscribe(
        data => {
          this.familyItem = data;
          this.backToFamilyList(obj);
        },
        error => {
          console.error(error);
        });
  }

  backToFamilyList(familyItem: Family) {
    let familyId = this.familyItem ? this.familyItem.id : null
    this.router.navigate(['../../family', { id: familyId }], {relativeTo: this.route});
  }

  ngOnDestroy() { 
    this.routeItem.unsubscribe(); 
  }
}
