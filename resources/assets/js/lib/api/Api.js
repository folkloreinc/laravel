import Base from './Base';
import Auth from './Auth';
import Pages from './Pages';

class Api extends Base {
    constructor(opts = {}) {
        super(opts);
        this.auth = new Auth(this);
        this.pages = new Pages(this);
    }
}

export default Api;
