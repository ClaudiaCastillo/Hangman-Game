// Creating a giant hangmanGame object that will house all of our logic and variables.
var hangmanGame = {

    // Object of all words that can be chosen, along with info such as their picture and a funfacts clip.
    wordsToPick: {
        "groundhog": {
            picture: "groundhogDay.jpg",
            funfacts: "Groundhog Day falls on February 2 in the United States. It is a part of popular culture among many Americans and it centers on the idea of the groundhog coming out of its home to “predict” the weather."
        },
        "flag": {
            picture: "flagDay.jpg",
            funfacts: "People across the United States celebrate Flag Day on June 14 each year to honor the United States flag and to commemorate the flag’s adoption. On the same day, the United States Army celebrates its birthday."
        },
        "independence": {
            picture: "independenceDay.jpg",
            funfacts: "Independence Day is annually celebrated on July 4 and is often known as 'the Fourth of July'. It is the anniversary of the publication of the declaration of independence from Great Britain in 1776. Patriotic displays and family events are organized throughout the United States."
        },
        "labor": {
            picture: "laborDay.jpg",
            funfacts: "Labor Day is on the first Monday of September every year. It was originally organized to celebrate various labor unions' strengths of and contributions to the United States' economy."
        },
        "veterans": {
            picture: "veteransDay.jpg",
            funfacts: "In the USA, Veterans Day annually falls on November 11. This day is the anniversary of the signing of the armistice, which ended the World War I hostilities between the Allied nations and Germany in 1918. Veterans are thanked for their services to the United States on Veterans Day."
        },
        "thanksgiving": {
            picture: "thanksgivingDay.jpg",
            funfacts: "Thanksgiving Day in the United States is a holiday on the fourth Thursday of November. It precedes Black Friday."
        },
        "columbus": {
            picture: "columbusDay.jpg",
            funfacts: "Columbus Day, which is on the second Monday of October, remembers Christopher Columbus' arrival to the Americas on October 12, 1492. This holiday is controversial because the European settlement in the Americas led to the demise of the history and culture of the indigenous peoples."
        },
        "christmas": {
            picture: "christmasDay.jpg",
            funfacts: "Many people in the United States celebrate Christmas Day on December 25. The day celebrates Jesus Christ's birth. It is often combined with customs from pre-Christian winter celebrations. Many people erect Christmas trees, decorate their homes, visit family or friends and exchange gifts."
        },
        "black": {
            picture: "blackfriday.jpg",
            funfacts: "Black Friday is the day after Thanksgiving Day and the Friday before Cyber Monday in the United States. It is a busy shopping day and is a holiday in some states."
        },
        "cyber": {
            picture: "cybermonday.jpg",
            funfacts: "Cyber Monday falls on the first Monday after Thanksgiving Day and Black Friday in the United States. It's becoming one of busiest online shopping days for deals and discounts in the US."
        },
        "memorial": {
            picture: "memorialDay.jpg",
            funfacts: "Memorial Day is observed on the last Monday of May. It was formerly known as Decoration Day and commemorates all men and women who have died in military service for the United States. Many people visit cemeteries and memorials on Memorial Day and it is traditionally seen as the start of the summer season."
        }
    },

    // Variables that set the initial state of our hangman game.
    wordInPlay: null,
    lettersOfTheWord: [],
    matchedLetters: [],
    guessedLetters: [],
    guessesLeft: 0,
    totalGuesses: 0,
    letterGuessed: null,
    wins: 0,

    // The setupGame method is called when the page first loads.
    setupGame: function() {
        // Here we pick a random word.
        var objKeys = Object.keys(this.wordsToPick);
        this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

        // Split the chosen word up into its individual letters.
        this.lettersOfTheWord = this.wordInPlay.split("");
        // Builds the representation of the word we are trying to guess and displays it on the page.
        // At the start it will be all underscores since we haven't guessed any letters ("_ _ _ _").
        this.rebuildWordView();
        // This function sets the number of guesses the user gets, and renders it to the HTML.
        this.processUpdateTotalGuesses();
    },

    // This function is run whenever the user guesses a letter..
    updatePage: function(letter) {
        // If the user has no guesses left, restart the game.
        if (this.guessesLeft === 0) {
            this.restartGame();
        }
        // Otherwise...
        else {
            // Check for and handle incorrect guesses.
            this.updateGuesses(letter);

            // Check for and handle correct guesses.
            this.updateMatchedLetters(letter);

            // Rebuild the view of the word. Guessed letters are revealed, unguessed letters have a "_".
            this.rebuildWordView();

            // If the user wins, restart the game.
            if (this.updateWins() === true) {
                this.restartGame();
            }
        }

    },

    // This function governs what happens when the user makes an incorrect guess (that they haven't guessed before).
    updateGuesses: function(letter) {
        // If the letter is not in the guessedLetters array, and the letter is not in the lettersOfTheWord array..
        if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {

            // Add the letter to the guessedLetters array.
            this.guessedLetters.push(letter);

            // Decrease guesses by one.
            this.guessesLeft--;

            // Update guesses remaining and guesses letters on the page.
            document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
            document.querySelector("#guessed-letters").innerHTML =
                this.guessedLetters.join(", ");
        }
    },

    // This function sets the initial guesses the user gets.
    processUpdateTotalGuesses: function() {
        // The user will get more guesses the longer the word is.
        this.totalGuesses = this.lettersOfTheWord.length + 5;
        this.guessesLeft = this.totalGuesses;

        // Render the guesses left to the page.
        document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
    },

    // This function governs what happens if the user makes a successful guess.
    updateMatchedLetters: function(letter) {
        // Loop through the letters of the "solution".
        for (var i = 0; i < this.lettersOfTheWord.length; i++) {
            // If the guessed letter is in the solution, and we haven't guessed it already..
            if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
                // Push the newly guessed letter into the matchedLetters array.
                this.matchedLetters.push(letter);
            }
        }
    },

    // This function builds the display of the word that is currently being guessed.
    // For example, if we are trying to guess "blondie", it might display "bl_ndi_".
    rebuildWordView: function() {
        // We start with an empty string.
        var wordView = "";

        var displayAdd = "";

        var wordLength = this.lettersOfTheWord.length;

        if (wordLength < 6){
            if (this.lettersOfTheWord[0] === "b"){
                displayAdd = " friday";
            }
            else if (this.lettersOfTheWord[0] === "c"){
                displayAdd = " monday";
            }
            else{
            displayAdd = " day";
            }
        }
        else{
            displayAdd = " day";
        }

        // Loop through the letters of the word we are trying to guess..
        for (var i = 0; i < this.lettersOfTheWord.length; i++) {
            // If the current letter has been guessed, display that letter.
            if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
                wordView += this.lettersOfTheWord[i];
            }
            // If it hasn't been guessed, display a "_" instead.
            else {
                wordView += "&nbsp;_&nbsp;";
            }
        }


        // Update the page with the new string we built.
        document.querySelector("#current-word").innerHTML = wordView + displayAdd;
    },

    // Function that "restarts" the game by resetting all of the variables.
    restartGame: function() {
        document.querySelector("#guessed-letters").innerHTML = "";
        this.wordInPlay = null;
        this.lettersOfTheWord = [];
        this.matchedLetters = [];
        this.guessedLetters = [];
        this.guessesLeft = 0;
        this.totalGuesses = 0;
        this.letterGuessed = null;
        this.setupGame();
        this.rebuildWordView();
    },

    // Function that checks to see if the user has won.
    updateWins: function() {
        var win;

        // this won't work for words with double or triple letters
        // var lettersOfTheWordClone = this.lettersOfTheWord.slice(); //clones the array
        // this.matchedLetters.sort().join('') == lettersOfTheWordClone.sort().join('')

        // If you haven't correctly guessed a letter in the word yet, we set win to false.
        if (this.matchedLetters.length === 0) {
            win = false;
        }
        // Otherwise, we set win to true.
        else {
            win = true;
        }

        // If a letter appears in the lettersOfTheWord array, but not in the matchedLetters array, set win to false.
        // In English, if you haven't yet guessed all the letters in the word, you don't win yet.
        for (var i = 0; i < this.lettersOfTheWord.length; i++) {
            if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
                win = false;
            }
        }

        // If win is true...
        if (win) {

            // Increment wins.
            this.wins = this.wins + 1;

            // Update wins on the page.
            document.querySelector("#wins").innerHTML = this.wins;

            // Update the funfacts title and holiday on the page.

            document.querySelector("#holiday").innerHTML = this.wordsToPick[this.wordInPlay].funfacts;

            // Update the image of the holiday on the page.
            document.querySelector("#holiday-div").innerHTML =
                "<img class='holiday-image' src='assets/images/" +
                this.wordsToPick[this.wordInPlay].picture + "' alt='" +
                this.wordsToPick[this.wordInPlay].funfacts + "'>";

            // return true, which will trigger the restart of our game in the updatePage function.
            return true;
        }
        // If win is false, return false to the updatePage function. The game goes on!
        return false;
    }
};

// Initialize the game when the page loads.
hangmanGame.setupGame();

// When a key is pressed..
document.onkeyup = function(event) {
    // Capture pressed key and make it lowercase.
    hangmanGame.letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    // Pass the guessed letter into our updatePage function to run the game logic.
    hangmanGame.updatePage(hangmanGame.letterGuessed);
};