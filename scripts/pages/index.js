fetch('data/recipes.json')
    .then(reponse => reponse.json())
    .then(data => {
        
        async function getRecipes() {//return recipes list
            let listRecipes = data["recipes"];
            return ({ recipes: listRecipes });
        }
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
        
            for(let recipe of arrListCardRecipes){
                let indexRecipe = arrListCardRecipes.indexOf(recipe);
                if( indexRecipe < 10){
                  recipe.style.display = "block";
                }
                else {
                    recipe.style.display = "none";
                }
            }
        }
        async function init() { //get data from recipes
            const { recipes } = await getRecipes();
            displayData(recipes);

    }
        init();
    })
    .catch (error => console.log(error));


