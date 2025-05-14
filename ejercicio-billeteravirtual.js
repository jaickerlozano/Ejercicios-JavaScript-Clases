/*## BilleteraVirtual

  - **Propiedades**
    - monto
    - operaciones (array de objetos), inicializa vacío
  - **Constructor**
    - toma como argumento `montoInicial` y lo asigna a `monto`
  - **Métodos**
    - **`agregarGasto(gasto)`** agrega `gasto` a operaciones
    - **`agregarGanancia(ganancia)`** agrega `ganancia` a operaciones
    - **`obtenerGastosPorMes(mes)`** devuelve un array con todos los gastos hechos en `mes`
    - **`obtenerGanaciasPorMes(mes)`** devuelve un array con todas los ganancias obtenidas en `mes`
    - **`obtenerGastosPorCategoria(categoria)`** devuelve un array con todos los gastos de cierta `categoria`
    - **`obtenerGanaciasPorCategoria(categoria)`** devuelve un array con todas las ganancias de cierta `categoria`
    - **`calcularTotalPorMes(mes)`** devuelve el total resultante de restar todos los gastos hechos y sumar todas las ganancias obtenidas en un cierto `mes`
    - **`calcularTotalPorCategoria(categoria)`** devuelve el total resultante de restar todos los gastos hechos y sumar todas las ganancias obtenidas en cierta `categoria
    - **`obtenerMonto()**` devuelve `monto`
  - **Observaciones**
    - los objetos `gasto` y `ganancia` contiene las propiedades:
      - `descripcion` (string)
      - `cantidad` (número)
      - `fecha` (Date)
      - `categoria` (string)
    - cuando se agrega `gasto` o `ganancia` al array operaciones, hay que agregarle a dicha objeto la propiedad `tipo` con el valor `"GASTO"` o `"GANANCIA"` según corresponda, para poder identificarlos en las siguientes operaciones
    - cuando se devuelve un array con gastos o ganancias, hay que borrar de los objetos que se devuelven la propiedad `tipo`
<br>*/

class BilleteraVirtual {
  #monto;
  #operaciones;

  constructor(montoInicial) {
    this.#monto = montoInicial;
    this.#operaciones = [];
  }

  #validarOperacion(operacion) {
    if (operacion === undefined || operacion === null) {
        throw new Error('Debe ingresar una operación válida (gasto o ganancia)');
    }
    
    if (typeof operacion !== 'object' || Array.isArray(operacion)) {
        throw new Error('La operación debe ser un objeto');
    }
    
    const propiedadesRequeridas = ['descripcion', 'cantidad', 'fecha', 'categoria'];
    for (const prop of propiedadesRequeridas) {
        if (!(prop in operacion)) {
            throw new Error(`La operación debe tener la propiedad ${prop}`);
        }
    }
    
    if (typeof operacion.descripcion !== 'string' || operacion.descripcion.trim() === '') {
        throw new Error('La descripción debe ser un texto válido');
    }
    
    if (typeof operacion.cantidad !== 'number' || operacion.cantidad <= 0) {
        throw new Error('La cantidad debe ser un número positivo');
    }
    
    if (!(operacion.fecha instanceof Date) || isNaN(operacion.fecha.getTime())) {
        throw new Error('La fecha debe ser una fecha válida');
    }
    
