const products:Product[] = []; //Array de productos

export class Product {

    constructor(
        public title: string,
        public imageUrl: string,
        public description: string,
        public price: number,
        public id?: number
        ){

    }

    save(){
       if(!this.id){
        this.id = Math.round(Math.random()*1000000);
        products.push(this);
    }
};
    
    static fetchAll(){
        return products;
    }//Devuelve el array de productos
    
}