import { elements } from "./base";

export const getInputValues = () => {
    const values = {
        primaryColor: `#${elements.primaryColorInput.value}`,
        primaryDarkColor: `#${elements.primaryColorDarkInput.value}`,
        secondaryColor: `#${elements.secondaryColorInput.value}`,
        backgroundPicture: `${elements.backgroundPictureInput.value}`,
        primaryFontColor: `#${elements.primaryFontColorInput.value}`,
        fontFamily: elements.fontFamilyInput.value,
        mainScrollbarColor: `#${elements.mainScrollbarColorInput.value}`,
        resultsScrollbarColor: `#${elements.resultsScrollbarColorInput.value}`,
        enlargeText: elements.enlargeTextCheckbox.checked,
    }
    // console.log(values);
    return values;
};

export const setValues = settings => {
    elements.root.style.setProperty('--primary-color', settings.primaryColor);
    elements.root.style.setProperty('--primary-color-dark', settings.primaryDarkColor);
    elements.root.style.setProperty('--secondary-color', settings.secondaryColor);
    elements.root.style.setProperty('--background-picture', settings.backgroundPicture);
    elements.root.style.setProperty('--primary-text-color', settings.primaryFontColor);
    elements.root.style.setProperty('--main-font', settings.fontFamily);
    elements.root.style.setProperty('--scrollbar-color', settings.mainScrollbarColor);
    elements.root.style.setProperty('--scrollbar-color-second', settings.resultsScrollbarColor);

    if(settings.enlargeText === true) {
        elements.root.style.setProperty('--font-size-1', `${1.2}rem`);
        elements.root.style.setProperty('--font-size-2', `${1.3}rem`);
        elements.root.style.setProperty('--font-size-3', `${2.5}rem`);
    } else {
        elements.root.style.setProperty('--font-size-1', `${1.1}rem`);
        elements.root.style.setProperty('--font-size-2', `${1.2}rem`);
        elements.root.style.setProperty('--font-size-3', `${2.3}rem`);
    }
};

export const renderSettings = () => elements.settings.style.display = 'block';

export const clearSettings = () => elements.settings.style.display = "none";