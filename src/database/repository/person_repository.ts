import { Person } from "../entity/person";
import { BaseRepository } from "./base_repository";

export class PersonRepository extends BaseRepository<Person> {
    constructor() {
        super(Person);
    }
}