// Variable global para almacenar el nombre del usuario y el carrito
let nombreUsuario;
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para saludar al usuario por su nombre
function saludarPorNombre() {
    nombreUsuario = "Usuario"; // Puedes cambiar esto a obtener el nombre de alguna entrada en el formulario si es necesario.
    const greetingDiv = document.getElementById('greeting');
    greetingDiv.textContent = `¡Hola, ${nombreUsuario}! Bienvenido/a.`;
}

// Llamada a la función para saludar al usuario
saludarPorNombre();
viewCart(); // Llamada para mostrar el carrito al inicio

// Función para mostrar los productos de una categoría
function mostrarProductos(categoria) {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = ''; // Limpiar contenido anterior
    productos[categoria].forEach((producto, index) => {
        const productDiv = document.createElement('div');
        productDiv.textContent = `${index + 1}. ${producto.nombre} - Precio: $${producto.precio}`;
        const button = document.createElement('button');
        button.textContent = 'Agregar al Carrito';
        button.onclick = () => agregarProductoAlCarrito(producto);
        productDiv.appendChild(button);
        productsDiv.appendChild(productDiv);
    });
}

// Función para mostrar una categoría seleccionada
function showCategory(categoria) {
    mostrarProductos(categoria);
}

// Función para ver productos actuales en el carrito
function viewCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = ''; // Limpiar contenido anterior
    if (carrito.length === 0) {
        cartDiv.textContent = "El carrito está vacío.";
    } else {
        carrito.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `${index + 1}. ${item.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${item.subtotal}`;
            
            // Botón para incrementar cantidad
            const addButton = document.createElement('button');
            addButton.textContent = '+';
            addButton.onclick = () => incrementarCantidad(item);
            itemDiv.appendChild(addButton);

            // Botón para decrementar cantidad
            const subtractButton = document.createElement('button');
            subtractButton.textContent = '-';
            subtractButton.onclick = () => decrementarCantidad(item);
            itemDiv.appendChild(subtractButton);

            // Botón para eliminar item
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.onclick = () => eliminarItem(item);
            itemDiv.appendChild(removeButton);

            cartDiv.appendChild(itemDiv);
        });
    }
}

// Función para agregar productos al carrito
function agregarProductoAlCarrito(producto) {
    const itemExistente = carrito.find(item => item.nombre === producto.nombre);
    if (itemExistente) {
        alert(`${producto.nombre} ya está en el carrito.`);
    } else {
        carrito.push({ nombre: producto.nombre, cantidad: 1, subtotal: producto.precio, precio: producto.precio });
        localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito en localStorage
        alert(`${producto.nombre} se ha agregado al carrito.`);
        viewCart(); // Actualizar la vista del carrito
    }
}

// Función para incrementar la cantidad de un item en el carrito
function incrementarCantidad(producto) {
    producto.cantidad += 1;
    producto.subtotal = producto.cantidad * producto.precio;
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar el carrito en localStorage
    viewCart(); // Actualizar la vista del carrito
}

// Función para decrementar la cantidad de un item en el carrito
function decrementarCantidad(producto) {
    if (producto.cantidad > 1) {
        producto.cantidad -= 1;
        producto.subtotal = producto.cantidad * producto.precio;
        localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar el carrito en localStorage
    } else {
        eliminarItem(producto);
    }
    viewCart(); // Actualizar la vista del carrito
}

// Función para eliminar un item del carrito
function eliminarItem(producto) {
    carrito = carrito.filter(item => item.nombre !== producto.nombre);
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar el carrito en localStorage
    viewCart(); // Actualizar la vista del carrito
}

// Función para vaciar el carrito
function emptyCart() {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar el carrito en localStorage
    alert("El carrito ha sido vaciado.");
    viewCart(); // Actualizar la vista del carrito
}

// Función para mostrar un mensaje de despedida al usuario
function mensajeDespedida() {
    alert(`Gracias por usar nuestra aplicación, ${nombreUsuario}. ¡Que tengas un buen día!`);
    localStorage.removeItem('carrito'); // Limpiar el carrito en localStorage
}

// Función para finalizar la compra
function finalizePurchase() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. No hay productos para finalizar la compra.");
    } else {
        let total = 0;
        let productosFinales = "Productos en tu compra final:\n";
        carrito.forEach(item => {
            productosFinales += `${item.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${item.subtotal}\n`;
            total += item.subtotal;
        });
        alert(`${productosFinales}\nTotal a pagar: $${total}`);
        mensajeDespedida(); // Llamada a la función de despedida
        carrito = []; // Vaciar el carrito después de la compra
        localStorage.removeItem('carrito'); // Limpiar el carrito en localStorage
        viewCart(); // Actualizar la vista del carrito
    }
}

// Declaración de productos como arrays constantes
const productos = {
    Jeans: [
        { nombre: "Chupin", precio: 21000 },
        { nombre: "Recto", precio: 20000 },
        { nombre: "Oxford", precio: 23500 },
        { nombre: "Palazzo", precio: 20500 },
        { nombre: "Cargo", precio: 21500 }
    ],
    Abrigos: [
        { nombre: "Blazer", precio: 30000 },
        { nombre: "Cardigans", precio: 35000 },
        { nombre: "Sweaters", precio: 32000 },
        { nombre: "Camperas Dama", precio: 45000 },
        { nombre: "Camperas Juveniles", precio: 50000 }
    ],
    Remeras: [
        { nombre: "Musculosas", precio: 15000 },
        { nombre: "Chombas", precio: 25000 },
        { nombre: "Top", precio: 19000 },
        { nombre: "Camisas", precio: 29000 },
        { nombre: "Camisetas", precio: 21500 }
    ]
};
