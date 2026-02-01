// ===== IMPORTAÇÕES =====
const express = require('express');
const mqtt = require('mqtt');

// ===== CONFIGURAÇÕES =====
const PORT = process.env.PORT || 3000;

// MQTT (exemplo com HiveMQ público)
const MQTT_BROKER = 'mqtt://broker.hivemq.com:1883';
const MQTT_TOPIC = 'hiury/esp32/led';

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
app.get('/', (req, res) => {
  res.send('Servidor IoT online 🚀');
});

app.get('/ligar', (req, res) => {
  mqttClient.publish(MQTT_TOPIC, 'LIGAR');
  res.send('LED LIGADO');
});

app.get('/desligar', (req, res) => {
  mqttClient.publish(MQTT_TOPIC, 'DESLIGAR');
  res.send('LED DESLIGADO');
});

// ===== INICIAR SERVIDOR (SEMPRE POR ÚLTIMO) =====
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
