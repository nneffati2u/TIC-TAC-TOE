//Representztion en mémoire d'une grille de Tic_Tac_Toe
function crééGrille(n: number): Array<Array<string>> {
  let Grille = new Array<Array<string>>();
  for (let l = 0; l < n; l++) {
    let ligne = new Array<string>();
    for (let c = 0; c < n; c++) {
      ligne.push("");
    }
    Grille.push(ligne);
  }
  return Grille;
}

function tailleCôté(Grille: Array<Array<string>>): number {
  return Grille[0].length;
}

// function estVide(Grille: Array<Array<string>>, i: number, j: number): boolean {
//   let n = tailleCôté(Grille);
//   if ((i < 0 && i > n - 1) || (j < 0 && j > n - 1)) return false;
//   else if (Grille[i][j] === "") return true;
//   return false;
// }

function estVide(Grille: Array<Array<string>>, i: number, j: number): boolean {
  let n = tailleCôté(Grille);
  if (i < 0 || i >= n || j < 0 || j >= n) return false;
  else if (Grille[i][j] === "") return true;
  else return false;
}

function écrire(
  grille: Array<Array<string>>,
  i: number,
  j: number,
  symbole: string
): Array<Array<string>> {
  if (estVide(grille, i, j) && (symbole === "X" || symbole === "O")) {
    grille[i][j] = symbole;
    return grille;
  }
  return grille;
}

function effacer(grille: Array<Array<string>>, i: number, j: number): Array<Array<string>> {
  grille[i][j] = "";
  return grille;
}

function est(grille: Array<Array<string>>, i: number, j: number, symbole: string): boolean {
  let n = tailleCôté(grille);
  if (symbole === "X" || symbole === "O") return true;
  else if ((i < 0 && i > n - 1) || (j < 0 && j > n - 1)) return false;
  return true;
}

function affiche(grille: Array<Array<string>>): void {
  let ligne = "";
  let séparateurLigne = "";
  for (let i = 0; i < tailleCôté(grille); i++) {
    ligne = " ";
    séparateurLigne = "";
    for (let j = 0; j < tailleCôté(grille); j++) {
      if (j === tailleCôté(grille) - 1) ligne = ligne + grille[i][j];
      else ligne = ligne + grille[i][j] + "  |  ";
      if (i === tailleCôté(grille) - 1) séparateurLigne = "";
      else séparateurLigne = séparateurLigne + "------";
    }
    console.log(ligne);
    console.log(séparateurLigne);
  }
}

function estPleine(grille: Array<Array<string>>): boolean {
  for (let i = 0; i < tailleCôté(grille); i++) {
    for (let j = 0; j < tailleCôté(grille); j++) {
      if (estVide(grille, i, j)) return false;
    }
  }
  return true;
}

function ligneGagnante(grille: Array<Array<string>>, symbole: string): boolean {
  for (let i = 0; i < tailleCôté(grille); i++) {
    let ligneGagnante = true;
    for (let j = 0; j < tailleCôté(grille); j++) {
      if (grille[i][j] !== symbole) {
        ligneGagnante = false;
      }
    }
    if (ligneGagnante) return true;
  }
  return false;
}

function colonneGagnante(grille: Array<Array<string>>, symbole: string): boolean {
  for (let i = 0; i < tailleCôté(grille); i++) {
    let colonneGagnante = true;
    for (let j = 0; j < tailleCôté(grille); j++) {
      if (grille[j][i] !== symbole) {
        colonneGagnante = false;
      }
    }
    if (colonneGagnante) return true;
  }
  return false;
}

function diagonalegagnante(grille: Array<Array<string>>, symbole: string): boolean {
  let n = tailleCôté(grille);
  let diagonale = true;
  let diagonaleinverse = true;

  for (let i = 0; i < n; i++) {
    if (grille[i][i] !== symbole) diagonale = false;
    if (grille[i][n - i - 1] !== symbole) diagonaleinverse = false;
  }
  return diagonale || diagonaleinverse;
}

function gagnant(grille: Array<Array<string>>, symbole: string): boolean {
  if (
    ligneGagnante(grille, symbole) ||
    colonneGagnante(grille, symbole) ||
    diagonalegagnante(grille, symbole)
  ) {
    console.log("le joueur  " + symbole + "  a gagné");
    return true;
  }
  return false;
}

