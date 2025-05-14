/*## Celular

  - **Propiedades**
    - contactos (array de objetos), inicializa vacío
    - llamadas (array de strings), inicializa vacío
  - **Métodos**
    - **`agregarContacto(contacto)`** agrega `contacto` a `contactos`
    - **`buscarPorNombre(nombre)`** devuelve el contacto con dicho nombre en el array `contactos` o `undefined` si no lo encuentra
    - **`buscarPorNumero(numero)`** devuelve el contacto con dicho número en el array `contactos` o `undefined` si no lo encuentra
    - **`eliminarContacto(nombre)`**` elimina el contacto con nombre `nombre` de `contactos`
    - **`llamar(nombre)`** si existe un contacto con nombre `nombre` en la lista `contactos`, agrega a `llamadas` un string que representa un registro de la misma, usando la plantilla `Llamada a ${nombre} con número ${numero} realizada
    - **`verContactos()`** devuelve un string listando todos los contactos, con sus nombres y números
    - **`verHistorial()`** devuelve un string con la lista de llamadas realizadas
  - **Observaciones**
    - `contacto` es un objeto con las propiedades `nombre` y `numero`
    - no se puede agregar un contacto si ya existe en el celular alguno con el mismo nombre o número
<br>*/

class Celular {
  #contactos;
  #llamadas;
  #mensajes;

  constructor() {
    this.#contactos = [];
    this.#llamadas = [];
    this.#mensajes = [];
  }

  // Valida que el contacto no se repita
  #validarContacto(contacto) {
    const existe = this.#contactos.some(c => c.nombre === contacto.nombre || c.numero === contacto.numero);
    if (existe) {
      throw new Error('Ya existe un contacto con ese nombre o número');
    }
  }

  // Valida que el nombre sea de tipo string y no sea una entrada vacía
  #validarNombre(nombre) {
    if (typeof nombre !== 'string' || nombre.trim() === '') {
      throw new Error('Debe ingresar un nombre');
    }
  }

  // Valida que la entrada sea un número
  #validarNumero(numero) {
    if (isNaN(numero) || !Number.isInteger(numero)) {
      throw new Error('Debe ingresar un número telefónico');
    }
  }

  #validarMensaje(mensaje) {
    if (typeof mensaje !== 'string' || mensaje.trim() === '') {
      throw new Error('Debe ingresar un mensaje');
    }
  }

  agregarContacto(contacto) {
    this.#validarContacto(contacto);
    this.#contactos.push(contacto);
  }

  buscarPorNombre(nombre) {
    this.#validarNombre(nombre);
    return this.#contactos.find(contacto => contacto.nombre.toLowerCase() === nombre.toLowerCase());
  }

  buscarPorNumero(numero) {
    this.#validarNumero(numero);
    return this.#contactos.find(contacto => contacto.numero === numero);
  }

  eliminarContacto(nombre) {
    this.#validarNombre(nombre);
    const indice = this.#contactos.findIndex(contacto => contacto.nombre.toLowerCase() === nombre.toLowerCase());
    // Verifica primero si el contacto existe o no antes de eliminar
    if (indice === -1) {
      throw new Error(`No se encontró el contacto con nombre "${nombre}"`);
    }
    this.#contactos.splice(indice, 1);
  }

  llamar(nombre) {
    const contacto = this.#contactos.find(contacto => contacto.nombre.toLowerCase() === nombre.toLowerCase())
    if (contacto) {
      this.#llamadas.push(`Llamada a ${contacto.nombre} con número ${contacto.numero} realizada`);
    }
  }

  verContactos() {
    let salida = '';
    this.#contactos.forEach(contacto => salida += `Nombre: ${contacto.nombre}, Número: ${contacto.numero}\n`);
    return salida;
  }

  verHistorial() {
    let salida = '';
    this.#llamadas.forEach(llamada => salida += `${llamada}\n`);
    return salida;
  }

  toString() {
  let salida = `📱 CONTACTOS:\n${this.verContactos()}`;
  salida += `\n📞 LLAMADAS:\n${this.verHistorial()}`;
  salida += `\n⭐ FAVORITOS:\n${this.verFavoritos()}`;
  salida += `\n📩 MENSAJES:\n${this.verMensajes()}`;
  return salida;
  }

  // Desafío avanzado. Celular con mensaje y favoritos.

  enviarMensaje (nombre, mensaje) {
    // Validar nombre y mensaje
    this.#validarNombre(nombre);
    this.#validarMensaje(mensaje);
    // Verificar si el contacto existe
    const contacto = this.#contactos.find(contacto => contacto.nombre.toLowerCase() === nombre.toLowerCase());
    if (!contacto) {
      throw new Error(`No se encontró el contacto con nombre "${nombre}"`);
    }
    this.#mensajes.push(`Mensaje a ${contacto.nombre} (${contacto.numero}): "${mensaje}"`)
  }

  verMensajes() {
    let salida = ``;
    salida += this.#mensajes.join('\n');
    return salida;
  }

  marcarFavorito(nombre) {
    this.#validarNombre(nombre);
    const indice = this.#contactos.findIndex(contacto => contacto.nombre.toLowerCase() === nombre.toLowerCase());
    if (indice === -1) {
      throw new Error(`No se encontró el contacto con nombre "${nombre}"`);
    }
    if (this.#contactos[indice].favorito) return; // ya es favorito
    this.#contactos[indice]['favorito'] = true;
  }

  verFavoritos() {
    let favoritos = '';
    this.#contactos.forEach(contacto => {
      if (contacto.favorito) {
        favoritos += `⭐ ${contacto.nombre} - ${contacto.numero}\n`;
      }
    });
    return favoritos;
  }

  limpiarHistorialLlamadas() {
    this.#llamadas.splice(0);
  }

  limpiarHistorialMensajes() {
    this.#mensajes.splice(0);
  }
}

let cel = new Celular();
const contacto1 = {nombre: 'Pedro', numero: 444555666, favorito: false};
const contacto2 = {nombre: 'Carlos', numero: 111222333, favorito: false};
const contacto3 = {nombre: 'María', numero: 777888999, favorito: false};
const contacto4 = {nombre: 'José', numero: 111555999, favorito: false};
const contacto5 = {nombre: 'Carla', numero: 777555333, favorito: false};
const mensaje1 = `Hola Carla, esto es una prueba`;
const mensaje2 = `Este es un segundo mensaje de prueba`;

cel.agregarContacto(contacto1);
cel.agregarContacto(contacto2);
cel.agregarContacto(contacto3);
// cel.agregarContacto(contacto4);
cel.agregarContacto(contacto4);
cel.agregarContacto(contacto5);
console.log(cel);
console.log(cel.buscarPorNombre('carlos'));
console.log(cel.buscarPorNumero(777555333));
cel.eliminarContacto('carlos');
cel.llamar('Pedro');
cel.llamar('maría');
cel.llamar('carla');
console.log(cel);
console.log(cel.verContactos());
console.log(cel.verHistorial());
console.log(cel.toString());
// Enviando mensaje
cel.enviarMensaje('Carla', mensaje1);
cel.enviarMensaje('josé', mensaje2);
cel.marcarFavorito('Carla');
cel.marcarFavorito('pedro');
console.log(cel)
console.log(cel.toString());
console.log(cel.verFavoritos());
cel.limpiarHistorialLlamadas();
console.log(cel);
cel.limpiarHistorialMensajes();
console.log(cel);
console.log(cel.verMensajes());