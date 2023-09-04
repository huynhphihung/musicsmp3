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
const dataSong = [
	{
		id: 1,
		name: 'Hello',
		author: 'Adele',
		src: 'hello.mp3',
	},
	{
		id: 2,
		name: 'Chuyện rằng',
		author: 'Thịnh Suy',
		src: 'chuyenrang.mp3',
	},
	{
		id: 3,
		name: 'Hôm nay tôi buồn',
		author: 'Phùng Khánh Linh',
		src: 'homnaytoibuon.mp3',
	},
	{
		id: 4,
		name: 'Past live',
		author: 'Sapiendream',
		src: 'pastlive.mp3',
	},
];

let isPlaying = true;
let index = 0;
let isRepeat = false;
let isRandom = false;

let time;
const playSong = () => {
	if (isPlaying) {
		song.play();
		isPlaying = false;
		playBtn.innerHTML = `<ion-icon name="pause-outline"></ion-icon>`;
	} else if (!isPlaying) {
		song.pause();
		isPlaying = true;
		playBtn.innerHTML = `<ion-icon name="play-outline"></ion-icon>`;
		clearInterval(time);
	}
};

const changeSong = (dir) => {
	if (dir === 1) {
		index++;
		if (index >= dataSong.length) {
			index = 0;
		}
		isPlaying = true;
	}
	if (dir === -1) {
		index--;
		if (index <= 0) {
			index = 0;
		}
		isPlaying = true;
	}
	if (isRandom) {
		index = Math.floor(Math.random() * dataSong.length);
		isPlaying = true;
	}
	song.setAttribute('src', dataSong[index].src);
	updateDisplay(index);
	playSong();
};
function updateDisplay(index) {
	song.setAttribute('src', dataSong[index].src);
	let title = dataSong[index].name;
	songTitle.innerHTML = title;
	let auth = dataSong[index].author;
	author.innerHTML = auth;
}

function displayTimer() {
	const { duration, currentTime } = song;
	rangeBar.max = duration;
	rangeBar.value = currentTime;
	remainingTime.textContent = formatTimer(currentTime);
	if (!currentTime) {
		remainingTime.textContent = '00:00';
	}
	if (!duration) {
		durationTime.textContent = '00:00';
	} else {
		durationTime.textContent = formatTimer(duration);
	}
}

function formatTimer(number) {
	const min = Math.floor(number / 60);
	const sec = Math.floor(number - min * 60);
	return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
}

playBtn.addEventListener('click', playSong);
nextBtn.addEventListener('click', () => {
	changeSong(1);
});
prevBtn.addEventListener('click', () => {
	changeSong(-1);
});
rangeBar.addEventListener('change', handleChangeBar);
song.addEventListener('ended', () => {
	if (isRepeat) {
		isPlaying = true;
		playSong();
	}
	if (isRandom) {
		changeSong(0);
	} else {
		changeSong(1);
	}
});
loopBtn.addEventListener('click', loopSong);
randomBtn.addEventListener('click', randomSong);

function handleChangeBar() {
	song.currentTime = rangeBar.value;
}

function loopSong() {
	if (isRepeat) isRepeat = false;
	else isRepeat = true;
	console.log(isRepeat);
}

function randomSong() {
	if (isRandom) isRandom = false;
	else isRandom = true;
	console.log(isRandom);
}

updateDisplay(0);
setInterval(displayTimer, 500);
