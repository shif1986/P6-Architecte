	
const filters = document.querySelector(".filters")
const gallery = document.querySelector(".gallery")

// const p = document.createElement("p")
// p.textContent = "text" // content of 'p' is text

// filters.appendChild(p) // recuparation de page (text)

// Category

async function fetchCategories(){
    let response = await fetch("http://localhost:5678/api/categories"); // recuperer les category de base de donner d'API
    const data = await response.json() // Await = request?
    const ul = document.createElement("ul")
    filters.appendChild(ul)
    
    data.map((category ) => { // parcourir interiour de tableau (swegger = backend)
        // console.log(category)
        // const li = document.createElement("li")
        // li.textContent = category.name // content de LI

        // ul.appendChild(li)
        ul.innerHTML += `<li class="filter" >${category.name}</li>` // class="filter" rajout de classe

    })

}

    // Work
async function fetchWorks(){
    let response = await fetch("http://localhost:5678/api/works");
    const data = await response.json()
    const p = document.createElement("p")
    filters.appendChild(p)
    data.map((works) => {
        console.log(works)
    p.innerHTML += `<p classe="titre">${works.title}</li>` 
    })
}



addEventListener("DOMContentLoaded", async (event) => { // le code execute une fois que html est chargé
    await fetchCategories()
    await fetchWorks()
});


// Gallery photos et caption

const imageGallery = [
    {
	    "image":"abajour-tahina.png",	
	},
    {
        "image":"appartement-paris-v.png",
    },
    {
	    "image":"appartement-paris-x.png",	
	},
    {
        "image":"appartement-paris-xviii.png",
    },
    {
	    "image":"bar-lullaby-paris.png",	
	},
    {
        "image":"hotel-first-arte-new-delhi.png",
    },
    {
	    "image":"la-balisiere.png",	
	},
    {
        "image":"le-coteau-cassis.png",
    },
    {
        "image":"restaurant-sushisen-londres.png",
    },
    {
	    "image":"sophie-bluel.png",	
	},
    {
        "image":"structures-thermopolis.png",
    },
    {
        "image":"villa-ferneze.png",
    },
      
]
console.log(imageGallery.length)

const galleryPhoto = document.querySelector(".gallery-photo");

imageGallery.src = "./assets/images"(galleryPhoto);
document.body.appendChild(imageGallery);

console.log(galleryPhoto);


// function displayImage(src) {
//     let img = document.createElement("img");
//     img.src = "./assets/images/villa-ferneze.png";
//     document.body.appendChild(img);
//    }
//    displayImage('img');