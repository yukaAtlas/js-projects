const quoteContainer = document.getElementById("quote-container");
const quoteTextE = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuote = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show Loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl =
        "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    let myHeaders = new Headers();
    myHeaders.append("Origin", "http://127.0.0.1:5500");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
    try {
        const res = await fetch(`${proxyUrl}${apiUrl}`, requestOptions);
        const data = await res.json();
        const { quoteAuthor, quoteText } = data;
        // If Author is blank, add 'Unknown'
        quoteAuthor === ""
            ? (authorText.innerText = "Unknown")
            : (authorText.innerText = quoteAuthor);

        // Reduce font size for long quotes
        quoteText.length > 120
            ? quoteTextE.classList.add("long-quote")
            : quoteTextE.classList.remove("long-quote");

        quoteTextE.innerText = quoteText;
        removeLoadingSpinner();
    } catch (error) {
        console.log("whoops ", error);
    }
}

//  Tweet Quote
function tweetQuote() {
    const quote = quoteTextE.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuote.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
