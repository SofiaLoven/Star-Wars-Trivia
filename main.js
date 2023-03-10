let getData = async (url) =>{
    let data = await fetch(url);
    let json = await data.json();
    return json;
}

class character{
    constructor(name, gender, height, mass, hairColor, skinColor, eyeColor, movies, pictureUrl){
        this.name = name; 
        this.gender = gender;
        this.height = height;
        this.mass = mass;
        this.hairColor = hairColor;
        this.skinColor = skinColor;
        this.eyeColor = eyeColor;
        this.movies = movies;
        this.pictureUrl = pictureUrl;
    }
}
//New character Bör innegålla promises för att hämta API och sen skickas in i arr. 

let showCharacters = document.querySelector("#characterForm"); //Form! Använd Submit.
let profileCardOne = document.querySelector("#firstCharacter");
let profileCardTwo = document.querySelector("#secondCharacter");

let getCharacthers = async()=>{
    let params = new URLSearchParams({});
    // Söker på olika karaktärer och kan hämta dem utifrån Value!! OMG GENI!
    params.append("search", "chewb");
    let characters = await getData(`https://swapi.dev/api/people/?${params}`);
    console.log(characters);
    console.log("https://swapi.dev/api/people/?" + params);
    
}
getCharacthers();
//Hämta karaktärerna med api. Använd promises för att välja karaktär efter listorna?

//Lägg karaktärerna i en array och loopa igenom för att skriva ut i DOMen. 

/*
 https://swapi.dev/api
 Skapa en klass som du döper till Character med egenskaperna för 
 name, gender, height, mass,
 hairColor, height, skinColor, eyeColor, movies samt pictureUrl.
*/