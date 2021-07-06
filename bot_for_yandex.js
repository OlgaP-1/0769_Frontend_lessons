// ==UserScript==
// @name         Yandex Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Parshina Olga
// @match        https://yandex.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

//https://музыкалка-онлайн.рф/ https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/
//зашифровал не так как yandex, поэтому отключаю
//let url_i = 'https://музыкалка-онлайн.рф';
//let encoded = encodeURI(url_i);
//console.log(encoded);


let keywords = ['гобой', 'как звучит флейта', 'валторна'];
let keyword = keywords[getRandom(0, keywords.length)];
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
let button = document.getElementsByClassName('button')[0];
let links = document.links;

if (button !== undefined) {
  document.getElementById('text').value = keyword;
  document.getElementsByClassName('button')[0].click();
} else {
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.includes("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")) {
      let link = links[i];
      link.click();
      break;
    }
  }
}
