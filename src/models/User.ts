import { ObjectId } from "mongodb";
import { collections } from "../services/databaseService.js";
import { Order } from "./Orders.js";

interface address {
    calle: string,
    telf: string,
    CP: string,
}

export interface CartItem {
    pid: ObjectId;
    quantity: number;
}


export class User {

    public _id?: ObjectId;
    public cart: CartItem[] = [];

    constructor(
        public DNI: string,
        public name: string,
        public mail: string,
        public contacto: address,
        cart?: CartItem[],
        id?: string

    ) {
        if (id) {
            this._id = new ObjectId(id);
            cart ? this.cart = cart : this.cart = [];
        }
    }

    async save() { //Guardar en la base de datos el usuario 

        const result1 = await collections.users?.findOne({ DNI: this.DNI }); //Comprobar si el usuario existe 
        if (result1) {

            this._id = result1._id;
            return this;
        }

        const result = await collections.users?.insertOne(this);
        console.log(result);
        result
            ? console.log(`Usuario creado con éxito con el id: ${result.insertedId}`)
            : console.log("Error al crear el usuario");
        return this;
    }


    static async fetchById(id: string) {
        return await collections.users?.findOne({ _id: new ObjectId(id) });
    }

    async addToCart(id: string) {
        const index = this.cart.findIndex(c => c.pid.toHexString() === id); //Comprobar si el producto ya está en el carrito
        if (index >= 0) {
            this.cart[index].quantity += 1;
        } else {
            const prodId = new ObjectId(id);
            this.cart.push({ pid: prodId, quantity: 1 });
        }
        return await collections.users?.updateOne({ _id: this._id }, { $set: { cart: this.cart } });
    }

    async getCart() {

        const prodIds = this.cart.map(ci => ci.pid);
        const products = await collections.products?.find({ _id: { $in: prodIds } }).toArray();
        return products?.map(p => {

            const quantity = this.cart.find(ci => p._id?.toHexString() === ci.pid.toHexString())?.quantity; //Añadir la cantidad de productos al carrito
            return {
                _id: p._id,
                title: p.title,
                price: p.price,
                quantity: quantity

            }
        })
    }

    //Borrar un producto del carrito
    async deleteCartItem(id: string) {
        const index = this.cart.findIndex(c => c.pid.toHexString() === id);
        if (index >= 0) {
            this.cart.splice(index, 1);
            return await collections.users?.updateOne({ _id: this._id }, { $set: { cart: this.cart } });
        }

    }

    async decreaseCartItem(id: string) {

        const index = this.cart.findIndex(c => c.pid.toHexString() === id);
        if (index >= 0) {
            const quantity = this.cart[index].quantity;
            if (quantity == 1) {
                await this.deleteCartItem(id);
            } else {
                this.cart[index].quantity -= 1;
            } return await collections.users?.updateOne({ _id: this._id }, { $set: { cart: this.cart } });

        } else {
            return;
        }
    }

    async getOrders() {
        return await collections.orders?.find({ 'user._id': this._id }).toArray();
    }

    async addOrder() {
        if (this.cart.length > 0 && this._id) {
            const prodsId = this.cart.map(ci => ci.pid); //Obtener los ids de los productos del carrito 
            const products = await collections.products?.find({ _id: { $in: prodsId } }).toArray();
            if (products) {
                const items = products.map(p => {
                    return {
                        product: p,
                        quantity: this.cart.find(ci => ci.pid.toHexString() === p._id.toHexString())!.quantity
                    }
                })
            const time = new Date();
            this.cart = [];
            const result = await collections.users!.updateOne({ _id: this._id }, { $set: { cart:[]} });
            result
                ? console.log(`Pedido creado con éxito con el id: ${result}`)
                : console.log("Error al crear el pedido");
                const newOrder: Order = {user: this, date:time , items: items};
                return await collections.orders?.insertOne(newOrder);

        } else {
            return null;
        }
    }
}

}