    if (typeof operacion.categoria !== 'string' || operacion.categoria.trim() === '') {
        throw new Error('La categoría debe ser un texto válido');
    }
}

  #validarMes(mes) {
    if (isNaN(mes) || !Number.isInteger(mes) || mes < 0 || mes > 12) {
      throw new Error('Debe ingresar el número del mes que desea consultar');
    }
  }

  #validarCategoria(categoria) {
    if (typeof categoria !== 'string' || categoria.trim() === '') {
      throw new Error('Debe ingresar una categoria');
    }
  }

  agregarGasto(gasto) {
    this.#validarOperacion(gasto);
    gasto.tipo = 'GASTO';
    this.#operaciones.push(gasto);
    this.#monto -= gasto.cantidad;
  }

  agregarGanancia(ganancia) {
    this.#validarOperacion(ganancia)
    ganancia.tipo = 'GANANCIA'
    this.#operaciones.push(ganancia);
    this.#monto += ganancia.cantidad;
  }

  obtenerGastosPorMes(mes) {
    this.#validarMes(mes);
    return this.#operaciones
      .filter(op => op.tipo === 'GASTO' && op.fecha.getMonth() === mes)
      .map(({ tipo, ...resto}) => resto);
  }
  
  obtenerGananciasPorMes(mes) {
    this.#validarMes(mes);
    return this.#operaciones
      .filter(op => op.tipo === 'GANANCIA' && op.fecha.getMonth() === mes)
      .map(({ tipo, ...resto}) => resto);
  }

  obtenerGastosPorCategoria(categoria) {
    this.#validarCategoria(categoria);
    const existe = this.#operaciones.some(op => op.categoria.toLowerCase() === categoria.toLowerCase());
    if (!existe) throw new Error(`La categoría ${categoria} no existe`);
    return this.#operaciones
    .filter(op => op.tipo === 'GASTO' && op.categoria.toLowerCase() === categoria.toLowerCase())
    .map(({tipo, ...resto}) => resto);
  }

  obtenerGananciasPorCategoria(categoria) {
    this.#validarCategoria(categoria);
    const existe = this.#operaciones.some(op => op.categoria.toLowerCase() === categoria.toLowerCase());
    if (!existe) throw new Error(`La categoría ${categoria} no existe`);
    return this.#operaciones
    .filter(op => op.tipo === 'GANANCIA' && op.categoria.toLowerCase() === categoria.toLowerCase())
    .map(({tipo, ...resto}) => resto);
  }

  calcularTotalPorMes(mes) {
    this.#validarMes(mes);

    const totalGastosMes = this.#operaciones.reduce((acc, op) => {
      if (op.tipo === 'GASTO' && op.fecha.getMonth() === mes) {
        return acc += op.cantidad;
      }

      return acc;
    }, 0);

    const totalGananciasMes = this.#operaciones.reduce((acc, op) => {
      if (op.tipo === 'GANANCIA' && op.fecha.getMonth() === mes) {
        return acc += op.cantidad;
      }

      return acc;
    }, 0);

    return `El total por el mes '${mes}' es: $${totalGananciasMes - totalGastosMes}`;
  }

  calcularTotalPorCategoria(categoria) {
    this.#validarCategoria(categoria);

    const totalGastosCategoria = this.#operaciones.reduce((acc, op) => {
      if (op.tipo === 'GASTO' && op.categoria.toLowerCase() === categoria.toLowerCase()) {
        return acc += op.cantidad;
      }

      return acc;
    }, 0);

    const totalGananciasCategoria = this.#operaciones.reduce((acc, op) => {
      if (op.tipo === 'GANANCIA' && op.categoria.toLowerCase() === categoria.toLowerCase()) {
        return acc += op.cantidad;
      }

      return acc;
    }, 0);

    return `El total por categoria '${categoria}' es: $${totalGananciasCategoria - totalGastosCategoria}`;
  }

  obtenerMonto() {
    return this.#monto;
  }

}

let billetera = new BilleteraVirtual(1000);
// Fechas corregidas (meses van de 0 a 11)
const gasto1 = { descripcion: `comprar pantalones`, cantidad: 65, fecha: new Date(2025, 1, 1), categoria: 'ropa' }; // Febrero (mes 1)
const gasto2 = { descripcion: `comprar camisas`, cantidad: 50, fecha: new Date(2025, 1, 1), categoria: 'ropa' }; // Febrero (mes 1)
const gasto3 = { descripcion: `pagar agua`, cantidad: 12, fecha: new Date(2025, 2, 1), categoria: 'servicios' }; // Marzo (mes 2)
const gasto4 = { descripcion: `pagar luz`, cantidad: 15, fecha: new Date(2025, 2, 1), categoria: 'servicios' }; // Marzo (mes 2)
const gasto5 = { descripcion: `comprar almuerzo`, cantidad: 5, fecha: new Date(2025, 2, 1), categoria: 'comida' }; // Marzo (mes 2)
const gasto6 = {};

const ganancia1 = { descripcion: `tortas`, cantidad: 10, fecha: new Date(2025, 2, 1), categoria: 'ventas' }; // Enero (mes 0)
const ganancia2 = { descripcion: `quesillo`, cantidad: 12, fecha: new Date(2025, 2, 1), categoria: 'ventas' }; // Enero (mes 0)
const ganancia3 = { descripcion: `maquetar página`, cantidad: 50, fecha: new Date(2025, 2, 1), categoria: 'servicios' }; // Marzo (mes 2)
const ganancia4 = { descripcion: `programar app`, cantidad: 100, fecha: new Date(2025, 3, 1), categoria: 'servicios' }; // Abril (mes 3)

billetera.agregarGasto(gasto1);
billetera.agregarGasto(gasto2);
billetera.agregarGasto(gasto3);
billetera.agregarGasto(gasto4);
billetera.agregarGasto(gasto5);
billetera.agregarGanancia(ganancia1);
billetera.agregarGanancia(ganancia2);
billetera.agregarGanancia(ganancia3);
billetera.agregarGanancia(ganancia4);

console.log(billetera);
console.log('Gastos de marzo (3):', billetera.obtenerGastosPorMes(2)); // marzo
console.log('Ganancias de enero (1):', billetera.obtenerGananciasPorMes(2)); // enero
console.log('Ganancias de abril (4):', billetera.obtenerGananciasPorMes(3)); // abril
console.log(billetera.obtenerGastosPorCategoria('ropa')); 
console.log(billetera.obtenerGananciasPorCategoria('ventas')); 
console.log(billetera.calcularTotalPorMes(2));
console.log(billetera.calcularTotalPorCategoria('servicios'));
console.log(billetera.obtenerMonto());