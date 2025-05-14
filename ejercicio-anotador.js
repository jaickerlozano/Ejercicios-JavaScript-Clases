/*## Anotador
  - **Propiedades**
    - `titulo` (string)
    - `notas` (array de strings), inicializa vacío
  - **Constructor**
    - pide como argumento `titulo` y lo asigna a sus respectiva propiedad
  - **Método**
    - **`agregarNota(nota)`** agrega `nota` al array de `notas`
    - **`actualizarNota(id, nota)`** actualiza el ítem con índice `id`, reemplazándolo por `nota`
    - **`obtenerNota(id)`** devuelve el ítem del array `notas` con índice `id`
    - **`eliminarNota(id)`** elimina de `notas` el ítem con índice `id`
    - **`eliminarNotas()`** borra todos los ítems de `notas`
    - **`listarNotas()`** devuelve un string con todas las notas y sus respectivos ids, por ejemplo
    <br>

```
Cosas para hacer
------------------------
1. Ir al súper
2. Ver serie
3. Programar
4. Leer libro
```*/
console.log('Anotador')

class Anotador {
  #titulo;
  #notas;

  constructor(titulo) {

    if (typeof titulo !== 'string' || titulo.trim() === '') { // Valido que la entrada no sea nula o indefinida
      throw new Error('Debe ingresar un título');
    }

    this.#titulo = titulo;
    this.#notas = [];
  }

  #validarId(id) {
    if (isNaN(id) || !Number.isInteger(id)) {
      throw new Error(`Debe ingresar un número entero`);

    } else if (id < 1 || id > this.#notas.length) {
      throw new Error(`El número id no existe. Intente nuevamente.`);
    }
  }

  #validarNota(nota) {
    if (typeof nota !== 'string' || nota.trim() === '') {
      throw new Error(`Debe ingresar una nota`);
    }
  }

  agregarNota(nota) {
    this.#validarNota(nota);
    // No es necesario un else con throw
    this.#notas.push(nota.trim().replace(/\s+/g, ' ')); // El método replace me ayuda a eliminar espacios múltiples
  }

  actualizarNota(id, nota) {
    this.#validarId(id);
    this.#validarNota(nota);
    this.#notas[id-1] = nota;
  }

  obtenerNota(id) {
    this.#validarId(id);    
    return `${id}. ${this.#notas[id-1]}`; // Como buena práctica es mejor devolver el string y se imprime afuera

  }

  eliminarNota(id) {
    this.#validarId(id);
    this.#notas.splice(id-1,1);
  }

  eliminarNotas() {
    this.#notas.splice(0);
  }

  listarNotas() {
    let salida = `\n${this.#titulo}\n-----------------------\n`;
    this.#notas.forEach((nota, i) => salida += `${i+1}. ${nota}\n`)
    return salida;
  }

  toString() {
    return this.listarNotas();
  }

  get cantidadNotas() {
    return this.#notas.length;
  }

}

let blogDeNotas1 = new Anotador('Cosas para hacer');
console.log(blogDeNotas1)

blogDeNotas1.agregarNota('Ir al   super');
blogDeNotas1.agregarNota('Ver serie');
blogDeNotas1.agregarNota('Jugar play');
blogDeNotas1.agregarNota('Programar');
blogDeNotas1.agregarNota('Leer libro');
console.log(`${blogDeNotas1}`);
blogDeNotas1.cantidadNotas();
// console.log(blogDeNotas1.listarNotas());
// blogDeNotas1.actualizarNota(3, 'Probando un programa nuevo')
// console.log(blogDeNotas1.listarNotas());
// console.log(blogDeNotas1.obtenerNota(1));
// blogDeNotas1.eliminarNota(3);
// console.log(blogDeNotas1.listarNotas());
// blogDeNotas1.eliminarNotas();
// console.log(blogDeNotas1.listarNotas());

// console.log(blogDeNotas1.toString());