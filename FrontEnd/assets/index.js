const filters = document.querySelector(".filters");
const gallery = document.querySelector(".gallery");
let works = [];
let worksFiltered = []
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
  displayWorks(works)
}
// filters
async function filterWorks() {
  const filtersLi = document.querySelectorAll(".filter");
  filtersLi.forEach((filter) => {
    filter.addEventListener("click", () => { // fontion pour chaque filtre
      worksFiltered = works.filter((work) => work.category.id == filter.dataset.id); // filter - work.category.id = une fonction permet de filtrer chaque elements
      console.log(works,worksFiltered);
      gallery.innerHTML=''
     displayWorks(worksFiltered)
     
    
        
    });
  });
}
function displayWorks(data){
    return  data.map((work) => {
        const workItem = document.createElement("figure");
        workItem.innerHTML = `<img src=${work.imageUrl} alt={work.title}>
    <figcaption>${work.title}</figcaption>`;
        gallery.appendChild(workItem);
      });

      // connexion login et logout
}
function check(){
  if(localStorage.getItem("token")){
    let login = document.querySelector(".connexion")
    login.innerHTML= '<a class="logout" href="index.html">logout</a>'
    let logout = document.querySelector(".logout")
    logout.addEventListener("click", () => {
      localStorage.removeItem("token") // remove token

    })
filters.innerHTML="" // remove filtre mes projets
// 
const modif = document.createElement("projet-modif")
modif.innerHTML= "<p> <i class=fa-thin fa-pen-to-square></i> modifier</p>"
const headerProjet = document.querySelector(".header-projet")
headerProjet.appendChild(modif)
  }
}
addEventListener("DOMContentLoaded", async (event) => {
  // le code execute une fois que html est chargé
  await fetchCategories();
  await fetchWorks();
  await filterWorks();
  await check();
});



