import BaseAdapter from "../../baseNetworkAdapter";

class ViewStudent extends BaseAdapter {
    constructor(school_id: string, student_id: string) {
        super(`/api/schools/{{1}}/students/{{2}}`, BaseAdapter.METHODS.GET, [school_id, student_id]);
    }
}

export default ViewStudent;
