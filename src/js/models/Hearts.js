export default class Hearts {
    constructor() {
        this.hearts = [];
    }

    addHeart( track_id, track_name, artist_name ) {
        const heart = { 
            track: {
                track_id, 
                track_name, 
                artist_name, 
                album_coverart_100x100: "http://s.mxmcdn.net/images-storage/albums/nocover.png"
            } 
        };

        this.hearts.unshift(heart);   
        // console.log(this.hearts); 

        // Persist the data
        this.persistData();
    }
    
    removeHeart(id) {
        const index = this.hearts.findIndex(el => el.track.track_id === id);
        this.hearts.splice(index, 1);
        // console.log(this.hearts);

        // Persist the data
        this.persistData();
    }

    isHearted(id) {
        return this.hearts.findIndex(el => el.track.track_id === id) !== -1;
    }

    persistData() {
        localStorage.setItem('hearts', JSON.stringify(this.hearts));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.hearts);

        if(storage) this.hearts = storage;
    }
    
}