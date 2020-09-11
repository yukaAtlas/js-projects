const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;
// Unsplash API
let initialCount = 5;
const apiKey = "rc3_i5BgMzIV_aHH3Hiz-p-Z9qPAKI9oGKZTPAWY38s";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper Function to set attributes on DOM Elements;
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function updateAPIURLWithNewCount(count) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
}

// Create Elements For Links & Photos, add to DOM
function displayPhotos(arr) {
    imagesLoaded = 0;
    totalImages = arr.length;
    // Run function for each object in photosArray
    arr.forEach(({ alt_description, links, urls }) => {
        // Create <a> to link to Unsplash
        const item = document.createElement("a");
        setAttributes(item, {
            href: links.html,
            target: "_blank",
        });
        // Create <img> for photo
        const img = document.createElement("img");
        setAttributes(img, {
            src: urls.regular,
            alt: alt_description,
            title: alt_description,
        });
        // Check when each is finished loading
        img.addEventListener("load", imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const res = await fetch(apiUrl);
        const photosArray = await res.json();
        displayPhotos(photosArray);
        if (initialLoad) {
            updateAPIURLWithNewCount(30);
            initialLoad = false;
        }
    } catch (err) {
        // Catch Error here
        console.log(err);
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
    if (
        window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 1000 &&
        ready
    ) {
        ready = false;
        getPhotos();
    }
});

getPhotos();
