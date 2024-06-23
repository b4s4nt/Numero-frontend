import BaseAdapter from "../../baseNetworkAdapter";

class ListClasses extends BaseAdapter {
    constructor(school_id: string) {
        super(`/api/schools/{{1}}/classes/list`, BaseAdapter.METHODS.GET, [school_id]);
    }
}

export default ListClasses;
