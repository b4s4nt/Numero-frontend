import BaseAdapter from "../../baseNetworkAdapter";

class ViewTeacher extends BaseAdapter {
    constructor(school_id: string, teacher_id: string) {
        super(`/api/schools/{{1}}/teachers/{{2}}`, BaseAdapter.METHODS.GET, [school_id, teacher_id]);
    }
}

export default ViewTeacher;
