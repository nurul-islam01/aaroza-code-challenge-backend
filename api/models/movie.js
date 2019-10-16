const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true},
    year: { type: Date, required: true},
    rating: { type: Number, required: true, default: 0},
    actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor', required: true}]
});

module.exports = mongoose.model('Movie', movieSchema);
