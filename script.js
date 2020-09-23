let myLibrary = [];

// get native DOM elements
let card_container = document.getElementById('card_container');

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        var read_result;
        if (read == 'true') {
        read_result = "read";
        } else {
            read_result = "not read yet";
        }
        return title + " by " + author + ", " + pages + " pages, " + read_result;
    }
}

// add a book to the library
function addBookToLibrary(title, author, pages, read) {
    // current index is always equal to (number of items in array + 1)
    let currentIndex = myLibrary.length; 
    myLibrary[currentIndex] = new Book(title, author, pages, read);

    // create new card on page
    let newCard = document.createElement('div');
    newCard.className = "card";
    // line 1
    let line1 = document.createElement('p');
    line1.className = "title";
    line1.appendChild(document.createTextNode("Title: " + title));
    // line 2
    let line2 = document.createElement('p');
    line2.className = "author";
    line2.appendChild(document.createTextNode("Author: " + author));
    // line 3
    let line3 = document.createElement('p');
    line3.className = "pages";
    line3.appendChild(document.createTextNode("Page count: " + pages));
    // line 4
    let line4 = document.createElement('p');
    line4.className = "read";
    // change checkbox "on/off" to "Yes!/No!"
    let readResult;
    if (read == true) {
        readResult = "Yes";
    } else {
        readResult = "No";
    }
    line4.appendChild(document.createTextNode("Read: " + readResult));
    // append lines
    newCard.appendChild(line1);
    newCard.appendChild(line2);
    newCard.appendChild(line3);
    newCard.appendChild(line4);

    // set DOM data-index corresponding to myLibrary[] index
    newCard.setAttribute('data-index', currentIndex);

    // add button to toggle read status
    var readButton = document.createElement('button');
    readButton.className = "read_status_button bttn-fill bttn-xs bttn-success bttn-no-outline";
    readButton.textContent = "Toggle read";
    readButton.addEventListener("click", toggleRead);
    newCard.appendChild(readButton);

    // add delete button
    var deleteButton = document.createElement('button');
    deleteButton.className= "delete_button bttn-fill bttn-xs bttn-danger bttn-no-outline";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteCard);
    newCard.appendChild(deleteButton);

    // append card to main card container div
    card_container.appendChild(newCard);
}

// submit form
function submitForm() {
    let title = document.querySelector('#input_title');
    let author = document.querySelector('#input_author');
    let page = document.querySelector('#input_pages');
    let read = document.querySelector('#input_read').checked; // return false/true for unchecked/checked
    addBookToLibrary(title.value, author.value, page.value, read);
    document.getElementById("input_form").reset(); // reset form after submit
}

// toggle "read" status
function toggleRead(e) {
    let parent = e.target.parentNode;
    let readNode = parent.querySelector('.read'); // .read current class node
    const thisIndex = parent.getAttribute('data-index'); // array index of current card
    // toggle visual status and index true/false value
    if (readNode.textContent === "Read: No") {
        readNode.textContent = "Read: Yes";
        myLibrary[thisIndex].read = true;
    } else {
        readNode.textContent = "Read: No";
        myLibrary[thisIndex].read = false;
    }
}

// delete containing card
function deleteCard(e) {
    let parent = e.target.parentNode;
    let parentParent = e.target.parentNode.parentNode;
    const thisIndex = parent.getAttribute('data-index'); // array index of current card
    // set myLibrary index to null -- keeps order of index intact
    myLibrary[thisIndex] = null;
    // delete card
    parentParent.removeChild(parent);
}

// button event listener - submit book input form
document.getElementById('add_book_button').addEventListener("click", submitForm);