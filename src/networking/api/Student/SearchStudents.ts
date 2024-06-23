import BaseAdapter from "../../baseNetworkAdapter";

class SearchStudent extends BaseAdapter {
    constructor(school_id: string, search: string) {
        super(`/api/schools/{{1}}/students/search?term={{2}}`, BaseAdapter.METHODS.POST, [school_id, search]);
    }
}

export default SearchStudent;
