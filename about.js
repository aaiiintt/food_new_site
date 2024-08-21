function createAboutSections(data) {
  const container = document.getElementById('about-container');
  console.log('Received data:', data);

  if (!Array.isArray(data) || data.length === 0) {
    console.error('No data found or data is not an array.');
    return;
  }

  // Clear existing content
  container.innerHTML = '';

  data.forEach((section, index) => {
    console.log(`Processing section ${index}:`, section);

    const sectionElement = document.createElement('div');
    sectionElement.classList.add('about-section');

    const titleElement = document.createElement('p');
    titleElement.textContent = section.title || 'No Title';
    sectionElement.appendChild(titleElement);

    const contentElement = document.createElement('p');
    contentElement.textContent = section.content || 'No Content';
    sectionElement.appendChild(contentElement);

    container.appendChild(sectionElement);

    console.log(`Added section ${index} to DOM`);
  });

  console.log('Finished adding all sections');
}

function fetchData(url, callback) {
  Papa.parse(url, {
    download: true,
    header: true,
    complete: function(results) {
      console.log("Raw parsed data:", results);
      callback(results.data);
    },
    error: function(error) {
      console.error('Error parsing CSV:', error);
      alert('Error fetching about data. Please try again later.');
    }
  });
}

fetchData('data/about.csv', createAboutSections);

function navigateTo(select) {
  const url = select.value;
  if (url) {
    window.location.href = url;
  }
}