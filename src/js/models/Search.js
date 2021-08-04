import axios from "axios";
import { key, proxy } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const results = await axios(`${proxy}http://api.musixmatch.com/ws/1.1/track.search?apikey=${key}&q_track=${this.query}&page_size=10&page=1&s_track_rating=desc`);
            this.results = results.data.message.body.track_list;
            // TESTING
            // console.log(this.results);
        } catch(error) {
            alert(error);
        }
    }
}