// Variable global para almacenar el nombre del usuario y el carrito
let nombreUsuario = localStorage.getItem('nombreUsuario') || null;
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para saludar al usuario por su nombre
function saludarPorNombre() {
    const inputNombre = document.getElementById('username');
    nombreUsuario = inputNombre.value || "Usuario"; // Si no se ingresa un nombre, se utiliza "Usuario"
    localStorage.setItem('nombreUsuario', nombreUsuario); // Guardar el nombre en localStorage
    const greetingDiv = document.getElementById('greeting');
    greetingDiv.textContent = `¡Hola, ${nombreUsuario}! Bienvenido/a.`;
    inputNombre.value = ""; // Limpiar el campo de entrada
}

// Mostrar el saludo si ya hay un nombre guardado en localStorage
if (nombreUsuario) {
    const greetingDiv = document.getElementById('greeting');
    greetingDiv.textContent = `¡Hola, ${nombreUsuario}! Bienvenido/a.`;
}
viewCart(); // Llamada para mostrar el carrito al inicio

// Función para mostrar los productos de una categoría
function mostrarProductos(categoria) {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = ''; // Limpiar contenido anterior
    productos[categoria].forEach((producto, index) => {
        const productDiv = document.createElement('div');
        const productName = document.createElement('p');
        productName.textContent = `${index + 1}. ${producto.nombre} - Precio: $${producto.precio}`;
        
        // Crear elemento de imagen
        const productImg = document.createElement('img');
        productImg.src = producto.img;
        productImg.alt = producto.nombre;
        productImg.style.width = '100px'; // Establecer el ancho deseado
        
        // Botón para agregar al carrito
        const button = document.createElement('button');
        button.textContent = 'Agregar al Carrito';
        button.onclick = () => agregarProductoAlCarrito(producto);
        
        // Agregar elementos al div de producto
        productDiv.appendChild(productName);
        productDiv.appendChild(productImg);
        productDiv.appendChild(button);
        
        // Agregar el div de producto al contenedor de productos
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
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <div>
                    <span>${item.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${item.subtotal}</span>
                </div>
            `;
            
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
    const itemExistente = carrito.find(item => item.id === producto.id);
    if (itemExistente) {
        alert(`${producto.nombre} ya está en el carrito.`);
    } else {
        carrito.push({ ...producto, cantidad: 1, subtotal: producto.precio });
        localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito en localStorage
        alert(`${producto.nombre} se ha agregado al carrito.`);
        viewCart(); // Actualizar la vista del carrito
    }
}

// Función para incrementar la cantidad de un item en el carrito
function incrementarCantidad(producto) {
    const item = carrito.find(item => item.id === producto.id);
    if (item) {
        item.cantidad += 1;
        item.subtotal = item.cantidad * item.precio;
        localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar el carrito en localStorage
        viewCart(); // Actualizar la vista del carrito
    }
}

// Función para decrementar la cantidad de un item en el carrito
function decrementarCantidad(producto) {
    const item = carrito.find(item => item.id === producto.id);
    if (item) {
        if (item.cantidad > 1) {
            item.cantidad -= 1;
            item.subtotal = item.cantidad * item.precio;
            localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar el carrito en localStorage
        } else {
            eliminarItem(producto);
        }
        viewCart(); // Actualizar la vista del carrito
    }
}

// Función para eliminar un item del carrito
function eliminarItem(producto) {
    carrito = carrito.filter(item => item.id !== producto.id);
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
        alert("El carrito está vacío. No hay productos para comprar.");
    } else {
        let total = carrito.reduce((acc, item) => acc + item.subtotal, 0);
        alert(`El total de tu compra es: $${total}. ¡Gracias por tu compra, ${nombreUsuario}!`);
        emptyCart(); // Vaciar el carrito después de la compra
    }
}

// Declaración de productos como arrays constantes
const productos = {
    Jeans: [
        { id: 0, nombre: "Chupin", precio: 21000, img: "./assets/img/jeans-chupin.jpg" },
        { id: 1, nombre: "Recto", precio: 20000, img: "./assets/img/jeans-recto.jpg" },
        { id: 2, nombre: "Oxford", precio: 23500, img: "./assets/img/jeans-oxford.jpg" },
        { id: 3, nombre: "Palazzo", precio: 20500, img: "./assets/img/jeans-palazzo.jpg" },
        { id: 4, nombre: "Cargo", precio: 21500, img: "./assets/img/jeans-cargo.jpg" }
    ],
    Abrigos: [
        { id: 5, nombre: "Blazer", precio: 30000, img: "./assets/img/abrigos-blazer.jpg" },
        { id: 6, nombre: "Cardigans", precio: 35000, img: "./assets/img/abrigos-cardigans.jpg" },
        { id: 7, nombre: "Sweaters", precio: 32000, img: "./assets/img/abrigos-sweaters.jpg" },
        { id: 8, nombre: "Camperas Dama", precio: 45000, img: "./assets/img/abrigos-camperasdama.jpg" },
        { id: 9, nombre: "Camperas Juveniles", precio: 50000, img: "./assets/img/abrigos-camperasjuveniles.jpg" }
    ],
    Remeras: [
        { id: 10, nombre: "Musculosas", precio: 15000, img: "./assets/img/remeras-musculosas.jpg" },
        { id: 11, nombre: "Chombas", precio: 25000, img: "./assets/img/remeras-chombas.jpg" },
        { id: 12, nombre: "Top", precio: 19000, img: "./assets/img/remeras-top.jpg" },
        { id: 13, nombre: "Camisas", precio: 29000, img: "./assets/img/remeras-camisas.jpg" },
        { id: 14, nombre: "Camisetas", precio: 21500, img: "./assets/img/remeras-camisetas.jpg" }
    ]
};
