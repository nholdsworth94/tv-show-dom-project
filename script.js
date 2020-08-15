//You can edit ALL of the code here
let fullEpisodeList;

let search = document.querySelector("#search");
let totals = document.querySelector("#totals");
let episodeSelect = document.querySelector("#episodeSelect");

function setup() {
	const allEpisodes = getAllEpisodes();
	fullEpisodeList = allEpisodes;
	makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
	const rootElem = document.getElementById("root");
	//rootElem.textContent = `Got ${episodeList.length} episode(s)`;

	let html = "";
	let episodeSelectHTML = "<option selected disabled>Select an Episode</option>";

	for (let i = 0; i < episodeList.length; i++) {

		html += generateLayout(episodeList[i]);
		episodeSelectHTML += generateEpisodeSelect(episodeList[i]);
	}

	rootElem.innerHTML = html;
	totals.innerHTML = `Displaying ${episodeList.length}/${fullEpisodeList.length}`;
	episodeSelect.innerHTML = episodeSelectHTML;
}

function generateLayout(ep) {

	let html = `<div id="d${ep.id}" class="container">`;

	html += `<div class="title">${ep.name} (S${padLeft(ep.season)}E${padLeft(ep.number)})</div>`;

	html += `<div class="pictureCont"><img src="${ep.image.medium}" /></div>`;

	html += `<div class="summaryCont">${ep.summary}</div>`;

	html += `</div>`;

	return html;
}

function generateEpisodeSelect(ep) {

	let html = `<option value="${ep.id}">`;

	html += `S${padLeft(ep.season)}E${padLeft(ep.number)} ${ep.name}`;

	html += `</option>`;

	return html;
}

search.addEventListener("keyup", function (e) {

	let episodes = [];
	let searchValue = search.value.toLowerCase();

	if (searchValue == null) {

		episodes = fullEpisodeList;

	} else {

		episodes = fullEpisodeList.filter(x => (x.name.toLowerCase().includes(searchValue) || x.summary.toLowerCase().includes(searchValue)));
	}

	makePageForEpisodes(episodes);
});

episodeSelect.addEventListener("change", function (e) {

	var element = document.querySelector(`#d${episodeSelect.value}`);

	const yOffset = -75;
	const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

	window.scrollTo({ top: y, behavior: 'smooth' });
});

window.onload = setup;

function padLeft(num) {

	return num < 10 ? `0${num}` : num;
}