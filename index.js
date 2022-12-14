// variables
const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')  

// arguments
global.sharedObject = {prop1: process.argv};
console.log("ARG 0:", process.argv[0])
console.log("ARG 1:", process.argv[1])
console.log("ARG 2:", process.argv[2])

if( typeof process.argv[2] !== 'undefined' ) {
    console.log("Starting from NPM")
    url_to_load = process.argv[2];
} else if( typeof process.argv[1] !== 'undefined' ) {
    if (process.argv[1] !== "." ) {
        console.log("Starting from OS")
        url_to_load = process.argv[1];
    } else {
        console.log("Starting from NPM, no args")
        url_to_load = "http://localhost/";
    }
} else {
    console.log("No args, localhost fallback")
    url_to_load = "http://localhost/";
}
console.log("URL_TO_LOAD: ", url_to_load)

// init
let win

function createWindow() {
    win = new BrowserWindow({
        fullScreen: true,
        frame: false,
        kiosk: true,
        autoHideMenuBar: true
        //titleBarStyle: 'hidden'
        });
    win.removeMenu()
    win.maximize()

    console.log(win.loadURL(url_to_load))
}

// main
app.on('ready', createWindow)

// hide menus in new windows
app.on("browser-window-created", (e, win) => {
    win.removeMenu();
});
