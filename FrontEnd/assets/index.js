const filters = document.querySelector(".filters");
const gallery = document.querySelector(".gallery");
let works = [];
let worksFiltered = [];
const modalContainer = document.querySelector(".modal");
const modalAddPhoto = document.querySelector(".Modal-ajouter-photo");

// const p = document.createElement("p")
// p.textContent = "text" // content of 'p' is text

// filters.appendChild(p) // recuparation de page (text)

// Category

async function fetchCategories() {
  let response = await fetch("http://localhost:5678/api/categories"); // recuperer les category de base de donner d'API
  const data = await response.json(); // Await = request?
  const ul = document.createElement("ul");
  filters.appendChild(ul); // recuparation de ul (text)

  data.map((category) => {
    // parcourir interiour de tableau (swegger = backend)
    // console.log(category)
    // const li = document.createElement("li")
    // li.textContent = category.name // content de LI

    // ul.appendChild(li)
    ul.innerHTML += `<li class="filter" data-id=${category.id} >${category.name}</li>`; // class="filter" rajout de classe
  });
}

// Work
async function fetchWorks() {
  let response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  works = data; // permet de recuperer en dehor de function
  displayWorks(works);
}

// filters
async function filterWorks() {
  const filtersLi = document.querySelectorAll(".filter");
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

function displayWorks(data) {
  // Work = est un tableau contient toutes les photos
  return data.map((work) => {
    // map = permet de recuperer toutes les donnes de fetch API
    const workItem = document.createElement("figure");
    workItem.innerHTML = `<img src=${work.imageUrl} alt=${work.title}>
    <figcaption>${work.title}</figcaption>`;
    gallery.appendChild(workItem);
  });

  // connexion login et logout
}

// Variables globale

function check() {
  if (localStorage.getItem("token")) {
    let login = document.querySelector(".connexion");
    login.innerHTML = '<a class="logout" href="index.html">logout</a>';
    let logout = document.querySelector(".logout");
    logout.addEventListener("click", () => {
      localStorage.removeItem("token"); // remove token
    });
    filters.innerHTML = ""; // remove filtre mes projets
    //
    const modif = document.createElement("projet-modif");
    modif.innerHTML =
      "<p class='modal-trigger'><i class='far fa-edit'></i> modifier</p>";
    const headerProjet = document.querySelector(".header-projet");
    headerProjet.appendChild(modif);
  }

  /******* MODAL 1 ********/
  const openModal = function (e) {
    modalContainer.style.display = "flex";
  };

  const closeModal = function () {
    modalContainer.style.display = "none";
  };
  // creer un event for class modal trigger pour ouvrir la modal
  document.querySelectorAll(".modal-trigger").forEach((a) => {
    a.addEventListener("click", openModal);
    //const target = document.querySelector(e.target.getAttribute())
  });
    // on creer un event for class close modal, when click to close the modal
  document.querySelectorAll(".close-modal").forEach((a) => {
    a.addEventListener("click", closeModal);
  });
}

// Modal images
function getImageModal() {
  works.map((imageModal) => {
    //chemin pour recuperer les images d'API "works"
    // Créer une Variable qui s'appelle Edit qui va nous permettre d'affichier nos titre
    const galleryModal = document.querySelector(".gallery-modal");
    const editModal = document.createElement("figure");
    const photoEdit = document.createElement("article")
    
    editModal.className = "modal-figure";
    // On affiche les elements dans le HTML + img
    editModal.innerHTML = `
            
            <img src=${imageModal.imageUrl} class="modal-img" alt=${imageModal.title}> 
            <img.title=${imageModal.title} classe="img-edite">éditer
            <i class="fa-solid fa-trash-can" data-id=${imageModal.id}></i>`
            ;
     galleryModal.appendChild(editModal);
  });
}
// Headers => L'authorization bearer avec le token dedans permet d'envoyer à l'api le fait que tu es connecté avec le token sinon ça ne fonctionnerait pas car l'api vérifie qu'il y
// a bien ce token pour supprimer ou ajouter un work.
async function deleteWork() {
  const deleteButtons = document.querySelectorAll(".modal-icon-delete")
    .forEach((button) => {
      button.addEventListener("click", async () => {
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
        } else if (response.status === 401) {
          console.log("Pas connecté.");
        }
      });
    });
}

// Modal 2

const openModalTwo = function(e){
  modalContainer.style.display = "flex";
  // document.querySelector(".Modal-ajouter-photo").addEventListener("click", openModalTwo)

};

const closeModalTwo = function (){
  modalContainer.style.display = "none";
};

document.querySelector(".ajouter-img").addEventListener("click", openModalTwo)

// document.querySelectorAll("close-modal").forEach((a) =>{
//   a.addEventListener("click", closeModal);
// });

addEventListener("DOMContentLoaded", async (event) => {
  // le code execute une fois que html est chargé - appel les fonctions

  await fetchCategories();
  await fetchWorks();
  await filterWorks();
  await check();
  await getImageModal();
  await deleteWork();
});
