import axios from "axios";
import { key, proxy } from '../config';

export default class Lyrics {
    constructor(id) {
        this.id = id;
    }

    async getLyrics() {
        const results = await axios(`${proxy}http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${key}&track_id=${this.id}`);
        this.lyrics = results.data.message.body.lyrics.lyrics_body;
        this.trackingURL = results.data.message.body.lyrics.script_tracking_url;
        this.copyright = results.data.message.body.lyrics.lyrics_copyright;
        // console.log(this.lyrics);
    }

    async getDetails() {
        const results = await axios(`${proxy}http://api.musixmatch.com/ws/1.1/track.get?apikey=${key}&track_id=${this.id}`);
        this.trackName = results.data.message.body.track.track_name;
        this.artist = results.data.message.body.track.artist_name;
        // console.log(this.trackName);
    }

}