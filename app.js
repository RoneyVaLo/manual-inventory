const STORAGE_KEY = "inventario";

let productos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function guardarDatos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
}

function renderTabla() {
  const tbody = document.querySelector("#inventoryTable tbody");
  tbody.innerHTML = "";

  productos.forEach((producto, index) => {
    const fila = document.createElement("tr");

    const celdaNombre = document.createElement("td");
    const inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.value = producto.nombre;
    inputNombre.addEventListener("change", (e) => {
      productos[index].nombre = e.target.value;
      guardarDatos();
    });
    celdaNombre.appendChild(inputNombre);

    const celdaCantidad = document.createElement("td");
    const inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.value = parseInt(producto.cantidad);
    inputCantidad.min = 0;
    inputCantidad.addEventListener("change", (e) => {
      productos[index].cantidad = Math.max(0, e.target.value);
      guardarDatos();
    });
    celdaCantidad.appendChild(inputCantidad);

    const celdaAcciones = document.createElement("td");
    const btnMenos = document.createElement("button");
    btnMenos.textContent = "-";
    btnMenos.onclick = () => {
      productos[index].cantidad = Math.max(0, productos[index].cantidad - 1);
      guardarDatos();
      renderTabla();
    };
    const btnMas = document.createElement("button");
    btnMas.textContent = "+";
    btnMas.onclick = () => {
      productos[index].cantidad++;
      guardarDatos();
      renderTabla();
    };

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.style.marginRight = "10px";
    btnEliminar.onclick = () => {
      if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        productos.splice(index, 1);
        guardarDatos();
        renderTabla();
      }
    };

    celdaAcciones.appendChild(btnMenos);
    celdaAcciones.appendChild(btnMas);
    celdaAcciones.appendChild(btnEliminar);

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaCantidad);
    fila.appendChild(celdaAcciones);

    tbody.appendChild(fila);
  });
}

document.getElementById("newProductForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("newProductName").value.trim();
  if (nombre) {
    productos.push({ nombre, cantidad: 0 });
    guardarDatos();
    renderTabla();
    e.target.reset();
  }
});

// Service Worker
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("service-worker.js")
//     .then(() => console.log("SW registrado"))
//     .catch((err) => console.log("Error al registrar SW:", err));
// }

renderTabla();
