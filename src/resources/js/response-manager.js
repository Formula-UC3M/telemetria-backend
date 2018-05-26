window.responseManager = response => {
	const resJson = response.json();

	if (response.ok === false) {
		return resJson.then(error => {
			throw error.message;
		});
	}

	return resJson;
};