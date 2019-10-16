const mongoose = require('mongoose');
const actorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    birthday: { type: Date, required: true},
    country: { type: String, required: true, default: 'Bangladesh'}
});

module.exports = mongoose.model('Actor', actorSchema);
