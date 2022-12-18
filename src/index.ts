import {getData} from './fetch.js';
import {Book} from './interfaces.js';

const ol = <HTMLElement>document.querySelector(".book-list");

const books: Book[] = await getData();

for(let book of books) {
    const li = document.createElement('li');
    const h2 = document.createElement("h2");
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'bookinfo')
    ul.setAttribute('style', 'max-height:0px')
    h2.innerText = book.title;
    h2.addEventListener('click', transition);
    ol.append(li)
    li.append(h2);
    li.append(ul);

    const infoArray = [
        ["Title", book.title],
        ["Author", book.author],
        ["Year", book.year],
        ["Publisher", book.publisher],
        ["Pages", book.pages],
        ["Plot", book.plot],
    ]

    for(let i = 0; i < infoArray.length; i++) {
        const innerInfo = document.createElement('li');
        innerInfo.innerHTML = `<strong>${infoArray[i][0]}</strong>: ${infoArray[i][1] ?? "N/A"}`;
        ul.append(innerInfo);
    }
}

function transition(event: Event) {
    const eventTarget = event.target as HTMLElement;
    eventTarget.classList.toggle('active')
    const ul = eventTarget.nextSibling as HTMLElement;
    if(ul.style.maxHeight !== "0px") {
        ul.style.maxHeight = "0px";
    } else {
        ul.style.maxHeight = ul.scrollHeight + "px";
    }
    ul.classList.toggle('transition');
}