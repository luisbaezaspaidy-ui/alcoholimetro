
// Definición de pines
const int pinSensorMQ3 = A0;
const int pinBuzzer = 7;
const int pinLedRojo = 6;
const int pinLedVerde = 5;

// Umbral de alerta
const int umbralAlerta = 400;

void setup() {
  // Inicializar comunicación serial
  Serial.begin(9600);

  // Configurar pines
  pinMode(pinBuzzer, OUTPUT);
  pinMode(pinLedRojo, OUTPUT);
  pinMode(pinLedVerde, OUTPUT);

  // NUEVA FUNCIONALIDAD: Mensaje de bienvenida
  Serial.println("============================");
  Serial.println("     BIENVENIDO A ALCOSAFE");
  Serial.println("   Sistema de Alcoholimetro");
  Serial.println("============================");

  // Calentamiento inicial
  Serial.println("Calentando sensor MQ-3...");
  delay(2000);

  // NUEVA FUNCIONALIDAD: Aviso de inicio
  Serial.println("AlcoSafe listo para iniciar las mediciones.");
  Serial.println("----------------------------");
}

void loop() {
  // Leer sensor
  int valorSensor = analogRead(pinSensorMQ3);

  // Mostrar lectura
  Serial.print("Lectura de alcohol (ADC): ");
  Serial.println(valorSensor);

  // Evaluar el umbral
  if (valorSensor > umbralAlerta) {
    digitalWrite(pinLedRojo, HIGH);
    digitalWrite(pinLedVerde, LOW);
    digitalWrite(pinBuzzer, HIGH);

    Serial.println("ALERTA: Nivel de alcohol alto detectado.");
  } else {
    digitalWrite(pinLedRojo, LOW);
    digitalWrite(pinLedVerde, HIGH);
    digitalWrite(pinBuzzer, LOW);

    Serial.println("Estado seguro.");
  }

  delay(1000);
}
