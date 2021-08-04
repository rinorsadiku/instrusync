import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = "";
}

export const clearResults = () => {
    elements.resultsCont.innerHTML = "";
}

export const generateTitle = type => {
    if(type === "cues") {
        return "Your cues";
    } else if(type === "artists") {
        return "Popular artists";
    } else if(type === "tracks") {
        return "Popular tracks"
    } else {
        return "Your search";
    }
}

const limitResultTitle = (title, limit = 17) => {
    let newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0)

        // return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
};

const renderTrack = (trackList, isHearted) =>  `<li class="result__item" title="${trackList.track.track_name}">
                                    <a href="#${trackList.track.track_id}" class="result__link">
                                        <img src="img/placeholder-song.jpg" alt="Result image" class="result__photo">
                                        <div class="result__details">
                                            <p class="result__track">${limitResultTitle(trackList.track.track_name, 11)}</p>
                                            <p class="result__artist">${limitResultTitle(trackList.track.artist_name)}</p>
                                        </div>
                                        ${!isHearted ? `` : `
                                            <div class="result__icon-background">
                                                <svg class="icon--small">
                                                    <use xlink:href="img/sprite.svg#icon-heart"></use>
                                                </svg>
                                            </div>
                                        `}
                                    </a>
                                </li>`;

const renderArtist = (artistList) =>  `<li class="result__item">
                                    <a href="#" class="result__link">
                                        <img src="img/user-avatar.jpg" alt="Result image" class="result__photo">
                                        <div class="result__details">
                                            <p class="result__track">${artistList.artist.artist_name}</p>
                                        </div>
                                    </a>
                                </li>`;

export const renderResults = (results, title, hearts) => {
    const markup = `
        <div class="details">
            <h3 class="heading-tertiary details__heading">
                ${title}
            </h3>

            <svg class="icon--medium details__icon">
                <use xlink:href="img/sprite.svg#icon-keyboard_arrow_down"></use>
            </svg> 
        </div>


        <ul class="result">
           ${results.map(el => {
               // Had to use the toString method in order to compare the IDs of the result
               if(title === "Popular artists") {
                return renderArtist(el);
               } else {
                   const elementID = el.track.track_id.toString();
                   const isHeart = hearts.isHearted(elementID);
                   return renderTrack(el, isHeart);
               }
           } 
        ).join("")}
        </ul>
    `;
    elements.resultsCont.insertAdjacentHTML('afterbegin', markup);
};