import BaseAdapter from "../../baseNetworkAdapter";

class EditSchool extends BaseAdapter {
    constructor(school_id: number) {
        super(`/api/schools/{{1}}/edit`, BaseAdapter.METHODS.POST, [school_id]);
    }
    input(data: any) {
        this.data = data;
    }
}

export default EditSchool;
