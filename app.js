document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "inventario";
  let productos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const productList = document.getElementById("productList");

  function guardarDatos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
  }

  function renderProductos() {
    productList.innerHTML = "";

    productos.forEach((producto, index) => {
      const card = document.createElement("div");
      card.className = "product-card";

      const header = document.createElement("div");
      header.className = "product-header";

      const inputNombre = document.createElement("input");
      inputNombre.type = "text";
      inputNombre.value = producto.nombre;
      inputNombre.className = "input-text";
      inputNombre.addEventListener("change", (e) => {
        productos[index].nombre = e.target.value;
        guardarDatos();
      });

      const btnEliminar = document.createElement("button");
      btnEliminar.className = "btn delete-btn";
      btnEliminar.textContent = "X";
      btnEliminar.onclick = () => {
        if (confirm("¿Deseas eliminar este producto?")) {
          productos.splice(index, 1);
          guardarDatos();
          renderProductos();
        }
      };

      header.appendChild(inputNombre);
      header.appendChild(btnEliminar);

      const body = document.createElement("div");
      body.className = "product-body";

      const label = document.createElement("label");
      label.className = "label";
      label.textContent = "Cantidad";

      const actions = document.createElement("div");
      actions.className = "actions";

      const btnMenos = document.createElement("button");
      btnMenos.className = "btn action-btn";
      btnMenos.textContent = "-";
      btnMenos.onclick = () => {
        productos[index].cantidad = Math.max(0, productos[index].cantidad - 1);
        guardarDatos();
        renderProductos();
      };

      const inputCantidad = document.createElement("input");
      inputCantidad.className = "input-number";
      inputCantidad.type = "number";
      inputCantidad.min = 0;
      inputCantidad.value = producto.cantidad;
      inputCantidad.addEventListener("change", (e) => {
        productos[index].cantidad = Math.max(0, parseInt(e.target.value) || 0);
        guardarDatos();
      });

      const btnMas = document.createElement("button");
      btnMas.className = "btn action-btn";
      btnMas.textContent = "+";
      btnMas.onclick = () => {
        productos[index].cantidad++;
        guardarDatos();
        renderProductos();
      };

      actions.appendChild(btnMenos);
      actions.appendChild(inputCantidad);
      actions.appendChild(btnMas);

      body.appendChild(label);
      body.appendChild(actions);

      card.appendChild(header);
      card.appendChild(body);

      productList.appendChild(card);
    });
  }

  document.getElementById("newProductForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("newProductName");
    const nombre = input.value.trim();
    if (nombre) {
      productos.push({ nombre, cantidad: 0 });
      guardarDatos();
      renderProductos();
      input.value = "";
    }
  });

  // Service Worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(() => console.log("SW registrado"))
      .catch((err) => console.log("Error al registrar SW:", err));
  }

  renderProductos();
});
