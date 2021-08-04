import Search from './models/Search';
import Lyrics from './models/Lyrics';
import Results from './models/Results';
import Hearts from './models/Hearts';
import Settings from './models/Settings';
import * as searchView from './views/searchView';
import * as lyricsView from './views/lyricsView';
import * as heartsView from './views/heartsView';
import * as settingsView from './views/settingsView';
import { elements, renderLoader, clearLoader, renderResultsType, clearResultsType } from './views/base';


/** Global state of the app
 * - Search Object
 * - Popular Artists Object
 * - Popular Songs Object
 * - Your Cues Object
 */
const state = {};


// Take care of somethings everytime the page loads
window.addEventListener('load', () => {
    // Create a new settings object on page load
    state.settings = new Settings();

    // Create a blank object of Hearts
    state.hearts = new Hearts();

    // Read the settings values in the localStorage
    state.settings.readStorage();

    // Apply the settings values to the css variables
    settingsView.setValues(state.settings)

    // Read from the storage in order to populate the Hearts
    state.hearts.readStorage();
});


/** 
 * SEARCH CONTROLLER
 */

const controlSearch = async () => {
    
    // 1) Read the input values
    const query = searchView.getInput();

    if(query) {
        // 2) Prepare the UI to display the results
        // clearResultsType();
        searchView.clearResults();
        renderLoader(elements.resultsCont);
        // renderResultsType('Your search');

        // 3) New search object and add to state
        state.search = new Search(query);

        
        try {
            // 4) Search for tracks
            await state.search.getResults();

            // 5) Render results to UI
            searchView.renderResults(state.search.results, searchView.generateTitle('search'), state.hearts);
            
        } catch(error) {
            alert(error);
            console.log(error);
        }
        clearLoader();
    }
}



/** 
 * LYRICS CONTROLLER
 */
const controlLyrics = async (id) => {
    // 1) Retrieve the id of the selected element
    
    if(id) {
        // console.log(id);
        // 2) Clear the UI
        lyricsView.clearResults();
        settingsView.clearSettings();
        renderLoader(elements.song, 'beforebegin');
    
        // 3) Create a lyrics object
        state.lyrics = new Lyrics(id);
    
        try {
            // 4) Get the lyrics and the track details
            await state.lyrics.getLyrics();
            await state.lyrics.getDetails();
        
            // 5) Render the lyrics and the tracking URL
            lyricsView.renderLyrics(state.lyrics, state.hearts.isHearted(id));
            lyricsView.renderTrackingURL(state.lyrics.trackingURL);
            
        } catch(error) {
            alert(error);
        }
        clearLoader();
    }
    
}

/** 
 * RESULTS CONTROLLER
 */

const controlResults = async (type) => {
    // 1) Check to see if there is a value present in the parameter
    if(type) {
        // 2) Prepare the UI to display the results
        // clearResultsType();        
        searchView.clearResults();
        renderLoader(elements.resultsCont);
        // renderResultsType('Popular tracks');

        // 3) Create a results object
        state.results = new Results(type);

        try {
            if(state.results.type !== "cues") {
                // 4) Get the results based on the type
                await state.results.getResults();
                
                // 5) Render the results
                searchView.renderResults(state.results.results, searchView.generateTitle(type), state.hearts);
            } else {
                // 4) The results are alredy in so we only need to render them
                searchView.renderResults(state.hearts.hearts, searchView.generateTitle(type), state.hearts);
            }
        } catch(error) {
            alert("Please wait for the API results to set in");
            console.log(error);
        }
        clearLoader();
    }
}

/** 
 * HEARTS CONTROLLER
 */


const controlHeart = () => {
    // 1) Get the id of the lyrics in order to store it in the hearts model
    const id = state.lyrics.id;
    // console.log(id);

    // 2) Check if the lyrics are in the favorite cue
    if(!state.hearts.isHearted(id)) {
        // Insert the new lyrics id in the favorite cue
        state.hearts.addHeart(id, state.lyrics.trackName, state.lyrics.artist);
        // Toggle the like button
        heartsView.toggleHeartButton(true);
    } else {
        // Remove the selected lyrics from the favorite cue
        state.hearts.removeHeart(id);
        // Toggle the like button
        heartsView.toggleHeartButton(false);
    }
}

/** 
 * Settings CONTROLLER
 */

 const controlSettings = () => {
    // Prepare the UI and if for some reason the settings decide to show twice we are going to clear the UI from them as well
    lyricsView.clearResults();
    settingsView.clearSettings();

    // Display the settings
    settingsView.renderSettings();
 }


/////////////////////////////////////

/**
 * EVENT HANDLERS
 */
// On Page Load Event Handling 
// window.addEventListener('hashchange', controlLyrics);
// window.addEventListener('load', controlLyrics);
['hashchange', 'load'].forEach(event => window.addEventListener(event, () => {
    const query = window.location.hash.replace("#", "");
    
    if(query) { 
        if(parseInt(query)) {
            // The query was convertable to int, so lyrics were displayed    
            controlLyrics(query);
        } else if(query === "settings") {
            // Since there is not much to be done here, we are just going to display settings
            controlSettings();
        } else {
            // artists, cues, tracks
            controlResults(query);
        }
    }
}));

// Search Event Handling
elements.searchForm.addEventListener('submit', e => {
   e.preventDefault();

   // Launch the controlSearch method in order to continue the process
   controlSearch();
});

// Heart Event Handling
elements.song.addEventListener('click', e => {
   if(e.target.matches('.song-details__button, .song-details__button *')) {
       // Launch the controlLike function
       controlHeart();
   }
});

// Setting Submission Handling
elements.stream.addEventListener('click', e => {
    // Check if the click came from the form button
    console.log(e.target);
    if(e.target.matches('.settings__button, .settings__button *') && window.location.hash == "#settings") {
        e.preventDefault();

        // Read all the values from the inputs
        const values = settingsView.getInputValues();
        // console.log(values);
        
        // Add those values to the settings class
        state.settings.applyChanges(values);
    
        // Update the localStorage property
        state.settings.updateStorage();
    
        // Set those values to the CSS variables
        settingsView.setValues(state.settings);
    }
});



