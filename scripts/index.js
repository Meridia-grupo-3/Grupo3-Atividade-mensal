const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c99c30c5aemshc9d5006c22a6a6fp148419jsna6e0e395b6ea',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};


fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
	.then(response => response.json())
	.then (jsonObject => ColocarDados(jsonObject))
	.then(response => console.log(response))
	.catch(err => console.error(err));



function ColocarDados(jsonObject){
	let innerBanner = document.querySelector('.video-banner');
	let innerGameBanner = document.querySelector('.game-banner');
	let innerGames = document.querySelector('.grid');

    innerBanner.innerHTML = `<video autoplay="true" loop="true"><source src="https://www.freetogame.com/g/${jsonObject[0].id}/videoplayback.webm"><source><video>`;
								
    innerGameBanner.innerHTML = `<div class="game-description">
									<h1>${jsonObject[0].title}</h1>
									<p>${jsonObject[0].platform}</p>
									<p>${jsonObject[0].short_description}</p>
								</div>`;


	for (let i = 1; i < 7; i++) {
		innerGames.innerHTML += `<article class="card-games">
										<div class="fav-game">
											<i class="fa-regular fa-star"></i>
											 <a href="${jsonObject[i].game_url}" target= "_blank">
												<img src="${jsonObject[i].thumbnail}" alt="">
											 </a>
										</div>
										<div class="game-description">
											<a href="${jsonObject[i].game_url}" target= "_blank">${jsonObject[i].title}</a>
											<p>${jsonObject[i].platform}</p>
											<p>${jsonObject[i].short_description}</p>
										</div>    
									</article>`;
	}

	let contador = 13;
	let i = 7;
	let btn = document.getElementById('btn');

	function elementos(){
		for(i; i<contador;i++){
			innerGames.innerHTML += `<article class="card-games">
									<div class="fav-game">
										<i class="fa-regular fa-star"></i>
										<a href="${jsonObject[i].game_url}" target= "_blank">
											<img src="${jsonObject[i].thumbnail}" alt="">
									 	</a>
									</div>
									<div class="game-description">
										<a href="${jsonObject[i].game_url}" target= "_blank">${jsonObject[i].title}</a>
										<p>${jsonObject[i].platform}</p>
										<p>${jsonObject[i].short_description}</p>
									</div>    
								</article>`
		}
		contador += 6;
	}
	btn.addEventListener('click', elementos);
	
}   


let url_string = "https://www.freetogame.com/api/games"


//Variáveis filtros
let filter_platform = ""
let filter_category = ""



function loadPage(){
    fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?${filter_category}${filter_platform}`, options)
	.then(response => response.json())
    .then (jsonObject => ColocarDados(jsonObject)) 
	.then(response => console.log(response))
	.catch(err => console.error(err));
}

function filterHome(){
    filter_platform = ""
    filter_category = ""

    fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?$?sort-by=popularity`, options)
	.then(response => response.json())
    .then (jsonObject => ColocarDados(jsonObject)) 
	.then(response => console.log(response))
	.catch(err => console.error(err));

}

function filterPlatform(plataform){             
    if(filter_category.length > 2){                 //caso haja um filtro de categoria, será colocado um & antes do parametro.
        filter_platform = `&platform=${plataform}`;
    }

    if(filter_category.length < 2){                 //caso não haja um filtro de categoria, será chamado normalmente
        filter_platform = `platform=${plataform}`;
    }
    loadPage()
}

function filterCategory(category){
    filter_category = `tag=${category}`;
    loadPage()
}