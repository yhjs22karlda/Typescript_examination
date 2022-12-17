const url = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
export async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}
