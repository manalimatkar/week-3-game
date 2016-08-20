window.onload = function(){

	//Alphabet array to display text keyboard
	var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

    var carList;           //Array of cars
    var choosenCar;        //Choosen car
    var word;              // Selected word
    var guess ;            // Geuss
    var geusses = [ ];     // Stored geusses
    var letterGuessed = [];// Store the letters guessed
    var lives ;            // Lives
    var counter ;          // Count correct geusses
    var wins = 0;              //Track wins

    // Get elements
  	var showLives = document.getElementById("mylives");

    var createLetterGrid = function(){
    	letterGrid = document.getElementById("letterGrid");
    	letters = document.createElement('ul');

    	// Alphabet Letter Grid
    	for (var i = 0; i < alphabet.length ; i++) {
    		letters.id = 'alphabet';
    		list = document.createElement('li');
      		list.id = 'letter';
      		list.innerHTML = alphabet[i];

      		checkWord();

      		letterGrid.appendChild(letters);
      		letters.appendChild(list);
    	}

    }// createLetterGrid Ends

    createWordHolder = function(){

    	wordHolder = document.getElementById('hold');
        guessWordHolder = document.createElement('ul');

        for (var i = 0; i < word.length; i++){
        	guessWordHolder.setAttribute('id', 'my-word');
        	guess = document.createElement('li');
      		guess.setAttribute('class', 'guess');
      		guess.innerHTML = "_";

      		geusses.push(guess);
      		
      		wordHolder.appendChild(guessWordHolder);
        	guessWordHolder.appendChild(guess);
        }

   
    }//createWordHolder ends

    myLives = function(){
    	showLives.innerHTML = "You have " + lives + " lives";
	    if (lives < 1) {
	      showLives.innerHTML = "Game Over";
	    }
	    for (var i = 0; i < geusses.length; i++) {
	      if (counter === geusses.length) {
	        showLives.innerHTML = "You Win!";
	      }
	    }

      if (showLives.innerHTML == "You Win!") {
        wins++;
        console.log("Number Of Wins" + wins);
        document.getElementById("wins").innerHTML = "Number of Wins = " + wins;
      }
    }

    checkWord = function(){
    	//If user selects a letter from grid 
    	list.onclick = function () {
      	var guess = (this.innerHTML);
      	console.log("Inside onclick function Guess =" + guess);
      	this.setAttribute("class", "active");
      	this.onclick = null;
	      for (var i = 0; i < word.length; i++) {
	        if (word[i] === guess) {
	          geusses[i].innerHTML = guess;
	          counter += 1;
	          console.log("Inside Onclick Function Counter = " + counter);
	        } 
	      }

	      var j = (word.indexOf(guess));
	      if (j === -1) {
	        lives -= 1;
            console.log("Inside WRONG WORD onclick Function Lives = " + lives);
            // How to disable specific key on the keyboard
	        myLives();
	      } else {
	        myLives();
	      }
          //Print letter guessed
         letterGuessed.push(guess.toUpperCase());
         console.log(letterGuessed);
         document.getElementById("guessedLetters").innerHTML = letterGuessed;
	    }

	    //If user decides to use keyboard
	    this.onkeyup = function(){
            var guess = String.fromCharCode(event.keyCode).toLowerCase();
            console.log("Inside onkeyup function Guess =" + guess);

            // Bisable Current key pressed on the screen alphabet keyboard
            var lettersList = document.getElementById("alphabet").childNodes;
             for (var i = 0; i < lettersList.length; i++) {                  
                  // console.log("Value of alphabet list inside onkeyup : " + lettersList[i].innerHTML);
                  if (lettersList[i].innerHTML == guess){
                        lettersList[i].setAttribute("class" , "active");
                        lettersList[i].onclick = null;
                  }
              }

            //Find if key pressed exist in the word
        	for (var i = 0; i < word.length; i++) {
	        if(word[i] === guess) {
	          geusses[i].innerHTML = guess;
	          counter += 1;
	          console.log("Inside Keyup Function Counter = " + counter);
	        } 
	      }
          // If letter does not exist in word
	      var j = (word.indexOf(guess));
	      if (j === -1) {
	        lives -= 1;
            console.log("Inside WRONG WORD Keyup Function Lives = " + lives);
            this.onkeyup = null;
	        myLives();
	      } else {
	        myLives();
	      }
        //Print letter guessed
        letterGuessed.push(guess.toUpperCase());
        console.log(letterGuessed);
        document.getElementById("guessedLetters").innerHTML = letterGuessed;

	    }

	    

    }

    play = function(){
    	var carList = [
        'Honda',
        'Toyota',
        'Hundai',
        'Mazda',
        'Subaru',
        'Dodge',
        'Buwick',
        'Nissan',
        ];

        //Select car from carlist convert to lowercase and set it as current word
        choosenCar = carList[Math.floor(Math.random() * carList.length)];
        word = choosenCar.toLowerCase();
        console.log(word);

        //Create button grid by calling buttons function
        createLetterGrid();

        //Initialise variables 
      geusses = [ ];
    	lives = 10;
    	counter = 0;

    	//Create Blank spaces to fill correct user guesses
    	createWordHolder();
    	myLives();
    }//play ends

    //call play
    play();

    // Reset Button onclick event
    document.getElementById('reset').onclick = function() {
    console.log("Inside RESET Call");
    letterGuessed = [];
    guessWordHolder.parentNode.removeChild(guessWordHolder);
    letters.parentNode.removeChild(letters);
    document.getElementById("guessedLetters").innerHTML = "Letters Guessed So Far";
    play();
  }


}//window onload ends