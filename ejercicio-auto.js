/*## Auto
  - **Propiedades**
    - `encendido` (booleano), inicializa en `false`
    - `velocidad` (número), inicializa en 0
    - `marca` (string)
    - `modelo` (número)
    - `patente` (string)
  - **Constructor**
    - pide como argumentos `marca`, `modelo`, `patente` y los asigna a sus respectivas propiedades
  - **Métodos**
    - **`arrancar()`** pone `encendido` en `true`
    - **`apagar()`** pone `encendido` en `false`
    - **`acelerar()`** suma 10 a `velocidad` y actualiza dicha propiedad
    - **`desacelerar()`** resta 10 a `velocidad` y actualiza dicha propiedad
    - **`toString()`** devuelve un *string* con la siguiente plantilla `${marca} ${modelo}, patente ${patente}`
  - **Observaciones**
    - sólo se puede acelerar o desacelerar si el auto se encuentra prendido
    - sólo se puede apagar el auto si la velocidad es 0
    - la velocidad mínima es 0*/

class Auto {
    #encendido;
    #velocidad;
    #marca;
    #modelo;
    #patente;

    constructor(marca, modelo, patente) {
        this.#marca = marca;
        this.#modelo = modelo;
        this.#patente = patente;
        this.#encendido = false;
        this.#velocidad = 0;
    }

    #validarEncendido() {
        if (!this.#encendido) {
            throw new Error ("El auto se encuentra apagado");
        }
    }

    #validarApagado() {
        if (this.#velocidad !== 0) {
            throw new Error ("El auto debe estar totalmente detenido para poder apagarse");
        }
    }

    arrancar() {
        this.#encendido = true;
    }

    apagar() {
        try {
            this.#validarApagado(this.#velocidad);
            this.#encendido = false;
        } catch(err) {
            console.error(err.message);
        }
    }

    acelerar() {
        try {
            this.#validarEncendido(this.#encendido);
            this.#velocidad += 10;
        } catch(err) {
            console.error(err.message);
        }
    }

    desacelerar() {
        try {
            this.#validarEncendido(this.#encendido);
            if (this.#velocidad <= 10) {
                this.#velocidad = 0;
            } else if (this.#velocidad > 10) {
                this.#velocidad -= 10;
            }
        } catch(err) {
            console.error(err.message);
        }
    }

    toString() {
        return `${this.#marca} ${this.#modelo}, patente ${this.#patente}`;
    }

    estado() {
        return {
            encendido: this.#encendido,
            velocidad: this.#velocidad,
            marca: this.#marca,
            modelo: this.#modelo,
            patente: this.#patente
        };
    }
}

let carro = new Auto('Toyota', 'Corolla', 45);
console.log(carro.toString());

console.log(carro);
carro.acelerar();
console.log(carro);
carro.arrancar()
console.log(carro);
carro.acelerar();
console.log(carro.estado()); // Con este método no expongo al objeto completo
console.log(carro);
carro.apagar();
console.log(carro);
carro.desacelerar();
console.log(carro);
console.log(carro.estado());