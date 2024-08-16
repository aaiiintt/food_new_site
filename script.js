const container = document.getElementById('video-container');

// Fetch video data from the JSON file
fetch('videos.json')
  .then(response => response.json())
  .then(data => createVideoSections(data))
  .catch(error => {
    console.error('Error loading videos:', error);
    alert('Failed to load videos. Please try again later.');
  });

// Function to create video sections with lazy loading
function createVideoSections(videos) {
  videos.forEach((videoData, index) => {
    const section = document.createElement('div');
    section.classList.add('video-section');
    section.setAttribute('data-index', index);

    const videoWrapper = document.createElement('div');
    videoWrapper.classList.add('video-wrapper');

    const video = document.createElement('video');
    video.classList.add('video');
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.controls = false;
    video.alt = videoData.title;

    const titleDescriptionContainer = document.createElement('div');
    titleDescriptionContainer.classList.add('video-title-description-container');

    const title = document.createElement('h2');
    title.classList.add('video-title');
    title.innerText = videoData.title;

    const description = document.createElement('p');
    description.classList.add('video-description');
    description.innerText = videoData.description;

    titleDescriptionContainer.appendChild(title);
    titleDescriptionContainer.appendChild(description);

    videoWrapper.appendChild(video);
    section.appendChild(videoWrapper);
    section.appendChild(titleDescriptionContainer);
    container.appendChild(section);

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoData.url);
            hls.attachMedia(video);
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoData.url;
          }
          observer.unobserve(section);  // Stop observing once loaded
        }
      });
    }, {
      rootMargin: '0px 0px 200px 0px'  // Start loading before the section is in view
    });

    observer.observe(section);
  });
}

// Function to handle navigation based on dropdown selection
function navigateTo(select) {
  const url = select.value;
  if (url !== '') {
    window.location.href = url;
  }
}