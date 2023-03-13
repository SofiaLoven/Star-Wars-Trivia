

//Class för karaktärerna.
class character{
    constructor(name, gender, height, mass, hairColor, skinColor, eyeColor, movies, pictureUrl){
        this.name = name; 
        this.gender = gender;
        this.height = Number(height);
        this.mass = Number(mass);
        this.hairColor = hairColor;
        this.skinColor = skinColor;
        this.eyeColor = eyeColor;
        this.movies = movies;
        this.pictureUrl = pictureUrl;
    }
}
//New character Bör innegålla promises för att hämta API och sen skickas in i arr. 

let showCharacters = document.querySelector("#characterForm"); //Referar till ett form.
let profileCards = document.querySelector("#profileCards");
let myCharacters = [];

//Hämtar de valda värdena från select. Kollar om det är samma värde. Pushar annars in värdet i en Array.
let choosenCharacters = ()=>{
    let character1 = document.querySelector('select[name="characterList1"]').value;
    let character2 = document.querySelector('select[name="characterList2"]').value;
    if(character1 === character2){
        alert("Choose two different characters");
        //Ändra denna till en rolig pop-upp!?
    } else{
        myCharacters.push(character1, character2);
    }
    allCharacters(myCharacters);
}

//Kör funktionerna då formuläret skickas. 
showCharacters.addEventListener("submit",(e)=>{
    e.preventDefault();
    choosenCharacters();
})

//Funktion för att hämta all typ av data.
let getData = async (url) =>{
    let data = await fetch(url);
    let json = await data.json();
    return json;
}

//Hämtar datan för valda karaktärer. Använder search för att finna karaktärerna.
let getCharacther = async(id)=>{
    try{
        let response = await getData(`https://swapi.dev/api/people?search=${id}`);
        return response;
    }catch(err){
        console.log("error", err);
    }
};

let allCharacters = async (arr) =>{
    try{
        let promises = arr.map((id)=> getCharacther(id));
        let results = await Promise.all(promises);
        console.log(results);
        renderCharacters(results);
    } catch(err){
        console.log("error", err);
    }
};



let renderCharacters = (characters) => {
    characters.forEach((obj) => {
        console.log(obj.results[0].name); //Objektet ligger i en array. Men det finns bara en. Därav index 0.
        //Använd class nu för att få värden.
        let p = document.createElement("p");
        p.innerText= `Name: ${obj.results[0].name}`;
        profileCards.append(p);
    });
}; 

//Hämta karaktärerna med api. Använd promises för att välja karaktär efter listorna?

//Lägg karaktärerna i en array och loopa igenom för att skriva ut i DOMen. Skapa ny div per profil och skriv ut i

/*
 https://swapi.dev/api

let getCharacthers = async(id)=>{
    let params = new URLSearchParams({});
    // Söker på olika karaktärer och kan hämta dem utifrån Value!! OMG GENI!
    params.append("search", id);
    let character = await getData(`https://swapi.dev/api/people/?${params}`);
    console.log(character);
    console.log("https://swapi.dev/api/people/?" + params);
    
}

//getCharacthers("yoda"); 

//Funktion för att hämta all typ av data.
let getData = async (url) =>{
    let data = await fetch(url);
    let json = await data.json();
    return json;
}
*/