import { Place } from "../entity/place";
import { BaseRepository } from "./base_repository";

export class PlaceRepository extends BaseRepository<Place> {
    constructor() {
        super(Place);
    }
}