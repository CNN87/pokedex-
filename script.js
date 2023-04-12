let currentPokemon ;
let allPokemons = [];
let pokemonList = [];
let count = 0; 
let newcount = 20;

function openPokemon(i){
    document.getElementById('popUpContainer').classList.remove('hide')
    document.getElementById('popUpContainer').innerHTML = renderPokeDetail(i);
    genTypesForPopup(i);
    openCategoryAbout(i);
}
function closePokemon(){
    document.getElementById('popUpContainer').classList.add('hide')
}
function doNotClose(event){
    event.stopPropagation();//popup nur ausserhalb schließbar
}

function render(){ 
    document.getElementById('maincontent').innerHTML = '';
    generatePokemon();
}

async function generatePokemon(){
    // pokemonList.splice(0,pokemonList.length);
    
    for (let i = count; i < newcount; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i+1}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        allPokemons.push(currentPokemon); 
        pokemonList = allPokemons; 
        genPokemonContent(i);  
        genTypes(i); 
    }
    // document.getElementById('bottom-main').innerHTML = '';
    document.getElementById('maincontent').innerHTML += renderbottom();
    
}

function genPokemonContent(i){
    console.log(i);
    let pokemonImage = pokemonList[i]['sprites']['other']['official-artwork']['front_default'];
    let types = pokemonList[i]['types'];
    let typecolor = types[0]['type']['name']; 
    document.getElementById('maincontent').innerHTML += renderCards(i, pokemonImage, typecolor, pokemonList);
}
function genTypes(i) {
    let types = pokemonList[i]['types'];
    for (let j = 0; j < types.length; j++) {
        let type = types[j]['type']['name'];
        document.getElementById(`pokemon-card-class${i}`).innerHTML += renderType(type);
    }
}
function renderCards(i, pokemonImage, typecolor, pokemonList){
    return`
    <div class="card ${typecolor}" id="pokecard${i}" onclick="openPokemon(${i})">
        <div class="pokemon-card-head">
            <h2 class="capitalize">${pokemonList[i]['name']}</h2>
            <div>#${pokemonList[i]['id'].toString().padStart(3, '0')}</div>
        </div>
        <div class="pokemon-card-wrapper ">
            <div class="pokemon-card-class" id="pokemon-card-class${i}">  
            </div>
            <div class="pokemon-card-wrapper-bg" >
                <img src="${pokemonImage}" class="" alt="${pokemonList[i]['name']}">
            </div>
        </div>
    </div>
    `;
}

function renderType(type){
    return`
        <div class="colorType ${type}"><img src="img/icons/${type}.svg"/>${type}</div>
    `;
}

function renderPokeDetail(i){
    return `
    <div id="detail-card" class="detail-card" onclick="doNotClose(event)">
        <div class="top-container ${pokemonList[i]['types'][0]['type']['name']}">
            <div class="popup-close-x"><img onclick="closePokemon(${i})" src="img/icons/xclose.ico"></div>
            <div class="top-container-head">    
                <h2 class="capitalize">${pokemonList[i]['name']}</h2>                   
                <div>#${pokemonList[i]['id'].toString().padStart(3, '0')}</div>
            </div>
            <div class="top-container-head-class top-head-class" id="top-container-head-class${i}">          
            </div>
            <div class="top-container-head-image-container">
                <img src="img/icons/prev.ico" alt="prev" class="prev" title="prev" onclick="prevnext(${i-1})">
                <img class="top-container-head-image" src="${pokemonList[i]['sprites']['other']['official-artwork']['front_default']}"> 
                <img src="img/icons/next.ico" alt="next" class="prev" title="next" onclick="prevnext(${i+1})">
            </div>
            
        </div>
        <div class="bottom-container">
            <div class="tab-category">
                <div class="categories">
                    <div class="category mark-category" id="category1" onclick="openCategoryAbout(${i})">About</div>
                    <div class="category" id="category2" onclick="openCategoryBaseStats(${i})">Base Stats</div>
                    <div class="category" id="category3" onclick="openCategoryMoves(${i})">Moves</div>
                </div>     
            </div>
            <div class="card-category" id="card-category">
                <div class="category-about">
                    <div class="attribute">
                        <span>Height: ${pokemonList[i]['height']/10} m</span>  
                    </div><hr> 
                    <div class="attribute">
                        <span>Weight: ${pokemonList[i]['weight']/10} kg</span>  
                    </div><hr> 
                    <div class="attribute">
                        <span id="abilities">Abilities: </span> 
                    </div><hr> 
                    <div class="attribute">
                        <span>Base Experience: ${pokemonList[i]['base_experience']}</span>
                    </div>
                </div>
            </div>
        </div>        
    </div>
    `;
}

function genTypesForPopup(i){
    let types = pokemonList[i]['types'];
    for (let j = 0; j < types.length; j++) {
        let type = types[j]['type']['name'];
        document.getElementById(`top-container-head-class${i}`).innerHTML += renderTypeForPopup(type);
    }
}
function renderTypeForPopup(type){
    return`
        <div class="PopcolorType ${type}"><img src="img/icons/${type}.svg"/>${type}</div>
    `;
}

