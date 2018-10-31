// Converts from degrees to radians.
Number.prototype.toRadians = function () {
    return this * Math.PI / 180;
};


function distanceFromAnnecy(city) {

    var lat2 = parseFloat(city.latitude); // on parse le texte en float pour la lat
    var lon2 = parseFloat(city.longitude); // on parse le texte en float pour la lon
    var annecyPos = [45.8494545, 6.1106385]; 
    var lat1 = annecyPos[0]; // on récupère la lat d'Annecy
    var lon1 = annecyPos[1]; // on récupère la lon d'Annecy
    var R = 6371; // kilometres
    var φ1 = annecyPos[0].toRadians();
    var φ2 = lat2.toRadians();
    var Δφ = (lat2 - lat1).toRadians();
    var Δλ = (lon2 - lon1).toRadians();

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c;

    return d;
}

function swap(i, j) // Swap the values in array csvData
{
    displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)

    var tmp = csvData[i]; //on stock la valeur de i dans une variable temporaire
    csvData[i] = csvData[j]; // on met la valeur de j dans i 
    csvData[j] = tmp; //on met ma valeur de i dans j
}

function isLess(A, B) {
    displayBuffer.push(['compare', A, B]); // Do not delete this line (for display)
    if( distanceFromAnnecy(csvData[A]) < distanceFromAnnecy(csvData[B])){
        return true;
    } return false;
} 

function insertsort() {
    for(var i = 0; i < csvData.length; i++){
        for(var j=i+1; j>0 && j < csvData.length; j--){ // retester la longeur pour pas dépasser le nombre d'entrée
           if(isLess(j, j-1)){
            swap(j, j-1);
           } else { // ajout d'une condition pour que la vérification ne se refasse pas jusqu'au départ.
               j = 0; // si j=0 il sort de la boucle et revient au départ pour continuer le tri
           }
        }
    }
}

function selectionsort() {
    for(var i = 0; i < csvData.length; i++){
        var j = i+1;
        while(j < csvData.length) {
            if(!isLess(i,j)) {
                swap(i,j);
            }
            j = j+1 //incrémente valeur de j quand il a fait le test
        } 
    }
}

// i = nombre de tour
// j = valeur à comparer dans le tableau. j / j+1
function bubblesort() {
    var n = csvData.length-1;
    for(var i = 0; i < csvData.length; i++){ 
        for(j = 0; j < n-i; j++){ //var n - nombre de tour i => bloque le plus grand quand il est placé, n'est pas recomparé.
            if(isLess(j+1, j)){
                swap(j+1, j);
            }
        }
    }
}
/*
function bubblesort() {
    for(var i = 0; i < csvData.length-1; i++){ 
        for(j = 0; j < csvData.length-1 ; j++){
            if(isLess(j+1, j)){
                swap(j+1, j);
            }
        }
    }
}
*/

function shellsort() {
   
}

function mergesort(data) {
    console.log("implement me !");
}

function heapsort(data) {
    console.log("implement me !");
}

/* FONCTION QUICKSORT */ 

function quicksort() {
    quicksortin(csvData, 'random', 0, csvData.length - 1)
}

function quicksortin(aa, pivot_type, left, right) {
    if (typeof(left) === 'undefined') left = 0;
    if (typeof(right) === 'undefined') right = aa.length - 1;

    if (left >= right) return;

    var pivot = partition(aa, pivot_type, left, right);
    quicksortin(aa, pivot_type, left, pivot - 1); 
    quicksortin(aa,pivot_type, pivot + 1, right);

function partition(aa, pivot_type, left, right) {
    var pivot = choose_pivot(aa, pivot_type, left, right);
    swap(pivot, right);

    pivot = left;
    for (var i = left; i < right; i++) {
        if (isLess(i, right)){
            if (i !== pivot) {
                swap(i, pivot);
            }
            pivot += 1;
        }
    }
    swap(right, pivot);

    return pivot;
}

function choose_pivot(aa, pivot_type, left, right) {
    if(typeof(left) === 'undefined') left = 0;
    if(typeof(right) === 'undefined') right = aa.length() - 1;
    var pivot = null;
    
    if (pivot_type === 'random') {
        pivot = Math.floor(Math.random()*(right-left)) + left;
    } else if (pivot_type === 'first') {
        pivot = left;
    } else if (pivot_type === 'last') {
        pivot=right;
    } else if (pivot_type === 'middle') {
        pivot = Math.round((left + right) / 2);
    } else if (pivot_type === 'median') {

    } else {
        throw 'Invalid pivot_type' + pivot_type;
    }

    return pivot;
}

/* fonction quicksort */ 

function quick3sort(data) {
    console.log("implement me !");
}


var algorithms = {
    'insert': insertsort,
    'select': selectionsort,
    'bubble': bubblesort,
    'shell': shellsort,
    'merge': mergesort,
    'heap': heapsort,
    'quick': quicksort,
    'quick3': quick3sort
}

function sort(algo) {
    if (!algorithms.hasOwnProperty(algo)) {
        throw 'Invalid algorithm ' + algo;
    }
    var sort_fn = algorithms[algo];
    sort_fn();
}
}