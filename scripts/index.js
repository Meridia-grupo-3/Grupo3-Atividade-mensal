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
    let innerBanner = document.querySelector('.page-banner');
    let innerGames = document.querySelector('.games-wrapper');
    innerBanner.innerHTML = `<img src="${jsonObject[0].thumbnail}" alt="">`;
    
    for (let i = 1; i < 7; i++) {
        innerGames.innerHTML += `<img src="${jsonObject[i].thumbnail}" alt="";>`;
    }

    let contador = 13;
    let i = 7;
    let btn = document.getElementById('btn');

    function elementos(){
        for(i; i<contador;i++){
            innerGames.innerHTML += `<img src="${jsonObject[i].thumbnail}" alt="">`
        }
        contador += 6;
    }
    btn.addEventListener('click', elementos);
}   