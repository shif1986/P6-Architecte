const filters = document.querySelector(".filters");
const gallery = document.querySelector(".gallery");
let works = [];
let worksFiltered = [];
const modalContainer = document.querySelector("#modal1");
const modalContainerTwo = document.querySelector("#modal2");
const inputImage = document.querySelector("#image");
console.log(inputImage);
const ajouterPhoto = document.querySelector(".ajouter-photo-2");
const previewImage = document.querySelector(".preview-image");
const textJpeg = document.querySelector(".content-image p");
const formAdd = document.querySelector(".titre-categ");

// fetch = communiquer avec api
// get = recuperation
// post = enovyer les elements
// patch = delete mise a jour

// recuperation d'API - Category

async function fetchCategories() {
  let response = await fetch("http://localhost:5678/api/categories"); // recuperer les category de base de donner d'API
  const data = await response.json(); // Await = request? attend la fin de  lexecution promis.()
  const ul = document.createElement("ul");
  filters.appendChild(ul); // recuparation de ul (text)
  const selectCategorie = document.querySelector("#categorie");

  data.map((category) => {
    // data = tableau
    // parcourir interiour de tableau (swegger = backend)
    // console.log(category)
    // const li = document.createElement("li")
    // li.textContent = category.name // content de LI

    // ul.appendChild(li)
    ul.innerHTML += `<li class="filter" data-id=${category.id} >${category.name}</li>`; // class="filter" rajout de classe
    selectCategorie.innerHTML += `<option value=${category.id}>${category.name}</option>`;
  });
}

// recuperation d'API -  Work
async function fetchWorks() {
  let response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  works = data; // permet de recuperer en dehor de function
  await displayWorks(works);
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

async function displayWorks(data) {
  // Work = est un tableau contient toutes les photos dans API
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
    // Créer une Variable qui s'appelle Edit qui va nous permettre d'affichier nos titre
    const editModal = document.createElement("figure");
    const photoEdit = document.createElement("article");

    editModal.className = "modal-figure";
    // On affiche les elements dans le HTML + img + caption,icons
    editModal.innerHTML = `
            
            <img src=${imageModal.imageUrl} class="modal-img" alt=${imageModal.title}> 
            <span class="image-caption" >éditer</span>
            <p class='trash-box'> <i class="fa-solid fa-trash-can modal-icon-delete" data-id=${imageModal.id}></i> </p>
            <p class='move-box'> <i class="fa-solid fa-arrows-up-down-left-right"></i></p>`;
    galleryModal.appendChild(editModal);
  });

  // breakline
  const breakLine = document.createElement("hr");
  breakLine.innerHTML = "<hr>";
  document.body.appendChild(breakLine);
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
};

// Ajouter image

const closeModalTwo = function () {
  modalContainerTwo.style.display = "none";
};

document.querySelector(".ajouter-img").addEventListener("click", openModalTwo);
ajouterPhoto.addEventListener("click", (e) => {
  console.log(inputImage,e);
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
});
// fonctionnement de titre et categorie
// post = envoyer les infos vers le back 
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
  const response =  await fetch("http://localhost:5678/api/works", {
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
    //await fetchWorks();
    //await getImageModal();
    console.log(works);
  } else if (response.status === 401) {
    console.error('401');
  }
  // e.stopPropagation();

  // document.querySelector(".valider-image").addEventListener("click", openModalTwo);
  // validateImages.addEventListener("click", openModalTwo);
});

addEventListener("DOMContentLoaded", async (event) => {
  // le code execute une fois que html est chargé - appel les fonctions

  await fetchCategories();
  await fetchWorks();
  await filterWorks();
  await check();
  await getImageModal();
});

// apres avoir envoie img, il faut clear l'image
