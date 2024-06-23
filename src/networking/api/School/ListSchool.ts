import BaseAdapter from "../../baseNetworkAdapter";

class ListSchool extends BaseAdapter {
    constructor() {
        super(`/api/schools/list`, BaseAdapter.METHODS.GET, []);
    }
}

export default ListSchool;
