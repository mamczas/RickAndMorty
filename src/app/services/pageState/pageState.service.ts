import { Injectable } from "@angular/core";
import { Filter } from "../people/queries";

@Injectable({
    providedIn: 'root'
  })
  export class PageStateService {
  
    public query: string;
    public condition: string;

    public pageIndex: number;
    public firstPart: boolean;
    public filter: Filter;

    constructor(
    ) {
        this.firstPart = true;
        this.pageIndex = 1;
        this.query = '';
        this.condition = 'name';
    }

    nextPage():void{
        if (this.pageIndex % 2 == 0 && this.firstPart) {
            this.firstPart = false;
          }
          else if (this.pageIndex % 2 == 0 && !this.firstPart) {
            this.pageIndex++;
            this.firstPart = true;
          }
          else if (this.pageIndex % 2 != 0 && this.firstPart) {
            this.firstPart = false;
          }
          else if (this.pageIndex % 2 != 0 && !this.firstPart) {
            this.pageIndex++;
            this.firstPart = true;
          }
    }

    prevPage(): void {
        if (this.pageIndex % 2 == 0 && this.firstPart) {
          this.pageIndex--;
          this.firstPart = false;
        }
        else if (this.pageIndex % 2 == 0 && !this.firstPart) {
          this.firstPart = true;
        }
        else if (this.pageIndex % 2 != 0 && this.firstPart) {
          this.pageIndex--;
          this.firstPart = false;
        }
        else if (this.pageIndex % 2 != 0 && !this.firstPart) {
          this.firstPart = true;
        }
    }

  }