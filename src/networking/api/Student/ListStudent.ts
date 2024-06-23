import BaseAdapter from "../../baseNetworkAdapter";

class ListStudents extends BaseAdapter {
    constructor(school_id: string) {
        super(`/api/schools/{{1}}/students/list`, BaseAdapter.METHODS.GET, [school_id]);
    }
}

export default ListStudents;
