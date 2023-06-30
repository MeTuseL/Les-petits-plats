// fetch('data/recipes.json')
//     .then(reponse => reponse.json())
//     .then(data => {

//         async function getRecipes() {//return recipes list
//             let listRecipes = data["recipes"];
//             return ({ recipes: listRecipes });
//         }
//         async function displayData(recipes) {// display data recipe
//             const recipesSection = document.getElementById("section");

//             recipes.forEach((recipe) => {
//                 const recipeModel = recipeFactory(recipe);
//                 const recipeCardDOM = recipeModel.getRecipeCardDOM();
//                 recipesSection.appendChild(recipeCardDOM);
//             });

//             //display of the first 10 recipe 
//             const listCardRecipes = document.querySelectorAll(".card-recipe");
//             const arrListCardRecipes = Array.from(listCardRecipes);

//             for (let recipe of arrListCardRecipes) {
//                 let indexRecipe = arrListCardRecipes.indexOf(recipe);
//                 if (indexRecipe < 10) {
//                     recipe.style.display = "block";
//                 }
//                 else {
//                     recipe.style.display = "none";
//                 }
//             }
//             //count total recipes
//             const recipesFilter = document.querySelector(".container-recipes-filter");
//             const listRecipes = document.querySelector(".container-recipes");
//             let countRecipes = listRecipes.childElementCount;
//             const totalRecipes = document.createElement("div");

//             totalRecipes.className = "total-recipes";
//             totalRecipes.textContent = countRecipes + " recettes";

//             recipesFilter.appendChild(totalRecipes);
//         }
//         async function init() { //get data from recipes
//             const { recipes } = await getRecipes();
//             displayData(recipes);

//         }
//         init();
//     })
//     .catch(error => console.log(error));



async function displayData(recipes) {// display data recipe
    const recipesSection = document.getElementById("section");

    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });

    //display of the first 10 recipe 
    const listCardRecipes = document.querySelectorAll(".card-recipe");
    const arrListCardRecipes = Array.from(listCardRecipes);

    for (let recipe of arrListCardRecipes) {
        let indexRecipe = arrListCardRecipes.indexOf(recipe);
        if (indexRecipe < 10) {
            recipe.style.display = "block";
        }
        else {
            recipe.style.display = "none";
        }
    }
    //count total recipes
    const recipesFilter = document.querySelector(".container-recipes-filter");
    const listRecipes = document.querySelector(".container-recipes");
    let countRecipes = listRecipes.childElementCount;
    const totalRecipes = document.createElement("div");

    totalRecipes.className = "total-recipes";
    totalRecipes.textContent = countRecipes + " recettes";

    recipesFilter.appendChild(totalRecipes);

    //tag ingredients 
    const selectIngredients = document.querySelector('select[name="ingredients"]');
    let arrListOptionsIngr = new Array();

    for (let recipe of recipes) {
        const listIngredientsRecipe = recipe["ingredients"];
        for (let ingredient of listIngredientsRecipe) {
            arrListOptionsIngr.push(ingredient["ingredient"]);
        }
    }
    let uniqueOptionsIngr = [...new Set(arrListOptionsIngr)];
    uniqueOptionsIngr.sort();
    // remove all duplicate of array 
    for (let uniqueOp of uniqueOptionsIngr) {
        const optionIngr = document.createElement('option');
        optionIngr.setAttribute('value', uniqueOp);
        optionIngr.textContent = uniqueOp;
        selectIngredients.appendChild(optionIngr);
    }

}
async function init() { //get data from recipes
    displayData(recipes);
}
init();



