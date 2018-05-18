(() => {
	const authToken = localStorage.getItem('token');

	if (!authToken) {
		return window.location.href = '/login';
	}
	
	function renderForm(data) {
		
	}

	function setEvents() {
		const formRanges = document.getElementById('ranges-form');

		formRanges.addEventListener('submit', event => {
			event.preventDefault();

			fetch('/users/signup', {
				method: 'POST',
				body: new FormData(formRanges)
			})
			.then(res => res.json())
			.then(data => localStorage.setItem('token', data.token))
			.catch(error => alert(error));
		});
	}

	document.addEventListener('DOMContentLoaded', event => {	
		fetch('/api/ranges', {
			method: 'GET',
			headers: new Headers({
				'Authorization': 'Bearer ' + authToken
			}) 
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			renderForm(data);
		})
		.catch(error => alert(error));
		
	});
})();