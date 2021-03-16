import Base from './Base';
import Auth from './Auth';
import Account from './Account';
import Resources from './Resources';

class Panneau extends Base {
    constructor(opts = {}) {
        super(opts);
        this.auth = new Auth(this, {
            withCredentials: true,
        });
        this.account = new Account(this, {
            withCredentials: true,
        });
        this.resources = new Resources(this);
    }
}

export default Panneau;
