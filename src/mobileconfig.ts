const uuidv4 = require("uuid/v4");

export class PayloadContent {
    constructor() {}
}
export class Wifi extends PayloadContent {
    AutoJoin: boolean = true;
    CaptiveBypass: boolean = false;
    EncryptionType: string = "WPA";
    HIDDEN_NETWORK: boolean = false;
    IsHotspot: boolean = false;
    Password: string = "";
    PayloadDescription: string = "";
    PayloadDisplayName: string = "Wi-Fi";
    PayloadIdentifier: string = "com.apple.wifi.managed." + uuidv4().toUpperCase();
    PayloadType: string = "com.apple.wifi.managed";
    PayloadUUID: string = uuidv4().toUpperCase();
    PayloadVersion: number = 1;
    ProxyType: string = "None";
    SSID_STR: string = "";
    constructor(
        ssid: string,
        password: string
    ) {
        super();
        this.SSID_STR = ssid;
        this.Password = password;
    }
}
export class MobileConfig {
    PayloadContent: Array<PayloadContent>;
    PayloadDisplayName: string;
    PayloadIdentifier: string;
    PayloadRemovalDisallowed: boolean = false;
    PayloadType: string = "Configuration";
    PayloadUUID: string = uuidv4().toUpperCase();
    PayloadVersion: number = 1;
    constructor(
        displayName: string,
        identifier: string,
        payloads: Array<PayloadContent>
    ) {
        this.PayloadDisplayName = displayName;
        this.PayloadIdentifier = identifier;
        this.PayloadContent = payloads;
    }
}
