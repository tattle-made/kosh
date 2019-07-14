import BaseController from "./_BaseController";
import SearchItem from "../models/data/SearchItem";
import _BaseController from "./_BaseController";
import { SearchRequest } from "../models/request/SearchRequest";

export class SearchController extends _BaseController {
    constructor() {
        super("temp search");
    }

    public search(param: any): SearchItem[] {
        const params = new SearchRequest(param);

        return [new SearchItem("asdfasdf-asdfadsf-adsf", "Adasdf")];
    }
}
