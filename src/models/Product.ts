import { ObjectId } from "mongodb";
import { collections } from "../services/databaseService.js";

const products: Product[] = []; //Array de productos

export class Product {
    public _id?: ObjectId;

    constructor(
        public title: string,
        public imageUrl: string,
        public description: string,
        public price: number,
        public id?: number
    ) {

    }

    /* save() {
         if (!this.id) {
             this.id = Math.round(Math.random() * 1000000);
             products.push(this);
         } else {
             const index = products.findIndex(prod => prod.id === this.id);
             if (this.id >= 0) {
                 products[index] = this;
             }
 
         }
     }*/

    async save() {

        if (this._id) {
            const result = await collections.products?.updateOne({ _id: this._id }, { $set: this });
            result
                ? console.log(`Producto actualizado con éxito con el id: ${this._id}`)
                : console.log("Error al actualizar el producto");
            return;
        }

        const result = await collections.products?.insertOne(this);
        result
            ? console.log(`Producto creado con éxito con el id: ${result.insertedId}`)
            : console.log("Error al crear el producto");

    }


    static async fetchAll() {
        return await collections.products?.find().toArray(); //Devuelve un array de productos
    }

    static async findById(productId: number) {
      return await collections.products?.findOne({ _id: new ObjectId(productId) });
    }

    static deleteById(productId: number) {
        console.log('Borrando producto con id: ', productId);
        const index = products.findIndex(prod => prod.id === productId);
        if (index >= 0) {
            products.splice(index, 1);
            console.log('Productos');
        }
    }

    static deletebyproductId(productId: number) {
        console.log('entra en deletebyproductId');
        const index = products.findIndex(p => p.id === productId);
        if (index >= 0) {
            products.splice(index, 1)[0];
        }

    }
}