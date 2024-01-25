
//la hauteur
let catchHauteur = document.querySelector("#hauteur");
let hauteur;
catchHauteur.addEventListener("input", function () {
    hauteur = parseInt(catchHauteur.value);
    updateGrid();
    checkAndConvert();
});
//largeur
let catchLargeur = document.querySelector("#largeur");
let largeur;
catchLargeur.addEventListener("input", function () {
    largeur = parseInt(catchLargeur.value);
    updateGrid();
    checkAndConvert();
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
    for (let j = 0; j < hauteur + 2; j++) {
        let tabn = [];
        for (let i = 0; i < largeur + 2; i++) {
            if (j == 0 || j == hauteur + 1 || i == 0 || i == largeur + 1) {
                tabn[i] = 8;
            } else {
                tabn[i] = Math.round(Math.random());
            }
        }
        grid.push(tabn);
    }
    return grid;
}
console.log(hauteur,largeur);
// Maintenant ,il faut faire correspondre la grille a une grille de bouton dans le HTML
function conversionHTML(grid) {
    const gridContainer = document.querySelector("#container");
    gridContainer.innerHTML="";
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
            } if (grid[j][i] == 0) {
                btn.setAttribute('class', 'blanc');
            } if(grid[j][i] == 8) {
                btn.style.opacity="0";
            }
            rowContainer.appendChild(btn); 
        }
        gridContainer.appendChild(rowContainer);
    }
    return grid;
}
// vérif pour 2
function check2(grid,tempoGrid,ligne,colonne){   
    let around=0;
    if(grid[ligne -1][colonne -1]==1){
        around++;
    }
    if(grid[ligne -1][colonne ]==1){
        around++;
    }
    if(grid[ligne -1][colonne +1]==1){
        around++;
    }
    if(grid[ligne][colonne -1]==1){
        around++;
    }
    if(grid[ligne][colonne +1]==1){
        around++;
    }
    if(grid[ligne +1][colonne -1]==1){
        around++;
    }
    if(grid[ligne +1][colonne]==1){
        around++;
    }
    if(grid[ligne +1][colonne +1]==1){
        around++;
    }
    if(around!=2 && around!=3){
        tempoGrid[ligne][colonne]=0;
    }else{
        tempoGrid[ligne][colonne]=1;
    }
    return tempoGrid;
}
// vérif pour 3
function check3(grid,tempoGrid,ligne,colonne){
    let around3=0;
    if(grid[ligne -1][colonne -1]==1){
        around3++;
    }
    if(grid[ligne -1][colonne]==1){
        around3++;
    }
    if(grid[ligne -1][colonne +1]==1){
        around3++;
    }
    if(grid[ligne][colonne -1]==1){
        around3++;
    }
    if(grid[ligne][colonne +1]==1){
        around3++;
    }
    if(grid[ligne +1][colonne -1]==1){
        around3++;
    }
    if(grid[ligne +1][colonne]==1){
        around3++;
    }
    if(grid[ligne +1][colonne +1]==1){
        around3++;
    }
    if(around3==3){
        tempoGrid[ligne][colonne]=1;
    }
    return tempoGrid;
}
// faire un saut de 1 avec la barre espace
function evolution(grid) {
    let tempoGrid=[];    
    for (let j = 0; j < hauteur + 2; j++) {
        let tabm = [];
        for (let i = 0; i < largeur + 2; i++) {
            if (j == 0 || j == hauteur + 1 || i == 0 || i == largeur + 1) {
                tabm[i] = 8;
            } else {
                tabm[i] = 0;
            }
        }
        tempoGrid.push(tabm);
    }
    for(let ligne=1; ligne<grid.length-1; ligne++){
        for(let colonne=1; colonne<grid[ligne].length-1; colonne++){
            switch(grid[ligne][colonne]){
                case 1:
                    check2(grid,tempoGrid,ligne,colonne);
                break;
                case 0:
                    check3(grid,tempoGrid,ligne,colonne);
                break;   
            }
        }
    }
    for (let j = 0; j < hauteur + 2; j++) {
        for (let i = 0; i < largeur + 2; i++) {
            if (tempoGrid[j][i]==1) {
                grid[j][i] = 1;
            } if(tempoGrid[j][i]==0) {
                grid[j][i] = 0;
            }
        }
    }
    return grid; 
}
let saute=document.querySelector("#jump");
saute.addEventListener("click",function (){
    evolution(grid);
    conversionHTML(grid);
});
// rentre les coordonnées de la création de grille puis fait vol fois evolution
function timeJump(grid, vol) {
    console.log("avant",vol);
    if (!isNaN(vol)) {    
        let k = 0;
        function jump() {
            if (k < vol) {
                evolution(grid);
                conversionHTML(grid);
                k++;
                if(vol<=10){
                    setTimeout(jump, 1000);
                } else if(vol>10 && vol<=100){
                    setTimeout(jump, 333);
                } else {
                    setTimeout(jump, 100);
                }
            }
        }
        jump();
        
    }
    
    return grid;
}
let catchVol = document.querySelector("#vol");
let vol;
catchVol.addEventListener("input", function () {
    vol = parseInt(catchVol.value);
    timeJump(grid, vol);
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

