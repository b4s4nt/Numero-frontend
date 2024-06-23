import BaseAdapter from "../../baseNetworkAdapter";

class AddSchool extends BaseAdapter {
    constructor() {
        super(`/api/schools/add`, BaseAdapter.METHODS.POST, []);
    }
    input(data: any) {
        this.data = data;
    }
}

export default AddSchool;
