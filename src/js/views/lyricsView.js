import { elements } from "./base";

const lineBreak = (char, sentence) => {
    return sentence.replace(char, `.<br>`);
}

export const clearResults = () => {
    elements.song.innerHTML = "";
}

export const renderLyrics = (lyricsObj, isLiked) => {
    const markup = `
        <div class="song-details">
                <h3 class="song-details__heading">${lyricsObj.trackName}</h3>
                
                <button class="song-details__button">
                    <svg class="song-details__icon icon--big">
                        <use xlink:href="img/sprite.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                    </svg>
                </button>
        </div>

        <pre class="lyrics">
${lyricsObj.lyrics}

${lineBreak(". ", lyricsObj.copyright)}
        </pre>
    `;

    elements.song.insertAdjacentHTML('afterbegin', markup);
}

export const renderTrackingURL = url => {
    const script = `<script type="text/javascript" src="${url}">`;
    elements.body.insertAdjacentHTML('beforeend', script);
}