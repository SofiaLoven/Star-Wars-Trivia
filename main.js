//Går det att söka efter bilderna på annat sätt? Går det att söka efter figurerna med mellanrum?

//Class för karaktärerna.
class character{
    constructor(name, gender, height, mass, hairColor, skinColor, eyeColor, movies){
        this.name = name; 
        this.gender = gender;
        this.height = Number(height);
        this.mass = Number(mass);
        this.hairColor = hairColor;
        this.skinColor = skinColor;
        this.eyeColor = eyeColor;
        this.movies = movies.length;
        this.pictureUrl = name.replace(/\s/g, "-"); //Behöver ändras för att bilder med flera namn ska fungera.
        //<img src="../assets/photos/${obj.name.replace(/\s/g, "-")}.png" alt="a picture of ${obj.name}" style="height: 150px; width: 200px;"/><br/>
    }
}

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
        profileCards.innerHTML = `
        <img src="https://thumbs.gfycat.com/SecondNiftyHammerheadbird-size_restricted.gif?fbclid=IwAR01YJWSG3CcYrOVaOpmsOe8ho35TzyJr9d_jtmqC36r_3oGrB5BN1s_JYQ" alt="Loading gif of a spinning lightsaber" class="loading-img"/>`;
        let response = await getData(`https://swapi.dev/api/people?search=${id}`);
        return response;
    }catch(err){
        console.log("error", err);
    }
};

//Sammlar hämtade karaktärer i en array.
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

//Går igenom karaktärerna.
let renderCharacters = (characters) => {
    profileCards.innerHTML= "";
    characters.forEach((obj) => {
        obj = obj.results[0]; //Objektet ligger i en array. Men det finns bara en. Därav index 0.
        let newCharacter = new character(obj.name, obj.gender, obj.height, obj.mass, obj.hair_color, obj.skin_color, obj.eye_color, obj.films)
        //Pusha in i en array för arr kunna jämföra de två mot varandra. utanför forEachen.
        
        //Använder classen för att skriva ut första infon.
        let div = document.createElement("div");
        //let picture = document.createElement("img");
        let heading = document.createElement("h3");
        let showMoreBtn = document.createElement("button");
        showMoreBtn.innerText = "Show more info";
        heading.innerText= `Character 1: ${newCharacter.name}`;
        //picture.src = `${newCharacter.pictureUrl}`;
        div.innerHTML = `<img src="./photos/${newCharacter.pictureUrl}.webp" alt="">`
        div.append(heading, showMoreBtn);
        profileCards.append(div);

        showMoreBtn.addEventListener("click", () =>{
            let moreInfo = document.createElement("div");
            moreInfo.innerHTML= `
            <ul>
                <li>Gender: ${newCharacter.gender}
                <li>Height: ${newCharacter.height}
                <li>Body mass: ${newCharacter.mass}
                <li>Hair Color: ${newCharacter.hairColor}
                <li>Skin Color: ${newCharacter.skinColor}
                <li>Eye Color: ${newCharacter.eyeColor}
                <li>Number of films: ${newCharacter.movies}
            </ul>
            `
            div.appendChild(moreInfo);
            
        })
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

*/