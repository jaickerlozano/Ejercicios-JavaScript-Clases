/* ## Carrito con Producto

  ### Producto
  - **Propiedades**
    - id (string)
    - nombre (string)
    - precio (número)
    - cantidad (número)
    - tieneImpuesto (booleano)
  - **Constructor**
    - toma como argumentos `nombre`, `precio`, `cantidad` y `tieneImpuesto` y los asigna a sus respectivas propiedades
    - genera un `id` automático y lo asigna a su propiedad
  - **Métodos**
    - getters para obteners los valores de todas las propiedades
    - setter para modificar el valor de `cantidad`
  - **Observaciones**
    - la cantidad nunca puede ser 0
    - el precio no puede ser menor a 0
  
    ### Carrito
  - **Propiedades**
    - productos (array de `Producto`), inicializa vacío
  - **Métodos**
    - **`agregarProducto(producto)`** agrega `producto` a `productos
    - **`actualizarCantidadProducto(id, cantidad)`** actualiza la `cantidad` del producto en `productos` con `id`
    - **`eliminarProducto(id)`** elimina de `productos` el producto con `id`
    - **`calcularTotal()`** devuelve el total del carrito (con impuestos incluidos)
    - **`calcularImpuestoTotal()`** devuelve el total de la suma de los impuestos de cada producto que `tieneImpuesto`
    - **`obtenerCantidadTotal()`** devuelve la cantidad total de ítems en el producto
    - **`toString()`** devuelve un string con
      - la lista de productos, detallando nombre, precio por unidad y cantidad
      - subtotal de todos los productos sin sumar impuesto
      - subtotal de todos los impuestos sumados
      - total final (suma de los subtotales)
  - **Observaciones**
    - el impuesto es del 10% sobre el precio del producto
    <br>
*/ 

// let contadorId = 1; // Opción 1 dejando el contador fuera de la clase

// Clase producto
class Producto {
  static contadorId = 1;
  #id;
  #nombre;
  #precio;
  #cantidad;
  #tieneImpuesto;

  constructor(nombre, precio, cantidad, tieneImpuesto) {
    this.#validarCantidad(cantidad);
    this.#validarPrecio(precio);
    this.#validarNombre(nombre);
    this.#validarTieneImpuesto(tieneImpuesto);
    //this.#id = contadorId++; // Opción 1 Genera id único automáticamente. Esta es recomendable si sólo hay una clase producto
    this.#id = Producto.contadorId++; // <--- Aumenta por cada instancia. Más ordenada y encapsulada. Usarla Si estás trabajando con muchas clases o estructuras más grandes. En este caso la vamos a utilizar.
    this.#nombre = nombre;
    this.#precio = precio;
    this.#cantidad = cantidad;
    this.#tieneImpuesto = tieneImpuesto;
  }

  #validarTieneImpuesto(tieneImpuesto) {
    if (typeof tieneImpuesto !== 'boolean') {
      throw new Error('Debe ingresar un valor booleano');
    }
  }

  #validarNombre(nombre) {
    if (typeof nombre !== 'string' || nombre.trim() === '') {
      throw new Error('Debe ingresar un nombre válido para el producto');
    }
  }

  #validarCantidad(cantidad) {
    if (isNaN(cantidad) || !Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error('Debe ingresar una cantidad válida mayor a 0')
    }
  }

  #validarPrecio(precio) {
    if (isNaN(precio) || precio < 0) {
      throw new Error('Ingrese un precio válido mayor o igual a 0')
    }
  }

  // GETTERS individuales
  get id() {
    return this.#id;
  }

  get nombre() {
    return this.#nombre;
  }

  get precio() {
    return this.#precio;
  }

  get cantidad() {
    return this.#cantidad;
  }

  get tieneImpuesto() {
    return this.#tieneImpuesto;
  }

  // SETTER para cantidad
  set cantidad(newCantidad) {
    this.#validarCantidad(newCantidad);
    this.#cantidad = newCantidad;
  }
}

// Clase Carrito

class Carrito {
  #productos;

  constructor() {
    this.#productos = [];
  }

  #validarProducto(producto) {
    if (producto === undefined || producto === null) {
      throw new Error('Debe ingresar un producto');
    }

