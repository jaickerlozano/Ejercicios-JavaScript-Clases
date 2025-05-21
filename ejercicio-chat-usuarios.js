/**## Chat con Usuarios y Mensajes

  ### Usuario
  - **Propiedades**
    - id (string)
    - nombre (string)
  - **Constructor**
    - genera un `id` automático y lo asigna a su propiedad
    - el resto de propiedades las pide como argumentos y las asigna según corresponda
  - **Métodos**
    - getters para obtener los valores de todas las propiedades

  ### Mensaje
  - **Propiedades**
    - remitente (Usuario)
    - destinatario (Usuario)
    - texto (string)
    - fecha (Date), inicializa con la fecha actual (`new Date()`)
  - **Constructor**
    - pide las propiedades no inicializadas como argumentos y las asigna según corresponda
  - **Métodos**
    - getters para obtener los valores de todas las propiedades

  ### Chat
  - **Propiedades**
    - usuario (`Usuario`)
    - contactos (array de `Usuario`), inicializa vacío
    - mensajes (array de `Mensaje`), inicializa vacío
  - **Constructor**
    - pide `usuario` como argumento y lo agrega a su respectiva propiedad
  - **Métodos**
    - **`agregarContacto(usuario)`** agregar `usuario` a `contactos`
    - **`obtenerContactos()`** devuelve un array con la lista de `contactos`
    - **`obtenerMensaje()`** devuelve un array con la lista de `mensajes`
    - **`filtrarPorContacto(id)`** devuelve un array con la lista de `mensajes` que tienen como `destinatario` un usuario con `id`
    - **`filtrarPorFecha(fecha)`** devuelve un array con la lista de `mensajes` que tienen `fecha` (mismo día, mes y año)
    - **`mandarMensaje(mensaje)`** agrega `mensaje` a `mensajes`, si `destinatario` es un usuario de la lista de contactos con y si `mensaje` no se encuentra ya en el array de `mensajes`
  - **Observaciones**
    - solo se pueden mandar mensajes a usuarios de la lista de `contactos`. En caso contrario, arrojar un error.
    <br> 
*/

class Usuario {
  static contadorId = 1;
  #id;
  #nombre;

  constructor(nombre) {
    this.#id = Usuario.contadorId++;
    this.#nombre = this.#validarNombre(nombre);
  }

  #validarNombre(nombre) {
    if (typeof nombre !== 'string' || nombre.trim() === '') {
      throw new Error('Debe Ingresar un nombre');
    }

    return nombre.trim().replace(/\s+/g, ' ').toLowerCase();
  }

  get id() {
    return this.#id;
  }

  get nombre() {
    return this.#nombre;
  }

  toString() {
    return `ID: ${this.id} - Usuario: ${this.#nombre}`;
  }
}

class Mensaje {
  #remitente;
  #destinatario;
  #texto;
  #fecha;

  constructor(remitente, destinatario, texto) {
    this.#validarRemitente(remitente);
    this.#validarDestinatario(destinatario);
    this.#validarTexto(texto);
    this.#remitente = remitente;
    this.#destinatario = destinatario;
    this.#texto = texto;
    this.#fecha = new Date().toISOString().split('T')[0];
  }

  #validarRemitente(remitente) {
    if (!(remitente instanceof Usuario)) {
      throw new Error('Debe ingresar un remitente como instancia de la clase Usuario');
    }
  }

  #validarDestinatario(destinatario) {
    if (!(destinatario instanceof Usuario)) {
      throw new Error('Debe ingresar un destinatario como instancia de la clase Usuario');
    }
  }

  #validarTexto(texto) {
    if (typeof texto !== 'string' || texto === null) {
      throw new Error('Debe ingresar un mensaje');
    }
  }

  get remitente() {
    return this.#remitente;
  }

  get destinatario() {
    return this.#destinatario;
  }

  get texto() {
    return this.#texto;
  }

  get fecha() {
    return this.#fecha;
  }

  toString() {
    return `[${this.fecha}] ${this.remitente.nombre} → ${this.destinatario.nombre}: ${this.texto}`;
  }
}

class Chat {
  #usuario;
  #contactos;
  #mensajes;

  constructor(usuario) {
    this.#validarUsuario(usuario);
    this.#usuario = usuario;
    this.#contactos = [];
    this.#mensajes = [];
  }

