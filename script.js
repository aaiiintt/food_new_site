const container = document.getElementById('video-container');

// Base URL for Cloudflare Stream
const baseUrl = 'https://customer-9ysf8sb0845vh87k.cloudflarestream.com';

// Fetch video data from the JSON file
fetch('videos.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log("Fetched video data:", data); // Log the fetched data
    createVideoSections(data);
  })
  .catch(error => {
    console.error('Error loading videos:', error);
    alert('Failed to load videos. Please try again later.');
  });

// Function to create video sections with lazy loading
function createVideoSections(videos) {
  if (!videos || !Array.isArray(videos)) {
    console.error('Invalid video data format');
    return;
  }

  videos.forEach((videoData, index) => {
    console.log("Processing video:", videoData); // Log each video data

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
          const videoUrl = `${baseUrl}/${videoData.id}/manifest/video.m3u8`;
          console.log("Loading video source:", videoUrl); // Log when loading video
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoUrl);
            hls.attachMedia(video);
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoUrl;
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