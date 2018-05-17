(() => {
	document.addEventListener('DOMContentLoaded', event => {
		const formLognin = document.getElementById('login');

		formLognin.addEventListener('submit', event => {
			event.preventDefault();

			fetch('/users/login', {
				method: 'POST',
				body: new FormData(formLognin)
			})
			.then(res => res.json())
			.then(data => localStorage.setItem('token', data.token))
			.catch(error => alert(error));
		});
	});
})();