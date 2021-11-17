const DB2 = require('./index');

const DB2_CHECK_TIMEOUT = 60 * 1000;
const DB2_STALE_TIMEOUT = 60 * 30 * 1000;

class Pool {

    constructor(props){
        this.db2 = new DB2(props);
        this.open = false;
        this.last = new Date().getTime();

        this.check = this.check.bind(this);
        this.query = this.query.bind(this);
        this.isStaled = this.isStaled.bind(this);

        setInterval(() => {
           this.check() 
        }, DB2_CHECK_TIMEOUT);
    }


    query(sql){
        console.log('querying DB2 POOL');
        this.last = new Date().getTime();
        this.open = true;
        return this.db2.query(sql);
    }

    check(){
        console.log('CHECKING DB2 POOL', this.open, new Date().getTime() - this.last);
        if (!this.open) return;
        if (!this.isStaled()) {
            this.db2.query('SELECT 1 FROM SYSIBM.SYSDUMMY1');
            return
        }
        this.open = false;
        this.db2.close();
    }

    isStaled(){
        return new Date().getTime() - this.last > DB2_STALE_TIMEOUT;
    }

}

module.exports = Pool;