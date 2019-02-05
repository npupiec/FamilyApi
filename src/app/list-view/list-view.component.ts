import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../list-view/services/family.service';
import { Family } from '../list-view/models/family.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
  providers: [FamilyService]
})

export class ListViewComponent implements OnInit {
  familyList;
  routeFamily;
  value: number= 0;
  female: number;
  selectedFamily: number;
  count: number;

  constructor(private FamilyService: FamilyService ) {
  }

  ngOnInit() {
    this.showFamilyList();
  }

  showFamilyList() {
    this.routeFamily = this.FamilyService.getFamily()
    .subscribe(
        data => {
            this.familyList = data;
        },
        error => {
            console.error(error);
        });
  }

  removeItem(family) {
    this.selectedFamily = family.id;
    this.FamilyService.removeFamily(this.selectedFamily)
    .subscribe(
      data => {
        this.showFamilyList();
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnDestroy() { 
    this.routeFamily.unsubscribe(); 
  }
}
