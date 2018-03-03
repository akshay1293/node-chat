class Demo {


    constructor(a) {

        this.a = a;

    }

    getFirstname() {

        return this.a;
    }
}

class Demo_1 extends Demo {

    constructor(a, b) {

        super(a);
        this.b = b;

    }
    getLastname() {

        return this.b;
    }
    getName() {

        return super.getFirstname() + ' ' + this.getLastname();

    }
}

module.exports = Demo_1;