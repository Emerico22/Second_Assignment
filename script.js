window.onload= init;

let cm; 

function init() { 
	// create an instance of the contact manager
	cm = new movieManager();
	
  	cm.addTestData();
  	cm.printmoviesToConsole();

	  // Display movies in a table
	  // Pass the id of the HTML element that will contain the table
	  cm.displaymoviesAsATable("movies");
}

function formSubmitted() {
	// Get the values from input fields
	let name = document.querySelector("#name");
  	let plateform = document.querySelector("#plateform");
	let actors = document.querySelector("#actors");
	let year = document.querySelector("#year");
	let url = document.querySelector("#url");
  let director = document.querySelector("#director");
	let newMovie = new Movie(name.value, plateform.value, actors.value, year.value, url.value, director.value);
	cm.add(newMovie);
	
	// Empty the input fields
	name.value = "";
	plateform.value = "";
	actors.value = "";
	year.value = "";
	url.value = "";
  director.value = "";
	
	// refresh the html table
	cm.displaymoviesAsATable("movies");
	
	// do not let your browser submit the form using HTTP
	return false;
}

function emptyList() {
	cm.empty();
  	cm.displaymoviesAsATable("movies");
}

function loadList() {
	cm.load();
  	cm.displaymoviesAsATable("movies");
}


class Movie {
	constructor(name, plateform, actors, year, url, director) {
		this.name = name;
		this.plateform = plateform;
		this.actors = actors;
		this.year = year;
		this.url = url;
  this.director = director;}
}

class movieManager {
  filteredList = [];

	constructor() {
		
		this.listOfMovies = [];
    
	}
	///// Ajoute des données test //////////
	addTestData() {
		let c1 = new Movie ("Rocky", "MyCanal", "Sylverster Stallone, Talia SHire, Burt Young","1977","https://fr.web.img6.acsta.net/r_1920_1080/pictures/21/11/16/15/01/4363069.jpg","John G. Avildsen");
let c2 = new Movie ("Starship Troopers", "Disney +", "Casper Van Dien, Dina Meyer, Denise Richards", "1998","https://fr.web.img6.acsta.net/r_1920_1080/medias/nmedia/18/63/32/50/19178895.jpg","Paul Verhoeven");
let c3 = new Movie ("Cars", "Disney +", "Guillaume Canet, Owen Wilson, Bernard-Pierre Donnadieu", "2006", "https://fr.web.img2.acsta.net/r_1920_1080/pictures/17/08/01/16/25/474048.jpg","John Lasseter");
let c4 = new Movie ("Full Metal Jacket", "Prime Video", "Matthew Modine, Arliss Howard, Vincent D'Onofrio", "1987", "https://fr.web.img2.acsta.net/r_1920_1080/img/c9/e7/c9e7addbd0b95ee5bf0146f4b52916eb.jpg","Stanley Kubrick");
let c5 = new Movie ("Star Wars : The Phantom Menace", "Disney +"," Liam Neeson, Ewan McGregor, Natalie Portman", "1999","https://fr.web.img3.acsta.net/r_1920_1080/medias/nmedia/18/35/83/29/20017378.jpg", "George Lucas");
		
		this.add(c1);
		this.add(c2);
		this.add(c3);
		this.add(c4);
    this.add(c5);
		
	
	}
	
	empty() {
		this.listOfMovies = [];
	}
	
	add(movie) {
		this.listOfMovies.push(movie);
	}
	
	remove(movie) {
		for(let i = 0; i < this.listOfMovies.length; i++) { 
			var c = this.listOfMovies[i];

			if(c.name === movie.name) {
				// remove the contact at index i
				this.listOfMovies.splice(i, 1);
				// stop/exit the loop
				break;
			}
		}
	}
	/////Méthodes permettant de trier le tableau, une méthode par colonne/////
	sort() {
    console.log("Table Sorted By Name")
		this.listOfMovies.sort(movieManager.compareByName);
    cm.displaymoviesAsATable("movies");
	}
	
  sortDirector() {
    console.log("Table Sorted By Director")
		this.listOfMovies.sort(movieManager.compareByDirector);
    cm.displaymoviesAsATable("movies");
	}
  
  sortPlateform() {
    console.log("Table Sorted By Plateform")
		this.listOfMovies.sort(movieManager.compareByPlateform);
    cm.displaymoviesAsATable("movies");
	}
  
  sortYear() {
    console.log("Table Sorted By Year")
		this.listOfMovies.sort(movieManager.compareByYear);
    cm.displaymoviesAsATable("movies");
	}
	
  sortActors() {
    console.log("Table Sorted By Actors")
		this.listOfMovies.sort(movieManager.compareByActors);
    cm.displaymoviesAsATable("movies");
	}
  
	static compareByName(c1, c2) {
		
		if (c1.name < c2.name)
     		return -1;
		
    	if (c1.name > c2.name)
     		return 1;
  
    	return 0;
	}
  
