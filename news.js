document.addEventListener('DOMContentLoaded', () => {
    fetchData('data/news.csv', createNewsSections);
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

function createNewsSections(newsItems) {
    const container = document.getElementById('news-container');
    console.log('Parsed news items:', newsItems);

    if (!Array.isArray(newsItems) || newsItems.length === 0) {
        console.error('No news items found.');
        return;
    }

    container.innerHTML = ''; // Clear existing content

    newsItems.forEach((item, index) => {
        console.log('Processing news item:', item);

        const section = document.createElement('div');
        section.classList.add('news-section');
        if (index === 0) section.classList.add('first-section'); // Adds class to the first section

        const content = document.createElement('div');
        content.classList.add('news-content');

        // Format the date
        const date = new Date(item.Date);
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        content.innerHTML = `
            <span class="news-date">${formattedDate}:</span>
            <span class="news-text">${item.Content}</span>
        `;

        section.appendChild(content);
        container.appendChild(section);
    });

    console.log('Finished adding all news items');
}

function navigateTo(select) {
    const url = select.value;
    if (url) {
        window.location.href = url;
    }
}