// ==UserScript==
// @name         Yandex Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Parshina Olga
// @match        https://yandex.ru/*
// @match        https://www.kuzov-auto.ru/*
// @grant        none
// ==/UserScript==


let keywords = ['магазин для авто', 'обезжириватели и растворители для авто', 'ассортимент товаров и услуг в области авторемонта', 'Краски и компоненты'];
let ya_input = document.getElementById('text');
let keyword = keywords[getRandom(0, keywords.length)];
let button = document.getElementsByClassName('button')[0];
let links = document.links;
let i = 0;


if (button !== undefined) {
    let timerId = setInterval(() => {
        ya_input.value += keyword[i];
        i++;
        if (i == keyword.length) {
            clearInterval(timerId);
            button.click();
        }
    }, 600);
} else if(location.hostname == "www.kuzov-auto.ru") {
    setInterval(()=>{
        let index = getRandom(0,links.length);
        if(getRandom(0,101)>=80) {
            location.href = "https://yandex.ru";
        }
        else if (links[index].href.indexOf("www.kuzov-auto.ru") !== -1)
            if (links[index].target){
                links[index].removeAttribute('target').click(); // - добавила удаление таргета
            }else{
                links[index].click();
            }
    }, getRandom(2000,8000));
} else {
    let nextYaPage = true;
    for (let i = 0; i < links.length; i++) {
        if (links[i].href.includes("www.kuzov-auto.ru")) {
            let link = links[i];
            setTimeout(() => {
            }, getRandom(2000, 8500));
            let nextYaPage = false;
            setTimeout(() => {
                link.click();
            }, getRandom(2000, 7000));

            break;
        }
    }
    if (document.querySelector("[aria-label='Страница 6']").innerText == "6") {
         let nextYaPage = false;
         location.href = "https://yandex.ru/";
      }
     if (nextYaPage) {
         setTimeout(() => {
             document.getElementsByClassName('pager__item_kind_next')[0].click();
        }, getRandom(2000, 8500));
     }
}


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
