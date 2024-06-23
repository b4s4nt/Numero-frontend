import BaseAdapter from "../../baseNetworkAdapter";

class SearchTeacher extends BaseAdapter {
    constructor(school_id: string, search: string) {
        super(`/api/schools/{{1}}/teachers/search?term={{2}}`, BaseAdapter.METHODS.POST, [school_id, search]);
    }
}

export default SearchTeacher;
