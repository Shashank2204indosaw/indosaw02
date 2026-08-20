// Dropdown menu restricted strictly to Pins 0 through 15
enum BoardPin {
    //% block="P0"
    P0 = DigitalPin.P0,
    //% block="P1"
    P1 = DigitalPin.P1,
    //% block="P2"
    P2 = DigitalPin.P2,
    //% block="P3"
    P3 = DigitalPin.P3,
    //% block="P4"
    P4 = DigitalPin.P4,
    //% block="P5"
    P5 = DigitalPin.P5,
    //% block="P6"
    P6 = DigitalPin.P6,
    //% block="P7"
    P7 = DigitalPin.P7,
    //% block="P8"
    P8 = DigitalPin.P8,
    //% block="P9"
    P9 = DigitalPin.P9,
    //% block="P10"
    P10 = DigitalPin.P10,
    //% block="P11"
    P11 = DigitalPin.P11,
    //% block="P12"
    P12 = DigitalPin.P12,
    //% block="P13"
    P13 = DigitalPin.P13,
    //% block="P14"
    P14 = DigitalPin.P14,
    //% block="P15"
    P15 = DigitalPin.P15
}

// Dropdown menu for ON / OFF state
enum PinState {
    //% block="HIGH (1)"
    High = 1,
    //% block="LOW (0)"
    Low = 0
}

//% color="#FF5722" icon="\uf0eb" block="My Signal"
namespace mySignal {

    /**
     * Blink any chosen pin from P0 to P15
     */
    //% block="blink pin %pin for %delay ms"
    //% delay.defl=500
    //% weight=90
    export function blinkBoardPin(pin: BoardPin, delay: number): void {
        pins.digitalWritePin(pin as number, 1);
        basic.pause(delay);
        pins.digitalWritePin(pin as number, 0);
        basic.pause(delay);
    }

}

//% color="#1E88E5" icon="\uf2db" block="My Motors"
namespace myMotors {

    //% block="stop all motors"
    export function stopMotors(): void {
        pins.digitalWritePin(DigitalPin.P0, 0);
        pins.digitalWritePin(DigitalPin.P1, 0);
    }

}

//% color="#8E24AA" icon="\uf013" block="Device Configure"
namespace DeviceConfig {

    /**
     * Configure any pin from P0 to P15 to HIGH or LOW
     */
    //% block="configure board pin %pin to state %state"
    //% weight=95
    export function setBoardPin(pin: BoardPin, state: PinState): void {
        pins.digitalWritePin(pin as number, state);
    }

}

//% color="#4CAF50" icon="\uf06c" block="Soil Sensor"
namespace soilSensor {

    /**
     * Reads digital soil moisture level on Pin P4 (1 = Dry, 0 = Wet). 
     * Automatically disables the LED display matrix so Pin P4 works as a clean input pin.
     */
    //% block="read soil sensor on P4"
    //% weight=90
    export function readSoilP4(): number {
        led.enable(false);
        return pins.digitalReadPin(DigitalPin.P4);
    }

    /**
     * Reads digital soil moisture (1 = Dry, 0 = Wet). 
     * Automatically turns off the LED display to allow pins like P4, P10 to work cleanly.
     */
    //% block="soil sensor on pin %pin is active"
    //% weight=90
    export function readSoil(pin: BoardPin): number {
        led.enable(false);
        return pins.digitalReadPin(pin as number);
    }

    /**
     * Enable or disable the built-in 5x5 LED display screen
     */
    //% block="set LED matrix display %on"
    //% on.shadow="toggleOnOff"
    //% weight=80
    export function setDisplay(on: boolean): void {
        led.enable(on);
    }

}

//% color="#FF9800" icon="\uf2c7" block="Temp Sensor"
namespace tempSensor {

    /**
     * Reads temperature in Celsius from an external DS18B20 sensor connected to Pin P0
     */
    //% block="read temperature (°C) on P0"
    //% weight=90
    export function readTemperatureP0(): number {
        return dstemp.celsius(DigitalPin.P0);
    }

    /**
     * Reads temperature in Celsius from an external sensor on a chosen pin
     */
    //% block="read temperature (°C) on pin %pin"
    //% weight=90
    export function readTemperature(pin: BoardPin): number {
        return dstemp.celsius(pin as number);
    }

    /**
     * Reads temperature in Celsius directly from the micro:bit built-in CPU sensor
     */
    //% block="read internal micro:bit temperature (°C)"
    //% weight=80
    export function readInternalTemp(): number {
        return input.temperature();
    }

}