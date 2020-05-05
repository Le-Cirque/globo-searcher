const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link:  {
        type: String,
        required: true
    },
    URL:  {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Post', PostSchema);