document.addEventListener('DOMContentLoaded', () => {
  fetchData('data/contact.csv', createContactSections);
});

function fetchData(url, callback) {
  Papa.parse(url, {
      download: true,
      header: true,
      complete: function(results) {
          console.log("Parsed data:", results.data);
          callback(results.data);
      },
      error: function(error) {
          console.error('Error parsing CSV:', error.message);
          alert('Error fetching the CSV file at ' + url + ' : ' + error.message);
      }
  });
}

function createContactSections(sections) {
  const container = document.getElementById('contact-container');
  console.log('Received data:', sections);

  if (!Array.isArray(sections) || sections.length === 0) {
      console.error('No data found or data is not an array.');
      return;
  }

  container.innerHTML = ''; // Clear existing content

  sections.forEach((section, index) => {
      console.log('Processing section:', section);

      const sectionElement = document.createElement('div');
      sectionElement.classList.add('contact-section');

      const titleElement = document.createElement('o');
      titleElement.textContent = section.title || 'No Title';

      const contentElement = document.createElement('p');
      contentElement.textContent = section.content || 'No Content';

      sectionElement.appendChild(titleElement);
      sectionElement.appendChild(contentElement);
      container.appendChild(sectionElement);
  });

  console.log('Finished adding all sections');
}

function navigateTo(select) {
  const url = select.value;
  if (url) {
      window.location.href = url;
  }
}