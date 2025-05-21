/* ## Librería con Libros con Autor

  ### Autor
  - **Propiedades**
    - nombre (string)
    - nacionalidad (string)
  - **Constructor**
    - pide como argumentos `nombre` y `nacionalidad` y los asigna a sus respectivas propiedades
  - **Métodos**
      - getters para obtener los valores de todas las propiedades

  ### Libro
  - **Propiedades**
    - id (string)
    - titulo (string)
    - autor (`Autor`)
    - precio (número)
    - genero (string)
    - stock (número)
  - **Constructor**
    - genera un `id` automático y lo asigna a su propiedad
    - el resto de propiedades las pide como argumentos y las asigna según corresponda
  - **Métodos**
    - **`tieneStock()`** devuelve `true` si `stock` es mayor a 0, `false` sino
    - getters para obtener los valores de todas las propiedades, menos `stock`
    - setter para modificar los valores de `precio` y `stock`
  - **Observaciones**
    - `stock` y `precio` tienen como valor mínimo 0

  ### Libreria
  - **Propiedades**
    - libros (array de `Libro), inicializa vacío
    - ganancias (número), inicializa en 0
  - **Métodos**
    - **`agregar(libro)`** agrega `libro` a `libros`
    - **`eliminar(id)`** elimina de `libros` el libro con `id`
    - **`buscarPorId(id)`** devuelve la información de un libro con `id`
    - **`buscarPorTitulo(titulo)`** devuelve la información de un libro con `titulo`
    - **`filtrarPorAutor(autor)`** devuelve un array de libros escritos por `autor`
    - **`filtrarPorGenero(genero)`** devuelve un array de libros con `genero`
    - **`comprarLibros(idLibros)`** toma un array de ids de libros, si tienen stock, reduce el stock de dichos libros en 1 y suma a ganancias el precio de cada libro comprado
    - **`obtenerGanancias`** devuelve `ganancias`
    <br>
*/

class Autor {
  #nombre;
  #nacionalidad;

  constructor(nombre, nacionalidad) {
    this.#validarNombre(nombre);
    this.#validarNacionalidad(nacionalidad);
    this.#nombre = nombre.trim().replace(/\s+/g, ' ').toLowerCase();
    this.#nacionalidad = nacionalidad.trim().toLowerCase();
  }

  #validarNombre(nombre) {
    const caracteresPermitidos = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (
      typeof nombre !== 'string' || 
      nombre.trim() === '' || 
      !caracteresPermitidos.test(nombre) // .test permite evaluar que cada caracter esté comprendido entre los caracteres permitidos
    ) { 
      throw new Error('El nombre solo debe contener letras');
    }
  }

  #validarNacionalidad(nacionalidad) {
    const caracteresPermitidos = /^[a-zA-Z]+$/;
    if (!caracteresPermitidos.test(nacionalidad)) {
      throw new Error('La nacionalidad solo debe contener letras')
    }
  }

  get nombre() {
    return this.#nombre;
  }

  get nacionalidad() {
    return this.#nacionalidad;
  }

}

class Libro {
  static contadorId = 1;
  #id;
  #titulo;
  #autor;
  #precio;
  #genero;
  #stock;

  constructor(titulo, autor, precio, genero, stock) {
    this.#validarTitulo(titulo);
    this.#validarAutor(autor);
    this.#validarPrecio(precio);
    this.#validarGenero(genero);
    this.#validarStock(stock);
    this.#id = Libro.contadorId++;
    this.#titulo = titulo.trim().replace(/\s+/g, ' ').toLowerCase();
    this.#autor = autor;
    this.#precio = precio;
    this.#genero = genero.trim().toLowerCase();
    this.#stock = stock;
  }

  #validarTitulo(titulo) {
    if (typeof titulo !== 'string' || titulo.trim() === '') {
      throw new Error('Debe ingresar el título del libro');
    }
  }

  #validarAutor(autor) {
    if (!(autor instanceof Autor)) {
      throw new Error('El autor debe ser una instancia de la clase Autor');
    }
  }
  
  #validarGenero(genero) {
    if (typeof genero !== 'string' || genero.trim() === '') {
      throw new Error('Debe ingresar el género del libro');
    }
  }

  #validarPrecio(precio) {
    if (isNaN(precio) || typeof precio !== 'number') {
      throw new Error('Debe ingresar el precio del libro');
    } else if (precio < 0) {
      throw new Error('El precio debe ser un número mayor a 0');
    }
  }

  #validarStock(stock) {
    if (isNaN(stock) || !Number.isInteger(stock) || stock < 0) {
      throw new Error('Debe ingresar un número entero como cantidad del libro a inventariar');
    }
  }

  // Getters
  get id() {
    return this.#id;
  }

  get titulo() {
    return this.#titulo;
  }

  get autor() {
    return this.#autor;
  }

  get precio() {
    return this.#precio;
  }

  get genero() {
    return this.#genero;
  }

  get stock() {
    return this.#stock;
  }

  // Setters

  set precio(newPrecio) {
    this.#validarPrecio(newPrecio);
    this.#precio = newPrecio;
  }

  set stock(newStock) {
    this.#validarStock(newStock);
    this.#stock = newStock;
  }

  tieneStock() {
    return this.#stock > 0;
  }
}

