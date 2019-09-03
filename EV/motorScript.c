int LED4 = 5;
int LED2 = 6;
int LED1 = 7;

int relay = 8;
int button = 9;

int encoder0PinA = 3;
int encoder0PinB = 4;
int encoder0Pos = 0;
int encoder0PinALast = LOW;
int n = LOW;

/* Given in SECONDS */
float durations[7] = {
  0.1, //9m
  2.0, //9.5m
  3.0, //10m
  4.0, //10.5m
  5.0, //11m
  6.0, //11.5m
  1.0  //12m
};

void setup()
{
  Serial.begin(9600); 
  pinMode(LED4, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(LED1, OUTPUT);

  pinMode(relay, OUTPUT);
  digitalWrite(relay, HIGH);

  pinMode(encoder0PinA,INPUT);
  pinMode(encoder0PinB,INPUT);

  pinMode(button, INPUT);
}

void loop()
{
  n = digitalRead(encoder0PinA);
   if ((encoder0PinALast == LOW) && (n == HIGH)) {
     if (digitalRead(encoder0PinB) == LOW) {
       encoder0Pos++; //--
     } else {
       encoder0Pos--; //++
     }
   } 
   encoder0PinALast = n;
  if(encoder0Pos > 7)
  {
    encoder0Pos = 1;
  }
  else if(encoder0Pos < 1)
  {
    encoder0Pos = 7;
  }
  outputToLEDS(encoder0Pos);

  if(digitalRead(button) == HIGH)
  {
    Serial.println(encoder0Pos);
    activateMotor(encoder0Pos);
  }
}

void outputToLEDS(int number)
{
  if(number == 1) //9m
  {
    digitalWrite(LED4, LOW);
    digitalWrite(LED2, LOW);
    digitalWrite(LED1, HIGH);
  }
  else if(number == 2) //9.5m
  {
    digitalWrite(LED4, LOW);
    digitalWrite(LED2, HIGH);
    digitalWrite(LED1, LOW);
  }
  else if(number == 3) //10m
  {
    digitalWrite(LED4, LOW);
    digitalWrite(LED2, HIGH);
    digitalWrite(LED1, HIGH);
  }
  else if(number == 4) //10.5m
  {
    digitalWrite(LED4, HIGH);
    digitalWrite(LED2, LOW);
    digitalWrite(LED1, LOW);
  }
  else if(number == 5) //11m
  {
    digitalWrite(LED4, HIGH);
    digitalWrite(LED2, LOW);
    digitalWrite(LED1, HIGH);
  }
  else if(number == 6) //11.5m
  {
    digitalWrite(LED4, HIGH);
    digitalWrite(LED2, HIGH);
    digitalWrite(LED1, LOW);
  }
  else if(number == 7) //12m
  {
    digitalWrite(LED4, HIGH);
    digitalWrite(LED2, HIGH);
    digitalWrite(LED1, HIGH);
  }
}

void activateMotor(int selection)
{
  digitalWrite(relay, LOW);
  delay(durations[selection-1]*1000);
  digitalWrite(relay, HIGH);
}

