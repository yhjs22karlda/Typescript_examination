import { getData } from './fetch.js';
let ol = document.querySelector(".book-list");
let books = await getData();
for (let book of books) {
    let li = document.createElement('li');
    let h2 = document.createElement("h2");
    let ul = document.createElement('ul');
    ul.setAttribute('class', 'bookinfo');
    h2.innerText = book.title;
    h2.addEventListener('click', transition);
    ol?.append(li);
    li.append(h2);
    li.append(ul);
    // Hur loopar man ett objekts keys i en viss ordning?
    const infoArray = [book.title, book.author, book.year, book.publisher, book.pages, book.plot];
    for (let i = 0; i < infoArray.length; i++) {
        let innerInfo = document.createElement('li');
        switch (i) {
            case 0:
                innerInfo.innerHTML = `<strong>Title</strong>: ${infoArray[i]}`;
                break;
            case 1:
                innerInfo.innerHTML = `<strong>Author</strong>: ${infoArray[i]}`;
                break;
            case 2:
                innerInfo.innerHTML = `<strong>Year</strong>: ${infoArray[i]}`;
                break;
            case 3:
                innerInfo.innerHTML = `<strong>Publisher</strong>: ${infoArray[i]}`;
                break;
            case 4:
                innerInfo.innerHTML = `<strong>Pages</strong>: ${infoArray[i] === null ? "N/A" : infoArray[i]}`;
                break;
            case 5:
                innerInfo.innerHTML = `<strong>Plot</strong>: ${infoArray[i]}`;
                break;
        }
        ul.append(innerInfo);
    }
}
// transition with help from:
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_accordion_animate
function transition(event) {
    const eventTarget = event.target;
    eventTarget.classList.toggle('active');
    let ul = eventTarget.nextSibling;
    if (ul.style.maxHeight) {
        ul.style.maxHeight = null; // must be null to work, can't find TypeScript workaround (OK if "strict = false" in tsconfig)
    }
    else {
        ul.style.maxHeight = ul.scrollHeight + "px";
    }
    ul.classList.toggle('transition');
}
