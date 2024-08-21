fetch('data/about.json')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
})
.then(data => {
    const container = document.getElementById('about-container');
    data.forEach(section => {
        const sectionElement = document.createElement('section');
        sectionElement.innerHTML = `
            <p>${section.title}</p>
            <p>${section.content}</p>
        `;
        container.appendChild(sectionElement);
    });
})
.catch(error => {
    console.error('Error:', error);
    alert('Error fetching about data. Please try again later.');
});

function addNewSection() {
    const newTitle = document.getElementById('newTitle').value.trim();
    const newContent = document.getElementById('newContent').value.trim();

    if (newTitle && newContent) {
        const encodedContent = encodeContent(newContent);
        const newSection = { title: newTitle, content: encodedContent };

        // Validate newSection structure
        if(validateSection(newSection)) {
            sectionData.unshift(newSection);
            saveToServer();
            alert('New section added successfully!');
        } else {
            alert('Error: Invalid section data structure.');
        }
    } else {
        alert('Please fill out all fields.');
    }
}

function saveSection(index) {
    const updatedContent = document.getElementById(`content-${index}`).value;
    const encodedContent = encodeContent(updatedContent);

    const updatedSection = {
        title: document.getElementById(`title-${index}`).value,
        content: encodedContent
    };

    // Validate updatedSection structure
    if (validateSection(updatedSection)) {
        sectionData[index] = updatedSection;
        saveToServer();
        alert('Section saved successfully!');
    } else {
        alert('Error: Invalid section data structure.');
    }
}

function validateSection(section) {
    return typeof section.title === 'string' && typeof section.content === 'string';
}