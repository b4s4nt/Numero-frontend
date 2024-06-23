import BaseAdapter from "../../baseNetworkAdapter";

class DeleteClass extends BaseAdapter {
    constructor(school_id: string, class_id: string) {
        super(`/api/schools/{{1}}/classes/{{2}}/delete`, BaseAdapter.METHODS.GET, [school_id, class_id]);
    }
}

export default DeleteClass;
