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
const tagAppliance = document.querySelector(".container-tag-appliance");
const selectAppliance = document.querySelector('select[name="appliance"]');
const tagUstensils = document.querySelector(".container-tag-ustensils");
const selectUstensils = document.querySelector('select[name="ustensils"]');

let valueOption;

let resultSearchBar = new Array();
let resultTagIngredient = new Array();
let resultTagAppliance = new Array();
let resultTagUstensils = new Array();
let resultGlobalSearch = new Array();// all result of research are contains in this array 

let searchBarUser = new Array();
let arrTag = new Array();


//EVENTS
controlText.addEventListener("input", () => {
    displayRecipes();
});
selectIngredients.addEventListener("change", (event) => {
    valueOption = event.target.value;
    createTag(tagIngredient, valueOption);
    arrTag.push(valueOption);//add tag in array 
    displayRecipes();//display recipe by research of user
});
selectAppliance.addEventListener("change", (event) => {
    valueOption = event.target.value;
    createTag(tagAppliance, valueOption);
    arrTag.push(valueOption);//add tag in array 
    displayRecipes();//display recipe by research of user
});
selectUstensils.addEventListener("change", (event) => {
    valueOption = event.target.value;
    createTag(tagUstensils, valueOption);
    arrTag.push(valueOption);//add tag in array 
    displayRecipes();//display recipe by research of user
});

