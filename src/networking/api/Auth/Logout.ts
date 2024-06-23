import BaseAdapter from "../../baseNetworkAdapter";

class Logout extends BaseAdapter {
    constructor() {
        super(`/api/auth/logout`, BaseAdapter.METHODS.GET, []);
    }
}

export default Logout;
