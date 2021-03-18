import Base from './Base';
import Pages from './Pages';

class Api extends Base {
    constructor(opts = {}) {
        super(opts);
        this.pages = new Pages(this);
    }
}

export default Api;
