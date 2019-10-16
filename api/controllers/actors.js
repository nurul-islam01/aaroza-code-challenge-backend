const Actor = require('../models/actor');
const mongoose = require('mongoose');

exports.getActors = (req, res, next)=>{
    Actor.find().exec()
        .then(result => {
            const response = {
                count: result.length,
                actors: result.map(actor => {
                    return {
                        name: actor.name,
                        birthday: actor.birthday,
                        country: actor.country,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/api/actors/' + actor._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        }).catch(error => {
            res.status(500).json({
                error: error.message
            });
        });
};

exports.postActors = (req, res, next)=>{
    const actor = new Actor({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        birthday: req.body.birthday,
        country: req.body.country
    });
    actor.save()
        .then(result => {
            res.status(201).json({
                message: 'Actor Created',
                actor: {
                    _id: result._id,
                    name: result.name,
                    birthday: result.birthday,
                    country: result.country
                },
                request: {
                    method: 'GET',
                    url: 'http://localhost:3000/api/actors/' + result._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error.message
            });
        });
};

exports.getActor = (req, res, next) => {
    const id = req.params.actorId;
    Actor.findById(id).select('_id name birthday country')
        .exec()
        .then(actor => {
            if (actor){
                const response = {
                    name: actor.name,
                    birthday: actor.birthday,
                    country: actor.country,
                    request: {
                        method: 'GET',
                        url: 'http://localhost:3000/api/actors/' + actor._id
                    }
                };
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: "No valid data found"
                })
            }
        }).catch(error => {
        res.status(500).json({
            error: error.message
        });
    });

};

exports.updateActors = (req, res, next)=>{
    const id = req.params.actorId;
    const upOps = {};
    for(const ops of req.body){
        upOps[ops.propName] = ops.value;
    }
    Actor.update({ _id: id }, { $set: upOps })
        .exec()
        .then(upActor => {
            const response = {
                message: 'Update successfully',
                request: {
                    method: 'GET',
                    url: 'http://localhost:3000/api/actors/' + id
                }
            };
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({
                error: error.message
            });
        });
};
exports.deleteActors = (req, res, next)=>{
    const id = req.params.actorId;
    Actor.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Actor Deleted successfully',
                request: {
                    method: 'GET',
                    url: 'http://localhost:3000/api/actors'
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Delete failed',
                error: error.message
            });
        });
};

