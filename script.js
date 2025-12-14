let parrafo = document.getElementById("seccion");
let containerProductos = document.getElementById("products-container");

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

if (carrito.length > 0) {
  copiarCarrito();
}

fetch("./data/productos.json")
  .then(response => response.json())
  .then(productos => {
    mostrarProductos(productos);
  })
  .catch(error => console.error("Error al cargar productos:", error));

function mostrarProductos(productos) {
  productos.forEach((producto) => {
    let cardProducto = document.createElement("article");
    cardProducto.classList = "product-item";

    cardProducto.innerHTML = `
      <div class="product-img">
        <img src="${producto.imagen}" alt="${producto.nombre}">
      </div>
      <h2>Producto: ${producto.nombre}</h2>
      <p>Categoria: ${producto.categoria}</p>
      <p>Precio: $${producto.precio}</p>
      <button id="btnAgregar${producto.id}">Agregar</button>
    `;

    containerProductos.appendChild(cardProducto);

    const botonAgregar = document.getElementById(`btnAgregar${producto.id}`);
    botonAgregar.addEventListener("click", () => {
      carrito.push({
        producto: producto.nombre,
        precio: producto.precio
      });

      localStorage.setItem("carrito", JSON.stringify(carrito));
      copiarCarrito();
    });
  });
}


function copiarCarrito() {
  const contenedorCarrito = document.getElementById("cart-container");
  
  contenedorCarrito.innerHTML = "<h2>Mi Carrito</h2>";

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML += "<p>El carrito está vacío</p>";
    return;
  }

  carrito.forEach((item, index) => {
    contenedorCarrito.innerHTML += `
      <p>
        ${index + 1}. ${item.producto} - $${item.precio}
        <button onclick="eliminar(${index})">Eliminar</button>
      </p>`;
  });

  let total = 0;
  carrito.forEach(item => total += item.precio);

  contenedorCarrito.innerHTML += `
    <hr>
    <h3>Total: $${total}</h3>
    <button onclick="finalizarCompra()">Finalizar compra</button>
  `;
}


function eliminar(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  copiarCarrito();
}

function finalizarCompra() {
  let total = 0;
  carrito.forEach(item => total += item.precio);

  Swal.fire({
    title: '¿Finalizar compra?',
    text: `El total es $${total}`,
    background: "linear-gradient(to right, #ffffffff, #2f24c9ff)",
    color: "white",
    showCancelButton: true,
    confirmButtonText: 'Sí, comprar',
    cancelButtonText: 'Cancelar'
  })
      carrito.length = 0;
      localStorage.removeItem("carrito");
      copiarCarrito();
    }
