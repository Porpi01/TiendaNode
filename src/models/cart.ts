export class CartItem {
    constructor(
        public id: number,  // id del producto
        public quantity: number  // cantidad de productos
    ) { }
}

const cartItems: CartItem[] = [];

export class Cart {

    //Introduce un producto en el carrito
    static addProduct(id: number, quantity: number) {

        const index = cartItems.findIndex(item => item.id === id);
        if (index >= 0) {
            //Si ya está en el carro, aumentamos la cantidad  
            cartItems[index] = new CartItem(id, cartItems[index].quantity + quantity);

        } else {
            cartItems.push(new CartItem(id, quantity)); //Añadimos el producto al carrito sino está en el carro

        }
    }


    static getCart() {
        return cartItems;
    }
    static deleteProduct(id: number) {
        const index = cartItems.findIndex(ci => ci.id === id); //Buscamos el producto en el carrito
        if (index >= 0) {
            cartItems.splice(index, 1);
        }
    }
    //Aumenta la cantidad de un producto en el carrito
    static decreasePR(id: number) {
        const index = cartItems.findIndex(ci => ci.id === id);
        if (index >= 0) {
            const quantity = cartItems[index].quantity;
            if (quantity > 1) {
                cartItems[index] = new CartItem(id, quantity - 1);
            } else {
                cartItems.splice(index, 1);
            }
        }
    }
}