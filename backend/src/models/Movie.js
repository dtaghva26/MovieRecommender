import {Schema, model} from "mongoose"
const movieSchema = new Schema({
    movie_name: {
        type: String
    },
    movie_genre : {
        type: String
    },
    movie_rating : {
        type: Number
    }
})
module.exports = new Model("Movie", movieSchema)