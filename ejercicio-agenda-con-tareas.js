/*## Agenda con Tareas

  ### Tarea
  - **Propiedades**
    - id (string)
    - descripcion (string)
    - categoria (string)
    - vencimiento (Date)
    - finalizada (booleano), inicializa en `false`
  - **Constructor**
    - toma como argumentos `descripcion`, `categoria`, `vencimiento` y los asigna a sus propiedades
    - genera un `id` automático y lo asigna a su propiedad
  - **Métodos**
    - **`finalizar()`** cambia `finalizada` a `true`
    - getters para obtener los valores de todas las propiedades

  ### Agenda
  - **Propiedades**
    - tareas (array de `Tarea`), inicializa vacío
  - **Métodos**
      - **`agregar(tarea)`** agrega `tarea` a `tareas`
      - **`eliminar(id)`** elimina de `tareas` la tarea con `id`
      - **`finalizar(id)`** finaliza la `Tarea` con `id`
      - **`obtener(id)`** devuelve la tarea con `id`
      - **`obtenerTodas()`** devuelve un array con todas las tareas
      - **`filtrarActivas()`** devuelve un array de tareas que no estén finalizadas
      - **`filtrarFinalizadas()`** devuelve un array de tareas que estén finalizadas
      - **`filtrarPorCategoria(categoria)`** devuelve un array de tareas que tenga `categoria`
      - **`filtrarPorVencimiento(fecha)`** devuelve un array de tareas que tenga vencimiento en `fecha`
<br>
*/

class Tarea {
  static contadorId = 1;
  #id;
  #descripcion;
  #categoria;
  #vencimiento;
  #finalizada;

  constructor(descripcion, categoria, vencimiento) {
    this.#validarDescripcion(descripcion);
    this.#validarCategoria(categoria);
    this.#validarVencimiento(vencimiento);
    this.#descripcion = descripcion.trim().replace(/\s+/g, ' '); // Se eliminan múltiples espacios
    this.#categoria = categoria.trim().replace(/\s+/g, ' ').toLowerCase();
    this.#vencimiento = new Date(vencimiento).toISOString().split('T')[0]; // Devuelve la fecha en formato ISO (string) sin la zona horario UTC
    this.#id = Tarea.contadorId++;
    this.#finalizada = false;
  }

  #validarDescripcion(descripcion) {
    const texto = descripcion.trim(); // Eliminamos primero espacios en los extremos
    if (typeof descripcion !== 'string' || texto === '' || texto.length < 3) {
      throw new Error('La descripción debe tener al menos 3 caracteres');
    }
  }

  #validarCategoria(categoria) {
    if (typeof categoria !== 'string' || categoria.trim() === '') {
      throw new Error('Debe ingresar una categoria');
    }
  }

  #validarVencimiento(vencimiento) {
    const fecha = new Date(vencimiento); // Primero, se crea el objeto Date. Esto crea o convierte cadenas de tipo '2025-04-14' o números como Date.now() en un objeto Date.
    // Segundo, fecha instanceof Date verifica que sea una instancia válida y comprueba que esto es un objeto de tipo Date.
    // Tercero, verifica que no sea Invalid Date. Si el resultado es NaN, la fecha es inválida.
    if (!(fecha instanceof Date) || isNaN(fecha.getTime())) {
      throw new Error('Debe ingresar una fecha válida');
    }

    // // Verifica que la fecha no sea antigua
    // const hoy = new Date();
    // hoy.setHours(0, 0, 0, 0); // Eliminar hora para comparar solo fecha
  
    // if (!(fecha instanceof Date) || isNaN(fecha.getTime())) {
    //   throw new Error('Debe ingresar una fecha válida');
    // }
  
    // if (fecha < hoy) {
    //   throw new Error('La fecha de vencimiento no puede estar en el pasado');
    // }
  }

  finalizar() {
    this.#finalizada = true;
  }

  get id() {
    return this.#id;
  }

  get descripcion() {
    return this.#descripcion;
  }

  get categoria() {
    return this.#categoria;
  }

  get vencimiento() {
    return this.#vencimiento;
  }

  get finalizada() {
    return this.#finalizada;
  }

  // Implementar un buen toString() en cada clase es una práctica muy útil para debug y presentación de datos.
  toString() {
    return `Tarea ${this.id}: ${this.descripcion} (${this.categoria}) - Vence: ${this.vencimiento}`;
  }
}

// Clase agenda
class Agenda {
  #tareas;

  constructor() {
    this.#tareas = [];
  }

