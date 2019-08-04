/* global jQuery, moment */
(($, moment, responseManager) => {
	const ecuFields = [
		{ label: 'Temperatura Agua', slug: 'waterTempEng' },
		{ label: 'Temperatura Aceite', slug: 'oilTempEng' },
		{ label: 'Revoluciones Por Minuto', slug: 'rpm' }
	];

	const fields = [
		// { label: 'Acelerometro', slug: 'accelerometer' },
		{ label: 'Posición Freno', slug: 'brakePosition' },
		{ label: 'Temperatura Freno', slug: 'brakeTemperature' },
		// { label: 'Dirección', slug: 'direction' },
		{ label: 'Suspensión', slug: 'suspension' },
		{ label: 'Temperatura del radiador', slug: 'radiatorTemperature' },
		{ label: 'Velocidad', slug: 'speed' },
		// { label: 'Valvula de Pitot', slug: 'pitot' },
		{ label: 'Posición Acelerador', slug: 'throttlePosition' },
		{ label: 'Temperatura manguetas', slug: 'uprightTemperature' }
	];

	function display(title, message) {
		document.querySelectorAll('#resultModal .modal-header > .modal-title')[0].innerHTML = title;
		document.querySelectorAll('#resultModal #modal-b-content')[0].innerHTML = message;
		$('#resultModal').modal();
	}

	class TableForm {
		constructor(data) {
			this.root = document.getElementById('page-content');
			this.versionContainer = document.getElementById('currentVersion');
			this.data = data;
			this.updated = false;
			this.updateVersion(data.version, data.created_at);
			this.render();
			this.setEvents();
		}

		updateVersion(version, created) {
			created = created ? created.slice(1, -1) : Date.now();
			this.version = version;
			this.created_at = moment(new Date(created)).format('L');
			this.renderVersion();
		}

		renderVersion() {
			this.versionContainer.innerHTML = 'Version: ' + this.version + ' | ' + this.created_at;
		}

		update(key, value) {
			const tree = key.split('.');
			let parent = this.data;
			
			for (let i = 0; i < tree.length; i++) {
				if (i < tree.length - 1) {
					parent = parent[tree[i]];
				} else {
					parent[tree[i]] = value;
				}
			}

			this.updated = true;
		}

		buildRow(label, slug, key, min, max) {
			return `<tr>
				<td>${ label }</td>
				<td>
					<input
						id="input${ slug }Min"
						type="number"
						placeholder="Min"
						data-key="${ key + '.min' }"
						name="${ slug }Min"
						class="form-control"
						value="${ min }"
					/>
				</td>
				<td>
					<input
						id="input${ slug }Max"
						type="number"
						placeholder="Max"
						data-key="${ key + '.max' }"
						name="${ slug }Max"
						class="form-control"
						value="${ max }"
					/>
				</td>
			</tr>`;
		}
		
		buildBody() {
			const parser = (data, isEcu, field) => {
				const { min, max } = data[field.slug];
				const key = isEcu ? 'ecu.' + field.slug : field.slug;
				return this.buildRow(field.label, field.slug, key, min, max);
			};

			return [
				...fields.map(parser.bind(this, this.data, false)),
				...ecuFields.map(parser.bind(this, this.data.ecu, true))
			].join('');
		}

		setEvents() {
			document.querySelectorAll('table.table input').forEach(input => {
				input.addEventListener('keyup', e => {
					this.update(e.target.getAttribute('data-key'), e.target.value);
				});
			});

			document.getElementById('btn-save').addEventListener('click', e => {
				e.preventDefault();

				if (!this.updated) {
					return console.info('No hay cambios');
				}

				const bodyData = new FormData();
				const parser = (data, isEcu, field) => {
					const { min, max } = data[field.slug];
					const key = isEcu ? 'ecu.' + field.slug : field.slug;
					
					min && bodyData.append(key + '.min', min);
					max && bodyData.append(key + '.max', max);
				};

				fields.forEach(parser.bind(this, this.data, false));
				ecuFields.map(parser.bind(this, this.data.ecu, true));

				fetch('/api/ranges', {
					method: 'POST',
					body: bodyData
				})
				.then(responseManager)
				.then(result => {
					this.updateVersion(result.data.version, result.data.created_at);
					this.updated = false;
					display('Resultado', 'Los rangos han sido guardados con exito.');
				})
				.catch(error => display('Error', error));
			});
		}

		render() {
			this.root.innerHTML = `
				<div class="ranges-row">
					<div class="panel panel-primary">
						<button id="btn-save" class="btn btn-success btn-sm">Guardar Rangos</button>
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
		fetch('/api/ranges', { method: 'GET' })
			.then(responseManager)
			.then(data => {
				new TableForm(data);
			})
			.catch(error => {
				display('Error', error);
			});
		
	});
})(jQuery, moment, window.responseManager);