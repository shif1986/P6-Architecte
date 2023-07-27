const filters = document.querySelector(".filters");
const gallery = document.querySelector(".gallery");
let works = [];
let worksFiltered = [];

// modal 1
const modalContainer = document.querySelector("#modal1");
const modalContainerTwo = document.querySelector("#modal2");
const inputImage = document.querySelector("#image");
console.log(inputImage);

// Modal 2
const ajouterPhoto = document.querySelector(".ajouter-photo-2");
const previewImage = document.querySelector(".preview-image");
const textJpeg = document.querySelector(".content-image p");
const formAdd = document.querySelector(".titre-categ");

// fetch = communiquer avec api, aller recuperer
// await attend a partir de moment d'un envoie, sans await les requette envoie constanment, vas charger l'API?
// get = recuperation
// post = enovyer les elements
// patch = delete mise a jour
// foreach = 
// adeventlistener = 

// recuperation d'API - Category

async function fetchCategories() {
  let response = await fetch("http://localhost:5678/api/categories"); // recuperer les category de base de donner d'API
  const data = await response.json(); // Await = request? attend la fin de  lexecution promis.()
  const ul = document.createElement("ul");
  filters.appendChild(ul); // recuparation de ul (text)
  const selectCategorie = document.querySelector("#categorie");

  data.map((category) => {
    // data = tableau
    // parcourir interiour de tableau 
    ul.innerHTML += `<li class="filter" data-id=${category.id} >${category.name}</li>`; // class="filter" rajout de classe
    selectCategorie.innerHTML += `<option value=${category.id}>${category.name}</option>`;
  });
}

// recuperation d'API -  Work, img
async function fetchWorks() {
  let response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  works = data; // permet de recuperer en dehor de function
  await displayWorks(works);
}

// filters Modal 2 Objets, Appartements, Hotel & restauration
async function filterWorks() {
  const filtersLi = document.querySelectorAll(".filter"); //filter vient de class li
  filtersLi.forEach((filter) => {
    filter.addEventListener("click", () => {
      // fonction pour chaque filtre
      worksFiltered = works.filter(
        (work) => work.category.id == filter.dataset.id
      ); // filter - work.category.id = une fonction permet de filtrer chaque elements
      console.log(works, worksFiltered);
      gallery.innerHTML = "";
      displayWorks(worksFiltered);
    });
  });
}

//Recuperation d'images 
// Work = est un tableau contient toutes les photos dans API
async function displayWorks(data) {
  gallery.innerHTML = "";
  return data.map((work) => {
    // map = permet de recuperer toutes les donnes de fetch API
    const workItem = document.createElement("figure");
    workItem.innerHTML = `<img src=${work.imageUrl} alt=${work.title}>
    <figcaption>${work.title}</figcaption>`;
    gallery.appendChild(workItem);
  });
}

// connexion login et logout
function check() {
  // localstorage = navigateur local ou met le token
  if (localStorage.getItem("token")) {
    let login = document.querySelector(".connexion");
    login.innerHTML = '<a class="logout" href="index.html">logout</a>'; //creation classe logout
    let logout = document.querySelector(".logout");
    logout.addEventListener("click", () => {
      localStorage.removeItem("token"); // quand le logout passe, remove token
    });
    filters.innerHTML = ""; // remove filtre mes projets

    const modif = document.createElement("projet-modif"); //creation d'element dans le 1er modal
    modif.innerHTML =
      "<p class='modal-trigger'><i class='far fa-edit'></i> modifier</p>";  // lien au clique 1er modal s'ouvre avec la classe "modal-triger"
    const headerProjet = document.querySelector(".header-projet"); // nom de header (mes projets)
    headerProjet.appendChild(modif);
  }

  document.querySelectorAll(".modal-trigger").forEach((a) => {
    a.addEventListener("click", openModal);
  });
  // on creer un event for class close modal, when click to close the modal
  document.querySelectorAll(".close-modal").forEach((a) => {
    a.addEventListener("click", closeModal);
    a.addEventListener("click", closeModalTwo);
  });
}

/******* MODAL 1 ********/
const openModal = function (e) {
  modalContainer.style.display = "flex";
};

const closeModal = function () {
  modalContainer.style.display = "none";
};

