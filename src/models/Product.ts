const products:Product[] = []; //Array de productos

export class Product {

    constructor(
        public title: string,
        public imageUrl: string,
        public description: string,
        public price: number
        ){

    }

    save(){
        products.push(this);
    }//Guarda el producto en el array de productos
    
    static fetchAll(){
        return products;
    }//Devuelve el array de productos
    
}