  static compareByDirector(c1, c2) {
	
		if (c1.director < c2.director)
     		return -1;
		
    	if (c1.director > c2.director)
     		return 1;
  
    	return 0;
	}
	 
  static compareByPlateform(c1, c2) {
	
		if (c1.plateform < c2.plateform)
     		return -1;
		
    	if (c1.plateform > c2.plateform)
     		return 1;
  
    	return 0;
	}
  
  static compareByActors(c1, c2) {
	
		if (c1.actors < c2.actors)
     		return -1;
		
    	if (c1.actors > c2.actors)
     		return 1;
  
    	return 0;
	}
  
   static compareByYear(c1, c2) {
	
		if (c1.year > c2.year)
     		return -1;
		
    	if (c1.year < c2.year)
     		return 1;
  
    	return 0;
	}
	printmoviesToConsole() {
		this.listOfMovies.forEach(function(c) {
			console.log(c.name);
		});
	}
	//// Permet de sauvegarder et récupérer le liste de film////
	load() {
		if(localStorage.movies !== undefined) {
		this.listOfMovies = JSON.parse(localStorage.movies);
		}
	}
	
	save() {
		localStorage.movies = JSON.stringify(this.listOfMovies);
	} 
	
	//////méthode permettant de filtrer la liste de film, les films filtrés sont ajouté dans la "filteredList"////
	searchMovies(value) {
		console.log(value);
		this.filteredList = this.listOfMovies.filter(elem =>{
		  return (elem.name.includes(value))
		});
		console.log(this.filteredList);
    cm.displaymoviesAsATable("movies");
	}

  	displaymoviesAsATable(idOfContainer) {
		// empty the container that contains the results
    	let container = document.querySelector("#" + idOfContainer);
    	container.innerHTML = "";

		
		if(this.listOfMovies.length === 0) {
			container.innerHTML = "<p>No movies to display!</p>";
			// stop the execution of this method
			return;
		}  
  
    	// Créer le tableau /////
    	var table = document.createElement("table");
       //////Ajoute les titres dans le tableau///////
		table.innerHTML = "<th>" +""+ "</th>" +
         "<th onclick=cm.sort()>" + "Name" + "</th>" +
         "<th onclick=cm.sortYear()>" + "Year" + "</th>"+
        "<th onclick=cm.sortDirector()>" + "Director" + "</th>"+
         "<th onclick=cm.sortPlateform()>" + "Plateform" + "</th>"+
         "<th onclick=cm.sortActors()>" + "Main actors" + "</th>"+
		 "<th>"+""+"<th>";
    
		 //// Si la "filteredList" contient des films alors on l'affiche dans le tableau////
    if (this.filteredList.length > 0) {
      console.log("List filtered");
      this.filteredList.forEach(function(currentMovie) { 
        	// creates a row
        	var row = table.insertRow();
        
			row.innerHTML = "<td>" + "<img src="+ currentMovie.url + " alt=Movie icon style=width:72px;height:108px;>" + "</td>" +
        
        "<td>" + currentMovie.name + "</td>"
		+ "<td>" + currentMovie.year + "</td>"
        + "<td>" + currentMovie.director + "</td>"
		+ "<td>" + currentMovie.plateform + "</td>"
		+"<td>" + currentMovie.actors + "</td>"
              +"<td>" + "<button class=btn-delete>"+"<img src=http://i.imgur.com/yHyDPio.png></button>" +"</td>"
		
        //Supprime le film lorsque la corbeille est clické//
        
 var deleteButton = row.querySelector(".btn-delete");
        deleteButton.addEventListener("click", () => {
       console.log("Movie removed : " + currentMovie.name);
        cm.remove(currentMovie);
         cm.displaymoviesAsATable("movies");})
     ////Remet la "filteredList" à zéro/////
		 cm.filteredList = [];  
        						
     	});
    }
	//////Si la "filteredList" est vide alors on affiche la liste normale dasn le tableau////
      else{
      // iterate on the array of users
    	this.listOfMovies.forEach(function(currentMovie) { 
        	// creates a row
        	var row = table.insertRow();
        
			row.innerHTML = "<td>" + "<img src="+ currentMovie.url + " alt=Movie icon style=width:72px;height:108px;>" + "</td>" +
        
        "<td>" + currentMovie.name + "</td>"
		+ "<td>" + currentMovie.year + "</td>"
        + "<td>" + currentMovie.director + "</td>"
		+ "<td>" + currentMovie.plateform + "</td>"
		+"<td>" + currentMovie.actors + "</td>"
        +"<td>" + "<button class=btn-delete><img src=http://i.imgur.com/yHyDPio.png></button>" +"</td>"
		
        //Supprime le film lorsque la corbeille est clické//
         
 var deleteButton = row.querySelector(".btn-delete");
        deleteButton.addEventListener("click", () => {
       console.log("Movie removed : " + currentMovie.name);
        cm.remove(currentMovie);
         cm.displaymoviesAsATable("movies");})
        
        						
     	});
      }
     	// adds the table to the div
     	container.appendChild(table);
  	}
}