const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'about.json');

// Endpoint to get sections
app.get('/data/about.json', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data file');
        }
        res.send(data);
    });
});

app.get('/test-write', (req, res) => {
    const testData = [{ title: "Test", content: "This is a test." }];
    fs.writeFile(DATA_FILE, JSON.stringify(testData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Test write error:', err);
            return res.status(500).send('Error writing test data');
        }
        res.send({ success: true });
    });
});

// Endpoint to save sections (both add and update)
app.post('/data/about.json', (req, res) => {
    const newData = req.body;

    // Log the incoming data
    console.log('Received data:', newData);

    fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error saving data file:', err);
            return res.status(500).send('Error saving data file');
        }
        res.send({ success: true });
    });
});

app.post('/data/about.json', (req, res) => {
    const newData = req.body;

    // Log and validate incoming data
    console.log('Received data:', newData);
    if (!Array.isArray(newData)) {
        console.error('Invalid JSON structure');
        return res.status(400).send('Invalid JSON structure');
    }

    fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error saving data file:', err);
            return res.status(500).send('Error saving data file');
        }
        res.send({ success: true });
    });
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});