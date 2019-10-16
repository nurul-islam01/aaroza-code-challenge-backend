const Movie = require('../models/movie');

const mongoose = require('mongoose');
exports.getMovies = (req, res, next) => {
    Movie.find().select('_id title year rating actors')
        .populate('actors', 'name birthday country')
        .exec()
        .then(movies => {
            const response = {
                count: movies.length,
                movies: movies.map(movie => {
                    return {
                        title: movie.title,
                        year: movie.year,
                        rating: movie.rating,
                        actors: movie.actors.map(actor => {
                            return {
                                name: actor.name,
                                birthday: actor.birthday,
                                country: actor.country
                            }
                        }),
                        request: {
                            method: 'GET',
                            url: 'http://localhost:3000/api/movies/' + movie._id
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
exports.postMovies = (req, res, next) => {
    const movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        year: req.body.year,
        rating: req.body.rating,
        actors: req.body.actors
    });

    movie.save().then(movie => {
        const response = {
            message: 'Movie Created successfully',
            request: {
                method: 'GET',
                url: 'http://localhsot:3000/api/movies/' + movie._id
            }
        };
        res.status(201).json(response);
    }).catch(error => {
            res.status(500).json({
                message: 'Movie creating failed',
                error: error.message
            });
        });
};

exports.getMovie = (req, res, next) => {
    const id = req.params.movieId;
    Movie.findById(id).select('_id title year rating actors').populate('actors', 'name birthday country').exec()
        .then(movie => {
            if (!movie){
                return res.status(404).json({
                    message: 'No Valide Data found'
                });
            }
            const response = {
                title: movie.title,
                year: movie.year,
                rating: movie.rating,
                actors: movie.actors.map(actor => {
                    return {
                        name: actor.name,
                        birthday: actor.birthday,
                        country: actor.country
                    }
                }),
                request: {
                    method: 'GET',
                    url: 'http://localhost:3000/api/movies/' + movie._id
                }
            };
            res.status(200).json(response);
        }).catch(error => {
            res.status(500).json({
            error: error.message
        });
    });
};

// exports.updateMovies = (req, res, next) => {
//     res.status(200).json({
//         message: "update Movies works"
//     });
// };
// exports.deleteMovies = (req, res, next) => {
//     res.status(200).json({
//         message: "deleteMovies works"
//     });
// };
