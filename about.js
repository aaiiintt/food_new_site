function fetchData(url, callback) {
  Papa.parse(url, {
    download: true,
    header: true,
    complete: function(results) {
      callback(results.data);
    },
    error: function(error) {
      console.error('Error parsing CSV:', error);
      alert('Error fetching about data. Please try again later.');
    }
  });
}

function createAboutSections(data) {
  const container = document.getElementById('about-container');
  data.forEach(section => {
    const sectionElement = document.createElement('section');
    sectionElement.innerHTML = `
      <p>${section.title}</p>
      <p>${section.content}</p>
    `;
    container.appendChild(sectionElement);
  });
}

fetchData('data/about.csv', createAboutSections);

function navigateTo(select) {
  const url = select.value;
  if (url) {
    window.location.href = url;
  }
}