// Modal images
async function getImageModal() {
  const galleryModal = document.querySelector(".gallery-modal");
  galleryModal.innerHTML = "";

  works.map((imageModal) => {
    //chemin pour recuperer les images d'API "works"

    // creation les classes
    const editModal = document.createElement("figure");
    const photoEdit = document.createElement("article");

    editModal.className = "modal-figure";
    // dans proprieté figure qu'on affiche les elelemnts img + caption,icons
    // par la suite il vont heritier de gallery modal
    editModal.innerHTML = `
            
            <img src=${imageModal.imageUrl} class="modal-img" alt=${imageModal.title}> 
            <span class="image-caption" >éditer</span>
            <p class='trash-box'> <i class="fa-solid fa-trash-can modal-icon-delete" data-id=${imageModal.id}></i> </p>
            <p class='move-box'> <i class="fa-solid fa-up-down-left-right" data-id=${imageModal.id}></i> </p>`;
    galleryModal.appendChild(editModal);
  });
  // breakline


  document.querySelectorAll(".modal-icon-delete").forEach((button) => {
    button.addEventListener("click", async () => await deleteWork(button));
  });
}

// Headers => L'authorization bearer avec le token dedans permet d'envoyer à l'api le fait que tu es connecté avec le token sinon ça ne fonctionnerait pas car l'api vérifie qu'il y
// a bien ce token pour supprimer ou ajouter un work.
async function deleteWork(button) {
  const response = await fetch(
    `http://localhost:5678/api/works/${button.dataset.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    }
  );

  if (response.status === 204) {
    // supprimer le work visuellement sans rechargement de page dans la modale et la page d'accueil.
    await fetchWorks();
    await getImageModal();
    console.log(works);
  } else if (response.status === 401) {
  }
}

// Modal 2
const openModalTwo = function (e) {
  modalContainerTwo.style.display = "flex";
  closeModal();
  // document.querySelector(".Modal-ajouter-photo").addEventListener("click", openModalTwo)


  // arrow left
  const arrowLeft = document.querySelector(".fa-arrow-left");
  
arrowLeft.addEventListener('click', handleArrowLeftClick);

function handleArrowLeftClick() {
  closeModalTwo(); // Ferme modal 2
  openModal(); // Ouvre Modal 1 (La modal "Ajouter une photo")
}

// Restriction pour ajouter img
// const categorie = document.querySelectorAll(".categorie");
// const ajouterImgTwo = document.querySelector(".ajouter-photo-2");
// const ajouterTitre = document.querySelector(".photo-title");


// // ModalTwoContent.addEventListener('click', restrictElements);

// // Tu me vérifie si la valeur de l'input photo-title est vide ""
// if (ajouterImgTwo.value==="" || ajouterTitre.value===""){
//   alert("veillez renseignez tous les champs");


// }

// function restrictElements(){
//   if()

// }



  const closeModalTwo = () => {
    modalContainerTwo.style.display = "none";
  }
};



// Ajouter image
const imagePreview = document.querySelector(".image-preview");

const closeModalTwo = function () {
  modalContainerTwo.style.display = "none";
};

document.querySelector(".ajouter-img").addEventListener("click", openModalTwo);
ajouterPhoto.addEventListener("click", (e) => {
  console.log(inputImage, e);
  inputImage.click();
  console.log("Clicked");
});
inputImage.addEventListener("change", () => {
  const selectedImage = inputImage.files[0];
  previewImage.src = URL.createObjectURL(selectedImage);
  ajouterPhoto.style.display = "none";
  previewImage.style.width = "auto";
  previewImage.style.maxHeight = "100%";
  textJpeg.style.display = "none";
  imagePreview.style.display = "none";

});

// Validateur de ajouter img

formAdd.addEventListener("submit", async (e) => {
  e.preventDefault();

  const validateImages = document.querySelector(".valider-image");

  const title = document.getElementById("photo-title").value;
  const category = document.getElementById("categorie").value;
  const image = document.getElementById("image").files[0];

  const formData = new FormData();

  formData.append("image", image);
  formData.append("title", title);
  formData.append("category", category);
  let erreur = document.getElementById("erreur");

  // Effectuer les vérifications de validation

  if (!title || !category || !image){
  // Si l'un des c'est champs sont vide, affiche un message d'erreur
  // !title: Cela vérifie si la variable title est évaluée à faux. !=signifie faux
  erreur.textContent = "Veillez renseignez tous les champs";

    return  // Arrete la soumission du formulaire
}


    const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`, // token sucurise le code
    },
  });
  // 
  if (response.status === 201) {
    console.log('works');
    // supprimer le work visuellement sans rechargement de page dans la modale et la page d'accueil.
    await fetchWorks();
    await getImageModal();
    await closeModal();
    await closeModalTwo();
    console.log(works);
  } else if (response.status === 401) {
    console.error('401');
  }

});



addEventListener("DOMContentLoaded", async (event) => {
  // le code execute une fois que html est chargé - appel les fonctions

  await fetchCategories();
  await fetchWorks();
  await filterWorks();
  await check();
  await getImageModal();
});

