import BaseAdapter from "../../baseNetworkAdapter";

class ViewSchool extends BaseAdapter {
    constructor(school_id: string, class_id: string) {
        super(`/api/schools/{{1}}/classes/{{2}}`, BaseAdapter.METHODS.GET, [school_id, class_id]);
    }
}

export default ViewSchool;
