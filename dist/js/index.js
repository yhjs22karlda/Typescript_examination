import { getData } from './fetch.js';
const ol = document.querySelector(".book-list");
const books = await getData();
for (let book of books) {
    const li = document.createElement("li");
    const h2 = document.createElement("h2");
    const ul = document.createElement("ul");
    ul.setAttribute("class", "bookinfo");
    ul.setAttribute("style", "max-height:0px");
    h2.innerText = book.title;
    h2.setAttribute("data-index", book.id.toString());
    h2.addEventListener("click", transition);
    ol?.append(li);
    li.append(h2);
    li.append(ul);
    const infoArray = [
        ["Title", book.title],
        ["Author", book.author],
        ["Year", book.year],
        ["Publisher", book.publisher],
        ["Pages", book.pages],
        ["Plot", book.plot],
    ];
    for (let i = 0; i < infoArray.length; i++) {
        const innerInfo = document.createElement("li");
        innerInfo.innerHTML = `<strong>${infoArray[i][0]}</strong>: ${infoArray[i][1] ?? "N/A"}`;
        ul.append(innerInfo);
    }
}
const searchField = document.querySelector("#search");
const searchButton = document.querySelector("#search-button");
searchField.addEventListener("keydown", (e) => {
    const pressedKey = e.key;
    if (pressedKey === "Enter") {
        searchForBook();
    }
});
searchButton.addEventListener("click", searchForBook);
function searchForBook() {
    const searchString = searchField.value.toLowerCase().replace(/[^\w\s]/gi, "").trim();
    const searchResult = books.find((book) => book.title.toLowerCase().replace(/[^\w\s]/gi, "").trim() === searchString);
    if (searchResult) {
        const searchedElement = document.querySelector(`.book-list h2[data-index="${searchResult.id}"]`);
        searchedElement?.click();
        searchField.value = "";
    }
}
function transition(e) {
    const eventTarget = e.target;
    eventTarget.classList.toggle("active");
    const ul = eventTarget.nextSibling;
    if (ul.style.maxHeight !== "0px") {
        ul.style.maxHeight = "0px";
    }
    else {
        ul.style.maxHeight = ul.scrollHeight + "px";
    }
    ul.classList.toggle("transition");
}
