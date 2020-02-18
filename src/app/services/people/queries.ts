
import gql from 'graphql-tag';

export class Filter {
    query: string;
    condition: string;
    constructor(query: string, condition: string){
        this.condition = condition;
        this.query = query;
    }
}

export function charactersPageFilter(pageIndex: Number, filter: Filter) {
    return gql`query {
        characters(page: ${pageIndex}, filter: { ${filter.condition}: "${filter.query}"}) {
            info {
                count
            }
          results {
            id
            name
            gender
            species
          }
        }
      }`;
} 


export function charactersPage(pageIndex: Number) {
    return gql`query {
        characters(page:${pageIndex}) {
          info {
              count
          }
          results {
            id,
            name,
            gender,
            species,
            image,
          }
        }
      }`;
} 

export function character(id: String) {
    return gql`query {
        character(id: ${id}) {
            id
            name
            gender
            species,
            image
        }
      }`;
} 