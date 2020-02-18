import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PeopleService } from '../services/people/people.service';
import Person from '../dtos/person';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  private id: string;
  public person$: Observable<Person>;

  constructor(private route: ActivatedRoute, private ps: PeopleService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.person$ = this.ps.getById(this.id);
  }
}
