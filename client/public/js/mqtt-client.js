const mqttServer = 'localhost';
const mqttPort = 3001;
const testConnUrl = 'http://localhost:3001/';

// Abre la conexión al web socket de mqtt que trae los datos en tiempo real.
function openMqttConnection() {
  // eslint-disable-next-line no-undef
  const mqttService = mqtt.connect(`ws://${mqttServer}`, {
    // username: mqtt_username,
    // password: mqtt_password,
    // clientId: "interface",
    port: mqttPort,
  });

  mqttService.subscribe('formula/realtime-data');
  mqttService.subscribe('formula/realtime-fake-data');
  mqttService.publish('formula/realtime-data', JSON.stringify({
    probando: 'a publicar algo...',
  }));

  // Escuchando los datos en tiempo real.
  mqttService.on('message', (topic, payload) => {
    console.info([topic, payload].join(': '));
  });
}

// Comprobar que el servidor está corriendo y si está corriendo conectarse al
// websocket de mqqt que trae los datos.y
const req = new XMLHttpRequest();
req.open('GET', testConnUrl, true);
req.setRequestHeader('Access-Control-Allow-Origin', '*');
req.onreadystatechange = function () {
  if (req.readyState === 4) {
    if (req.status === 200) {
      openMqttConnection();
    } else {
      console.error('Error conectando al servidor...');
    }
  }
};
req.send(null);
