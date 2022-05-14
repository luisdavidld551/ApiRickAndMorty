const API = "https://rickandmortyapi.com/api/character";


var myCarousel = document.getElementById('carouselExampleInterval')

myCarousel.addEventListener('slide.bs.carousel', function () {
  // do something...
})

const getAPI = (api) => {
    return fetch(api)
        .then((res) => res.json())
        .then((json) => {
            fillData(json.results),pagination(json.info);
        })
        .catch((error) => {
            console.log("Error en la api: ", error);
        });
};

const pagination = (page) => {
    let prevLink = "";
    let nextLink = "";
    let pagina = "";
    pagina += `<li class="page-item ${page.prev == null ? "disabled" : prevLink = ""}">
        <a class="page-link btn" onclick="getAPI('${page.prev}')">Prev</a></li> `;
    pagina += `<li class="page-item ${page.next == null ? "disabled" : nextLink = ""}">
        <a class="page-link btn" onclick="getAPI('${page.next}')">Next</a></li>`;
    document.getElementById("pagination").innerHTML = pagina;
}

const fillData = (data) => {
    let html2 = document.getElementById("characters");
    html2.innerHTML = "";
    data.forEach(api => {
        let lastLocation = api.episode[api.episode.length - 1];
        fetch(lastLocation)
            .then((res) => res.json())
            .then((json) => {
                let html = "";
                html += '<div class="card mb-3 cardRick">';
                html += '<div class="row g-0">';
                html += '<div class="col-md-5">';
                html += `<img src="${api.image}" class="img-fluid rounded-start imgLuis" alt="${api.name}">`;
                html += '</div>';
                html += '<div class="col-md-7">';
                html += '<div class="card-body">';
                html += `<h5 class="card-title hoverStyle">${api.name}</h5>`;
                html += `<strong> <i class="fas fa-circle fa-xs ${api.status.toLowerCase()}"></i> ${api.status} - ${api.species} </strong>`;
                html += '<br /><br />';
                html += ' <p class="card-text">';
                html += `<strong class="strongStyle">Última ubicación conocida:</strong><br /><a href="${api.location.url}" target="_blank" class="hoverStyle">${api.location.name}</a> `;
                html += '<br />';
                html += `<p><strong class="strongStyle">Visto por primera vez en:</strong><br />${json.name}</p>`;
                html += '</p>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '</div>`';
                html2.innerHTML += html;
            })
            .catch((error) => {
                console.log("error in the API", error);
            });
    });
};

getAPI(API);