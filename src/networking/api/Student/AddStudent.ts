import BaseAdapter from "../../baseNetworkAdapter";

class AddStudent extends BaseAdapter {
    constructor(school_id: string) {
        super(`/api/schools/{{1}}/students/add`, BaseAdapter.METHODS.POST, [school_id]);
    }
    input(data: any) {
        this.data = data;
    }
}

export default AddStudent;
