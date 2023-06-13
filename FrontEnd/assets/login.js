// document.getElementById("login").addEventListener("submit", function(event) {

//     let email = document.getElementById('email');
//     let mdp = document.getElementById('mdp');
//     let form = document.getElementById('form');
//     let erreur = document.getElementById('erreur');

//     // Mot de passe

//     if(!mdp.value){
//         erreur= "veuillez renseigner votre mot de passe"
//     }
//     if (mdp.value.length <= 6){
//         erreur = "mot de passe doit etre plus que 6 character"
//     }

//     if(!email.value){ //!=pas de valeur
//         erreur= "veuillez renseigner votre adresse mail"
//     }

//     if(erreur){
//         e.preventDefault();
//         document.getElementById("erreur").innerHTML = erreur;
//         return false
//     } else{
//         alert('formulaire envoyé');
//     }

// }
// );

// Étape 1: Créer une fonction qui sera appelée lorsque le formulaire de connexion est soumis
async function handleLogIn(event) {
  event.preventDefault(); // Empêche le formulaire de se soumettre normalement

  // Étape 2: Récupérer les valeurs entrées par l'utilisateur
  let email = document.getElementById("email").value;
  let mdp = document.getElementById("mdp").value;
 let form = document.getElementById('form');
  let erreur = document.getElementById('erreur');

//    if(email.trim() === "" || mdp.trim() === ""){
//       alert("Veuillez entrer votre email et votre mot de passe.");
//   return;
//    }
    if(email.trim()=== ""){
       alert("veuillez renseigner votre adresse mail");
        return;
    }

    if(mdp.trim()=== ""){
        alert("veuillez renseigner votre mot de passe");
         return;
     }

  // Créer un objet avec les informations d'identification
  let credentials = {
    email: "",
    password: "",
  };

  try {
    // Envoyer une requête POST à l'API pour vérifier les informations d'identification
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST", // Utilise la méthode POST pour envoyer les informations
      headers: {
        "Content-Type": "application/json", // Définit le type de contenu de la requête comme JSON
      },
      body: JSON.stringify(credentials), // Convertit les informations d'identification en JSON et les envoie dans le corps de la requête
    });

    // Analyser la réponse JSON renvoyée par l'API
    const data = await response.json();
    // console.log(data.message);
    if (data.message) {
    //   alert("Connexion réussie !");
      window.location.href = "index.html"; // Redirige vers la page d'accueil en cas de succès de la connexion
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
  }
}

let form = document.getElementById("login");
form.addEventListener("submit", handleLogIn);
