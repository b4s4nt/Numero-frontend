import BaseAdapter from "../../baseNetworkAdapter";

class ListTeachers extends BaseAdapter {
    constructor(school_id: string) {
        super(`/api/schools/{{1}}/teachers/list`, BaseAdapter.METHODS.GET, [school_id]);
    }
}

export default ListTeachers;