//FUNCTIONS
function controlSearchBar() {//control value of search bar

    if (controlText.value == "") {
        searchBar.dataset.errorVisible = "true";
        searchBar.dataset.error = "";
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
function removeAccentText(text) {//remove accent and lower case a text
    strText = text.toLowerCase(); // string value converted to lower case
    for (let i = 0; i < accent.length; i++) {
        strText = strText.replace(accent[i], noAccent[i]);
    }

    return strText;
}
function filterBySearchBar() { //return the result of search bar 

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
        return { resultSearch, textSearchUser };
    }
    else {
        controlSearchBar();
    }
}
function createTag(tag, value) {
    if (value !== undefined) {
        //create tag ingredient
        const divTagOption = document.createElement('div');
        divTagOption.className = "tag-option";
        const icon_Close = document.createElement('i');
        icon_Close.className = "fa-solid fa-xmark";
        const tag_Option = document.createElement('span');
        tag_Option.textContent = value;
        tag.appendChild(divTagOption);
        divTagOption.appendChild(tag_Option);
        divTagOption.appendChild(icon_Close);

        icon_Close.addEventListener("click", () => {
            icon_Close.parentElement.remove();//remove tag 
            let valueOptionOfIcon = removeAccentText(icon_Close.parentElement.querySelector('.tag-option span').textContent);
            arrTag = arrTag.filter((tag) => removeAccentText(tag) !== valueOptionOfIcon);//remove value option of tag array
            displayRecipes();//on remove tag, display current recipe of global search 
        });
    }
}
function filterByTag() {
    if (arrTag !== undefined) {
        let resultSearch = new Array();

        for (let tag of arrTag) {

            let valueTag = removeAccentText(tag);// remove accent and lowercase 
            // let arrTagIngredient = tagIngredient.split(' ');
            // let arrfirstTagIngredient = arrTagIngredient[0];
            // let regexTagSearch;//regex

            //match ingredients recipe with search of user
            for (let indexRecipe = 0; indexRecipe < recipes.length; indexRecipe++) {

                //match ingredient recipe 
                const listIngredientsRecipe = recipes[indexRecipe]["ingredients"];
                for (let ingredient of listIngredientsRecipe) {
                    let ingrRecipe = removeAccentText(ingredient["ingredient"]);
                    // regexTagSearch = new RegExp(arrfirstTagIngredient);

                    if (ingrRecipe === valueTag) {
                        resultSearch.push(listCardRecipes[indexRecipe]);
                    }
                    // else if (ingrRecipe.match(regexTagSearch) !== null) {
                    //     // check if array of match is not null 
                    //     resultSearch.push(listCardRecipes[indexRecipe]);
                    //     tag = tagIngredient;
                    // }
                }

                //match appliance recipe
                const applianceRecipe = removeAccentText(recipes[indexRecipe].appliance);
                if (applianceRecipe === valueTag) {
                    resultSearch.push(listCardRecipes[indexRecipe]);
                }

                //match ustensils recipe 
                const listUstensilsRecipe = recipes[indexRecipe].ustensils;
                for (ustensil of listUstensilsRecipe) {
                    let ustensilRecipe = removeAccentText(ustensil);

                    if (ustensilRecipe === valueTag) {
                        resultSearch.push(listCardRecipes[indexRecipe]);
                    }
                }
            }
        }
        return { resultSearch };
    }


}
function resultSearchUser() {
    //result search bar
    let filterResultSearchBar;
    if (filterBySearchBar() !== undefined) {
        filterResultSearchBar = filterBySearchBar().resultSearch;
        // resultSearchBar.push(filterResultSearchBar);
        //searchBarUser.push(filterBySearchBar().textSearchUser);
    }

    //result tag ingredient
    let filterResultTag;
    let testAddTag;
    if (filterByTag() !== undefined) {
        filterResultTag = filterByTag().resultSearch;
        // resultTagIngredient.push(filterResultTagIngr);
        // testAddTag = filterByTag(valueOption).valueTag;
        // arrTag.push(filterByTagIntegrient().tag);
    }

    //result tag appliance
    //result tag unstensils


    //concat all result array
    //resultGlobalSearch = resultGlobalSearch.concat(resultSearchBar, resultTagIngredient);

    return { filterResultSearchBar, filterResultTag };

}
function displayRecipes() {//display result search

    // let uniqueResultGlobalSearch = [...new Set(resultGlobal)];// remove all duplicate of array  
    let newResultGlobalSearch = new Array();
    let newResultSearchBar = [...new Set(resultSearchUser().filterResultSearchBar)];
    let newResultTag = [...new Set(resultSearchUser().filterResultTag)];
    let countRecipes = new Number();
    let t = new Array();

    //match global result with search of user  
    for (let indexRecipe = 0; indexRecipe < recipes.length; indexRecipe++) {

        let convertIdRecipeToStr = recipes[indexRecipe].id + "";

        for (let result of newResultTag) {
            if (convertIdRecipeToStr === result.id) {

                let countTag = 0;

                //match ingredient recipe
                const listIngredientsRecipe = recipes[indexRecipe]["ingredients"];
                const applianceRecipe = removeAccentText(recipes[indexRecipe].appliance);
                const listUstensilsRecipe = recipes[indexRecipe].ustensils;


                // let arrResultIngr = result.querySelectorAll('.content-recipe .ingredients-recipe h4');

                // for (let ingredient of arrResultIngr) {
                //     let ingr = removeAccentText(ingredient.textContent);
                for (let tag of arrTag) {

                    //match ingredient recipe
                    for (let ingredient of listIngredientsRecipe) {
                        let ingr = removeAccentText(ingredient["ingredient"]);
                        //  let regex = new RegExp(tag);

                        if (ingr === removeAccentText(tag)) {
                            countTag += 1;
                        }
                        //  else if (ingr.match(regex)) {
                        //      countTag += 1;
                        //  }
                    }

                    //match appliance recipe
                    if (applianceRecipe === removeAccentText(tag)) {
                        countTag += 1;
                    }
                    
                    //match ustensils recipe
                    for (ustensil of listUstensilsRecipe) {
                        let ustensilRecipe = removeAccentText(ustensil);

                        if (ustensilRecipe === removeAccentText(tag)) {
                            countTag += 1;
                        }
                    }
                }

                // const applianceRecipe = removeAccentText(recipes[indexRecipe].appliance);

                // for (let tag of arrTag) {

                //     if (applianceRecipe === removeAccentText(tag)) {
                //         countTag += 1;
                //     }
                // }


                // console.log(countTag)
                if (countTag == arrTag.length && arrTag.length !== 0) {
                    // console.log(result.querySelector('.content-recipe h2'));
                    newResultGlobalSearch.push(result);
                }
            }
        }
    }
    //display recipes
    if (controlText.value !== "" && arrTag.length == 0) {// case user use the filter tag 

        for (let recipe of listCardRecipes) {
            recipe.style.display = "none";

            for (let result of newResultSearchBar) {

                if (recipe === result) {
                    recipe.style.display = "block";
                }

            }
        }
        // calculate total of result recipe
        countRecipes = [...new Set(newResultSearchBar)].length;
    }
    else if (arrTag.length !== 0 && controlText.value == "") {// case user use the search bar 


        for (let recipe of listCardRecipes) {
            recipe.style.display = "none";

            for (let result of newResultGlobalSearch) {
                if (recipe === result) {
                    recipe.style.display = "block";
                }
            }
        }
        // calculate total of result recipe
        countRecipes = [...new Set(newResultGlobalSearch)].length;
    }
    else if (arrTag.length !== 0 && controlText.value !== "") {// case user use the search bar and filter tag

        for (let result1 of newResultSearchBar) {
            for (let result2 of newResultGlobalSearch) {

                if (result1 === result2) {
                    t.push(result1);
                }
            }
        }

        for (let recipe of listCardRecipes) {
            recipe.style.display = "none";

            for (let gg of t) {
                if (recipe === gg) {
                    recipe.style.display = "block";
                }
            }
        }
        // calculate total of result recipe
        countRecipes = [...new Set(t)].length;
    }
    else {
        for (let recipe of listCardRecipes) {
            recipe.style.display = "block";
        }
        // calculate total of result recipe
        countRecipes = listCardRecipes.length;
    }
    //total recipes
    totRecipes.textContent = countRecipes + " recettes";

}
