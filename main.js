let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Gilehriyaan - Dangal",
    artist: "Jonita Gandhi",
    image: "img/img1.jpg",
    path: "music/Gilehriyaan.mp3"
  },
   {
    name: "Inkem Inkem",
    artist: "Sid Sriram",
    image: "img/img4.jpg",
    path: "music/Inkem Inkem Inkem Kaavaale.mp3",
  },
 {
    name: "Makhna-Drive",
    artist: "Yasser Desai, Asees Kaur",
    image: "img/img5.jpg",
    path: "music/Makhna-b-Drive.mp3",
  },
   {
    name: "Shape Of You",
    artist: "Ed Sheeran",
    image: "img/img10.jpg",
    path: "music/Shape_Of_You.mp3",
  },
  {
    name: "Vachindamma naa",
    artist: "Sid Sriram",
    image: "img/img6.jpg",
    path: "music/Vachindamma.mp3",
  },
  {
    name: "Namo Namo",
    artist: "Sumedha Karmahe",
    image: "img/img7.jpg",
    path: "music/Namo-Namo-b-Kedarnath.mp3",
  },
  {
    name: "Qaafirana-Kedarnath",
    artist: " Nikhita Gandhi, Arijit Singh",
    image: "img/img8.jpg",
    path: "music/Qaafirana-b-Kedarnath.mp3",
  },
  {
    name: "Rozana",
    artist: "Shreya Ghoshal",
    image: "img/img9.jpg",
    path: "music/Rozana.mp3",
  },
  {
    name: "Tu Kitni Achhi Hai",
    artist: "Neha Kakkar",
    image: "img/img2.jpg",
    path: "music/Tu Kitni Achhi Hai.mp3"
  },
  {
    name: "Papa Mere Papa ",
    artist: "Sonu Nigam, Shreya Ghoshal",
    image: "img/img3.jpg",
    path: "music/Papa Mere Papa.mp3",
  },
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


