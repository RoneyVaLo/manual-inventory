document.addEventListener("DOMContentLoaded", () => {
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
      fila.className = "product-row";

      const celdaNombre = document.createElement("td");
      const inputNombre = document.createElement("input");
      inputNombre.className = "input-text";
      inputNombre.type = "text";
      inputNombre.value = producto.nombre;
      inputNombre.addEventListener("change", (e) => {
        productos[index].nombre = e.target.value;
        guardarDatos();
      });
      celdaNombre.appendChild(inputNombre);

      const celdaCantidad = document.createElement("td");
      const inputCantidad = document.createElement("input");
      inputCantidad.className = "input-number";
      inputCantidad.type = "number";
      inputCantidad.value = parseInt(producto.cantidad);
      inputCantidad.min = 0;
      inputCantidad.addEventListener("change", (e) => {
        productos[index].cantidad = Math.max(0, e.target.value);
        guardarDatos();
      });
      celdaCantidad.appendChild(inputCantidad);

      const celdaAcciones = document.createElement("td");
      celdaAcciones.className = "action-buttons";

      const btnMenos = document.createElement("button");
      btnMenos.className = "btn action-btn";
      btnMenos.textContent = "-";
      btnMenos.onclick = () => {
        productos[index].cantidad = Math.max(0, productos[index].cantidad - 1);
        guardarDatos();
        renderTabla();
      };

      const btnMas = document.createElement("button");
      btnMas.className = "btn action-btn";
      btnMas.textContent = "+";
      btnMas.onclick = () => {
        productos[index].cantidad++;
        guardarDatos();
        renderTabla();
      };

      const celdaEliminarFila = document.createElement("td");
      const btnEliminar = document.createElement("button");
      btnEliminar.className = "btn delete-btn";
      btnEliminar.textContent = "X";
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
      celdaEliminarFila.appendChild(btnEliminar);

      fila.appendChild(celdaNombre);
      fila.appendChild(celdaCantidad);
      fila.appendChild(celdaAcciones);
      fila.appendChild(celdaEliminarFila);

      tbody.appendChild(fila);
    });
  }

  alert("Form:", document.getElementById("newProductForm"))
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
});
