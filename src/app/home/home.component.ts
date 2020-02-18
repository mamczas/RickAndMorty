import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleService } from '../services/people/people.service';
import characters from '../dtos/characters';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Filter } from '../services/people/queries';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public itemPerPage: number = 10;
  public query: string;
  page$: Observable<characters>;
  public pageIndex: number;
  public firstPart: boolean;
  public myForm: FormGroup;
  private filter: Filter;

  filterItems: Array<any> = [
    { value: 'name', viewValue: 'Name' },
    { value: 'gender', viewValue: 'Gender' },
    { value: 'species', viewValue: 'Species' }
  ];

  constructor(private ps: PeopleService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.pageIndex = 1;
    this.firstPart = true;
    this.filter = null;

    this.myForm = this.formBuilder.group({
      query: new FormControl('', Validators.required),
      condition: '',
    });

    this.initForm();
  }

  ngOnInit(): void {
    this.onInputChange();
    this.onSelectChange();
    this.page$ = this.ps.page(this.pageIndex, this.firstPart);
  }

  inputHasValue(): boolean {
    return !!this.myForm.get('query').value;
  }

  clearSreach(): void {
    this.initForm();
    this.filter = null;
    this.getPage();
  }

  onInputChange(): void {
    this.myForm.get('query').valueChanges.subscribe(val => {
      if(!val){
        this.filter = null;
        return;
      }

      const condition = this.myForm.get('condition').value;
      this.filter = new Filter(val, condition);
      this.pageIndex = 1;
      this.firstPart = true;
      this.getPage();
    });
  }

  onItemClicked(id: string){
    this.router.navigate(['details', id]);
  }

  onSelectChange(): void {
    this.myForm.get('condition').valueChanges.subscribe(val => {
      const query = this.myForm.get('query').value;
      if (!query) {
        return;
      }

      this.filter = new Filter(query, val);
      this.pageIndex = 1;
      this.firstPart = true;
      this.getPage();
    });
  }

  onNextPage(): void {
    if (this.pageIndex % 2 == 0 && this.firstPart) {
      this.firstPart = false;
      this.getPage();
    }
    else if (this.pageIndex % 2 == 0 && !this.firstPart) {
      this.pageIndex++;
      this.firstPart = true;
      this.getPage();
    }
    else if (this.pageIndex % 2 != 0 && this.firstPart) {
      this.firstPart = false;
      this.getPage();
    }
    else if (this.pageIndex % 2 != 0 && !this.firstPart) {
      this.pageIndex++;
      this.firstPart = true;
      this.getPage();
    }
  }

  onPrevPage(): void {
    if (this.pageIndex % 2 == 0 && this.firstPart) {
      this.pageIndex--;
      this.firstPart = false;
      this.getPage();
    }
    else if (this.pageIndex % 2 == 0 && !this.firstPart) {
      this.firstPart = true;
      this.getPage();
    }
    else if (this.pageIndex % 2 != 0 && this.firstPart) {
      this.pageIndex--;
      this.firstPart = false;
      this.getPage();
    }
    else if (this.pageIndex % 2 != 0 && !this.firstPart) {
      this.firstPart = true;
      this.getPage();
    }
  }

  private getPage() {
    if (!this.filter) {
      this.page$ = this.ps.page(this.pageIndex, this.firstPart);
    }
    else {
      this.page$ = this.ps.pageFilter(this.pageIndex, this.firstPart, this.filter);
    }
  }

  private initForm():void{
    this.myForm.setValue({
      query: '',
      condition: 'name'
    });
  }
}
