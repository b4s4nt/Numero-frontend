import BaseAdapter from "../../baseNetworkAdapter";

class DeleteTeacher extends BaseAdapter {
    constructor(school_id: string, teacher_id: string) {
        super(`/api/schools/{{1}}/teachers/{{2}}/delete`, BaseAdapter.METHODS.DELETE, [school_id, teacher_id]);
    }
}

export default DeleteTeacher;
