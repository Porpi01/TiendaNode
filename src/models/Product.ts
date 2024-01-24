const products: Product[] = []; //Array de productos

export class Product {

    constructor(
        public title: string,
        public imageUrl: string,
        public description: string,
        public price: number,
        public id?: number
    ) {

    }

    save() {
        if (!this.id) {
            this.id = Math.round(Math.random() * 1000000);
            products.push(this);
        } else {
            const index = products.findIndex(prod => prod.id === this.id);
            if (this.id >= 0) {
                products[index] = this;
            }

        }
    };


    

    static fetchAll() {
        return products;
    }//Devuelve el array de productos

    static findById(productId: number) {
        return products.find(p => p.id === productId);
    }

    static deleteById(productId: number) {
        const index = products.findIndex(prod => prod.id === productId);
        if (index >= 0) {
            products.splice(index, 1);
        }
    }

}