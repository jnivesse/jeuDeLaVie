// Initialisation de la grille
let hauteur = 10;
let largeur = 10;
let grid = createRandomGrid(hauteur, largeur);

// Appel de la fonction de conversion au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
    conversionHTML(grid);
});
// La hauteur
let catchHauteur = document.querySelector("#hauteur");
catchHauteur.addEventListener("input", function () {
    hauteur = parseInt(catchHauteur.value);
    updateGrid();
    checkAndConvert();
});
//rajout du clavier
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
        hauteur = Math.min(63, hauteur + 1);
        catchHauteur.value = hauteur;
        event.stopPropagation(); 
        event.preventDefault();
        updateGrid();
        checkAndConvert();
    } else if (event.key === "ArrowDown") {
        hauteur = Math.max(10, hauteur - 1);
        catchHauteur.value = hauteur;
        event.stopPropagation(); 
        event.preventDefault();
        updateGrid();
        checkAndConvert();
    }    
});
// La largeur
let catchLargeur = document.querySelector("#largeur");
catchLargeur.addEventListener("input", function () {
    largeur = parseInt(catchLargeur.value);
    updateGrid();
    checkAndConvert();
});
//rajout du clavier
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
        largeur = Math.min(63, largeur + 1);
        catchLargeur.value = largeur;
        event.stopPropagation(); 
        event.preventDefault();
        updateGrid();
        checkAndConvert();
    } else if (event.key === "ArrowLeft") {
        largeur = Math.max(10, largeur - 1);
        catchLargeur.value = largeur;
        event.stopPropagation(); 
        event.preventDefault();
        updateGrid();
        checkAndConvert();
    }   
});

//Les 2 function de dépannages
//fonction de rappel de la grille
function updateGrid() {
    grid = createRandomGrid(hauteur, largeur);
    return;
}
//vérif 
function checkAndConvert() {
    if (!isNaN(largeur) && !isNaN(hauteur)) {
        conversionHTML(grid);
    }
    return;
}
// création de la grille
function createRandomGrid(hauteur, largeur) {
    let grid = [];
    for (let j = 0; j < hauteur ; j++) {
        let tabn = [];
        for (let i = 0; i < largeur ; i++) {
            tabn[i] = Math.round(Math.random());
        }
        grid.push(tabn);
    }
    return grid;
}

// Maintenant ,il faut faire correspondre la grille a une grille de bouton dans le HTML
function conversionHTML(grid) {
    const gridContainer = document.querySelector("#container");
    gridContainer.innerText="";
    for (let j = 0; j < grid.length; j++) {
        const rowContainer = document.createElement('div'); 
        rowContainer.setAttribute('class', 'row');
        for (let i = 0; i < grid[j].length; i++) {
            let saveI=i;
            let saveJ=j;
            let btn = document.createElement('button');
            btn.addEventListener("click",function (){
               switch(grid[saveJ][saveI]){
                case 0:
                    grid[saveJ][saveI]=1;
                    btn.classList.remove('blanc');
                    btn.classList.add('rouge');
                    break;
                case 1:
                    grid[saveJ][saveI]=0;
                    btn.classList.remove('rouge');
                    btn.classList.add('blanc');
                    break;
               }               
            });
            if (grid[j][i] == 1) {               
                btn.setAttribute('class', 'rouge',);
            } else {
                btn.setAttribute('class', 'blanc');
            } 
            rowContainer.appendChild(btn); 
        }
        gridContainer.appendChild(rowContainer);
    }
    return grid;
}
//check2 & check3 dans une seule fonction
function check2et3(grid,tempoGrid,ligne,colonne){
    let around=0;
    for(let k=-1; k<=1; k++){
        let tempoLigne=ligne+k;
        if(tempoLigne<0){
            tempoLigne=grid.length-1;
        }
        if(tempoLigne>grid.length-1){
            tempoLigne=0;
        }
        for(let l=-1; l<=1; l++){
            let tempoColonne=colonne+l;
            if(tempoColonne<0){
                tempoColonne=grid[tempoLigne].length-1;
            }
            if(tempoColonne>grid[tempoLigne].length-1){
               tempoColonne=0;
            }            
            if(grid[tempoLigne][tempoColonne]==1){
                around++; 
            }
        }
    }
    if(around==3){
        tempoGrid[ligne][colonne]=1;
    }
    if(around==4 && grid[ligne][colonne]==1){
        tempoGrid[ligne][colonne]=1;
    }
    return tempoGrid;
}
// faire un saut de 1 avec la barre espace
function evolution(grid) {
    let tempoGrid=[];    
    for (let j = 0; j < hauteur ; j++) {
        let tabm = [];
        for (let i = 0; i < largeur ; i++) {
            tabm[i] = 0;
        }
        tempoGrid.push(tabm);
    }
    for(let ligne=0; ligne<grid.length; ligne++){
        for(let colonne=0; colonne<grid[ligne].length; colonne++){
            check2et3(grid,tempoGrid,ligne,colonne)
        }
    }
    for (let j = 0; j < hauteur ; j++) {
        for (let i = 0; i < largeur ; i++) {
            if (tempoGrid[j][i]==1) {
                grid[j][i] = 1;
            } if(tempoGrid[j][i]==0) {
                grid[j][i] = 0;
            }
        }
    }
    return grid; 
}

