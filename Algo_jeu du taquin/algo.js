// JEU DU TAQUIN //

// on charge notre fonction à l'ouverture de la page du jeu
$(document).ready(function() {
    afficheTable();
});

// notre tableau de données 
let table = [1 ,2, 3, 4, 5, 6, 7, 8, ""];

// on affiche les données rangées dans le bon ordre
function afficheTable(){
    let i = 1;
    while(i<= table.length){
        $('#cell'+i).text(table[i-1]);
        i++;
    }
}

// BOUTON INITIAL POSITION : 
//pour afficher le tableau dans la position initiale (chiffres dans le bon ordre)
function initialPos() {
    table = [1 ,2, 3, 4, 5, 6, 7, 8, ""];
    $(".permut").text("");
    afficheTable();
}

//  BOUTON SHUFFLE :
//on créé une fonction qui utilise le swap pour ranger alléatoirement les chiffres et vérifie si on peut jouer.
function randomPosition(){
    var counter = table.length
    while(counter>0){
        let i = Math.floor(Math.random()*counter);
        counter--;
        let temp = table[counter];
        table[counter] = table[i];
        table[i] = temp;
    } 
    // on affiche notre table de facon aléatoire
    afficheTable(); 
    // on appelle notre fonction paire qui vérifie la solvabilité du jeu
    paire(table);  
}

//La fonction randomPosition() fait appel à la fonction paire() pour comparer les paires et trouver si le jeu est solvable ou non. tri de selection
function paire(table){
    let nombrePermutations = 0;
    for(let i = 0; i < table.length; i++){
        let j = i+1;
        while(j < table.length) {
            if (table[i] > table[j]) {
                nombrePermutations++; 
            }
            j++
        }
    } 
    // on vérifie si le nombre de permutation est pair ou pas
    if(nombrePermutations % 2 == 0){
        $(".permut").text("Il y a " + nombrePermutations + " permutations. La partie est solvable... ?;)")
        nombrePermutations = true;
    } else {
        $(".permut").text("Il y a " + nombrePermutations + " permutations. La partie n'est pas solvable... ?:(")
        nombrePermutations = false;
    // s'il n'est pas pair on relance le rangement aléatoire pour n'avoir que des solutions gagnantes 
    } if(nombrePermutations == false){
        randomPosition();
    }
    return nombrePermutations;
}

// BOUTON SOLUTION :
// Posibilité d'atteindre l'état gagant à partir de l'état de départ
