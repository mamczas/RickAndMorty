import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { charactersPage, character, Filter, charactersPageFilter } from './queries';
import { map } from 'rxjs/operators'
import dataPage from 'src/app/dtos/dataPage';
import dataPerson from 'src/app/dtos/dataPerson';



@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private apollo: Apollo
  ) { }

  pageFilter(pageNumber: number, firstPart: boolean, filter: Filter) {
    return this.apollo.watchQuery<dataPage>({
      query: charactersPageFilter(pageNumber, filter),
      variables: {}
    }).valueChanges.pipe(
    map(x => x.data.characters),
    map(characters => {
        const { results } = characters;
        if(!results) {
          return characters;
        }

        const { length } = results;
        if (!firstPart) {
          characters.results = results.slice(Math.max(length - 10, 0))
        }
        else {
          characters.results = results.slice(0, 10);
        }
        return characters;
      }))
  }

  page(pageNumber: number, firstPart: boolean) {
    return this.apollo.watchQuery<dataPage>({
      query: charactersPage(pageNumber),
      variables: {}
    }).valueChanges.pipe(
    map(x => x.data.characters),
    map(characters => {
        const { results } = characters;
        const { length } = results;
        if (!firstPart) {
          characters.results = results.slice(Math.max(length - 10, 0))
        }
        else {
          characters.results = results.slice(0, 10);
        }
        return characters;
      }))
  }

  getById(id: string) {
    return this.apollo.watchQuery<dataPerson>({
      query: character(id),
      variables: {}
    }).valueChanges.pipe(map(x => x.data.character));
  }

}
