import { elements } from "./base";

export const toggleHeartButton = isLiked => {
    const determinant = isLiked ? "icon-heart" : "icon-heart-outlined";
    document.querySelector(".song-details__icon use").setAttribute('href', `img/sprite.svg#${determinant}`);
}