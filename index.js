// ===== IMPORTAÇÕES =====
const express = require('express');
const mqtt = require('mqtt');

// ===== CONFIGURAÇÕES =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// ===== APP HTTP =====
const app = express();

// ===== CONEXÃO MQTT =====
const mqttClient = mqtt.connect(MQTT_BROKER);

mqttClient.on('connect', () => {
  console.log('✅ Conectado ao broker MQTT');
});

mqttClient.on('error', (err) => {
  console.error('❌ Erro MQTT:', err);
});

// ===== ROTAS HTTP =====
app.get('/ligar', (req, res) => {
  mqttClient.publish(MQTT_TOPIC, 'LIGAR');
  res.send('LED LIGADO');
});

app.get('/desligar', (req, res) => {
  mqttClient.publish(MQTT_TOPIC, 'DESLIGAR');
  res.send('LED DESLIGADO');
});

// ===== INICIAR SERVIDOR =====
app.listen(HTTP_PORT, () => {
  console.log(`🚀 Servidor HTTP rodando em http://localhost:${HTTP_PORT}`);
});
