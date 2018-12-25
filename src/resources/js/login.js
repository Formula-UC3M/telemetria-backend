(responseManager => {
	document.addEventListener('DOMContentLoaded', event => {
		const formLognin = document.getElementById('login');

		formLognin.addEventListener('submit', event => {
			event.preventDefault();

			fetch('/users/login', {
				method: 'POST',
				body: new FormData(formLognin)
			})
			.then(responseManager)
			.then(data => {
				window.location.href = '/ranges';
			})
			.catch(error => alert(error));
		});
	});
})(window.responseManager);