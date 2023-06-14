// Étape 1: Créer une fonction qui sera appelée lorsque le formulaire de connexion est soumis
async function handleLogIn(event) {
  event.preventDefault(); // Empêche le formulaire de se soumettre normalement

  // Étape 2: Récupérer les valeurs entrées par l'utilisateur
  let email = document.getElementById("email").value;
  let mdp = document.getElementById("mdp").value;
  let form = document.getElementById("form");
  let erreur = document.getElementById("erreur");

  if (email.trim() === "") {
   erreur.textContent = "veuillez renseigner votre adresse mail";
    return;
  }

  if (mdp.trim() === "") {
    erreur.textContent = "veuillez renseigner votre mot de passe";
    return;
  }

  // Créer un objet avec les informations d'identification
  let credentials = {
    email: email,
    password: mdp,
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
    if(response.status===200){
         // Analyser la réponse JSON renvoyée par l'API
        const data = await response.json();
        // console.log(data.message);
        localStorage.setItem("token",data.token) //aller chercher le token
          //   alert("Connexion réussie !");
          window.location.href = "index.html"; // Redirige vers la page d'accueil en cas de succès de la connexion
        

    }

   
   
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
  }
}

let form = document.getElementById("login");
form.addEventListener("submit", handleLogIn);




