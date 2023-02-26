// Generates the HTML code for the carousel element
function createCarousel(id, images) {
let carousel =
    `<div id="${id}" class="carousel slide services_img" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#${id}" data-slide-to="0" class="active"></li>
            <li data-target="#${id}" data-slide-to="1"></li>
        </ol>

    <div class="carousel-inner">`;
for (let i = 0; i < 2; i++) {
    carousel +=    
        `<div class="carousel-item ${i === 0 ? "active" : ""}">
            <img class="d-block w-100" src="images/${images[i]}">
        </div>`;
    }

carousel += 
    `</div>
        <a class="carousel-control-prev" href="#${id}" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>

        <a class="carousel-control-next" href="#${id}" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>`;
    
carousel +=    `<div class="btn_main"><a href="Pieces.html">${images[2]}</a></div>`;
    return carousel;
}

// Retrieves input values and updates the webpage with the generated carousel for each set of input values
function displayCarousel(inputID, divID) {
    const input = document.getElementById(inputID);
    const images = input.value.split(",");
    const carouselHtml = createCarousel(`my${divID}`, images); // images contain 1st and 2nd image and the name of the piece
    const container = document.getElementById(divID);
    container.innerHTML = carouselHtml;
}


// Main
displayCarousel("input1", "carousel1");
displayCarousel("input2", "carousel2");
displayCarousel("input3", "carousel3");
displayCarousel("input4", "carousel4");
displayCarousel("input5", "carousel5");
displayCarousel("input6", "carousel6");