function openCategoryAbout(i){
    document.getElementById('category1').classList.add('mark-category');
    document.getElementById('category2').classList.remove('mark-category');
    document.getElementById('category3').classList.remove('mark-category');
    let categoryAbout = document.getElementById('card-category');
    categoryAbout.innerHTML = '';
    categoryAbout.innerHTML += renderAbout(i);
    genAbilityCategory(i);
}

function genAbilityCategory(i){
    let abilities = document.getElementById('abilities');
    abilities.innerHTML = '';
    for (let k = 0; k < pokemonList[i]['abilities'].length; k++) {
        const ability = pokemonList[i]['abilities'][k]['ability']['name'];
        abilities.innerHTML += renderAbility(ability);
    }
}

function renderAbout(i){
    return`
    <div class="category-about">
        <div class="attribute">
            <span>Height: ${pokemonList[i]['height']/10} m</span>  
        </div><hr> 
        <div class="attribute">
            <span>Weight: ${pokemonList[i]['weight']/10} kg</span>  
        </div><hr> 
        <div class="attribute">
            <span>Base Experience: ${pokemonList[i]['base_experience']}</span>
        </div><hr> 
        <div class="attribute">
            <span>Abilities: <span id="abilities"> </span> </span> 
        </div>
    </div>
    `;
}
function renderAbility(ability){
    return`${ability}, `;
}

function openCategoryBaseStats(i){
    document.getElementById('category1').classList.remove('mark-category');
    document.getElementById('category2').classList.add('mark-category');
    document.getElementById('category3').classList.remove('mark-category');
    let categoryBaseStats = document.getElementById('card-category');
    categoryBaseStats.innerHTML = '';
    categoryBaseStats.innerHTML += renderBaseStats();
    genBaseStats(i);
}

function genBaseStats(i){
    let baseStats = document.getElementById('base-stats-container');
    baseStats.innerHTML = '';
    for (let k = 0; k < pokemonList[i]['stats'].length; k++) {
        let basestat = pokemonList[i]['stats'][k]['base_stat'];
        let name = pokemonList[i]['stats'][k]['stat']['name'];
        baseStats.innerHTML += renderBaseStatsBar(basestat, name);
    }
}

function renderBaseStats(){
    return`
    <div class="base-stats-container" id="base-stats-container">
        <div class="base-stats-name">HP</div>
        <div class="base-stats-skillbar">
            <div class="skills" style="width:100%" > 45</div>
        </div>
    </div>
    `;
}
function renderBaseStatsBar(basestat, name){
    return`
    <div class="base-stats-containerr" id="base-stats-container">
        <div class="base-stats-name uppercase" >${name}
        </div>
        <div class="base-stats-skillbar" >
        <div class="skills ${name}" style="width:${basestat}%" > ${basestat}</div>
        </div>
        </div>
    `;
}

function openCategoryMoves(i){
    document.getElementById('category1').classList.remove('mark-category');
    document.getElementById('category2').classList.remove('mark-category');
    document.getElementById('category3').classList.add('mark-category');
    let categoryMoves = document.getElementById('card-category');
    categoryMoves.innerHTML = '';
    categoryMoves.innerHTML += renderCategoryMoveList();
    genMovelist(i);
}

function genMovelist(i){
    let moves = document.getElementById('pokemon-move-listt');
    moves.innerHTML = '';
    for (let j = 0; j < pokemonList[i]['moves'].length ; j++) {
        let movename = pokemonList[i]['moves'][j]['move']['name'];
        moves.innerHTML += renderMoveList(movename, j);
    }
}
function renderCategoryMoveList(){
    return`
    <div class="pokemon-move-listt" id="pokemon-move-listt">
        <div class="pokemon-move-list" id="pokemon-move-list">
            1. move
        </div>
    </div>`;
}
function renderMoveList(move, j){
    return`
    <div class="pokemon-move-list">
    ${j+1}. ${move}
    </div>
    `;
}

function searchPokemon(){
    let search = document.getElementById('searchPokemon').value;
    search = search.toLowerCase();
    console.log(search);
    let pokemonShowSearch = document.getElementById('maincontent');
    pokemonShowSearch.innerHTML = '';

    for (let g = 0; g < pokemonList.length; g++) {
        let element = pokemonList[g];
        let name = element['name'];
        if(name.includes(search)){
            console.log("name: ", name);
            genPokemonContent(g);  
            genTypes(g);
        }
    }
}

function prevnext(index){
    if(index < 0){
        index = pokemonList.length -1;   
    }
    if (index > pokemonList.length -1)
    {
        index=0;      
    }
    openPokemon(index);
}
function renderbottom(){
    
    return`
    <div class="bottom-main" id="bottom-main" onclick="increaseCounter()"><div class="button-20-more">Load 20+More Pokemon</div></div>
    `;
}
async function increaseCounter(){
    count = newcount;
    newcount = newcount + 20;
    await generatePokemon();
    // count = count+ 20;
    // console.log("count", count);
}