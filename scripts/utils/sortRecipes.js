//DOM
const searchBar = document.querySelector(".search-bar");
const controlText = document.querySelector(".control-text");
const iconSearch = document.getElementById("icon-loop");
const listTitleRecipes = document.querySelectorAll(".card-recipe h2");
const arrListTitleRecipes = Array.from(listTitleRecipes);
const listCardRecipes = document.querySelectorAll(".card-recipe");
const listIngrRecipes = document.querySelectorAll(".ingredient-recipe h4");
const totRecipes = document.querySelector(".total-recipes");
const listRecipes = document.querySelector(".container-recipes");
let resultEvent;
let searchRecipe;
let indexRecipe;
let countRecipes = 0;
const accent = [
    /[\300-\306]/g, /[\340-\346]/g, // A, a
    /[\310-\313]/g, /[\350-\353]/g, // E, e
    /[\314-\317]/g, /[\354-\357]/g, // I, i
    /[\322-\330]/g, /[\362-\370]/g, // O, o
    /[\331-\334]/g, /[\371-\374]/g, // U, u
    /[\321]/g, /[\361]/g, // N, n
    /[\307]/g, /[\347]/g, // C, c
];
const noAccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

const tagIngredient = document.querySelector(".container-tag-ingredient");
const selectIngredients = document.querySelector('select[name="ingredients"]');

//EVENTS
iconSearch.addEventListener("click", displayRecipes);// display result of research onclick 
controlText.addEventListener("input", displayRecipes);
selectIngredients.addEventListener("change", (event) => {
    createTagIngredients(event.target.value);
    filterByTagIntegrient(event.target.value);
});

