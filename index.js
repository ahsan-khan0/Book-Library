///////

const div1 = document.getElementById("table-data");
const div2 = document.getElementById("input-data");
const div3 = document.getElementById("author-data");
const div4 = document.getElementById("publisher-data");
const addBtn = document.getElementById("add-button");
const backBtn = document.getElementById("Gback-btn");
const authorBtn = document.getElementById("author-btn");
const aBackBtn = document.getElementById("arBack-btn");
const publisherBtn = document.getElementById("publisher-btn");
const pBackBtn = document.getElementById("pbBack-btn");

// hiding div and showing another
div1.style.display = "block";
div2.style.display = "none";
div3.style.display = "none";
div4.style.display = "none";

addBtn.addEventListener("click", () => {
  div2.style.display = "block";
  div1.style.display = "none";
});

////////////  Go back button code ////////
backBtn.addEventListener("click", () => {
  div2.style.display = "none";
  div1.style.display = "block";
});

/////// SHOWING AUTHOR DATA ////////
authorBtn.addEventListener("click", () => {
  div1.style.display = "none";
  div3.style.display = "block";
});
authorBtn.addEventListener("click", () => {
  showAuthor();
});
//////////// AUTHOR GOBACK BUTTON/////////
aBackBtn.addEventListener("click", () => {
  div1.style.display = "block";
  div3.style.display = "none";
});

/////// SHOWING PUBLISHER DATA ////////
publisherBtn.addEventListener("click", () => {
  div1.style.display = "none";
  div4.style.display = "block";
});
publisherBtn.addEventListener("click", () => {
  showPublisher();
});
//////////// PUBLISHER  GOBACK BUTTON/////////
pBackBtn.addEventListener("click", () => {
  div1.style.display = "block";
  div4.style.display = "none";
});

// getting data from input
var txtBook = document.getElementById("txtBook");
var txtAuther = document.getElementById("txtAuther");
var txtPub = document.getElementById("txtPub");
var txtDate = document.getElementById("txtDate");
var getData = document.getElementById("get-data");
var local_Data = document.getElementById("local_Data");
/////////////////// GET DATA FUNCTION ////////////////////////

var books;

getData.addEventListener("click", function () {
  txtBookValue = txtBook.value;
  txtAutherValue = txtAuther.value;
  txtPubValue = txtPub.value;
  txtDateValue = txtDate.value;

  let book = {
    bookn: txtBookValue.toLowerCase(),
    author: txtAutherValue.toLowerCase(),
    publisher: txtPubValue.toLowerCase(),
    date: txtDateValue,
  };

  let b1 = localStorage.getItem("data");
  if (b1 == null) {
    books = [];
  } else {
    books = JSON.parse(b1);
  }
  if (
    book.bookn.trim() !== "" &&
    book.author.trim() !== "" &&
    book.publisher.trim() !== "" &&
    book.date.trim() !== ""
  ) {
    books.push(book);
    localStorage.setItem("data", JSON.stringify(books));
  }
  if (txtBookValue === "" && txtAutherValue === "" && txtAutherValue === "") {
    alert("fill all fields");
  } else {
    location.reload();
    showData();
  }
});
/////////////////////////////// SHOW DATA////////////////////
document.addEventListener("DOMContentLoaded", function showData() {
  let b1 = localStorage.getItem("data");
  console.log(b1);
  if (b1 == null) {
    books = [];
  } else {
    books = JSON.parse(b1);
  }
  function updateTable() {
    books.forEach((item, index) => {
      document.querySelector(".book-table").innerHTML += `
    <tr>
    <td>${index + 1}</td>
        <td><input type="text" value = "${item.bookn}" readonly></td>
        <td><input type="text" value = "${item.author}" readonly></td>
        <td><input type="text" value = "${item.publisher}" readonly></td>
        <td><input type="text" value = "${item.date}" readonly></td>
        <td><input onclick="deleteItem(${index})" type="submit" value="Delete" id="deleteBtn-${index}"/>
        <input type="submit" value="Update" id="updateBtn-${index}"/>
        <input type="submit" value="OK" id="okBtn-${index}" />
        <input type="submit" value="Cancel" id="cancelBtn-${index}" />
        </td>

    </tr>`;
    });
    books.forEach((item, index) => {
      const updBtn = document.getElementById(`updateBtn-${index}`);
      const deleBtn = document.getElementById(`deleteBtn-${index}`);
      const okBtn = document.getElementById(`okBtn-${index}`);
      const cancBtn = document.getElementById(`cancelBtn-${index}`);
      okBtn.style.display = "none";
      cancBtn.style.display = "none";
      updBtn.addEventListener("click", () => {
        updBtn.style.display = "none";
        deleBtn.style.display = "none";
        okBtn.style.display = "block";
        cancBtn.style.display = "block";
        const inputs = updBtn
          .closest("tr")
          .querySelectorAll("input[type='text']");
        inputs.forEach((input) => {
          input.removeAttribute("readonly");
        });
      });

      okBtn.addEventListener("click", () => {
        const inputs = okBtn
          .closest("tr")
          .querySelectorAll("input[type='text']");
        inputs.forEach((input, i) => {
          books[index][Object.keys(books[index])[i]] =
            input.value.toLowerCase();
        });
        localStorage.setItem("data", JSON.stringify(books));
        updateTable();
        location.reload();
      });

      cancBtn.addEventListener("click", () => {
        updBtn.style.display = "block";
        deleBtn.style.display = "block";
        okBtn.style.display = "none";
        cancBtn.style.display = "none";
        const inputs = cancBtn
          .closest("tr")
          .querySelectorAll("input[type='text']");
        inputs.forEach((input) => {
          input.setAttribute("readonly", true);
        });
      });
    });
  }
  updateTable();
});

