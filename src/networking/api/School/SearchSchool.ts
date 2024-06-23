import BaseAdapter from "../../baseNetworkAdapter";

class SearchSchool extends BaseAdapter {
    constructor(search: string) {
        super(`/api/schools/search?term={{1}}`, BaseAdapter.METHODS.POST, [search]);
    }
}

export default SearchSchool;
