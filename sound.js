// le bouton de son
const boutonSon = document.getElementById('sound');      
boutonSon.addEventListener('click', function () {
    lireTexte();
});
//fonction de lecture
function lireTexte() {
    // Récupérer le texte à lire
    const texte = document.querySelector('#lire').innerText;
    // Créer un objet SpeechSynthesisUtterance
    let utterance = new SpeechSynthesisUtterance(texte);
    // Utiliser l'API SpeechSynthesis pour lire le texte à voix haute
    window.speechSynthesis.speak(utterance);
}