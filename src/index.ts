import {getData} from './fetch.js';
import {Book} from './interfaces.js';

const ol = document.querySelector("#book-list");

const books: Book[] = await getData();

for(let book of books) {
    const li = document.createElement("li");
    const h2 = document.createElement("h2");
    const ul = document.createElement("ul");
    ul.setAttribute("class", "bookinfo")
    ul.setAttribute("style", "max-height:0px")
    h2.innerText = book.title;
    h2.setAttribute("id", `booktitle_${book.id.toString()}`);
    h2.addEventListener("click", transition);
    ol?.append(li)
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
        const innerInfo = document.createElement("li");
        innerInfo.innerHTML = `<strong>${infoArray[i][0]}</strong>: ${infoArray[i][1] ?? "N/A"}`;
        ul.append(innerInfo);
    }
}

const searchField = <HTMLInputElement>document.querySelector("#search");
const searchButton = <HTMLButtonElement>document.querySelector("#search-button");

searchField.addEventListener("keydown", (e) => {
    const pressedKey = (e as KeyboardEvent).key;
    if(pressedKey === "Enter") {
        searchForBook();
    }
})

searchButton.addEventListener("click", searchForBook)

function searchForBook() {
    const searchString = searchField.value.toLowerCase().replace(/[^\w\s]/gi, "").trim();
    const searchResult = books.find((book) => book.title.toLowerCase().replace(/[^\w\s]/gi, "").trim() === searchString); 
    if(searchResult) {
        const searchedElement = <HTMLElement>document.querySelector(`#booktitle_${searchResult.id}`);
        console.log(searchedElement);
        if(!searchedElement.classList.contains("active")) searchedElement.click();
        window.location.href = `#${searchedElement.id}`;
        searchField.value = "";
    } else {
        let noMatch = <HTMLElement>document.querySelector("#search-fail");
        noMatch.innerHTML = "<strong>NO MATCH!</strong>";
        setTimeout(() => {
            noMatch.innerHTML = "";
        }, 2000)
    }
}

function transition(e: Event) {
    const eventTarget = <HTMLElement>e.target;
    eventTarget.classList.toggle("active")
    const ul = <HTMLElement>eventTarget.nextSibling;
    if(ul.style.maxHeight !== "0px") {
        ul.style.maxHeight = "0px";
    } else {
        ul.style.maxHeight = ul.scrollHeight + "px";
    }
    ul.classList.toggle("transition");
}