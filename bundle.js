(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){



window.addEventListener("load", solve);

const reader = new FileReader();

function solve() {
    function fillData() {
        const fs = require('fs');
    
        let data = [];
        try {
            data = fs.readFileSync('C:\/Users\/sa6ko\/OneDrive\/Desktop\/WeatherApp\/Data\/countryList.txt', 'utf8');
    
        } catch (err) {
            console.error(err);
        }
        data = data.split('\n');
        return data;
    }
   
    const button = document.querySelector("button");
    const inputElement = document.querySelector("input");
   // const countryData = fillData().find(c => c[0] == inputElement.value) 
    button.addEventListener("click", showInfo);

    function showInfo(e) {

        e.preventDefault();
        console.log(fillData());
    }

}
},{"fs":1}]},{},[2]);
