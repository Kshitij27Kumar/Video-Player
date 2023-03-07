const video = document.getElementById('video')
const videoControls = document.getElementById('video-controls')
const playButton = document.getElementById('play')
const playbackIcons = document.querySelectorAll('.playback-icons use')
const timeElapsed = document.getElementById('time-elapsed')
const duration = document.getElementById('duration')
const progressBar = document.getElementById('progress-bar')
const seek = document.getElementById('seek')
const seekTooltip = document.getElementById('seek-tooltip')
const volumeButton = document.getElementById('volume-button')
const volumeIcons = document.querySelectorAll('.volume-button use')
const volumeMute = document.querySelector('use[href="#volume-mute"]')
const volumeLow = document.querySelector('use[href="#volume-low"]')
const volumeHigh = document.querySelector('use[href="#volume-high"]')
const volume = document.getElementById('volume')

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
  const time = formatTime(Math.round(video.currentTime))
  timeElapsed.innerText = `${time.minutes}:${time.seconds}`
  timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}

updateProgress = () => {
  seek.value = Math.round(video.currentTime)
  progressBar.value = Math.round(video.currentTime)
}

updateSeekTooltip = (event) => {
  const skipTo = Math.round(
    (event.offsetX / event.target.clientWidth) *
      parseInt(event.target.getAttribute('max'), 10)
  )
  seek.setAttribute('data-seek', skipTo)
  const t = formatTime(skipTo)
  seekTooltip.textContent = `${t.minutes}:${t.seconds}`
  const rect = video.getBoundingClientRect()
  seekTooltip.style.left = `${event.pageX - rect.left}px`
}

skipAhead = (event) => {
  const skipTo = event.target.dataset.seek
    ? event.target.dataset.seek
    : event.target.value
  video.currentTime = skipTo
  progressBar.value = skipTo
  seek.value = skipTo
}

updateVolume = () => {
  if (video.muted) {
    video.muted = false
  }
  video.volume = volume.value
}

updateVolumeIcon = () => {
  volumeIcons.forEach((icon) => {
    icon.classList.add('hidden')
  })

  volumeButton.setAttribute('data-title', 'Mute (m)')

  if (video.muted || video.volume === 0) {
    volumeMute.classList.remove('hidden')
    volumeButton.setAttribute('data-title', 'Unmute (m)')
  } else if (video.volume > 0 && video.volume <= 0.5) {
    volumeLow.classList.remove('hidden')
  } else {
    volumeHigh.classList.remove('hidden')
  }
}

playButton.addEventListener('click', togglePlay)
video.addEventListener('play', updatePlayButton)
video.addEventListener('pause', updatePlayButton)
video.addEventListener('loadedmetadata', initializeVideo)
video.addEventListener('timeupdate', updateTimeElapsed)
video.addEventListener('timeupdate', updateProgress)
seek.addEventListener('mousemove', updateSeekTooltip)
seek.addEventListener('input', skipAhead)
volume.addEventListener('input', updateVolume)
video.addEventListener('volumechange', updateVolumeIcon)
