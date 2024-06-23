import BaseAdapter from "../../baseNetworkAdapter";

class ViewSchool extends BaseAdapter {
    constructor(school_id: string) {
        super(`/api/schools/{{1}}/`, BaseAdapter.METHODS.GET, [school_id]);
    }
}

export default ViewSchool;
