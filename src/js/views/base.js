export const elements = {
    body: document.querySelector('body'),
    stream: document.querySelector('.stream'),
    cue: document.querySelector('.cue'),
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__input'),
    result: document.querySelector('.result'),
    resultsCont: document.querySelector('.results-cont'),
    details: document.querySelector('.details'),
    lyricsCont: document.querySelector('.lyrics'),
    song: document.querySelector('.song'),
    root: document.documentElement,
    settings: document.querySelector('.settings'),
    settingsForm: document.querySelector('.settings__form'),
    primaryColorInput: document.querySelector('.settings__input[name=primary-color]'),
    primaryColorDarkInput: document.querySelector('.settings__input[name=primary-color-dark]'),
    secondaryColorInput: document.querySelector('.settings__input[name=secondary-color]'),
    backgroundPictureInput: document.querySelector('.settings__input[name=background-picture]'),
    primaryFontColorInput: document.querySelector('.settings__input[name=primary-font-color]'),
    fontFamilyInput: document.querySelector('.settings__input[name=font-family]'),
    mainScrollbarColorInput: document.querySelector('.settings__input[name=main-scrollbar-color]'),
    resultsScrollbarColorInput: document.querySelector('.settings__input[name=results-scrollbar-color]'),
    enlargeTextCheckbox: document.querySelector('.settings__checkbox'),
};

export const renderLoader = (parent, position = "afterbegin") => {
    const markup = `<div class="loader">
                        <img src="img/svg-loaders/tail-spin.svg" alt="loader">
                    </div>`;

    parent.insertAdjacentHTML(`${position}`, markup);                    
}

export const clearLoader = () => {
    const loader = document.querySelector(`.loader`);
    if (loader) loader.parentElement.removeChild(loader); 
}

export const renderResultsType = (type) => {
    const markup = `
            <h3 class="heading-tertiary details__heading">
                ${type}
            </h3>

            <svg class="icon--medium details__icon">
                <use xlink:href="img/sprite.svg#icon-keyboard_arrow_down"></use>
            </svg>
        
    `;
    elements.details.insertAdjacentHTML('afterbegin', markup);
}

export const clearResultsType = () => {
    elements.details.innerHTML = "";
}