//FUNCTIONS
function controlSearchBar() {//value search 

    if (controlText.value == "") {
        searchBar.dataset.errorVisible = "true";
        searchBar.dataset.error = "Veuillez saisir une recette, un ingrédient, ...";
        resultEvent = "false";
    }
    else if (controlText.value.length < 3) {
        searchBar.dataset.errorVisible = "true";
        searchBar.dataset.error = "Veuillez siasir plus de 3 caractères.";
        resultEvent = "false";
    }
    else {
        searchBar.dataset.errorVisible = "false";
        searchBar.dataset.error = "";
        resultEvent = "true";
        searchRecipe = controlText.value;
    }
    return { resultEvent, searchRecipe };
}
function removeAccentText(text) {
    strText = text.toLowerCase(); // string value converted to lower case
    for (let i = 0; i < accent.length; i++) {
        strText = strText.replace(accent[i], noAccent[i]);
    }

    return strText;
}
function displayRecipes() {

    if (controlSearchBar()["resultEvent"] == "true") {

        let textSearchUser = removeAccentText(controlSearchBar()["searchRecipe"]);// remove accent and lowercase 
        let arrTextSearchUser = textSearchUser.split(' '); // split user search by whitespace
        let regexSearch;//regex
        let resultSearch = new Array();


        //match title-ingredients-appliance-ustensils recipe with search of user
        for (let indexRecipe = 0; indexRecipe < recipes.length; indexRecipe++) {

            //match title recipe 
            const titleRecipe = recipes[indexRecipe]["name"];

            let titRecipe = removeAccentText(titleRecipe);

            for (let searchUser of arrTextSearchUser) {
                regexSearch = new RegExp(searchUser);
                if (titRecipe.match(regexSearch) !== null && titRecipe.match(regexSearch)[0].length > 2) {
                    // check if array of match is not null and 3 or more characters
                    resultSearch.push(listCardRecipes[indexRecipe]);
                }
            }

            //match ingredient recipe 
            const listIngredientsRecipe = recipes[indexRecipe]["ingredients"];
            for (let ingredient of listIngredientsRecipe) {
                let ingrRecipe = removeAccentText(ingredient["ingredient"]);

                for (let searchUser of arrTextSearchUser) {
                    regexSearch = new RegExp(searchUser);
                    if (ingrRecipe.match(regexSearch) !== null && ingrRecipe.match(regexSearch)[0].length > 2) {
                        // check if array of match is not null and 3 or more characters
                        resultSearch.push(listCardRecipes[indexRecipe]);
                    }
                }
            }
            //match appliance recipe 
            const applianceRecipe = recipes[indexRecipe]["appliance"];

            let appliRecipe = removeAccentText(applianceRecipe);

            for (let searchUser of arrTextSearchUser) {
                regexSearch = new RegExp(searchUser);
                if (appliRecipe.match(regexSearch) !== null && appliRecipe.match(regexSearch)[0].length > 2) {
                    // check if array of match is not null and 3 or more characters
                    resultSearch.push(listCardRecipes[indexRecipe]);
                }
            }
            //match ustensils recipe 
            const listUstensilsRecipe = recipes[indexRecipe]["ustensils"];
            for (let ustensils of listUstensilsRecipe) {
                let ustenRecipe = removeAccentText(ustensils);

                for (let searchUser of arrTextSearchUser) {
                    regexSearch = new RegExp(searchUser);
                    if (ustenRecipe.match(regexSearch) !== null && ustenRecipe.match(regexSearch)[0].length > 2) {
                        // check if array of match is not null and 3 or more characters
                        resultSearch.push(listCardRecipes[indexRecipe]);
                    }
                }
            }
        }

        //display result search
        let uniqueResultSearch = [...new Set(resultSearch)];// remove all duplicate of array  
        for (let recipe of listCardRecipes) {
            recipe.style.display = "none";

            for (let result of uniqueResultSearch) {
                if (recipe == result) {
                    recipe.style.display = "block";
                }
            }
        }

        // calculate total of result recipe
        let countRecipes = uniqueResultSearch.length;
        totRecipes.textContent = countRecipes + " recettes";
        if (countRecipes == 0) {
            console.log(countRecipes)

            searchBar.dataset.errorVisible = "true";
            searchBar.dataset.error = "« Aucune recette ne contient ‘" + controlText.value + "’ vous pouvez chercher «tarte aux pommes », « poisson », etc.";
        }
    }
    else {
        controlSearchBar();
    }
}
function createTagIngredients(valueOption) {

    //create tag ingredient
    const divTagOption = document.createElement('div');
    divTagOption.className = "tag-option";
    const icon_Close = document.createElement('i');
    icon_Close.className = "fa-solid fa-xmark";
    const tag_Option = document.createElement('span');
    tag_Option.textContent = valueOption;
    tagIngredient.appendChild(divTagOption);
    divTagOption.appendChild(tag_Option);
    divTagOption.appendChild(icon_Close);

    icon_Close.addEventListener("click", () => {
        icon_Close.parentElement.remove();
    });

}
function filterByTagIntegrient(valueOption) {
    let tagIngredient = removeAccentText(valueOption);// remove accent and lowercase 
    let arrTagSearch = tagIngredient.split(' '); // split user search by whitespace
    let regexTagSearch;//regex
    let resultSearch = new Array();

    const currentTagOption = document.querySelectorAll('.tag-option span');
    const arrTest = new Array();
    for (let tagOption of currentTagOption) {
        let listTagIngr = removeAccentText(tagOption.textContent);
        arrTest.push(listTagIngr);
    }

    const currentTagIngredient = document.querySelector(".container-tag-ingredient");
    const currentListCardRecipes = document.querySelectorAll(".card-recipe");
    const currentIngrRecipes = document.querySelectorAll(".ingredient-recipe");

    //match ingredients recipe with search of user
    // for (let indexRecipe = 0; indexRecipe < currentListCardRecipes.length; indexRecipe++) {

    //         //match ingredients recipe with search of user

    //             for(let ingredient of current){
    //             let ingrRecipe = removeAccentText(listIngrRecipes[indexRecipe].textContent);
    //             regexTagSearch = new RegExp(arrTagSearch[0]);

    //             if(currentTagIngredient.childElementCount > 1 && currentListCardRecipes[indexRecipe].style.display == "block"){

    //                 for(let tag of arrTest){
    //                     regexTagSearch = new RegExp(tag);
    //                     if(ingrRecipe.match(regexTagSearch) !== null) {
    //                         // check if array of match is not null and 3 or more characters
    //                         resultSearch.push(currentListCardRecipes[indexRecipe]);
    //                     }
    //                 }
    //             }
    //             else if(currentTagIngredient.childElementCount < 2){
    //                 console.log(ingrRecipe)
    //                 if (ingrRecipe === tagIngredient) {
    //                     resultSearch.push(currentListCardRecipes[indexRecipe]);
    //                 }
    //                 else if(arrTagSearch.length == 1 && ingrRecipe.match(regexTagSearch) !== null) {
    //                     // check if array of match is not null and 3 or more characters
    //                     resultSearch.push(currentListCardRecipes[indexRecipe]);
    //                 }
    //             }
    //             }
    //             //display result search
    //             let uniqueResultSearch = [...new Set(resultSearch)]; //remove all duplicate of array
    //             for (let recipe of listCardRecipes) {
    //                 recipe.style.display = "none";

    //                 for (let result of uniqueResultSearch) {
    //                     if (recipe == result) {
    //                         recipe.style.display = "block";
    //                     }
    //                 }
    //             }
    //             // calculate total of result recipe
    //             let countRecipes = uniqueResultSearch.length;
    //             totRecipes.textContent = countRecipes + " recettes";
    //             // if (countRecipes == 0) {
    //             //     searchBar.dataset.errorVisible = "true";
    //             //     searchBar.dataset.error = "« Aucune recette ne contient ‘" + controlText.value + "’ vous pouvez chercher «tarte aux pommes », « poisson », etc.";
    //             // }


    // }

    //match ingredients recipe with search of user
    for (let indexRecipe = 0; indexRecipe < recipes.length; indexRecipe++) {

        //match ingredient recipe 
        const listIngredientsRecipe = recipes[indexRecipe]["ingredients"];
        for (let ingredient of listIngredientsRecipe) {
            let ingrRecipe = removeAccentText(ingredient["ingredient"]);
            regexTagSearch = new RegExp(arrTagSearch[0]);

            if (ingrRecipe === tagIngredient) {
                resultSearch.push(listCardRecipes[indexRecipe]);
            }
            else if (arrTagSearch.length == 1 && ingrRecipe.match(regexTagSearch) !== null) {
                //                 // check if array of match is not null and 3 or more characters
                resultSearch.push(listCardRecipes[indexRecipe]);
            }
        }

        //display result search
        let uniqueResultSearch = [...new Set(resultSearch)];// remove all duplicate of array  
        for (let recipe of listCardRecipes) {
            recipe.style.display = "none";

            for (let result of uniqueResultSearch) {
                if (recipe == result) {
                    recipe.style.display = "block";
                }
            }
        }
        //         // calculate total of result recipe
        let countRecipes = uniqueResultSearch.length;
        totRecipes.textContent = countRecipes + " recettes";
        // if (countRecipes == 0) {
        //     searchBar.dataset.errorVisible = "true";
        //     searchBar.dataset.error = "« Aucune recette ne contient ‘" + controlText.value + "’ vous pouvez chercher «tarte aux pommes », « poisson », etc.";
        // }
    }

}


