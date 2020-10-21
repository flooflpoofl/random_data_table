const express = require('express');
const chance = require('chance').Chance();

const app = express();

app.use(express.static('public'));

app.get('/data', (req, res) => {

    const data = {
        headers: [
            'Name',
            'Species',
            'Age',
            'Profession'
        ],
        rows: new Array(chance.integer({min: 5, max: 12})).fill(undefined).map(() => {
            return [
                chance.first(),
                chance.animal(),
                chance.age(),
                chance.profession()
            ];
        }),
        lastUpdate: new Date().toISOString()
    };

    res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}...`));