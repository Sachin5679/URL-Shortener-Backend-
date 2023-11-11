const express = require('express');
const { connectDB } = require('./connect');
const urlRoute = require('./routes/url');
const URL = require('./models/url')
const app = express();

const PORT = 3000;

connectDB('mongodb://localhost:27017/short-url').then(
    console.log("Connected to DB")
);
app.use(express.json())
app.use('/url', urlRoute);
app.get('/:shortId', async(req, res) => {
    // redirect to actual website when the nanoid generated is used as a query parameter
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{ $push: {
        visitHistory: {
            timestamp: Date.now(),
        },
    }})
    if (entry) {
        res.redirect(entry.redirectURL);
    } else {
        res.status(404).json({ error: 'Short URL not found' });
    }
})

app.listen(PORT, ()=>{
    console.log("Server running");
})