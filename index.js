require('dotenv').config();
const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.EXPRESS_PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

let missingImages = 0;

app.get('/', (req, res) => {
    var questions = getQuestions(3);

    // if (questions.length < 3) {
        
    // }

    questions.then(questions => {
        res.render('questions', { questions: questions });
    });

});

function getQuestions(amount) {
    return fetch(process.env.API_URL + '/random/' + amount)
        .then(response => response.json())
        .then(data => {
            var questions = data.map(question => {
                return {
                    question: question.question,
                    feedback: question.feedback,
                    category: question.category,
                    type: question.type,
                    image: question.image,
                    option1: question.option1,
                    option2: question.option2,
                    option3: question.option3
                };
            });

            // remove questions with missing images
            questions = checkImages(questions);

            // if (missingImages > 0) {
            //     getQuestions(missingImages);
            //     missingImages = 0;
            // }
            
            return questions;
        })
        .catch(error => {
            console.error('Error:', error);
            return null;
        });
}

function checkImages(questions) {
    questions.forEach(question => {
        if (!fs.existsSync("public/assets/img/" + question.image)) {
            questions.splice(questions.indexOf(question), 1);
            missingImages++;
        }
    });
    return questions;
}



app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});