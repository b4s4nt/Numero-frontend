import BaseAdapter from "../../baseNetworkAdapter";

class EditClass extends BaseAdapter {
    constructor(school_id: string, class_id: string) {
        super(`/api/schools/{{1}}/classes/{{2}}/edit`, BaseAdapter.METHODS.POST, [school_id, class_id]);
    }
    input(data: any) {
        this.data = data;
    }
}

export default EditClass;
