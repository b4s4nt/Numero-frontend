import BaseAdapter from "../../baseNetworkAdapter";

class AddTeacher extends BaseAdapter {
    constructor(school_id: string) {
        super(`/api/schools/{{1}}/teachers/add`, BaseAdapter.METHODS.POST, [school_id]);
    }
    input(data: any) {
        this.data = data;
    }
}

export default AddTeacher;
