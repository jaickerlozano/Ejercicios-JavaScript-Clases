/* ## Calculadora
- **Propiedades**
  - `resultado` (número), inicializa en 0
- **Métodos**
  - **`sumar(numero)`**: suma *numero* a `resultado`, y actualiza `resultado` con el valor de dicha operación
  - **`restar(numero)`**: suma *numero* a `resultado`, y actualiza `resultado` con el valor de dicha operación
  - **`multiplicar(numero)`**: suma *numero* a `resultado`, y actualiza `resultado` con el valor de dicha operación
  - **`dividir(numero)`**: divide *resultado* por `numero`, y actualiza `resultado` con el valor de dicha operación
  - **`obtenerResultado()`**: devuelve `resultado`
  - **`reiniciar()`**: pone resultado en 0
- **Observaciones**
  - arrojar un error cuando el argumento ingresado no sea un número, con `Number.isFinite()`
  - arrojar un error cuando se intenta dividir por 0*/
console.log('Ejercicio Calculadora');

class Calculadora {
  #resultado;

  constructor() {
    this.#resultado = 0;
  }

  obtenerResultado() {
    return this.#resultado;
  }

  reiniciar() {
    this.#resultado = 0;
  }

  #validarNumero(numero) {
    if (!Number.isFinite(numero)) {
      throw new Error('No se ha introducido un número válido');
    }
  }

  sumar(numero) {
    try {
      this.#validarNumero(numero);
      this.#resultado += numero
    } catch (err) {
      console.error(err.message);
    }
  }

  restar(numero) {
    try {
      this.#validarNumero(numero);
      this.#resultado -= numero
    } catch (err) {
      console.error(err.message);
    }
  }

  multiplicar(numero) {
    try {
      this.#validarNumero(numero);
      this.#resultado *= numero
    } catch (err) {
      console.error(err.message);
    }
  }

  dividir(numero) {
    try {
      this.#validarNumero(numero);
      if (numero === 0) {
        throw new Error('No se puede dividir entre 0');
      }
        this.#resultado /= numero;
    } catch (err) {
      console.error(err.message);
    }
  }

}

let calc = new Calculadora();
calc.sumar(10);
calc.sumar(15);
console.log(calc.obtenerResultado());
calc.restar(5);
console.log(calc.obtenerResultado());
calc.multiplicar(2);
console.log(calc.obtenerResultado());
calc.dividir(2);
console.log(calc.obtenerResultado());


