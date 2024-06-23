import BaseAdapter from "../../baseNetworkAdapter";

class Login extends BaseAdapter {
    constructor() {
        super(`/api/auth/login`, BaseAdapter.METHODS.POST, []);
    }

    input({ email, password }: { email: string; password: string }) {
        this.data = {
            email,
            password,
        };
    }
}

export default Login;