    if (typeof producto !== 'object' || Array.isArray(producto)) {
      throw new Error('La operación debe ser un objeto');
    }
  }

  #validarNuevaCantidad(cantidad) {
    if (isNaN(cantidad) || !Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error('Debe ingresar una cantidad válida mayor a 0')
    }
  }

  // Valida existencia del id
  #validarId(id) {
    const existe = this.#productos.some(producto => producto.id === id);
    if (!existe) {
      throw new Error('El ID no existe en el carrito.');
    }
  }

  agregarProducto(producto) {
    this.#validarProducto(producto);

    // Validar si el id ya existe para no duplicarlo
    if (this.#productos.some(p => p.id === producto.id)) {
      throw new Error('El producto ya está en el carrito.');
    }

    this.#productos.push(producto);
  }

  actualizarCantidadProducto(id, cantidad) {
    this.#validarNuevaCantidad(cantidad);
    this.#validarId(id);
    
    const producto = this.#productos.find(prod => prod.id === id);
  
    if (producto) {
      producto.cantidad = cantidad;
      return producto;
    }
  
    throw new Error('Producto no encontrado');
  }

  eliminarProducto(id) {
    this.#validarId(id);
    const index = this.#productos.findIndex(prod => prod.id === id);
    this.#productos.splice(index, 1);
  }

  calcularTotal() {
    const totalDelCarrito = this.#productos.reduce((acc, prod) => {
      const precioUnitario = prod.tieneImpuesto ? prod.precio * 1.1 : prod.precio;
      return acc + (precioUnitario * prod.cantidad);
    }, 0);
  
    return totalDelCarrito.toFixed(2); // Retorna con 2 decimales
  }

  calcularImpuestoTotal() {
    const totalImpuesto = this.#productos.reduce((acc, prod) => acc + (prod.tieneImpuesto ? prod.precio * 0.1 * prod.cantidad : 0), 0);

    return totalImpuesto.toFixed(2);
  }

  obtenerCantidadTotal() {
    const cantidadTotal = this.#productos.reduce((acc, prod) => acc + prod.cantidad, 0);

    return cantidadTotal;
  }

  toString() {
    let listaDeProductos = '\nLista de productos:\n';
    this.#productos.forEach(prod => listaDeProductos += `Nombre: ${prod.nombre} - Precio: ${prod.precio} - Cantidad: ${prod.cantidad}\n`);

    let subTotalProductos = this.#productos.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    let subtotalImpuestos = this.#productos.reduce((acc, prod) => acc + (prod.tieneImpuesto ? prod.precio * 0.1 * prod.cantidad : 0),0);
    let total = subTotalProductos + subtotalImpuestos;

    return (
      listaDeProductos + 
      `Subtotal de productos: ${subTotalProductos}\n` + 
      `Subtotal impuestos: ${subtotalImpuestos.toFixed(2)}\n` + 
      `Total: ${total.toFixed(2)}`);
  }

}


const producto1 = new Producto('Arroz', 15.60, 2, false);
const producto2 = new Producto('Pasta', 18, 1, true);
const producto3 = new Producto('Caraotas', 25.50, 1, true);
const producto4 = new Producto('Pan', 2.65, 2, false);
const producto5 = new Producto('Carne', 20.15, 2, true);
const producto6 = new Producto('Pollo', 12.30, 5, false);

// Caso de uso
console.log(producto1.id);
console.log(producto1.nombre);
console.log(producto1.precio);
console.log(producto1.cantidad);
console.log(producto1.tieneImpuesto);

// Cambiar cantidad
producto1.cantidad = 1;
console.log('Nueva cantidad:', producto1.cantidad);

const carrito1 = new Carrito();
carrito1.agregarProducto(producto1);
carrito1.agregarProducto(producto2);
carrito1.agregarProducto(producto3);
carrito1.agregarProducto(producto4);
carrito1.agregarProducto(producto5);
carrito1.agregarProducto(producto6);

console.log(carrito1);
console.log(carrito1.actualizarCantidadProducto(producto5.id, 1));
console.log(carrito1);
carrito1.eliminarProducto(4);
console.log(carrito1);
console.log(carrito1.calcularTotal());
console.log(carrito1.calcularImpuestoTotal());
console.log(carrito1.obtenerCantidadTotal());
console.log(carrito1.toString());