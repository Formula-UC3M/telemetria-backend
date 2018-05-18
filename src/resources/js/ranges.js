(() => {
	const authToken = localStorage.getItem('token');
	
	if (!authToken) {
		return window.location.href = '/login';
	}

	const fields = [
		{ label: 'Acelerometro', slug: 'accelerometer' },
		{ label: 'Posición Freno', slug: 'brake_position' },
		{ label: 'Temperatura Freno', slug: 'brake_temperature' },
		{ label: 'Dirección', slug: 'direction' },
		{ label: 'Suspensión', slug: 'suspension' },
		{ label: 'Temperatura del radiador', slug: 'radiator_temperature' },
		{ label: 'Velocidad', slug: 'speed' },
		{ label: 'Valvula de Pitot', slug: 'pitot' },
		{ label: 'Posición Acelerador', slug: 'throttle_position' },
		{ label: 'Temperatura manguetas', slug: 'upright_temperature' },
	];

	class TableForm {
		constructor(data) {
			this.root = document.getElementById('page-content');
			this.data = data;
			this.render();
			this.setEvents();
		}
		
		buildRow(label, slug, min, max) {
			return `<tr>
				<td>${ label }</td>
				<td>
					<input id="input${ slug }Min" type="number" placeholder="0" name="${ slug }Min" class="form-control" value="${ min }">
				</td>
				<td>
					<input id="input${ slug }Max" type="number" placeholder="0" name="${ slug }Max" class="form-control" value="${ max }">
				</td>
			</tr>`;
		}
		
		buildBody() {
			return fields.map(field => {
				const { min, max } = this.data[field.slug];
				return this.buildRow(field.label, field.slug, min, max);
			}).join('');
		}

		setEvents() {
			document.querySelectorAll('table.table input').forEach(input => {
				input.addEventListener('keyup', e => {
					console.log(e.target)
				});
			});
		}

		render() {
			this.root.innerHTML = `
				<div class="ranges-row">
					<div class="panel panel-primary">
						<table class="table table-bordered">
							<thead>
								<tr>
									<th>Nombre</th>
									<th>Min</th>
									<th>Max</th>
								</tr>
							</thead>
							<tbody>
								${ this.buildBody() }
							</tbody>
						</table>
					</div>
				</div>
			`;
		}
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
			new TableForm(data);
		})
		.catch(error => {
			alert(error);
		});
		
	});
})();