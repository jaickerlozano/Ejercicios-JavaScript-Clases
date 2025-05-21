/**## Twitter con Tweets y Usuarios

  ### Usuario
  - **Propiedades**
    - handle (string)
    - siguiendo (array de `Usuario`), inicializa vacío
  - **Constructor**
    - pide `handle` como argumento y lo agrega a su respectiva propiedad
  - **Métodos**
    - **`seguir(usuario)`** agrega `usuario` a `siguiendo`, *si no se encuentra ya en dicho array* y *si no es el propio  usuario* (no se puede seguir a sí mismo)
    - getters para obtener los valores de todas las propiedades

  ### Tweet
  - **Propiedades**
    - id (string)
    - handle (`string`)
    - texto (string)
    - likes (array de `Usuario`), inicializa en 0
    - retweets (array de `Usuario), inicializa en 0
  - **Constructor**
    - genera un `id` automático y lo asigna a su propiedad
    - pide `handle` y `texto` como argumentos y los agrega a sus respectivas propiedades
  - **Métodos**
    - getters para obtener los valores de todas las propiedades
    - **`darLike(usuario)`** agrega `usuario` a `likes`, *si ya se encuentra en dicho array, debe removerlo de mismo*
    - **`retweetear(usuario)`** agrega `usuario` a `retweets`, *si ya se encuentra en dicho array, debe removerlo de mismo*

  ### Twitter
  - **Propiedades**
    - tweets (array de `Tweet`), inicializa vacío
  - **Métodos**
    - **`twittear(tweet)`** agrega `tweet` a `tweets`, *si dicho `tweet` no se encuentra actualmente en el array*
    - **`obtenerTimeline(usuario)`** devuelve un array de tweets del `usuario`. Este array se compone de
      - todos los tweets publicados por los usuarios que sigue
      - todos los tweets likeados por los usuarios que sigue
      - todos los tweets retweeteados por los usuarios que sigue
      - no debe haber tweets repetidos
      - deben estar ordenados de más nuevos a más viejos
  - **Observaciones**
    - Es recomendable crear métodos privados para simplificar `obtenerTimeline`
*/

class Usuario {
  #handle;
  #siguiendo;

  constructor(handle) {
    this.#validarHandle(handle);
    this.#handle = handle;
    this.#siguiendo = [];
  }

  #validarHandle(handle) {
    if (typeof handle !== 'string' || handle.trim() === '') {
      throw new Error('Debe ingresar el nombre del usuario');
    }
  }

  get handle() {
    return this.#handle;
  }

  get siguiendo() {
    return this.#siguiendo;
  }

  seguir(usuario) {
    if (!(usuario instanceof Usuario)) {
      throw new Error('El usuario debe ser una instancia de Usuario');

    } else if (this.#handle === usuario.handle) {
      throw new Error('No puedes seguirte a tí mismo');
      
    } else if (this.#siguiendo.some(u => u.handle === usuario.handle)) {
      throw new Error(`Ya sigues al usuario ${usuario.handle}`);
    }

    this.#siguiendo.push(usuario);
  }

  toString() {
    return `@${this.#handle}`;
  }

  listarSeguidos() {
    return this.#siguiendo.map(usuario => usuario.handle);
  }
}

class Tweet {
  static contadorId = 1;
  #id;
  #handle;
  #texto;
  #likes;
  #retweets;

  constructor(handle, texto) {
    this.#validarHandle(handle);
    this.#validarTexto(texto);
    this.#id = Tweet.contadorId++;
    this.#handle = handle;
    this.#texto = texto;
    this.#likes = [];
    this.#retweets = [];
  }

