// ==UserScript==
// @name         Yandex Bot_2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Parshina Olga
// @match        https://yandex.ru/*
// @match        https://www.kuzov-auto.ru/*
// @match        https://vika-color.ru/*
// @match        https://3m-shop.ru/*
// @grant        none
// ==/UserScript==

let sites = {'www.kuzov-auto.ru': ['магазин для авто первоуральск', 'обезжириватели и растворители для авто', 'ассортимент товаров и услуг в области авторемонта', 'Краски и компоненты'], 'vika-color.ru': ['автоэмали оптом от производителя', '2К акрил-уретановая эмаль', 'широкий выбор лакокрасочных материалов'], '3m-shop.ru': ['абразивные материалы 3M', 'Что сильнее лента или болты?', 'Средства индивидуальной защиты']};
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];
let ya_input = document.getElementById('text');
let button = document.getElementsByClassName('button_size_search')[0];
let links = document.links;
let i = 0;

if (button !== undefined) {
    document.cookie = `site = ${site}`;
}else if(location.hostname == "yandex.ru"){
    site = getCookie("site");
}else{
    site = location.hostname;
}


if (button !== undefined) {
    document.cookie = `site = ${site}`;

    let timerId = setInterval(() => {
        ya_input.value += keyword[i];
        i++;
        if (i == keyword.length) {
            clearInterval(timerId);
            button.click();
        }
    }, 650);

} else if(location.hostname == site) {
    console.log('мы на сайте '+site);
    setInterval(()=>{
        let index = getRandom(0,links.length);
        if(getRandom(0,101)>=80) {
            location.href = "https://yandex.ru";
        }
        else if (links[index].href.indexOf(site) !== -1){
            if (links[index].target){
                links[index].removeAttribute('target').click(); // - добавила удаление таргета
            }else{
                links[index].click();
            }
        }
    }, getRandom(3000,5000));


} else {
    console.log('2-site= '+site);
    let nextYaPage = true;
    for (let i = 0; i < links.length; i++) {
        if (links[i].href.includes(site)) {
            let link = links[i];
            nextYaPage = false;
            console.log("Найдена строка " + links[i]);
            setTimeout(() => {
                location.href = link;
                //link.click();
            }, getRandom(2500, 6500));

            break;
        }
    }

    if (document.querySelector("[aria-label='Текущая страница 5']") != null) {
        let nextYaPage = false;
        location.href = "https://yandex.ru";
    }
    if (nextYaPage) {
        setTimeout(() => {
            document.getElementsByClassName('pager__item_kind_next')[0].click();
        }, getRandom(2000, 4500));
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
