import BaseAdapter from "../../baseNetworkAdapter";

class AddClass extends BaseAdapter {
    constructor(school_id: string) {
        super(`/api/schools/{{1}}/classes/add`, BaseAdapter.METHODS.POST, [school_id]);
    }
    input(data: any) {
        this.data = data;
    }
}

export default AddClass;
