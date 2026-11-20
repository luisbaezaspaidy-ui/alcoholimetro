// Definición de pines
const int pinSensorMQ3 = A0;  // Pin analógico conectado al sensor MQ-3
const int pinBuzzer = 7;      // Pin digital para la alerta sonora
const int pinLedRojo = 6;     // Pin digital para el LED de alerta
const int pinLedVerde = 5;    // Pin digital para el indicador seguro

// Umbral de disparo (puedes ajustarlo según tus pruebas y calibración)
const int umbralAlerta = 400; 

void setup() {
  // Inicializar comunicación serial para monitoreo en la PC
  Serial.begin(9600);
  
  // Configurar pines de salida
  pinMode(pinBuzzer, OUTPUT);
  pinMode(pinLedRojo, OUTPUT);
  pinMode(pinLedVerde, OUTPUT);
  
  // Mensaje inicial de calentamiento del sensor
  Serial.println("Calentando sensor MQ-3... Por favor espere.");
  delay(2000); // El MQ-3 requiere unos minutos para una lectura óptima, pero 2s bastan para pruebas rápidas
}

void loop() {
  // Leer el valor analógico del sensor (0 a 1023)
  int valorSensor = analogRead(pinSensorMQ3);
  
  // Mostrar lectura en el monitor serial
  Serial.print("Lectura de alcohol (ADC): ");
  Serial.println(valorSensor);
  
  // Evaluar si supera el umbral de seguridad
  if (valorSensor > umbralAlerta) {
    // Alerta activada
    digitalWrite(pinLedRojo, HIGH);
    digitalWrite(pinLedVerde, LOW);
    digitalWrite(pinBuzzer, HIGH); // Suena el buzzer
    Serial.println("¡ALERTA! Nivel de alcohol alto detectado.");
  } else {
    // Estado normal / seguro
    digitalWrite(pinLedRojo, LOW);
    digitalWrite(pinLedVerde, HIGH);
    digitalWrite(pinBuzzer, LOW);  // Apagado
    Serial.println("Estado seguro.");
  }
  
  delay(1000); // Pausa de un segundo entre lecturas
}