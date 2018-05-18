(() => {
	const authToken = localStorage.getItem('token');
	
	if (!authToken) {
		return window.location.href = '/login';
	}

	function renderForm(data) {
		
	}

	function setEvents() {
		
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
			renderForm(data);
		})
		.catch(error => {
			alert(error);
		});
		
	});
})();