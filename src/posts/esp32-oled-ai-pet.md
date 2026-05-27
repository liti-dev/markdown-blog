---
title: Build a tamagotchi (pet) with ESP32 and OLED display
description: Connect an AI agent to a physical device that reacts to AI agent's state
date: '2026-05-27'
categories:
  - robotics
  - learning
published: true
status: tree
---

I wanted my AI agent to have a physical presence — something on my desk that shows me it's "alive" and working. So I built a tiny pet that wakes up when the agent is active and falls asleep when it's idle.

## What you'll need

### Hardware

- 1 ESP32 board (any variant works. I got mine from Amazon)
- SSD1306 OLED display (128x64, I2C)
- 4 jumper wires
- USB cable (mine is type C to connect with Macbook)

### Software

- Arduino IDE

## Step 1: Connect ESP32 to your Mac (computer)

Plug the ESP32 into your MacBook via USB. Open Arduino IDE and:

1. Go to **Tools → Board → Boards Manager**, search "esp32", and install **esp32 by Espressif Systems**
2. Go to **Tools → Board** and select your ESP32 variant (e.g. "ESP32 Dev Module")
3. Go to **Tools → Port** and select the port that appeared (usually `/dev/cu.usbserial-*` or `/dev/cu.SLAB_USBtoUART`)


## Step 2: Wire the OLED display

Connect the OLED to the ESP32 via I2C:

| OLED Pin | ESP32 Pin |
|----------|-----------|
| VCC      | 3.3V      |
| GND      | GND       |
| SDA      | GPIO 21   |
| SCL      | GPIO 22   |

## Step 3: Install libraries and test with "Hello Thuyet"

In Arduino IDE, go to **Sketch → Include Library → Manage Libraries** and install:

- **Adafruit GFX Library**
- **Adafruit SSD1306**

Now upload this minimal test sketch to confirm everything works:

```cpp
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);

  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("OLED not found!");
    while (true);
  }

  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(WHITE);
  display.setCursor(10, 20);
  display.println("Hello");
  display.println(" Thuyet!");
  display.display();
}

void loop() {
  // Nothing here yet
}
```

If you see "Hello Thuyet!" on the OLED, your wiring and setup are good. If not, double-check:
- SDA is on GPIO 21, SCL is on GPIO 22
- The OLED I2C address is `0x3C` (some displays use `0x3D`)
- The display is getting 3.3V power

## Step 4: The pet logic — WiFi + HTTP API

Now for the real thing. The ESP32 runs a web server with these endpoints:

- `POST /active` — wakes the pet up (agent is working)
- `POST /idle` — puts the pet to sleep (agent stopped)
- `GET /status` — returns current state

The device is discoverable via mDNS at `http://pet.local`, so your agent doesn't need to know the IP address.

There's also an auto-sleep timeout: if no `/active` request comes in for 30 seconds, the pet goes to sleep on its own.

The full sketch uses these additional built-in ESP32 libraries (no install needed):
- WiFi
- WebServer
- ESPmDNS

Then upload this sketch:

```cpp
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <WiFi.h>
#include <WebServer.h>
#include <ESPmDNS.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* hostname = "pet";

WebServer server(80);
```

The key parts of the logic:

```cpp
int emotion = 1; // Start sleeping
unsigned long lastActiveTime = 0;
const unsigned long autoSleepTimeout = 30000; // 30s

void handleActive() {
  emotion = 0;
  lastActiveTime = millis();
  server.send(200, "text/plain", "ok");
}

void handleIdle() {
  emotion = 1;
  server.send(200, "text/plain", "ok");
}

void handleStatus() {
  server.send(200, "text/plain", emotion == 0 ? "active" : "idle");
}
```

In `setup()`, connect to WiFi, start mDNS, and register the routes:

```cpp
void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  MDNS.begin(hostname); // http://pet.local

  server.on("/active", HTTP_POST, handleActive);
  server.on("/idle", HTTP_POST, handleIdle);
  server.on("/status", HTTP_GET, handleStatus);
  server.begin();
}
```

In `loop()`, handle requests, check for auto-sleep, and draw the current emotion bitmap:

```cpp
void loop() {
  server.handleClient();

  // Auto-sleep after 30s of no activity
  if (emotion == 0 && (millis() - lastActiveTime > autoSleepTimeout)) {
    emotion = 1;
  }

  display.clearDisplay();
  if (emotion == 0) {
    display.drawBitmap(40, 8, normal_bitmap, 48, 48, WHITE);
  } else {
    display.drawBitmap(40, 8, sleep_bitmap, 60, 52, WHITE);
  }
  display.display();
  delay(30);
}
```

For the bitmap data (the pixel art faces), I used [image2cpp](https://javl.github.io/image2cpp/) to convert small PNG drawings into C arrays.

## Step 5: Connect your AI agent

From any agent or script on the same network, just send HTTP requests:

```bash
# Wake the pet
curl -X POST http://pet.local/active

# Put it to sleep
curl -X POST http://pet.local/idle

# Check state
curl http://pet.local/status
```

In a Node.js agent, you could hook into lifecycle events:

```javascript
// When agent starts processing
await fetch('http://pet.local/active', { method: 'POST' });

// When agent finishes
await fetch('http://pet.local/idle', { method: 'POST' });
```

## What I learned

- mDNS makes local IoT devices much easier to work with — no hardcoded IPs
- The auto-sleep timeout is important as a fallback if the agent crashes without sending `/idle`
- Bitmap art at 48x48 pixels is surprisingly expressive
- Having a physical indicator of agent state is genuinely useful, not just a novelty

## Next steps

- Add more emotions (thinking, error, happy)
- Use WebSocket instead of polling for real-time state
- Add a small speaker for sound feedback
- Display the agent's current task as scrolling text

The full source code is on my [GitHub](https://github.com/liti-dev).
