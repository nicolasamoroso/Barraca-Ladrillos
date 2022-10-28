const data = []; // Array que simulará ser la base de datos

/**
 * Devuelve todos los datos de transacciones almacenados en el array
 * @returns Array de datos
 */
const listData = () => data;

/**
 * Método para añadir nuevas transacciones
 * @param {description, transaction, subtotal, iva} tr 
 * @returns 
 */
const createData = (tr) => {
  const { description, transaction, subtotal, iva } = tr;
  if (!(description && transaction && subtotal && iva)) {
    return false;
  }
  data.push(tr);
  return true;
};

/**
 * Elimina una transacción en la posición del array especificada
 * @param {Number} index 
 */
const deleteData = (index) => {
  data.splice(index, 1);
};

/**
 * Devuelve una transacción en la posición del array especificada
 * @param {Number} index 
 * @returns 
 */
const getData = (index) => data[index];

/**
 * Actualiza una transacción con los datos recibidos
 * @param {*} index índice del elemento a actualizar
 * @param {*} updatedData datos para actualizar
 */
const updateData = (index, updatedData) => {
  data[index] = { ...data[index], ...updatedData };
};

/**
 * Exporta las funciones que hemos creado para que sean visibles desde otros archivos JS
 */
module.exports = { listData, createData, deleteData, getData, updateData };
