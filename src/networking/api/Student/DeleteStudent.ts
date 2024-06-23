import BaseAdapter from "../../baseNetworkAdapter";

class DeleteStudent extends BaseAdapter {
    constructor(school_id: string, student_id: number) {
        super(`/api/schools/{{1}}/students/{{2}}/delete`, BaseAdapter.METHODS.GET, [school_id, student_id]);
    }
}

export default DeleteStudent;
