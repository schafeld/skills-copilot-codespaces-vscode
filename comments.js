// Create web server
// Get all comments
// Get comment by id
// Create a new comment
// Update comment
// Delete comment
// Get comments by user id
// Get comments by post id
// Get comments by parent comment id
// Get comments by date range
// Get comments by date range and user id
// Get comments by date range and post id
// Get comments by date range and parent comment id
// Get comments by date range, user id and post id
// Get comments by date range, user id and parent comment id
// Get comments by date range, post id and parent comment id
// Get comments by date range, user id, post id and parent comment id

// Import npm packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create web server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Get all comments
app.get('/comments', (req, res) => {
    fs.readFile('./data/comments.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments');
        } else {
            const comments = JSON.parse(data);
            res.status(200).send(comments);
        }
    });
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./data/comments.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments');
        } else {
            const comments = JSON.parse(data);
            const comment = comments.find(c => c.id === id);
            if (comment) {
                res.status(200).send(comment);
            } else {
                res.status(404).send('Comment not found');
            }
        }
    });
});

// Create a new comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    fs.readFile('./data/comments.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments');
        } else {
            const comments = JSON.parse(data);
            comments.push(comment);
            fs.writeFile('./data/comments.json', JSON.stringify(comments), (err) => {
                if (err) {
                    res.status(500).send('Error writing comments');
                } else {
                    res.status(201).send('Comment created');
                }
            });
        }
    });
});
