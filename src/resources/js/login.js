(() => {
	if (localStorage.getItem('token')) {
		return window.location.href = '/ranges';
	}

	document.addEventListener('DOMContentLoaded', event => {
		const formLognin = document.getElementById('login');

		formLognin.addEventListener('submit', event => {
			event.preventDefault();

			fetch('/users/login', {
				method: 'POST',
				body: new FormData(formLognin)
			})
			.then(res => res.json())
			.then(data => {
				localStorage.setItem('token', data.token);
				window.location.href = '/ranges';
			})
			.catch(error => alert(error));
		});
	});
})();