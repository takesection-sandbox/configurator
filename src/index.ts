// src/index.ts

import Vue from "vue";
import * as fs from "fs";

const uuidv4 = require("uuid/v4");
const plist = require("plist");
const mobileconfig = require("./mobileconfig");
const dialog = require("electron").remote.dialog;

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <div>
            Display Name
        </div>
        <div>
            <input v-model="displayName" type="text">
        </div>
        <div>
            Identifier
        </div>
        <div>
            <input v-model="identifier" type="text">
        </div>
        <div>
            SSID
        </div>
        <div>
            <input v-model="ssid" type="text">
        </div>
        <div>
            Password
        </div>
        <div>
            <input v-model="password" type="text">
        </div>
        <div>
            <button v-on:click="submit">Save</button>
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
            dialog.showSaveDialog(null, {
                filters: [
                    {
                        "name": "Profile",
                        "extensions": ["mobileconfig"]
                    }
                ]
            },
            (fileName: string) =>
                fs.writeFileSync(fileName, plist.build(mc), "utf-8")
        );
        }
    }
});