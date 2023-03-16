
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
    }
}

let showCharacters = document.querySelector("#characterForm"); //Pekar på ett form.
let alert = document.querySelector("#alert");
let profileCards = document.querySelector("#profileCards");
let showMore = document.querySelector("#showMore");
let showMoreBtn = document.querySelector("#showMoreBtn");
let extraInfo = document.querySelector("#extraInfo");
let myCharacters = [];

//Hämtar de valda värdena från select. Kollar om det är samma värde/ något valt. Pushar annars in värdet i en Array.
let choosenCharacters = ()=>{
    myCharacters = []; //Tömmer arrayen för varje ny funktion.
    alert.innerHTML="";
    let character1 = document.querySelector('select[name="characterList1"]').value;
    let character2 = document.querySelector('select[name="characterList2"]').value;
    let text = document.createElement("p");

    if(character1 === "disabled" || character2 === "disabled"){
        text.innerText = "Please choose two characters";
        alert.append(text);
    } else if(character1 === character2){
        text.innerText = "Please choose two different characters";
        alert.append(text);
    }else{
        myCharacters.push(character1, character2);
        allCharacters(myCharacters);
    }
};

//Kör funktionerna då formuläret skickas. 
showCharacters.addEventListener("submit",(e)=>{
    e.preventDefault();
    profileCards.innerHTML="";
    extraInfo.innerHTML="";
    showMoreBtn.style.display = "none";
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
        //Visar en GIF i väntan på API-datan.
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

//Går igenom karaktärerna och skriver ut dem.
let renderCharacters = (characters) => {
    profileCards.innerHTML=""; //Tömmer diven.
    extraInfo.innerHTML="";
    showMoreBtn.style.display = "none";

    let characterArr = [];
    characters.forEach((obj) => {
        obj = obj.results[0]; //Objektet ligger i en array. Men det finns bara en. Därav index 0.
        let newCharacter = new character(obj.name, obj.gender, obj.height, obj.mass.replace(",",""), obj.hair_color, obj.skin_color, obj.eye_color, obj.films)
        //Pusha in i en array för arr kunna jämföra de två mot varandra.
        characterArr.push(newCharacter);
        });
    
    characterArr.forEach((newCharacter)=>{
        let div = document.createElement("div");
        let heading = document.createElement("h3");
        heading.innerText= `${newCharacter.name}`;
        div.innerHTML = `<img src="./assets/photos/${newCharacter.pictureUrl}.png" alt="Picture of ${newCharacter.name}">`
        div.append(heading);

        profileCards.append(div);
    });
    
    showMoreBtn.style.display = "block";

    showMoreBtn.addEventListener("click", () =>{
        extraInfo.innerText="";
        let extraInfoDiv = document.createElement("div");
        extraInfoDiv.setAttribute("id", "styling")
        characterArr.forEach((newCharacter)=>{
            let moreInfo = document.createElement("div");
            moreInfo.innerHTML= `
            <ul>
                <li>Character: ${newCharacter.name}</li>
                <li>Gender: ${newCharacter.gender}</li>
                <li>Height: ${newCharacter.height} cm</li>
                <li>Body mass: ${newCharacter.mass} kg</li>
                <li>Hair Color: ${newCharacter.hairColor}</li>
                <li>Skin Color: ${newCharacter.skinColor}</li>
                <li>Eye Color: ${newCharacter.eyeColor}</li>
                <li>Number of films: ${newCharacter.movies}</li>
            </ul>
            `
            extraInfoDiv.appendChild(moreInfo);
        })  
        extraInfo.append(extraInfoDiv, compareDiv);
    })

    let compareDiv = document.createElement("div");
    compareDiv.setAttribute("id", "compare");
    let compare = document.createElement("ul");
    //Gender
    let gender = document.createElement("li");
    if(characterArr[0].gender === characterArr[1].gender){
        gender.innerText= `${characterArr[0].name} has the same gender as ${characterArr[1].name}`;
    }else{
        gender.innerText= `${characterArr[0].name} doesn't have the same gender as ${characterArr[1].name}`;
    }
    //Height
    let height = document.createElement("li");
    if(characterArr[0].height > characterArr[1].height){
        height.innerText= `${characterArr[0].name} is taller then ${characterArr[1].name}`;
    }else if(characterArr[0].height < characterArr[1].height){
        height.innerText= `${characterArr[1].name} is taller then ${characterArr[0].name}`;
    }else{
        height.innerText= `${characterArr[1].name} and ${characterArr[0].name} is equaly tall.`;
    }
    //Weight
    let mass = document.createElement("li");
    if(characterArr[0].mass > characterArr[1].mass){
        mass.innerText= `${characterArr[0].name} weighs more then ${characterArr[1].name}`;
    }else if(characterArr[0].mass < characterArr[1].mass){
        mass.innerText= `${characterArr[1].name} weighs more then ${characterArr[0].name}`;
    }else{
        mass.innerText= `${characterArr[1].name} and ${characterArr[0].name} weights the same.`;
    }
    //Hair Color
    let hair = document.createElement("li");
    if(characterArr[0].hairColor === characterArr[1].hairColor){
        hair.innerText= `${characterArr[0].name} has the same hair color as ${characterArr[1].name}`;
    }else{
        hair.innerText= `${characterArr[0].name} doesn't have the same hair color as ${characterArr[1].name}`;
    }
    //Skin Color
    let skin = document.createElement("li");
    if(characterArr[0].skinColor === characterArr[1].skinColor){
        skin.innerText= `${characterArr[0].name} has the same skink color as ${characterArr[1].name}`;
    }else{
        skin.innerText= `${characterArr[0].name} doesn't have the same skin color as ${characterArr[1].name}`;
    }
    //Eye Color
    let eye = document.createElement("li");
    if(characterArr[0].eyeColor === characterArr[1].eyeColor){
        eye.innerText= `${characterArr[0].name} has the same eye color as ${characterArr[1].name}`;
    }else{
        eye.innerText= `${characterArr[0].name} doesn't have the same eye color as ${characterArr[1].name}`;
    }
    //Films
    let movies = document.createElement("li");
    if(characterArr[0].movies > characterArr[1].movies){
        movies.innerText= `${characterArr[0].name} has been in more movies then ${characterArr[1].name}`;
    }else if(characterArr[0].movies < characterArr[1].movies){
        movies.innerText= `${characterArr[1].name} has been in more movies then ${characterArr[0].name}`;
    }else{
        movies.innerText= `${characterArr[1].name} and ${characterArr[0].name} has been in the same amount of movies.`;
    }
    compare.append(gender, height, mass, hair, skin, eye, movies);
    compareDiv.append(compare);
};


