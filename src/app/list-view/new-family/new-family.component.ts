import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { Family } from '../models/family.model';

import {FamilyService } from '../services/family.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Kids } from '../models/kids.model';
import { Parents } from '../models/parents.model';

@Component({
  selector: 'app-new-family',
  templateUrl: './new-family.component.html',
  styleUrls: ['./new-family.component.css']
})
export class NewFamilyComponent implements OnInit {
  dataForm: FormGroup;
  public gender= ['male', 'female'];

  formErrors = {
    required: 'This field is required.'
  }

  constructor(private form: FormBuilder, private familyService: FamilyService, private route: ActivatedRoute, private router: Router, 
    private renderer: Renderer, private elementRef: ElementRef) { }

  ngOnInit() {
    this.dataForm = this.form.group({
      id: [],
      parents: this.form.array([this.createParents()]),
      kids: this.form.array([this.createKids()]),
    })
  }

  get parents(): FormArray {
    return <FormArray>this.dataForm.get('parents');
  }

  get kids(): FormArray {
    return <FormArray>this.dataForm.get('kids');
  }

  addParent(): void {
    this.parents.push(this.createParents());
  }

  addKid(): void {
    this.kids.push(this.createKids())
  }

  createParents() : FormGroup {
      return this.form.group({
          mother: ['', [Validators.required]],
          father: ['', [Validators.required]],
          surname: ['', [Validators.required]]
      });
  }

  createKids(): FormGroup {
    return this.form.group({
        name: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        birth: ['', [Validators.required]],
        file: null
    });
  }

  backToFamilyList() {
    this.router.navigateByUrl('/family');
  }

  addFile(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.dataForm.get('file').setValue({
          filename: file.name,
          filetype: file.type,
          value: (reader.result).toString().split(',')[1]
        })
      };
    }
  }

  addFamily() {
    const formValues = this.dataForm.value;

    const kids: Kids[] = formValues.kids.map(
      (familyItem: Family) => Object.assign({}, familyItem)
    );

    const parents: Parents[] = formValues.parents.map(
      (familyItem: Family) => Object.assign({}, familyItem)
    );
    
    const familyData: Family = {
        id: formValues.id,
        parents: parents,
        kids: kids
    }

    this.familyService.create(familyData)
    .subscribe(
        data => {
          this.router.navigateByUrl('/family');
        },
        error => {
            console.error(error);
        });

  }
}
