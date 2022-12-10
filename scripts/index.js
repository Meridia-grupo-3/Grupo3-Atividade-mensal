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

    innerBanner.innerHTML = `<video autoplay="true" loop="true"><source src="https://www.freetogame.com/g/${jsonObject[9].id}/videoplayback.webm"><source><video>`;
								
    innerGameBanner.innerHTML = `<div class="game-description">
									<h1>${jsonObject[9].title}</h1>
									<p>${jsonObject[9].platform}</p>
									<p>${jsonObject[9].short_description}</p>
								</div>`;


	for (let i = 1; i < 7; i++) {
		innerGames.innerHTML += `<article class="card-games">
										<div class="fav-game">
											<i class="fa-regular fa-star"></i>
											<img src="${jsonObject[i].thumbnail}" alt="">
										</div>
										<div class="game-description">
											<h1>${jsonObject[i].title}</h1>
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
										<img src="${jsonObject[i].thumbnail}" alt="">
									</div>
									<div class="game-description">
										<h1>${jsonObject[i].title}</h1>
										<p>${jsonObject[i].platform}</p>
										<p>${jsonObject[i].short_description}</p>
									</div>    
								</article>`
		}
		contador += 6;
	}
	btn.addEventListener('click', elementos);
}   