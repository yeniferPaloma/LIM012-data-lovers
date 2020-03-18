import data from "./data/lol/lol.js";
import {
  filterByName,
  filteredbyClass,
  filteredByDifficulty
} from "./data.js"


/*Muestra en interfaz dos mas saludo y letra capital*/
const primeraInterfaz = document.getElementById("primeraInterfaz");
const segundaInterfaz = document.getElementById("segundaInterfaz");
primeraInterfaz.style.display = "block";
segundaInterfaz.style.display = "none";

document.getElementById("buttonEnter").addEventListener("click", () => {
  const name = document.getElementById("inputName").value;
  const newStr = `${name[0].toUpperCase()}${name.slice(1)}`;
  const parrafo = document.getElementById("nombreIngresado");
  parrafo.innerHTML = `!\n Welcome ${newStr}\n !`;
  segundaInterfaz.style.display = "block";
  primeraInterfaz.style.display = "none";
});

/*Muestra de la lista de campeones*/

const championList = data.data;
let list = document.querySelector("#list");

//object values le saca los valores de key en forma de arreglo
Object.values(championList).map(champion => {
  const div = document.createElement("div");
  const img = document.createElement("img");
  const p = document.createElement("p");
  p.className = "championName";
  img.className = "championSplash";
  img.src = `${champion.splash}`;
  p.innerHTML = `${champion.name}`;
  div.appendChild(img);
  div.appendChild(p);
  list.appendChild(div);
});

//busqueda por nombre
//probando la subida
let input = document.querySelector("#searchInputs");
let filteredList = document.querySelector("#filteredList");

//target : lo que sea a lo que se le aplique add event listener
if (typeof input.addEventListener != "undefined") {
  input.addEventListener(
    "keyup",
    evt => {
      let term = evt.target.value.toLowerCase();

      /*let filteredChampions = Object.values(championList).filter(champion => {
          //indexof da -1 si no encuentra resultados
          if (champion.name.toLowerCase().indexOf(term) != -1) {
              return champion;
          }
      });*/
      let filteredChampions = filterByName(championList, term);
      //mensaje de error en la busqueda por nombre
      if (term.length != 0) {
        list.classList.add("hidden");
        filteredList.classList.remove("hidden");
      } else {
        list.classList.remove("hidden");
        filteredList.classList.add("hidden");
      }
      let errorMessage = document.querySelector("#error");
      if (filteredChampions.length === 0) {
        errorMessage.classList.remove("hidden");
      } else {
        errorMessage.classList.add("hidden");
      }

      //vaciar arreglo para que no se duplique
      filteredList.innerHTML = "";
      //filteredList ==  <div id="filteredList" ></div>
      Object.values(filteredChampions).map(champion => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const p = document.createElement("p");
        p.className = "championName";
        img.className = "championSplash";
        img.src = `${champion.splash}`;
        p.innerHTML = `${champion.name}`;
        div.appendChild(img);
        div.appendChild(p);
        filteredList.appendChild(div);
      });
    },
    false
  );
}

//[p.btn, p.btn, p.btn, p.btn, p.btn, p.btn, p.btn]
// p.btn == button == <p class="btn" data-value="ALL">ALL</p>
let ul = document.querySelector('ul')
let li = document.querySelectorAll('li');

li.forEach(el => {
  el.addEventListener('click', function () {
    ul.querySelector('.active').classList.remove('active');
    el.classList.add('active');
  })

});

li.forEach(button => {
  button.addEventListener("click", () => {
    let term = button.getAttribute("data-value");
    // <p class="btn" data-value="ALL">ALL</p>
    if (term === "ALL") {
      list.classList.remove("hidden");
      filteredList.classList.add("hidden");
    } else {
      list.classList.add("hidden");
      filteredList.classList.remove("hidden");
    }
    // filteredChampions == []
    /*let filteredChampions = Object.values(championList).filter(champion => {
      if (champion.tags.indexOf(term) != -1) {
        return champion;
      }
    });*/
    filteredList.innerHTML = "";
    let filteredChampions = filteredbyClass(championList, term);

    //filteredList ==  <div id="filteredList" ></div>
    Object.values(filteredChampions).map(champion => {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const p = document.createElement("p");
      p.className = "championName";
      img.className = "championSplash";
      img.src = `${champion.splash}`;
      p.innerHTML = `${champion.name}`;
      div.appendChild(img);
      div.appendChild(p);
      filteredList.appendChild(div);
    });
  });
});

/* 
  [<div class="difficulty1" data-value="1" id="easy" href="#">easy</div>,
  <div class="difficulty1" data-value="2" id="medium" href="#">medium</div>,
  <div class="difficulty1" data-value="3" id="hard" href="#">hard</div>]
*/
let difficulty1 = document.querySelectorAll(".difficulty1");
difficulty1.forEach(option => {
  option.addEventListener("click", () => {
    let term = option.getAttribute("data-value");

    list.classList.add("hidden");
    filteredList.classList.remove("hidden");


    filteredList.innerHTML = "";
    let filteredChampions = filteredByDifficulty(championList, term);

    //filteredList ==  <div id="filteredList" ></div>
    Object.values(filteredChampions).map(champion => {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const p = document.createElement("p");
      p.className = "championName";
      img.className = "championSplash";
      img.src = `${champion.splash}`;
      p.innerHTML = `${champion.name}`;
      div.appendChild(img);
      div.appendChild(p);
      filteredList.appendChild(div);
    });
  })
});


// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementsByClassName("championSplash");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
