const video = document.getElementById('video')
const videoControls = document.getElementById('video-controls')
const playButton = document.getElementById('play')
const playbackIcons = document.querySelectorAll('.playback-icons use')
const timeElapsed = document.getElementById('time-elapsed')
const duration = document.getElementById('duration')
const progressBar = document.getElementById('progress-bar')
const seek = document.getElementById('seek')

const videoWorks = document.createElement('video').canPlayType
if (videoWorks) {
  video.controls = false //removes video controls provided by pc (default video controls)
  videoControls.classList.remove('hidden')
}

togglePlay = () => {
  if (video.paused || video.ended) video.play()
  else video.pause()
}

updatePlayButton = () => {
  playbackIcons.forEach((icon) => icon.classList.toggle('hidden'))

  if (video.paused) playButton.setAttribute('data-title', 'Play (k)')
  else playButton.setAttribute('data-title', 'Pause (k)')
}

formatTime = (timeInSeconds) => {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8)
  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  }
}
initializeVideo = () => {
  const videoDuration = Math.round(video.duration)
  const time = formatTime(videoDuration)
  seek.setAttribute('max', videoDuration)
  progressBar.setAttribute('max', videoDuration)
  duration.innerText = `${time.minutes}:${time.seconds}`
  duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}

updateTimeElapsed = () => {
  const time = formatTime(video.currentTime)
  timeElapsed.innerText = `${time.minutes}:${time.seconds}`
  timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}

updateProgressBar = () => {
  seek.value = Math.floor(video.currentTime)
  progressBar.value = Math.floor(video.currentTime)
}
playButton.addEventListener('click', togglePlay)
video.addEventListener('play', updatePlayButton)
video.addEventListener('pause', updatePlayButton)
video.addEventListener('loadedmetadata', initializeVideo)
video.addEventListener('timeupdate', updateTimeElapsed)
video.addEventListener('timeupdate', updateProgressBar)
