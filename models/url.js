const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz-_", 5)

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    }
});

const Url = mongoose.model('Url', schema);

module.exports.Url = Url

module.exports.generateHash = async function(){
    hash = nanoid().toLocaleLowerCase();
    while(await existsHash(hash)){
        hash = nanoid().toLocaleLowerCase();
    }
    return hash;
}

async function existsHash(hash){
    hash = hash;
    url = await Url.findOne({ hash: hash });
    if(url != null){
        return true;
    }
    return false;
}

module.exports.existsHash = existsHash
