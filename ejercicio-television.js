/*## Televisor
- **Propiedades**
- `encendido` (booleano), inicializa en `false`
- `canal` (número), inicializa en 0
- `canales` (número)
- `volumen` (número), inicializa en 0
- `marca` (string)
- **Constructor**
- pide como argumentos `marca` y `canales` y los asigna a sus respectivas propiedades
- **Métodos**
- **`prender()`** pone `encendido` en `true`
- **`apagar()`** pone `encendido` en `false`
- **`verCanalSiguiente()`** suma 1 a `canal` y actualiza dicha propiedad
- **`verCanalAnterior()`** resta 1 a `canal` y actualiza dicha propiedad
- **`cambiarCanal(canal)`** actualiza la propiedad `canal` con el valor del parámetro `canal`
- **`subirVolumen()`** suma 1 a `volumen` y actualiza dicha propiedad
- **`bajarVolumen()`** resta 1 a `volumen` y actualiza dicha propiedad
- **`toString()`** devuelve un *string* como el siguiente ejemplo:
Televisor Samsung
- Canales: 100
- Canal actual: 23
- Volumen actual: 34
```
- **Observaciones**
- solo se puede modificar el canal y el volumen si el televisor se encuentra prendido
- `canales` representa el máximo de canales posibles. Si se está en el canal máximo o mínimo (0), y se avanza o retrocede, debe dar toda la vuelta. P. ej.: si el canal máximo es 100, se está en el canal 100, y se avanza de canal, debe volver al 0
- solo se puede cambiar a un canal que exista
- el volumen mínimo es 0 y el máximo 100*/

class Televisor {
    #encendido;
    #canal;
    #canales;
    #volumen;
    #marca;

    constructor(marca, canales) {

        if (typeof canales !== 'number' || canales <= 0 || !Number.isInteger(canales)) {
            throw new Error('La cantidad de canales debe ser un número entero positivo mayor que cero');
        }

        this.#marca = marca;
        this.#canales = canales;
        this.#encendido = false;
        this.#canal = 0;
        this.#volumen = 0;
    }
    
    prender() {
        this.#encendido = true;
    }

    apagar() {
        this.#encendido = false;
    }

    verCanalSiguiente() {
        if (!this.#encendido) return console.log('El televisor está apagado');
        if (this.#canal === this.#canales) {
            this.#canal = 0;
        } else {
            this.#canal += 1;
        }
    }

    verCanalAnterior() {
        if (!this.#encendido) return console.log('El televisor está apagado');
        if (this.#canal === 0) {
            this.#canal = this.#canales;
        } else {
            this.#canal -= 1;
        }
    }

    cambiarCanal(canal) {
        if (!this.#encendido) return console.log('El televisor está apagado');
        if (Number.isInteger(canal) && canal >= 0 && canal <= this.#canales) {
            this.#canal = canal;
        } else {
            console.log("El canal no existe");
        }
    }

    subirVolumen() {
        if (!this.#encendido) return console.log('El televisor está apagado');
        if (this.#volumen < 100) {
            this.#volumen += 1;
        }
    }

    bajarVolumen() {
        if (!this.#encendido) return console.log('El televisor está apagado');
        if (this.#volumen > 0) {
            this.#volumen -= 1;
        }
    }

    toString() { // Lo más recomendable es que esto siempre devuelva una cadena de texto y se imprime con un console.log desde afuera
        return ` 
            Televisor ${this.#marca}
            - Canales: ${this.#canales}
            - Canal actual: ${this.#canal}
            - Volumen actual: ${this.#volumen}`;
    }

    estado() {
        console.log(`
        Encendido: ${this.#encendido ? 'Sí' : 'No'}
        Canal: ${this.#canal}
        Canales: ${this.#canales}
        Volumen: ${this.#volumen}
        Marca: ${this.#marca}
        `);
    }

}

let tv = new Televisor('LG', 20);
console.log(tv.toString());

tv.estado();
tv.verCanalSiguiente();
tv.estado();
tv.prender();
tv.estado();
tv.cambiarCanal(10);
tv.subirVolumen();
tv.estado();
tv.verCanalSiguiente();
tv.estado();
tv.verCanalAnterior();
tv.estado();
tv.bajarVolumen();
tv.bajarVolumen();
tv.estado();