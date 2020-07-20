const express = require('express');
const mongoose = require('mongoose');
const validUrl = require('valid-url');
const { Url, generateHash, existsHash } = require('../../models/url');
const config = require('../../config')
const router = express.Router();

router.post('/url', async (req, res, next) => {
    let { hash, url } = req.body;
    try{
        if(!url.startsWith("http")){
            url = "http://" + url
        }
        if(!validUrl.isWebUri(url)){
            console.log(url)
            error = new Error("that's not a URL");
            error.status = 400;
            throw error;
        }
        if(!hash){
            hash = await generateHash();
        }
        if(!(/^([a-z_\-]{1,30})$/.test(hash))){
            error = new Error("key must match {lowercase, -, _}");
            error.status = 403;
            throw error;
        }
        if(await existsHash(hash)){
            error = new Error("key already exists");
            error.status = 409;
            throw error;
        }
        const newUrl = new Url({
            _id: mongoose.Types.ObjectId(),
            url: url,
            hash: hash.toLowerCase()
        })
        await newUrl.save();
        res.status(201).json({
            baseurl: config.baseUrl,
            hash: hash,
            oldurl: url
        });
    }catch(error){
        next(error)
        console.log(error)
    }
})

module.exports = router;