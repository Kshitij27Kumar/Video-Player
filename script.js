const video = document.getElementById('video')
const videoControls = document.getElementById('video-controls')
const playButton = document.getElementById('play')
const playbackIcons = document.querySelectorAll('.playback-icons use')

const videoWorks = document.createElement('video').canPlayType
if (videoWorks) {
  video.controls = false //removes video controls provided by pc (default video controls)
  videoControls.classList.remove('hidden')
}

console.log(videoWorks)
togglePlay = () => {
  if (video.paused || video.ended) video.play()
  else video.pause()
}

updatePlayButton = () => {
  playbackIcons.forEach((icon) => icon.classList.toggle('hidden'))

  if (video.paused) playButton.setAttribute('data-title', 'Play (k)')
  else playButton.setAttribute('data-title', 'Pause (k)')
}

playButton.addEventListener('click', togglePlay)
video.addEventListener('play', updatePlayButton)
video.addEventListener('pause', updatePlayButton)
