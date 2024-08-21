import { fetchData } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    fetchData('news.json', createNewsSections);

    function createNewsSections(newsItems) {
        const container = document.getElementById('news-container');
        const fragment = document.createDocumentFragment();

        newsItems.forEach((item, index) => {
            const section = document.createElement('div');
            section.classList.add('news-section');
            if (index === 0) section.classList.add('first-section'); 
            const content = document.createElement('div');
            content.classList.add('news-content');
            content.innerHTML = `
                <span class="news-date">${item.date}:</span>
                <span class="news-text">${item.content}</span>
            `;
            section.appendChild(content);
            fragment.appendChild(section);

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.appendChild(content); // Load content when visible
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '0px 0px 200px 0px' });

            observer.observe(section);
        });

        container.appendChild(fragment);
    }
});