// KHAI BÁO HẰNG:
const playBtn = document.querySelector('.play-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const randomBtn = document.querySelector('.random-btn');
const loopBtn = document.querySelector('.loop-btn');
const song = document.getElementById('audio');
const rangeBar = document.querySelector('.rangeBar');
const durationTime = document.querySelector('.duration');
const remainingTime = document.querySelector('.remaining');
const author = document.querySelector('.song-auth');
const songTitle = document.querySelector('.song-title');
const volume = document.querySelector('#volume');
const songImage = document.querySelector('.song-img img');
const url = 'http://localhost:3000/songs';
// KHAI BÁO BIẾN
let isPlaying = true;
let index = 0;
let isLoop = false;
let isRandom = false;
let time;

const data = [
	{
		id: 1,
		title: 'hello',
		author: 'Adele',
		image: './assets/img/hello.jpg',
		src: './hello.mp3',
	},
	{
		id: 2,
		title: 'Past live',
		author: 'Sapiendream',
		image: './assets/img/pastlive.jpg',
		src: './pastlive.mp3',
	},
	{
		id: 3,
		title: 'Chuyện rằng',
		author: 'Thịnh Suy',
		image: './assets/img/chuyenrang.jpg',
		src: './chuyenrang.mp3',
	},
	{
		id: 4,
		title: 'Hôm nay tôi buồn',
		author: 'Phùng Khánh Linh',
		image: './assets/img/homnaytoibuon.jpg',
		src: './homnaytoibuon.mp3',
	},
];

// KHAI BÁO HÀM
// async function getApi(callback) {
// 	await fetch(url)
// 		.then((res) => res.json())
// 		.then(callback);
// 	changeSong(callback);
// 	console.log(callback);
// }

function updateDisplay() {
	songTitle.innerHTML = data[index].title;
	author.innerHTML = data[index].author;
	songImage.setAttribute('src', data[index].image);
}

function playPauseSong() {
	if (isPlaying) {
		song.play();
		songImage.style = 'animation: rotate 3s infinite linear;';
		isPlaying = false;
		playBtn.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
		time = setInterval(displayTimer, 500);
	} else {
		song.pause();

		isPlaying = true;
		playBtn.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
	}
	clearInterval(time);
}

function changeSong(dir) {
	if (dir === 1) {
		// Next Song
		index++;
		if (index >= data.length) {
			index = 0;
		}
		isPlaying = true;
	}
	if (dir === -1) {
		// Prev Song
		index--;
		if (index <= 0) {
			index = 0;
		}
		isPlaying = true;
	}
	if (isRandom) {
		index = Math.floor(Math.random() * data.length);
		console.log(index);
	}
	song.setAttribute('src', data[index].src);
	updateDisplay();
	playPauseSong();
}

function nextSong() {
	changeSong(1);
}

function prevSong() {
	changeSong(-1);
}

function displayTimer() {
	const { duration, currentTime } = song;
	rangeBar.value = currentTime;
	rangeBar.max = duration;
	durationTime.textContent = formatTimer(duration);
	remainingTime.textContent = formatTimer(currentTime);
}

function formatTimer(number) {
	const min = Math.floor(number / 60);
	const sec = Math.floor(number - min * 60);
	return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
}

function rangeBarUpdate() {
	song.currentTime = rangeBar.value;
}

function handleLoop() {
	if (isLoop) {
		isLoop = false;
		loopBtn.classList.remove('active');
	} else {
		isLoop = true;
		loopBtn.classList.add('active');
	}
}

function randomSong() {
	if (isRandom) {
		isRandom = false;
		randomBtn.classList.remove('active');
	} else {
		isRandom = true;
		randomBtn.classList.add('active');
	}
	console.log(isRandom);
}

function changeVol() {
	song.volume = volume.value / 100;
}

// LẮNG NGHE SỰ KIỆN
playBtn.addEventListener('click', playPauseSong);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
rangeBar.addEventListener('change', rangeBarUpdate);
song.addEventListener('ended', () => {
	if (isLoop) {
		isPlaying = true;
		playPauseSong();
	} else {
		changeSong(1);
	}
});
loopBtn.addEventListener('click', handleLoop);
randomBtn.addEventListener('click', randomSong);
volume.addEventListener('change', changeVol);
setInterval(displayTimer, 500);
updateDisplay();

// function start() {
// 	getApi(renderSong);
// 	// renderSong();
// }

// function renderSong(data) {
// 	songTitle.innerHTML = data[index].title;
// 	author.innerHTML = data[index].author;
// 	songImage.setAttribute('src', data[index].image);
// }

// start();
