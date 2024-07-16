const carritoPizzas = document.querySelector('#carrito');
const listaPizzas = document.querySelector('#lista-pizzas');
const cuerpoCarrito = document.querySelector('#lista-carrito tbody');
const mensajeVacio = document.querySelector('#mensaje-vacio');
const tablaCarrito = document.querySelector('#lista-carrito');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const pedirWhatsapp = document.querySelector('#pedir-whatsapp');
const cartCount = document.querySelector('#cart-count');
const totalPagar = document.querySelector('#total-pagar');
const carritoTotal = document.querySelector('.carrito-total');
let articulosCarritoPizzas = [];

document.addEventListener('DOMContentLoaded', cargarCarritoLocalStorage);
cargarEventListeners();

function cargarEventListeners() {
    // Inicializa la vista del carrito
    actualizarVistaCarrito();

    // Evento para agregar pizza al carrito
    listaPizzas.addEventListener('click', agregarPizza);

    // Elimina producto
    carritoPizzas.addEventListener('click', eliminarPizza);

    // Vaciar carrito
    vaciarCarrito.addEventListener('click', () => {
        articulosCarritoPizzas = [];
        actualizarContadorCarrito();
        carritoHTML();
        actualizarVistaCarrito();
        guardarCarritoLocalStorage();
    });
}

// Agregar pizza
function agregarPizza(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const pizzaSeleccionada = e.target.parentElement.parentElement;
        leerDatos(pizzaSeleccionada);
        actualizarVistaCarrito();
        guardarCarritoLocalStorage();
    }
}

// Lee el html del card
function leerDatos(pizza) {
    // Crea objeto con la info de la pizza
    const infoPizza = {
        imagen: pizza.querySelector('img').src,
        titulo: pizza.querySelector('.nombre').textContent,
        precio: pizza.querySelector('.precio span').textContent.replace('$', ''), // Modificado
        id: pizza.querySelector('input').getAttribute('data-id'),
        cantidad: 1
    };

    // Verifica que la pizza ya exista en el carrito
    const existe = articulosCarritoPizzas.some(pizza => pizza.id === infoPizza.id);
    if (existe) { // Si existe le actualiza la cantidad
        const pizzas = articulosCarritoPizzas.map(pizza => {
            if (pizza.id === infoPizza.id) {
                pizza.cantidad++;
                return pizza;
            } else {
                return pizza;
            }
        });
        articulosCarritoPizzas = [...pizzas];
    } else {
        articulosCarritoPizzas = [...articulosCarritoPizzas, infoPizza];
    }
    actualizarContadorCarrito();
    carritoHTML();
}

// Muestra el carrito en el HTML
function carritoHTML() {
    limpiarHTML();
    
    articulosCarrito.forEach(pizza => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${pizza.imagen}" width="60">
        </td>

        <td>
            ${pizza.titulo}
        </td>

        <td>
            $${pizza.precio}
        </td>

        <td>
            ${pizza.cantidad}
        </td>

        <td>
            <a class="borrar-curso" data-id="${pizza.id}">X</a>
        </td>
        `;
        // Agrega el html en el tbody
        cuerpoCarrito.appendChild(row);
    });

    actualizarTotal();
}

// Elimina productos repetidos del html
function limpiarHTML() {
    while (cuerpoCarrito.firstChild) {
        cuerpoCarrito.removeChild(cuerpoCarrito.firstChild);
    }
}

// Eliminar producto del carrito
function eliminarPizza(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const pizzaId = e.target.getAttribute('data-id');
        
        const pizza = articulosCarrito.find(pizza => pizza.id === pizzaId);
        if (pizza.cantidad > 1) {
            pizza.cantidad--;
        } else {
            articulosCarritoPizzas = articulosCarritoPizzas.filter(pizza => pizza.id !== pizzaId);
        }
        carritoHTML();
        actualizarContadorCarrito();
        actualizarVistaCarrito();
        guardarCarritoLocalStorage();
    }
}

// Actualizar el contador del carrito
function actualizarContadorCarrito() {
    const totalCantidad = articulosCarritoPizzas.reduce((total, pizza) => total + pizza.cantidad, 0);
    cartCount.textContent = `(${totalCantidad})`;
}

// Actualiza la vista del carrito
function actualizarVistaCarrito() {
    if (articulosCarritoPizzas.length === 0) {
        mensajeVacio.style.display = 'block';
        carritoTotal.style.display = 'none';
        tablaCarrito.style.display = 'none';
        vaciarCarrito.style.display = 'none';
        pedirWhatsapp.style.display = 'none';
    } else if (articulosCarritoPizzas.length >= 1){
        carritoTotal.style.display = 'block';
        mensajeVacio.style.display = 'none';
        tablaCarrito.style.display = 'table';
        vaciarCarrito.style.display = 'block';
        pedirWhatsapp.style.display = 'block';
    }
}

// Calcula y muestra el total a pagar
function actualizarTotal() {
    const total = articulosCarritoPizzas.reduce((total, pizza) => total + pizza.cantidad * pizza.precio, 0);
    const totalFormateado = total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    totalPagar.textContent = totalFormateado;
}

function guardarCarritoLocalStorage() {
    localStorage.setItem('carritoPizzas', JSON.stringify(articulosCarritoPizzas));
}

function cargarCarritoLocalStorage() {
    articulosCarritoPizzas = JSON.parse(localStorage.getItem('carritoPizzas')) || [];
    carritoHTML();
    actualizarVistaCarrito();
    actualizarContadorCarrito();
}
