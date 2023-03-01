document.addEventListener("DOMContentLoaded", (e) => {
    fetchImages(), fetchBreeds()
});

let breeds;
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

function fetchImages() {
    fetch(imgUrl)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        for (const image of data.message) {
            addImg(image)
        }
    })
}

function addImg(imgSrc) {
    let dogImgContainer = document.getElementById("dog-image-container")
    img = document.createElement("img")
    img.setAttribute("src", imgSrc)
    dogImgContainer.appendChild(img)
}

function fetchBreeds() {
    fetch(breedUrl)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        breeds = Object.keys(data.message)
        updateBreeds(breeds);
        dropDown();
    })
}

function liBreeds(breed) {
    // Create li element per breed:
    let ul = document.getElementById("dog-breeds")
    let li = document.createElement("li")
    li.textContent = breed;
    ul.appendChild(li)
    
    // Color change:
    li.addEventListener("click", function(e) {
        e.target.style.color = "purple"
    })
}

function updateBreeds(breeds) {
    let ul = document.getElementById("dog-breeds")
    ul.innerHTML = "";
    breeds.forEach(breed => {
        liBreeds(breed)
    });
}

function breedFilter(alphabet) {
    let filtered = breeds.filter(breed => breed.startsWith(alphabet))
    updateBreeds(filtered)
}

function dropDown() {
    let dropSelect = document.getElementById("breed-dropdown");
    dropSelect.addEventListener("change", (e) => {
        let alphabet = e.target.value
        breedFilter(alphabet)
    })
}
