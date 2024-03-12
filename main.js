const container = document.querySelector(".container");
const spinner = document.querySelector(".spinner");
// const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

function toggleSpinner() {
  spinner.classList.toggle("d-none");
}

// async function getData() {
//   try {
//     toggleSpinner();
//     const res = await fetch(BASE_URL);
//     if (!res.ok) {
//       throw new Error("Failed to fetch the data.");
//     }
//     const data = await res.json();
//     displayData(data);
//   } catch (err) {
//     const errorParagraph = document.createElement("p");
//     errorParagraph.innerText = err;
//     errorParagraph.setAttribute("class", "error");

//     container.append(errorParagraph);
//   } finally {
//     toggleSpinner();
//   }
// }

// getData();

function displayData(data) {
  data.forEach((element) => {
    const box = `<div class="col">
    <div class="card border-primary rounded-3">
      <div class="card-body p-0">
        <h4 class="card-title p-2">${element.title}</h4>
        <p class="card-text bg-body-tertiary p-2">${element.body}</p>
      </div>
    </div>
  </div>`;
    container.innerHTML += box;
  });
}

// const input = document.querySelector("form input");
// const textarea = document.querySelector("form textarea");
// const select = document.querySelector("form select");
// const form = document.querySelector("form");

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   if (!input.value || !textarea.value || !select.value) return;

//   const newPost = {
//     title: input.value,
//     body: textarea.value,
//     userId: select.value,
//   };
//   try {
//     toggleSpinner();
//     const res = await fetch(BASE_URL, {
//       method: "POST",
//       body: JSON.stringify(newPost),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     });
//     if (!res.ok) throw new Error("Something went wrong.");
//     const data = await res.json();
//     console.log(data);
//     displayData([data]);
//   } catch (err) {
//     showError()
//   } finally {
//     toggleSpinner();
//   }
// });

const mainContainer = document.querySelector(".mainContainer");
const countriesBtn = document.getElementById("countriesBtn");

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";

function showMeals(e) {
  if (e.target !== mainContainer) {
    getMealsByCountry(e.target.innerText);
  }
  mainContainer.removeEventListener("click", showMeals);
}

mainContainer.addEventListener("click", showMeals);

countriesBtn.addEventListener("click", () => {
  getCountries();
  mainContainer.addEventListener("click", showMeals);
});

function showError(err) {
  const errorParagraph = document.createElement("p");
  errorParagraph.innerText = err;
  errorParagraph.setAttribute("class", "error");
  container.append(errorParagraph);
}

async function getCountries() {
  try {
    toggleSpinner();
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch countries :(");
    const data = await res.json();
    displayCountries(data.meals);
  } catch (err) {
  } finally {
    toggleSpinner();
  }
}

async function getMealsByCountry(country) {
  try {
    toggleSpinner();
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
    if (!res.ok) throw new Error("Couldn't fetch the meals");
    const data = await res.json();
    displayMeals(data.meals);
  } catch (err) {
    showError(err);
  } finally {
    toggleSpinner();
  }
}

function displayCountries(data) {
  let dataContainer;
  data.forEach((el) => {
    const box = ` <div>
    <button class="col btn btn-outline-primary border-3 w-100">
    ${el.strArea}
  </button></div>`;
    dataContainer += box;
  });

  mainContainer.innerHTML = dataContainer;
}

function displayMeals(data) {
  let dataContainer;
  data.forEach((element) => {
    const box = `<div class="col">
    <div class="card border-primary rounded-3">
    <img class="card-img-top" src="${element.strMealThumb}" alt="Title" />
      <div class="card-body p-0">
        <h4 class="card-title p-2">${element.strMeal}</h4>
      </div>
    </div>
  </div>`;
    dataContainer += box;
  });
  mainContainer.innerHTML = dataContainer;
}
