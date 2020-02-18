import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleService } from '../services/people/people.service';
import characters from '../dtos/characters';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Filter } from '../services/people/queries';
import { Router } from '@angular/router';
import { PageStateService } from '../services/pageState/pageState.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public itemPerPage: number = 10;
  page$: Observable<characters>;
  public myForm: FormGroup;


  filterItems: Array<any> = [
    { value: 'name', viewValue: 'Name' },
    { value: 'gender', viewValue: 'Gender' },
    { value: 'species', viewValue: 'Species' }
  ];

  constructor(private ps: PeopleService,
    private formBuilder: FormBuilder,
    private router: Router,
    public pageState: PageStateService) {

    this.myForm = this.formBuilder.group({
      query: new FormControl('', Validators.required),
      condition: '',
    });

    this.initForm();
  }

  ngOnInit(): void {
    this.onInputChange();
    this.onSelectChange();
    this.getPage();
  }

  inputHasValue(): boolean {
    return !!this.myForm.get('query').value;
  }

  clearSreach(): void {
    this.pageState.filter = null;
    this.pageState.query = '';
    this.initForm();
    this.getPage();
  }

  onInputChange(): void {
    this.myForm.get('query').valueChanges.subscribe(val => {
      if(!val){
        this.pageState.filter = null;
        return;
      }

      const condition = this.myForm.get('condition').value;
      this.pageState.filter = new Filter(val, condition);
      this.pageState.pageIndex = 1;
      this.pageState.firstPart = true;
      this.pageState.query = val;
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

      this.pageState.filter = new Filter(query, val);
      this.pageState.pageIndex = 1;
      this.pageState.firstPart = true;
      this.pageState.condition = val;
      this.getPage();
    });
  }

  onNextPage(): void {
    this.pageState.nextPage();
    this.getPage();
  }

  onPrevPage(): void {
    this.pageState.prevPage();

    this.getPage();
  }

  private getPage() {
    if (!this.pageState.filter) {
      this.page$ = this.ps.page(this.pageState.pageIndex, this.pageState.firstPart);
    }
    else {
      this.page$ = this.ps.pageFilter(this.pageState.pageIndex, this.pageState.firstPart, this.pageState.filter);
    }
  }

  private initForm():void{
    this.myForm.setValue({
      query: this.pageState.query,
      condition: this.pageState.condition
    });
  }
}
