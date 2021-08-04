import axios from "axios";
import { key, proxy } from "../config";


export default class Results {
    constructor(type) {
        this.type = type;
    }

    async getResults() {
        if(this.type === 'artists') {
            const results = await axios(`${proxy}http://api.musixmatch.com/ws/1.1/chart.artists.get?apikey=${key}&country=us&page=1&page_size=10`);
            this.results = results.data.message.body.artist_list;
            console.log(results);
        } else if(this.type === 'tracks') {
            const results = await axios(`${proxy}http://api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=${key}&chart_name=hot&page=1&page_size=10`);
            this.results = results.data.message.body.track_list;
        }
    }

}