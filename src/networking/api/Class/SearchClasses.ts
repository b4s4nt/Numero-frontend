import BaseAdapter from "../../baseNetworkAdapter";

class SearchClass extends BaseAdapter {
    constructor(school_id: string, search: string) {
        super(`/api/schools/{{1}}/classes/search?term={{2}}`, BaseAdapter.METHODS.POST, [school_id, search]);
    }
}

export default SearchClass;