/////////////////////// DELETE ITEM FROM DIV1 (DELETE A  WHOLE ROW)////////////

function deleteItem(index) {
  let b1 = localStorage.getItem("data");
  books = JSON.parse(b1);
  books.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(books));
  location.reload();
  showData();
}

/////////////////////// AUTHOR DATA////////////

document.addEventListener("DOMContentLoaded", function showAuthor() {
  let b1 = localStorage.getItem("data");
  if (b1 == null) {
    books = [];
  } else {
    books = JSON.parse(b1);
  }

  const authorCounts = {};

  for (let i = 0; i < books.length; i++) {
    let author = books[i].author;
    authorCounts[author] = (authorCounts[author] || 0) + 1;
  }

  for (let author in authorCounts) {
    document.querySelector(".author-table").innerHTML += `
    <tr>
   

        <td>${author}</td>
        <td>${authorCounts[author]}</td>
        <td ><input type="submit" value="Delete"  onclick="deleteAuthor('${author}')"  />
        </td>

    </tr>`;
  }
});
/////////////////////// DELETE ITEM FROM DIV3 (Author) ////////////

function deleteAuthor(author) {
  let b1 = localStorage.getItem("data");
  let books = JSON.parse(b1);
  books = books.filter((book) => book.author !== author);
  localStorage.setItem("data", JSON.stringify(books));
  location.reload();
  showAuthor();
}

/////////////////////// PUBLISHER DATA////////////

document.addEventListener("DOMContentLoaded", function showPublisher() {
  let b1 = localStorage.getItem("data");
  if (b1 == null) {
    books = [];
  } else {
    books = JSON.parse(b1);
  }

  const pubCounts = {};
  for (let i = 0; i < books.length; i++) {
    let publisher = books[i].publisher;
    pubCounts[publisher] = (pubCounts[publisher] || 0) + 1;
  }

  for (let publisher in pubCounts) {
    document.querySelector(".publisher-table").innerHTML += `
    <tr>
       
        <td>${publisher}</td>
        <td>${pubCounts[publisher]}</td>
        <td ><input type="submit" value="Delete" onclick="deletePublisher('${publisher}')"/>
        </td>

    </tr>`;
  }
});

/////////////////////// DELETE ITEM FROM DIV4 (PUBLISHER) ////////////

function deletePublisher(publisher) {
  console.log("fghjklsd");

  let b1 = localStorage.getItem("data");
  books = JSON.parse(b1);
  books = books.filter((book) => book.publisher !== publisher);
  localStorage.setItem("data", JSON.stringify(books));
  location.reload();
  showPublisher();
}

function deleteAuthor(author) {
  let b1 = localStorage.getItem("data");
  let books = JSON.parse(b1);
  books = books.filter((book) => book.author !== author);
  localStorage.setItem("data", JSON.stringify(books));
  location.reload();
  showAuthor();
}
