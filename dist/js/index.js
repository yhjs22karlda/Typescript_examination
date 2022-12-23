import { getData } from './fetch.js';
const ol = document.querySelector("#book-list");
const books = await getData();
for (let book of books) {
    const li = document.createElement("li");
    const h2 = document.createElement("h2");
    const ul = document.createElement("ul");
    ul.setAttribute("class", "bookinfo");
    ul.setAttribute("style", "max-height:0px");
    h2.innerText = book.title;
    h2.setAttribute("id", `booktitle_${book.id.toString()}`);
    h2.addEventListener("click", transition);
    ol?.append(li);
    li.append(h2);
    li.append(ul);
    const bookInfoArray = [
        ["Title", book.title],
        ["Author", book.author],
        ["Year", book.year],
        ["Publisher", book.publisher],
        ["Pages", book.pages],
        ["Plot", book.plot],
    ];
    for (let i = 0; i < bookInfoArray.length; i++) {
        const innerLi = document.createElement("li");
        innerLi.innerHTML = `<strong>${bookInfoArray[i][0]}</strong>: ${bookInfoArray[i][1] ?? "N/A"}`;
        ul.append(innerLi);
    }
}
const searchField = document.querySelector("#search");
const searchButton = document.querySelector("#search-button");
searchField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchForBook();
    }
});
searchButton.addEventListener("click", searchForBook);
function searchForBook() {
    const searchString = searchField.value.toLowerCase().replace(/[^\w\s]/gi, "").trim();
    const searchResult = books.find((book) => book.title.toLowerCase().replace(/[^\w\s]/gi, "").trim() === searchString);
    if (searchResult) {
        const searchedElement = document.querySelector(`#booktitle_${searchResult.id}`);
        if (!searchedElement.classList.contains("active"))
            searchedElement.click();
        window.location.href = `#${searchedElement.id}`;
        searchField.value = "";
    }
    else {
        let noMatch = document.querySelector("#search-fail");
        noMatch.innerHTML = "<strong>NO MATCH!</strong>";
        setTimeout(() => {
            noMatch.innerHTML = "";
        }, 2200);
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
