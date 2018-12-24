/*
 * Asigna el estatus de la respuesta al objeto gangaway y devuelve un json con una clave
 * message que contiene el mensaje de error.
 */
module.exports = function errorAsJson(status, message) {
	if (isNaN(status)) {
		throw new Error(
			'El "status" enviado al método errorAsJson de gangaway debe ser un entero, ' +
			'sin embargo se ha recibido un ' + typeof(status) + ' con valor ' + status
		);
	}

	if (parseInt(status) < 400) {
		console.warn(
			'Recibido un "status" code ' + status + ' en el método errorAsJson de ' +
			'gangaway . El método errorAsJson se usa para devolver peticiones como ' +
			'error, por tanto el status no ser menor de 400.'
		);
	}

	this.statusCode = status;
	this.json({ message });
	return this;
};