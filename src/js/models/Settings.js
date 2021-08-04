import { key } from "../config";

export default class Settings {
    constructor() {
        this.primaryColor = "#e91e40";
        this.primaryDarkColor = "#d81d3c";
        this.secondaryColor = "#272727";
        this.backgroundPicture = "url(../img/background.jpg)";
        this.primaryFontColor = "#f4f2f2";
        this.fontFamily = "'Montserrat', sans-serif";
        this.mainScrollbarColor = "#1f1f1f";
        this.resultsScrollbarColor = "#c51b37";
        this.enlargeText = false;
    }

    applyChanges(changes) {
        if (changes) {
            this.primaryColor = changes.primaryColor;
            this.primaryDarkColor = changes.primaryDarkColor;
            this.secondaryColor = changes.secondaryColor;
            this.backgroundPicture = changes.backgroundPicture;
            this.primaryFontColor = changes.primaryFontColor;
            this.fontFamily = changes.fontFamily;
            this.mainScrollbarColor = changes.mainScrollbarColor;
            this.resultsScrollbarColor = changes.resultsScrollbarColor;
            this.enlargeText = changes.enlargeText;
        }
    }

    readStorage() {
        const rawStorage = localStorage.getItem('instrusyncSettings');

        if(!rawStorage) {
            this.primaryColor = "#e91e40";
            this.primaryDarkColor = "#d81d3c";
            this.secondaryColor = "#272727";
            this.backgroundPicture = "url(../img/background.jpg)";
            this.primaryFontColor = "#f4f2f2";
            this.fontFamily = "'Montserrat', sans-serif";
            this.mainScrollbarColor = "#1f1f1f";
            this.resultsScrollbarColor = "#c51b37";
            this.enlargeText = false;
        } else {
            const storage = JSON.parse(localStorage.instrusyncSettings);
            
            this.primaryColor = storage.primaryColor;
            this.primaryDarkColor = storage.primaryDarkColor;
            this.secondaryColor = storage.secondaryColor;
            this.backgroundPicture = storage.backgroundPicture;
            this.primaryFontColor = storage.primaryFontColor;
            this.fontFamily = storage.fontFamily;
            this.mainScrollbarColor = storage.mainScrollbarColor;
            this.resultsScrollbarColor = storage.resultsScrollbarColor;
            this.enlargeText = storage.enlargeText;
        }
    }

    updateStorage() {
        const settings = {
            primaryColor: this.primaryColor,
            primaryDarkColor: this.primaryDarkColor,
            secondaryColor: this.secondaryColor,
            backgroundPicture: this.backgroundPicture,
            primaryFontColor: this.primaryFontColor,
            fontFamily: this.fontFamily,
            mainScrollbarColor: this.mainScrollbarColor,
            resultsScrollbarColor: this.resultsScrollbarColor,
            enlargeText: this.enlargeText
        }

        localStorage.setItem('instrusyncSettings', JSON.stringify(settings));
    }
}