  #validarUsuario(usuario) {
    if (!(usuario instanceof Usuario)) {
      throw new Error('Debe ingresar un usuario como instancia de la clase Usuario');
    }
  }

  #validarId(id) {
    if (isNaN(id) || !Number.isInteger(id) || id < 1) {
      throw new Error('ID inválido')
    }

    const existe = this.#contactos.some(contacto => contacto.id === id);
    if (!existe) {
      throw new Error(`No se encontró ningún contacto con ID ${id}`);
    }
  }

  #validarFecha(fecha) {
    if (typeof fecha !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      throw new Error('La fecha debe estar en formato YYYY-MM-DD');
    }

    const fechaValida = new Date(fecha);

    if (isNaN(fechaValida.getTime())) {
      throw new Error('Debe ingresar una fecha válida');
    }

    return fechaValida;
  }

  agregarContacto(usuario) {
    if(!(usuario instanceof Usuario)) {
      throw new Error('El contacto debe ser una instancia de Usuario');
    }

    const yaExiste = this.#contactos.some(contacto => contacto.id === usuario.id);
    if(yaExiste) {
      throw new Error('El usuario ya está en la lista de contactos');
    }

    if (this.#usuario === usuario) {
      throw new Error('No te puedes agregar a ti mismo como contacto');
    }

    this.#contactos.push(usuario);
  }

  obtenerContactos() {
    return this.#contactos;
  }

  obtenerMensajes() {
    return this.#mensajes;
  }

  filtrarPorContacto(id) {
    this.#validarId(id);
    return this.#mensajes.filter(mensaje => mensaje.destinatario.id === id); 
  }

  filtrarPorFecha(fecha) {
    this.#validarFecha(fecha);
    return this.#mensajes.filter(mensaje => mensaje.fecha === fecha);
  }

  mandarMensaje(mensaje) {
    if (!(mensaje instanceof Mensaje)) {
      throw new Error('Debe ingresar una instancia válida de Mensaje');
    }

    const contactoExiste = this.#contactos.some(contacto => contacto.id === mensaje.destinatario.id);

    if (!contactoExiste) {
      throw new Error('El destinatario no se encuentra en la lista de contactos');
    }

    const mensajeYaExiste = this.#mensajes.some(m => 
      m.remitente.id === mensaje.remitente.id &&
      m.destinatario.id === mensaje.destinatario.id &&
      m.texto === mensaje.texto &&
      m.fecha === mensaje.fecha
    );

    if (mensajeYaExiste) {
      throw new Error('Este mensaje ya fue enviado anteriormente');
    }

    this.#mensajes.push(mensaje);
  }

  toString() {
    const salida = this.#contactos.map(c => `- ${c.nombre}`).join('\n')
    return `
    ${this.#usuario.toString()}
    Contactos de ${this.#usuario.nombre}:\n${salida}`
  }
}

// Caso de uso
// Usuarios
const usuario1 = new Usuario('Carlos');
const usuario2 = new Usuario('Pepito');
const usuario3 = new Usuario('Maria');
const usuario4 = new Usuario('Pepa');

// Mensajes
const mensaje1 = new Mensaje(usuario1, usuario2, 'Hola Pepito, ¿Cómo estás?');
const mensaje2 = new Mensaje(usuario1, usuario3, 'María, recuerda que mañana vamos de compras');
const mensaje3 = new Mensaje(usuario1, usuario4, 'Pepa, ¿Vamos al gym?');
const mensaje4 = new Mensaje(usuario1, usuario2, 'Pepito, Apúrate que debemos llegar a tiempo');

// Chat
const chat1 = new Chat(usuario1);

chat1.agregarContacto(usuario2);
chat1.agregarContacto(usuario3);
chat1.agregarContacto(usuario4);
console.log(chat1.obtenerContactos());
chat1.mandarMensaje(mensaje1);
chat1.mandarMensaje(mensaje2);
// chat1.mandarMensaje(mensaje3); // Ejemplo de uso donde no se encuentra el destinatario en la lista de contactos
// chat1.mandarMensaje(mensaje2);

console.log(chat1.obtenerMensajes());

chat1.mandarMensaje(mensaje4);
console.log(chat1.filtrarPorFecha('2025-05-19'));
console.log(chat1.toString());