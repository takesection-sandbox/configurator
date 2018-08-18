// src/index.ts

import Vue from "vue";
const uuidv4 = require("uuid/v4");
const plist = require("plist");
const mobileconfig = require("./mobileconfig");

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <div>
            Display Name: <input v-model="displayName" type="text">
        </div>
        <div>
            Identifier: <input v-model="identifier" type="text">
        </div>
        <div>
            SSID: <input v-model="ssid" type="text">
        </div>
        <div>
            Password: <input v-model="password" type="text">
        </div>
        <div>
            <button v-on:click="submit">OK</button>
        </div>
    </div>`,
    data: {
        displayName: "",
        identifier: "",
        ssid: "",
        password: ""
    },
    methods: {
        submit: function() {
            const wifi = new mobileconfig.Wifi(
                "Wi-Fi",
                this.ssid,
                this.password);
            const mc = new mobileconfig.MobileConfig(
                this.displayName,
                this.identifier + "." + uuidv4().toUpperCase(),
                [wifi]
            ); 
            console.log(plist.build(mc));
        }
    }
});