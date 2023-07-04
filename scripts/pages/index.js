async function displayData(dataRecipes) {// display data recipe
    const recipesSection = document.getElementById("section");

    dataRecipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });

    //display of the first 10 recipe 
    // const listCardRecipes = document.querySelectorAll(".card-recipe");
    // const arrListCardRecipes = Array.from(listCardRecipes);

    // for (let recipe of arrListCardRecipes) {
    //     let indexRecipe = arrListCardRecipes.indexOf(recipe);
    //     if (indexRecipe < 10) {
    //         recipe.style.display = "block";
    //     }
    //     else {
    //         recipe.style.display = "none";
    //     }
    // }
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

    for (let recipe of dataRecipes) {
        const listIngredientsRecipe = recipe["ingredients"];
        for (let ingredient of listIngredientsRecipe) {
            arrListOptionsIngr.push(ingredient["ingredient"]);
        }
    }
    let uniqueOptionsIngr = [...new Set(arrListOptionsIngr)];    // remove all duplicate of array 
    uniqueOptionsIngr.sort();

    for (let uniqueOp of uniqueOptionsIngr) {
        const optionIngr = document.createElement('option');
        optionIngr.setAttribute('value', uniqueOp);
        optionIngr.textContent = uniqueOp;
        selectIngredients.appendChild(optionIngr);
    }
    //tag appliance 
    const selectAppliance = document.querySelector('select[name="appliance"]');
    let arrListOptionsAppl = new Array();

    for (let recipe of dataRecipes) {
        const applianceRecipe = recipe["appliance"];
        arrListOptionsAppl.push(applianceRecipe); 
    }
    let uniqueOptionsAppl = [...new Set(arrListOptionsAppl)];    // remove all duplicate of array 
    uniqueOptionsAppl.sort();

    for (let uniqueOp of uniqueOptionsAppl) {
        const optionAppl = document.createElement('option');
        optionAppl.setAttribute('value', uniqueOp);
        optionAppl.textContent = uniqueOp;
        selectAppliance.appendChild(optionAppl);
    }
    //tag ustensils 
    const selectUstensils = document.querySelector('select[name="ustensils"]');
    let arrListOptionsUst = new Array();

    for (let recipe of dataRecipes) {
        const listUstensilsRecipe = recipe["ustensils"];
        for (let ustensil of listUstensilsRecipe) {
            arrListOptionsUst.push(ustensil);
        }
    }
    let uniqueOptionsUst = [...new Set(arrListOptionsUst)];    // remove all duplicate of array 
    uniqueOptionsUst.sort();

    for (let uniqueOp of uniqueOptionsUst) {
        const optionUst = document.createElement('option');
        optionUst.setAttribute('value', uniqueOp);
        optionUst.textContent = uniqueOp;
        selectUstensils.appendChild(optionUst);
    }
}
async function init() { //get data from recipes
    displayData(recipes);
}
init();



