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
}