  #validarHandle(handle) {
    if (typeof handle !== 'string' || handle.trim() === '') {
      throw new Error('Debe ingresar el nombre del usuario');
    }
  }

  #validarTexto(texto) {
    if (typeof texto !== 'string' || texto.trim() === '') {
      throw new Error('Debe ingresar un texto');
    }
  }

  #validarUsuario(usuario) {
    if (!(usuario instanceof Usuario)) {
      throw new Error('El usuario debe ser una instancia de Usuario');
    }
  }

  get id() {
    return this.#id;
  }

  get handle() {
    return this.#handle;
  }

  get texto() {
    return this.#texto;
  }

  get likes() {
    return [...this.#likes];
  }

  get retweets() {
    return [...this.#retweets];
  }

  darLike(usuario) {
    this.#validarUsuario(usuario);

    // Busca el índice cuando encuentra el usuario
    const index = this.#likes.indexOf(usuario);
    if (index === -1) { // Si no encuentra al usuario devuelve -1 y entra a este condicional y agrega el like
      this.#likes.push(usuario);
    } else { // Si lo encuentra entra en esta condición y elimina el like
      this.#likes.splice(index, 1);
    }
  }

  retweetear(usuario) {
    this.#validarUsuario(usuario);

    const index = this.#retweets.indexOf(usuario);
    if (index === -1) {
      this.#retweets.push(usuario);
    } else {
      this.#retweets.splice(index, 1);
    }

  }
}

class Twitter {
  #tweets = [];

  twittear(tweet) {
    if (!(tweet instanceof Tweet)) {
      throw new Error('El tweet debe ser una instancia de Tweet');
    }

    if (!this.#tweets.includes(tweet)) {
      this.#tweets.push(tweet);
    }
  }

  // 1) Con este método privado obtenemos los tweets publicados por los usuarios que sigue el usuario
  obtenerTweetsPublicados(usuario) {
    return this.#tweets.filter(tweet => usuario.siguiendo.some(seg => seg.handle === tweet.handle)); // Compara el usuario que publicó el tweet con el usuario que sigue en su lista siguiendo, y, si existe devuelve el tweet filtrado del array tweets
  }

  // 2) Con este método se obtiene los tweets likeados por los usuarios que sigue el usuario
  obtenerTweetsLikeados(usuario) {
    return this.#tweets.filter(tweet => tweet.likes.some(user => usuario.siguiendo.some(seg => seg.handle === user.handle))); // Compara el usuario que sigue "usuario" con el usuario que hizo el like, y, si coninciden devuelve el tweet.
  }

  // 3) Con este método se obtiene los tweets retweeteados por los usuarios que sigue el usuario
  obtenerTweetsRetweeteados(usuario) {
    return this.#tweets.filter(tweet => tweet.retweets.some(user => usuario.siguiendo.some(seg => seg.handle === user.handle))) // Compara el usuario que sigue "usuario" con el usuario que hizo el retweet, y, si coinciden devuelve el tweet.
  }

  // 👇 MÉTODO PÚBLICO para obtener el timeline
  obtenerTimeLine(usuario) {
     if (!(usuario instanceof Usuario)) {
      throw new Error('El argumento debe ser un Usuario');
    }

    // Obtener los tres tipos de tweets
    const publicados = this.obtenerTweetsPublicados(usuario);
    const likeados = this.obtenerTweetsLikeados(usuario);
    const retwitteados = this.obtenerTweetsRetweeteados(usuario);

    // Combinar y eliminar duplicados
    const timeLineSet = new Set([...publicados, ...likeados, ...retwitteados])

    // Convertir a array y ordenar
    return Array.from(timeLineSet).sort((a, b) => b.id - a.id); // Se ordenan por id de más nuevos a más viejos
  }
}

// Caso de uso
const user1 = new Usuario('Victoria');
const user2 = new Usuario('Angela');
const user3 = new Usuario('Victor');
const user4 = new Usuario('Celeste');
const user5 = new Usuario('Diego');

user1.seguir(user2);
user1.seguir(user5);

console.log(user1.listarSeguidos())

const tweet1 = new Tweet('Victoria', 'esto es una prueba');
const tweet2 = new Tweet('Diego', 'Viva Venezuela');
const tweet3 = new Tweet('Celeste', 'Me encanta programar');
const tweet4 = new Tweet('Angela', 'Tweet retwitteado');
const tweet5 = new Tweet('Victor', 'Tweet retwitteado 2');
tweet1.darLike(user2);
tweet3.darLike(user2);
console.log(tweet1.likes);

tweet4.retweetear(user3);
tweet5.retweetear(user4);
tweet1.retweetear(user2);
tweet1.retweetear(user3);

const twitter1 = new Twitter();
twitter1.twittear(tweet1);
twitter1.twittear(tweet2);
twitter1.twittear(tweet3);
twitter1.twittear(tweet4);
twitter1.twittear(tweet5);
console.log(twitter1.obtenerTimeLine(user1));