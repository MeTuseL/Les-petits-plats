async function displayData(dataRecipes) {// display data recipe
    const recipesSection = document.getElementById("section");

    dataRecipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });

    //count total recipes
    const listCardRecipes = document.querySelectorAll(".recipe-card");
    const totRecipes = document.querySelector(".count-recipes");
    let countRecipes = listCardRecipes.length;
    totRecipes.textContent = countRecipes + " recettes";
    //fade in recipe 
    let baseDelay = 0.4;
    for (let i = 0; i < countRecipes; i++) {
        listCardRecipes[i].style.setProperty("--fadeinDelayRecipe", baseDelay + ((i + 1) / 5) + "s");
        listCardRecipes[i].classList.add("fade-in-recipe"); //trigger css animation
    }

    //add list of options by ingredient-appliance-ustensils 
    const listOptionsTag = document.querySelectorAll(".list-options-tag");
    for (let optionTag of listOptionsTag) {
        if (optionTag.parentElement.id === "ingrTag") {
            //tag ingredients 
            let arrListOptionsIngr = new Array();

            for (let recipe of dataRecipes) {
                const listIngredientsRecipe = recipe["ingredients"];
                for (let ingredient of listIngredientsRecipe) {
                    arrListOptionsIngr.push(ingredient["ingredient"]);
                }
            }
            let uniqueOptionsIngr = [...new Set(arrListOptionsIngr)];    // remove all duplicate of array 
            uniqueOptionsIngr.sort();

            for (let uniqueOp of uniqueOptionsIngr) {//add option
                
                const spanOption = document.createElement('span');
                spanOption.textContent = uniqueOp;
                optionTag.appendChild(spanOption);
            }
        }
        else if (optionTag.parentElement.id === "applTag") {
            //tag appliance 
            let arrListOptionsAppl = new Array();

            for (let recipe of dataRecipes) {
                const applianceRecipe = recipe["appliance"];
                arrListOptionsAppl.push(applianceRecipe);
            }
            let uniqueOptionsAppl = [...new Set(arrListOptionsAppl)];    // remove all duplicate of array 
            uniqueOptionsAppl.sort();

            for (let uniqueOp of uniqueOptionsAppl) {//add option

                const spanOption = document.createElement('span');
                spanOption.textContent = uniqueOp;
                optionTag.appendChild(spanOption);
            }
        }
        else if (optionTag.parentElement.id === "ustenTag") {
            //tag ustensils 
            let arrListOptionsUst = new Array();

            for (let recipe of dataRecipes) {
                const listUstensilsRecipe = recipe["ustensils"];
                for (let ustensil of listUstensilsRecipe) {
                    arrListOptionsUst.push(ustensil);
                }
            }
            let uniqueOptionsUst = [...new Set(arrListOptionsUst)];    // remove all duplicate of array 
            uniqueOptionsUst.sort();

            for (let uniqueOp of uniqueOptionsUst) {//add option
                const spanOption = document.createElement('span');
                spanOption.textContent = uniqueOp;
                optionTag.appendChild(spanOption);
            }
        }
    }
}
async function init() { //get data from recipes
    displayData(recipes);
}
init();



