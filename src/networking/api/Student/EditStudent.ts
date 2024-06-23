import BaseAdapter from "../../baseNetworkAdapter";

class EditStudent extends BaseAdapter {
    constructor(school_id: string, student_id: number) {
        super(`/api/schools/{{1}}/students/{{2}}/edit`, BaseAdapter.METHODS.PUT, [school_id, student_id]);
    }
    input(data: any) {
        this.data = data;
    }
}

export default EditStudent;
