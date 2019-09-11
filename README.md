# pi-joke-dashboard

![GitHub](https://img.shields.io/github/license/RatJuggler/pi-joke-dashboard)
[![David](https://david-dm.org/RatJuggler/pi-joke-dashboard.svg)](https://david-dm.org/RatJuggler/pi-joke-dashboard)
![GitHub](https://img.shields.io/github/package-json/v/RatJuggler/pi-joke-dashboard)

I've got a new [Raspberry Pi](https://www.raspberrypi.org/) and while I try to decide on a suitable hardware project I
thought I'd use it to serve a jokey IOT type dashboard direct to the internet.

To begin with I'm implementing a simple static site but I'd like to eventually add a dynamic backend to give it that
"real time" feel.

As a starting point I copied in the latest [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate/tree/v7.1.0/dist)
distribution code, customised it with my own ideas and then deployed it to an [NGINX](https://nginx.org/) instance running 
on my Pi. I also got a cheap domain name and SSL certificate from the excellent [Gandi](https://www.gandi.net) and used
[my own](https://github.com/RatJuggler/ddclient/tree/add-gandi) updated fork of [ddclient](https://github.com/ddclient/ddclient) to ensure
that the IP address is kept up to date using the Gandi [LiveDNS API](http://doc.livedns.gandi.net/).

On top of this I then overlaid a copy of the [SB-Admin-2](https://github.com/BlackrockDigital/startbootstrap-sb-admin-2)
theme, reusing the gulp build file, and built some more test pages.

# Building the site

Checkout the source code from here:
```
$ git clone https://github.com/RatJuggler/pi-joke-dashboard.git
$ cd pi-joke-dashboard
```
Then install the dependencies with npm:
```
$ npm install
```
To build the site use:
```
$ gulp build 
```
This will result in a "dist" folder containing all the required files with compiled and minified CSS and minified JS.

To list the other available tasks use:
```
$ gulp --tasks
```