  #validarTarea(tarea) {
    if (!(tarea instanceof Tarea)) {
      throw new Error('Debe ingresar una instancia válida de Tarea');
    }
  }

  #validarId(id) {
    // Validamos que primero ingrese un número
    if (typeof id !== 'number') {
      throw new Error('Debe ingresar un número como id')
    }

    // Luego comprobamos que ese número exista en la lista de tareas
    const existe = this.#tareas.some(t => t.id === id);
    if (!existe) {
      throw new Error(`No se encontró ninguna tarea con el ID: ${id}`);
    }
  }

  #validarCategoria(categoria) {
    if (typeof categoria !== 'string' || categoria.trim() === '') {
      throw new Error('Debe ingresar una categoria');
    }
  }

  #validarFecha(fecha) {
    const nuevaFecha = new Date(fecha); // Primero, se crea el objeto Date. Esto crea o convierte cadenas de tipo '2025-04-14' o números como Date.now() en un objeto Date.
    // Segundo, fecha instanceof Date verifica que sea una instancia válida y comprueba que esto es un objeto de tipo Date.
    // Tercero, verifica que no sea Invalid Date. Si el resultado es NaN, la fecha es inválida.
    if (!(nuevaFecha instanceof Date) || isNaN(nuevaFecha.getTime())) {
      throw new Error('Debe ingresar una fecha válida');
    }
  }

  agregar(tarea) {
    this.#validarTarea(tarea);
    this.#tareas.push(tarea);
  }

  eliminar(id) {
    this.#validarId(id);
    const index = this.#tareas.findIndex(t => t.id === id); // Se busca el índice donde se encuentra el id
    this.#tareas.splice(index, 1); // Elimina la tarea ubicada en el índice donde se encuentra el id
  }

  finalizar(id) {
    this.#validarId(id);
    const tarea = this.#tareas.find(t => t.id === id);
    tarea.finalizar(); // Llama al método de la instancia de Tarea
  }

  obtener(id) {
    this.#validarId(id);
    return this.#tareas.find(t => t.id === id);
  }

  obtenerTodas() {
    return this.#tareas;
  }

  filtrarActivas() {
    return this.#tareas.filter(t => t.finalizada === false);
  }

  filtrarFinalizadas() {
    return this.#tareas.filter(t => t.finalizada === true);
  }

  filtrarPorCategoria(categoria) {
    this.#validarCategoria(categoria);
    return this.#tareas.filter(t => t.categoria === categoria.toLowerCase());
  }

  filtrarPorVencimiento(fecha) {
    this.#validarFecha(fecha);
    return this.#tareas.filter(t => t.vencimiento === fecha);
  }

  toString() {
    // Implementar un buen toString() en cada clase es una práctica muy útil para debug y presentación de datos.
    const salida = this.#tareas.map(t => t.toString()).join('\n') // Es decir, ${t} y ${t.toString()} son equivalentes, siempre y cuando se haya definido un método toString() en la clase Tarea.
    return `\nLa agenda tiene las siguientes tareas:\n\n${salida}`;
  }
}

// Casos de uso
let tarea1 = new Tarea('comprar torta de cumpleaños','hogar','2025-05-14');
let tarea2 = new Tarea('ir al mercado','supermercado','2025-02-26');
let tarea3 = new Tarea('programar','estudiar','2025-05-14');
let tarea4 = new Tarea('viajar a Argentina','viaje','2025-04-29');
let tarea5 = new Tarea('hacer la comida','hogar','2025-05-15');
let tarea6 = new Tarea('aprender JavaScript','estudiar','2025-05-15');
console.log(tarea1.id);
console.log(tarea1.descripcion);
console.log(tarea1.categoria);
console.log(tarea1.vencimiento); 
tarea1.finalizar();
console.log(tarea1.finalizada);

let agenda1 = new Agenda();

agenda1.agregar(tarea1);
agenda1.agregar(tarea2);
agenda1.agregar(tarea3);
agenda1.agregar(tarea4);
agenda1.agregar(tarea5);
agenda1.agregar(tarea6);
console.log(agenda1.toString());
agenda1.eliminar(2);
console.log(agenda1.toString())
agenda1.finalizar(3);
console.log(agenda1.obtener(3));
console.log(agenda1.obtenerTodas());
console.log(agenda1.filtrarActivas());
console.log(agenda1.filtrarFinalizadas());
console.log(agenda1.filtrarPorCategoria('Estudiar'));
console.log(agenda1.filtrarPorVencimiento('2025-04-29'));
console.log(agenda1.toString());