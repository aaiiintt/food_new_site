document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('video-container');
  const baseUrl = 'https://customer-9ysf8sb0845vh87k.cloudflarestream.com';
  fetchData('data/videos.json', createVideoSections);

  function createVideoSections(videos) {
      videos.forEach(videoData => {
          const section = document.createElement('div');
          section.classList.add('video-section');
          const video = document.createElement('video');
          video.classList.add('video');
          video.playsInline = true;
          video.autoplay = true;
          video.loop = true;
          video.muted = true;
          const titleContainer = document.createElement('div');
          titleContainer.classList.add('video-title-description-container');
          const title = document.createElement('p');
          title.classList.add('video-title');
          title.innerText = videoData.title;
          const description = document.createElement('p');
          description.classList.add('video-description');
          description.innerText = videoData.description;
          titleContainer.append(title, description);
          section.append(video, titleContainer);
          container.append(section);
          const observer = new IntersectionObserver(entries => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      const videoUrl = `${baseUrl}/${videoData.id}/manifest/video.m3u8`;
                      if (Hls.isSupported()) {
                          const hls = new Hls();
                          hls.loadSource(videoUrl);
                          hls.attachMedia(video);
                      } else {
                          video.src = videoUrl;
                      }
                      observer.unobserve(section);
                  }
              });
          }, { rootMargin: '0px 0px 200px 0px' });
          observer.observe(section);
      });
      addTextBlock(container);
  }
});

function addTextBlock(container) {
  const textBlockSection = document.createElement('div');
  textBlockSection.classList.add('video-section');
  const textBlockContainer = document.createElement('div');
  textBlockContainer.classList.add('video-title-description-container');
  textBlockContainer.innerHTML = `
      <p>If you need help with a creative project get in touch.</p>
      <p>Email: <a href="mailto:cook@food.xyz">cook@food.xyz</a></p>
  `;
  textBlockSection.appendChild(textBlockContainer);
  container.appendChild(textBlockSection);
}

function fetchData(url, callback) {
  fetch(url)
    .then(response => response.ok ? response.json() : Promise.reject('Network error'))
    .then(data => callback(data))
    .catch(console.error);
}

function navigateTo(select) {
  const url = select.value;
  if (url) {
      window.location.href = url;
  }
}