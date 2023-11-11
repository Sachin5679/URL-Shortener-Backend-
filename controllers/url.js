const { nanoid } = require('nanoid');
const URL = require('../models/url')

async function generateShort(req, res){
    const body = req.body;
    if (!body.url) return res.status(400).json({error:'url is required'})
    
    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    })

    return res.json({ id: shortID });
}

async function fetchAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ 
        Clicks: result.visitHistory.length, 
        analytics: result.visitHistory, 
    })
    
}

module.exports = {
    generateShort,
    fetchAnalytics,
}