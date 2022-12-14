let innerBanner = document.querySelector('.video-banner');
let innerGameBanner = document.querySelector('.game-banner');
let innerGames = document.querySelector('.grid');
var jogos_exibidos; 
var limitador = 13;
var contadorBusca = 7;
var favorites = [];

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c99c30c5aemshc9d5006c22a6a6fp148419jsna6e0e395b6ea',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};


	/*fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
	.then(response => response.json())
	.then (jsonObject => ColocarDados(jsonObject))
	.then(response => console.log(response))
	.catch(err => console.error(err));*/

	

function ColocarDados(){
	
    var jsonObject = jogos_exibidos;
    innerBanner.innerHTML = `<video autoplay="true" loop="true"><source src="https://www.freetogame.com/g/${jsonObject[0].id}/videoplayback.webm"><source><video>`;						
    innerGameBanner.innerHTML = `<div class="game-description">
									<h1>${jsonObject[0].title}</h1>
									<p>${jsonObject[0].platform}</p>
									<p>${jsonObject[0].short_description}</p>
								</div>`;


	for (let i = 1; i < 7; i++) {
		innerGames.innerHTML += `<article class="card-games">
										<div class="fav-game">
										<a role="button" onclick="favoritesAction('${i}')"><i class="fa-regular fa-star" ></i></a>
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

	limitador = 13;
	contadorBusca = 7;
	
	let btn = document.getElementById('btn');	
	btn.style.display = 'block' ;
	btn.addEventListener('click', elementos);
	
}   

function elementos(){
	let jsonObject = jogos_exibidos;
	for(contadorBusca; contadorBusca < limitador; contadorBusca++){	
		if(contadorBusca >= jsonObject.length)
			return;
		innerGames.innerHTML += `<article class="card-games">
								<div class="fav-game">
								<a role="button" onclick="favoritesAction('${contadorBusca}')"><i class="fa-regular fa-star" ></i></a>
									<a href="${jsonObject[contadorBusca].game_url}" target= "_blank">
										<img src="${jsonObject[contadorBusca].thumbnail}" alt="">
									 </a>
								</div>
								<div class="game-description">
									<a href="${jsonObject[contadorBusca].game_url }" target= "_blank">${jsonObject[contadorBusca].title}</a>
									<p>${jsonObject[contadorBusca].platform}</p>
									<p>${jsonObject[contadorBusca].short_description}</p>
								</div>    
							</article>`
	}
	contadorBusca = contadorBusca + 6;
	limitador = contadorBusca + 6;
}




//Variáveis filtros
let filter_platform = "";
let filter_category = "";



function loadPage(){
	innerGames.innerHTML = ''; 
    fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?${filter_category}${filter_platform}`, options)
	.then(response => response.json())
    .then (jsonObject => {
		jogos_exibidos = jsonObject;
		console.log(jogos_exibidos);
		ColocarDados();
	}) 
	.then(response => console.log(response))
	.catch(err => console.error(err));
}

function filterHome(){
    filter_platform = "";
    filter_category = "";
	innerGames.innerHTML = ''; 

    fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?$?sort-by=popularity`, options)
	.then(response => response.json())
    .then (jsonObject => {
		jogos_exibidos = jsonObject;
		console.log(jogos_exibidos);
		ColocarDados();
	}) 
	.then(response => console.log(response))
	.catch(err => console.error(err));

}

function filterPlatform(plataform){   
	console.log(plataform)
	innerGames.innerHTML = '';          
    if(filter_category.length > 2){                 //caso haja um filtro de categoria, será colocado um & antes do parametro.
        filter_platform = `&platform=${plataform}`;
    }

    if(filter_category.length < 2){                 //caso não haja um filtro de categoria, será chamado normalmente
        filter_platform = `platform=${plataform}`;
    }
    loadPage()
}

function filterCategory(category){
	innerGames.innerHTML = ''; 
    filter_category = `category=${category}`;
    loadPage()
}


//FAVORITES.
function favoritesAction(index){
    let localStorageFavorites = localStorage.getItem('favorites');
    let listafavoritos;	

	

    if(localStorageFavorites != undefined){
        listafavoritos = JSON.parse(localStorageFavorites);
		for(let i = 0 ; i < listafavoritos.length ; i++ ){
            if(listafavoritos[i].id == jogos_exibidos[index].id){
				favorites.splice(i, 1);

				
				localStorage.setItem('favorites', JSON.stringify(favorites));
				return;
            }
		}

    }
	favorites.push(jogos_exibidos[index]);
    localStorage.setItem('favorites', JSON.stringify(favorites));


}

//mostrar os favoritos

function mostrarFav(){
	let localStorageFavorites = localStorage.getItem('favorites');
	if(localStorageFavorites == undefined){
        return;
	}
	
	favorites = JSON.parse(localStorageFavorites);
	

	
	innerGameBanner.innerHTML = "";
	innerGames.innerHTML="";
	// console.log(localStorage);
	
	let btn = document.getElementById('btn');
	btn.style.display = 'none' ;
	

	if ( favorites.length === 0) {
		innerGames.innerHTML += `
								<article class="fav-alert">
									<p></p>
								</article>
								<article class="fav-alert">
									<p>Você ainda não adicionou nenhum jogo aos favoritos</p>
								</article>`;
	}


	for (let i = 0; i < favorites.length; i++) {
		innerGames.innerHTML += `<article class="card-games">
										<div class="fav-game">
										<a role="button" onclick="removeFavoritosTela('${i}')"><i class="fa-regular fa-star" ></i></a>
											 <a href="${favorites[i].game_url}" target= "_blank">
												<img src="${favorites[i].thumbnail}" alt="">
											 </a>
										</div>
										<div class="game-description">
											<a href="${favorites[i].game_url}" target= "_blank">${favorites[i].title}</a>
											<p>${favorites[i].platform}</p>
											<p>${favorites[i].short_description}</p>
										</div>    
									</article>`;
	}	
}

function removeFavoritosTela(index){
	favorites = JSON.parse(localStorage.getItem('favorites'));
	favorites.splice(index, 1);
	localStorage.setItem('favorites', JSON.stringify(favorites));
	mostrarFav();
}

filterHome()