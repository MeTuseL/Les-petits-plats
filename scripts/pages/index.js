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

    const listOptionsTag = document.querySelectorAll(".list-options-tag");//TEST

    for (let optionTag of listOptionsTag) {
        if (optionTag.parentElement.id === "ingrTag") {
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
                // const optionIngr = document.createElement('option');
                // optionIngr.setAttribute('value', uniqueOp);
                // optionIngr.textContent = uniqueOp;
                // selectIngredients.appendChild(optionIngr);
                //TEST

                const spanOption = document.createElement('span');
                spanOption.textContent = uniqueOp;
                optionTag.appendChild(spanOption);
            }
        }
        else if (optionTag.parentElement.id === "applTag") {
            //tag appliance 
            const selectAppliance = document.querySelector('select[name="appliance"]');
            let arrListOptionsAppl = new Array();
            // const listOptionsTagAppl = document.querySelector(".list-options-tag appl");//TEST


            for (let recipe of dataRecipes) {
                const applianceRecipe = recipe["appliance"];
                arrListOptionsAppl.push(applianceRecipe);
            }
            let uniqueOptionsAppl = [...new Set(arrListOptionsAppl)];    // remove all duplicate of array 
            uniqueOptionsAppl.sort();

            for (let uniqueOp of uniqueOptionsAppl) {
                // const optionAppl = document.createElement('option');
                // optionAppl.setAttribute('value', uniqueOp);
                // optionAppl.textContent = uniqueOp;
                // selectAppliance.appendChild(optionAppl);

                const spanOption = document.createElement('span');
                spanOption.textContent = uniqueOp;
                optionTag.appendChild(spanOption);
            }
        }
        else if (optionTag.parentElement.id === "ustenTag") {
            //tag ustensils 
            const selectUstensils = document.querySelector('select[name="ustensils"]');
            let arrListOptionsUst = new Array();
            // const listOptionsTagUsten = document.querySelector(".list-options-tag usten");//TEST


            for (let recipe of dataRecipes) {
                const listUstensilsRecipe = recipe["ustensils"];
                for (let ustensil of listUstensilsRecipe) {
                    arrListOptionsUst.push(ustensil);
                }
            }
            let uniqueOptionsUst = [...new Set(arrListOptionsUst)];    // remove all duplicate of array 
            uniqueOptionsUst.sort();

            for (let uniqueOp of uniqueOptionsUst) {
                // const optionUst = document.createElement('option');
                // optionUst.setAttribute('value', uniqueOp);
                // optionUst.textContent = uniqueOp;
                // selectUstensils.appendChild(optionUst);

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