//PARTIE 3 intermédiaire utilisateur programme

import * as readlinesync from "readline-sync";
//Q1
function tailleGrille(): number {
  let taille_grille: number;
  do {
    taille_grille = Number(readlinesync.question("Entrez une taille de grille : "));
  } while (taille_grille < 3);
  return taille_grille;
}

function continuer(): boolean {
  let reponse: string;
  do {
    reponse = readlinesync.question("On continue ? [O]ui ou [N]on : ");
    if (reponse !== "O" && reponse !== "N")
      console.log("Veuillez entrer 'O' pour continuer ou 'N' pour stopper le jeu ");
  } while (reponse !== "O" && reponse !== "N");
  let souhait = true;
  if (reponse === "N") souhait = false;
  return souhait;
}

function tourJoueur(tour: number): void {
  if (tour % 2 === 0) console.log("C'est au tour du joueur X");
  else console.log("c'est au tour du joueur O ");
}

function ligne(grille: Array<Array<string>>): number {
  let numLigne: number;
  do {
    numLigne = Number(
      readlinesync.question(
        "Entrez le numero de la ligne (Appuyer sur entrer pour annuler la saisie) : "
      )
    );
    if (numLigne < 0) console.log("veuillez entrer un nombre positif !");
    if (numLigne > tailleCôté(grille)) console.log("dépassement grille");
    if (numLigne === Number("")) console.log("Veuillez choisir une ligne pour jouer !");
  } while (numLigne < 0 || numLigne > tailleCôté(grille) || numLigne === Number(""));
  return numLigne;
}

function colonne(grille: Array<Array<string>>): number {
  let numColonne: number;
  do {
    numColonne = Number(
      readlinesync.question(
        "Entrez le numero de la colonne (Appuyer sur entrer pour annuler la saisie) : "
      )
    );
    if (numColonne < 0) console.log("veuillez entrer un nombre positif !");
    if (numColonne > tailleCôté(grille)) console.log("dépassement grille");
    if (numColonne === Number("")) console.log("Veuillez choisir une colonne pour jouer !");
  } while (numColonne < 0 || numColonne > tailleCôté(grille) || numColonne === Number(""));
  return numColonne;
}

//Lancement du jeu
let paramètre = tailleGrille();
let Grille = crééGrille(paramètre);
let historique = [];
affiche(Grille);
historique.push("Entrez la taille de la grille :" + paramètre);
do {
  for (let tour = 0; continuer(); tour++) {
    tourJoueur(tour);
    let numLigne = ligne(Grille) - 1;
    let numColonne = colonne(Grille) - 1;
    while (!estVide(Grille, numColonne, numLigne)) {
      numLigne = ligne(Grille);
      numColonne = colonne(Grille);
    }
    let symbol = "";
    if (tour % 2 === 0) {
      symbol = "X";
    } else symbol = "O";
    Grille = écrire(Grille, numLigne, numColonne, symbol);
    affiche(Grille);
    if (estPleine(Grille)) console.log("Match nul !");
    historique.push(
      "On continue ? [O]ui ou [N]on : " + continuer(),
      "C’est au tour du joueur : " + symbol,
      "Entrez le numéro de la ligne (appuyez sur entrée pour annuler la saisie) : " + numLigne,
      "Entrez le numéro de la colonne (appuyez sur entrée pour annuler la saisie) :" + numColonne,
      "Dernier coup joué = (" +
        numLigne +
        1 +
        ", " +
        numColonne +
        1 +
        ", " +
        "'" +
        symbol +
        "'" +
        ")"
    );
    if (historique.length > 1) {
      console.log(historique);
    }
  }
  break;
} while (!gagnant(Grille, "O") && !gagnant(Grille, "X") && !estPleine(Grille));

function main(): void {
  // let Test = crééGrille(6);
  /*   console.log(estVide(Test, 0, 0));
  console.log(estVide(Test, 0, 8));
  console.log(estVide(Test, 0, 1)); */
  //affiche(Test);
  // affiche(Test);
  // console.log(estPleine(Test));
  // gagnant(Test, "_");
  //console.log(tailleGrille());
}
main();
