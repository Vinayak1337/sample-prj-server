"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMovie = exports.getMovies = void 0;
const moviesModel_1 = require("../Models/moviesModel");
const getMovies = async (req, res) => {
    try {
        const { limit } = req.body;
        if (!limit) {
            res.status(400).json('Please provide movies limit.');
            return;
        }
        const movies = await moviesModel_1.moviesModel.find({}, { limit });
        res.status(200).json(movies);
    }
    catch (error) {
        res.status(500).json(`Something went wrong. ${error.message}`);
    }
};
exports.getMovies = getMovies;
const postMovie = async (req, res) => {
    try {
        const { movieName, releasedOn, language, thumbnailUrl, videoUrl } = req.body;
        if (!(movieName || releasedOn || language | thumbnailUrl || videoUrl)) {
            res.status(400).json('Incomplete body provided');
            return;
        }
        const movie = await new moviesModel_1.moviesModel({ movieName, releasedOn, language, thumbnailUrl, videoUrl }).save();
        res.status(200).json(movie);
    }
    catch (error) {
        res.status(500).json(`Something went wrong. ${error.message}`);
    }
};
exports.postMovie = postMovie;