class Libreria {
  #libros;
  #ganancias;

  constructor() {
    this.#libros = [];
    this.#ganancias = 0;
  }

  #validarLibro(libro) {
    if (!(libro instanceof Libro)) {
      throw new Error('El libro debe ser una instancia de la clase Libro');
    }
  }

  #validarId(id) {
    if (isNaN(id) || id < 1 || !Number.isInteger(id)) {
      throw new Error('ID inválido');
    }

    // Con esta parte del código se verifica que exista el id 
    const existe = this.#libros.some(libro => libro.id === id);
    if (!existe) {
      throw new Error(`No se encontró ningún libro con id ${id}`);
    }
  }

  #validarTitulo(titulo) {
    if (typeof titulo !== 'string' || titulo.trim() === '') {
      throw new Error('Debe ingresar un título');
    }

    // Verifica que exista el libro
    const existe = this.#libros.some(libro => libro.titulo === titulo);
    if (!existe) {
      throw new Error(`El libro ${titulo} no se encuentra en el inventario`);
    }
  }

  #validarAutor(autor) {
    if (typeof autor !== 'string' || autor.trim() === '') {
      throw new Error('Debe ingresar el nombre del autor');
    }

    // Verifica que exista el libro
    const autorNormalizado = autor.trim().toLowerCase();
    const existe = this.#libros.some(libro => libro.autor.nombre === autorNormalizado);
    if (!existe) {
      throw new Error(`No se encontraron libros con el autor ${autor}`);
    }
  }

  #validarGenero(genero) {
    if (typeof genero !== 'string' || genero.trim() === '') {
      throw new Error('Debe ingresar el nombre del genero');
    }

    // Verifica que exista el libro
    const generoNormalizado = genero.trim().toLowerCase();
    const existe = this.#libros.some(libro => libro.genero === generoNormalizado);
    if (!existe) {
      throw new Error(`No se encontraron libros con el genero ${genero}`);
    }
  }

  agregar(libro) {
    this.#validarLibro(libro);
    this.#libros.push(libro);
  }

  eliminar(id) {
    this.#validarId(id);
    const index = this.#libros.findIndex(libro => libro.id === id);
    if (index !== -1) {
      this.#libros.splice(index, 1);
    } else {
      throw new Error(`No se encontró ningún libro con id ${id}`);
    }
  }

  #validarIdLibros(idLibros) {
    const noNumber = idLibros.some(id => typeof id !== 'number')
    if (idLibros.length === 0 || noNumber) {
      throw new Error('Debe ingresar los ids de los libros que desea comprar');
    }
  }

  buscarPorId(id) {
    this.#validarId(id);
    return this.#libros.find(l => l.id === id);
  }

  buscarPorTitulo(titulo) {
    this.#validarTitulo(titulo);
    return this.#libros.find(l => l.titulo === titulo);
  }

  filtrarPorAutor(autor) {
    this.#validarAutor(autor);
    const autorNormalizado = autor.trim().toLowerCase();
    return this.#libros.filter(libro => libro.autor.nombre === autorNormalizado);
  }

  filtrarPorGenero(genero) {
    this.#validarGenero(genero);
    const generoNormalizado = genero.trim().toLowerCase();
    return this.#libros.filter(libro => libro.genero === generoNormalizado);    
  }

  comprarLibros(idLibros) {
    this.#validarIdLibros(idLibros);
    let totalGastado = 0;

    idLibros.forEach(id => {
      const libro = this.#libros.find(libro => libro.id === id);

      if (libro && libro.tieneStock()) {
        libro.stock -= 1;
        totalGastado += libro.precio;
      }
    });

    this.#ganancias += totalGastado;
    return `Compra realizada. Total gastado: $${totalGastado.toFixed(2)}`;
  }

  obtenerGanancias() {
    return this.#ganancias;
  }
}

// Caso de uso
const autor1 = new Autor('Gabriel García Márquez', 'Francesa');
const autor2 = new Autor('Lydia Vázquez', 'Colombiana');
const autor3 = new Autor('Gabriel García Márquez', 'Polonia');
const autor4 = new Autor('Gabriel García Márquez', 'Polonia');

const libro1 = new Libro('cien años de soledad', autor1, 24.90, 'drama', 20);
const libro2 = new Libro('Mañana y Tarde', autor2, 22.30, 'drama', 15);
const libro3 = new Libro('Paraiso', autor3, 24.90, 'comedia', 15);
const libro4 = new Libro('Paraiso', autor3, 24.90, 'comedia', 15);

const libreria1 = new Libreria();

console.log(autor1.nombre);
console.log(libro1.autor);
libro1.precio = 50
console.log(libro1.precio);
console.log(libro1.tieneStock());
console.log(libro1);

// Caso de uso librería
libreria1.agregar(libro1);
libreria1.agregar(libro2);
libreria1.agregar(libro3);
console.log(libreria1);
libreria1.eliminar(2);
console.log(libreria1);
console.log(libreria1.buscarPorId(1));
console.log(libreria1.filtrarPorAutor('Gabriel García Márquez'));
console.log(libreria1.filtrarPorGenero('comedia'));

let carritoIdDeLibros = [2, 6, 1, 3, 4];
console.log(libreria1.comprarLibros(carritoIdDeLibros));
console.log(libreria1.obtenerGanancias());