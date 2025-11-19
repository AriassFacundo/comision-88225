let parrafo = document.getElementById("seccion");

let containerProductos = document.getElementById("products-container")

const productos = [
  {
    id: 1,
    nombre: "River 96/97 TITULAR",
    categoria: "Camisetas",   
    precio: 42900,
  },
  {
    id: 2,
    nombre: "Boca Jrs. 2000 IMPORTADA",
    categoria: "Camisetas",
    precio: 42900,
  },
  {
    id: 3,
    nombre: "Shorts de futbol",
    categoria: "Shorts",
    precio: 27200,
  },
  {
    id: 4, 
    nombre: "Pilusos Bordados",
    categoria: "Pilusos",   
    precio: 15000,
  },
  {
    id: 5,
    nombre: "Buzo River Quilmes Retro Rojo",
    categoria:"Buzos",
    precio: 53500,
  },
  {
    id: 6,
    nombre: "Buzo Argentina Mundial 2006/2010/2014",
    categoria: "Buzos",
    precio: 53500,
  },
];

const carrito = JSON.parse(localStorage.getItem("carrito")) || []
if (carrito.length > 0){
  copiarCarrito(carrito);
}

const contenedorProductos = document.getElementById
("products-container");

 productos.forEach((producto) => {
  let cardProducto = document.createElement("article");
  cardProducto.classList = "product-item";

  cardProducto.innerHTML = `
      <h2>Producto: ${producto.nombre}</h2>
      <p>Categoria: ${producto.categoria}</p>
      <p>precio: $${producto.precio}</p>
      <button id="btnComprar${producto.id}">Comprar</button>`;

    contenedorProductos.appendChild(cardProducto);
    const botonComprar = document.getElementById(`btnComprar${producto.id}`);

    botonComprar.addEventListener("click", () => {
    alert(`Compra realizada: ${producto.nombre} por $${producto.precio}`);

     carrito.push({producto: producto.nombre, precio: producto.precio});

     localStorage.setItem("carrito", JSON.stringify(carrito));

     copiarCarrito();
    });
 });

 function copiarCarrito() {
  const contenedorCarrito = document.getElementById("cart-container");
  contenedorCarrito.innerHTML = "<h2>Mi Carrito</h2>";
  
  carrito.forEach((item, index) => {
    contenedorCarrito.innerHTML += `
      <p>
        ${index + 1}. ${item.producto} - $${item.precio}
        <button onclick="eliminar(${index})">Eliminar</button>
      </p>`;
  });
}
function eliminar(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  copiarCarrito();
}