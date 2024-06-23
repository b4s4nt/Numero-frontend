import BaseAdapter from "../../baseNetworkAdapter";

class EditTeacher extends BaseAdapter {
    constructor(school_id: string, teacher_id: string) {
        super(`/api/schools/{{1}}/teachers/{{2}}/edit`, BaseAdapter.METHODS.POST, [school_id, teacher_id]);
    }
    input(data: any) {
        this.data = data;
    }
}

export default EditTeacher;
