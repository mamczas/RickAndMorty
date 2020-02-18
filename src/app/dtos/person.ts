import { Url } from "url";

export default class Person {
    id: String;
    name: String;
    gender: String;
    species: String;
    image: Url;

    constructor(id: string, name: string, gender:string, species: string) {
      this.id = id;
      this.name = name;
      this.gender = gender;
      this.species = species;
    }
  }