//bouton Jump
let saute=document.querySelector("#jump");
saute.addEventListener("click",function (){
        evolution(grid);
        conversionHTML(grid);
});
// et enfin la barre espace  CA MARCHE 
document.addEventListener("keydown", function (event) {
    if (event.key == " ") {
        event.stopPropagation(); 
        event.preventDefault(); 
        evolution(grid);
        conversionHTML(grid);
    }
});
// fonction pour clear le board
let extermine=document.querySelector("#exterminatus");
let btns=document.getElementsByClassName("noir")
extermine.addEventListener("click",function (){
    for (let j = 0; j < grid.length; j++) {
        for (let i = 0; i < grid[j].length; i++) {
            if(grid[j][i]==1){
                grid[j][i]=0;
           }
        }
    }
    conversionHTML(grid);
});
// le bouton de lecture ect...
let intervalEvolution;
let intervalConversion;
let clique = document.querySelector("#cliqueButton");
let compteur = 0;
clique.addEventListener("click", function () {
    compteur++;
    let vLecture = document.createElement("img");
    // Clear des intervalles existants
    clearInterval(intervalEvolution);
    clearInterval(intervalConversion);
    switch (compteur) {
        // bouton lecture
        case 1:
            intervalEvolution = setInterval(function () {
                evolution(grid);
            }, 600);
            intervalConversion = setInterval(function () {
                conversionHTML(grid);
            }, 600);
            vLecture.src = "imageJDV/avanceRapide.png";
            break;
        // bouton avance rapide
        case 2:
            intervalEvolution = setInterval(function () {
                evolution(grid);
            }, 300);
            intervalConversion = setInterval(function () {
                conversionHTML(grid);
            }, 300);
            vLecture.src = "imageJDV/avanceTresRapide.png";
            break;
        // bouton avance tres rapide
        case 3:
            intervalEvolution = setInterval(function () {
                evolution(grid);
            }, 150);
            intervalConversion = setInterval(function () {
                conversionHTML(grid);
            }, 150);
            vLecture.src = "imageJDV/pause.png";
            break;
        // pause
        case 4:
            vLecture.src = "imageJDV/lecture.png";
            compteur = 0;
            break;
    }
    clique.innerHTML = "";
    clique.appendChild(vLecture);
    // Gestion du cas de la "pause"
    if (compteur == 4) {
        clearInterval(intervalEvolution);
        clearInterval(intervalConversion);
    }
});
