//DOM
const searchBar = document.querySelector(".search-bar");
const controlText = document.querySelector(".control-text");
// const iconSearch = document.getElementById("icon-loop");
const listTitleRecipes = document.querySelectorAll(".recipe-card__content h2");
// const arrListTitleRecipes = Array.from(listTitleRecipes);
const listCardRecipes = document.querySelectorAll(".recipe-card");
const listIngrRecipes = document.querySelectorAll(".recipe-card__content__ingredients__ingredient h4");
const totRecipes = document.querySelector(".count-recipes");
// const listRecipes = document.querySelector(".container-recipes");
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

const headerRecipeTag = document.querySelectorAll(".recipes-filter__header");


let valueOption;

let resultSearchBar = new Array();
let resultTagIngredient = new Array();
let resultTagAppliance = new Array();
let resultTagUstensils = new Array();
let resultGlobalSearch = new Array();// all result of research are contains in this array 

let searchBarUser = new Array();
let arrTag = new Array();

const tagFilterRecipes = document.querySelector(".recipes-filter__tag");
const iconRecipeTag = document.querySelectorAll(".recipes-filter__header i");
const searchTag = document.querySelectorAll(".search-tag");
const controlTextRecipeTag = document.querySelectorAll(".search-tag__input");
const optionsTag = document.querySelectorAll(".list-options-tag");
const arrOptionsTag = Array.from(optionsTag);
const listOptionsTag = document.querySelectorAll(".list-options-tag span");
let indexTag;
const noRecipeFound = document.querySelector(".no-recipe-found");
//EVENTS
controlText.addEventListener("input", () => {
    displayRecipes();
});

headerRecipeTag.forEach((header, index) => header.addEventListener("click", () => {
    indexTag = index;
    displayHideOptionsOfTag(indexTag)
}));// event display list of options and search bar tag
listOptionsTag.forEach((option) => option.addEventListener("click", (event) => {

    indexTag = arrOptionsTag.indexOf(option.parentElement);
    valueOption = event.target.textContent;

    if (arrTag.length == 0) {
        createTag(valueOption);
        arrTag.push(valueOption);//add tag in array 
        displayRecipes();//display recipe by research of user
        displayHideOptionsOfTag(indexTag);
    }
    else {// if user try to choose again a tag who is already in list tag 
        let countTag = 0;
        for (let tag of arrTag) {
            if (tag == valueOption) {
                countTag += 1;
            }
        }
        if (countTag == 0) {
            createTag(valueOption);
            arrTag.push(valueOption);//add tag in array 
            displayRecipes();//display recipe by research of user
            displayHideOptionsOfTag(indexTag);
        }
    }

}));
controlTextRecipeTag.forEach((text, index) => text.addEventListener("input", () => {
    displayOptions(index);
}));

//FUNCTIONS
function displayHideOptionsOfTag(index) {// display or hide list of options and search bar tag 

    if (searchTag[index].style.display == "block" && optionsTag[index].style.display == "flex") {
        searchTag[index].style.display = "none";
        // controlTextRecipeTag[index].style.display = "none";
        optionsTag[index].style.display = "none";
        iconRecipeTag[index].classList.remove("fa-rotate-180");
        controlTextRecipeTag[index].value = "";
        for (let option of optionsTag[index].childNodes) {
            option.style.display = "block";
        }
    }
    else {
        searchTag[index].style.display = "block";
        // controlTextRecipeTag[index].style.display = "block";
        controlTextRecipeTag[index].focus();
        optionsTag[index].style.display = "flex";
        iconRecipeTag[index].classList.add("fa-rotate-180");
        controlTextRecipeTag[index].value = "";
        for (let option of optionsTag[index].childNodes) {
            option.style.display = "block";
        }
    }
}
function displayOptions(index) {

    let textSearchUser = removeAccentText(controlTextRecipeTag[index].value);// remove accent and lowercase 
    let regexSearch = new RegExp(textSearchUser);;//regex
    let resultSearch = new Array();
    let optionTag;

    //match search of user with list of options
    for (let option of optionsTag[index].childNodes) {

        optionTag = removeAccentText(option.textContent);

        if (optionTag.match(regexSearch) !== null) {
            resultSearch.push(option);
        }

    }
    //display list option by search of user
    for (let option of optionsTag[index].childNodes) {
        option.style.display = "none";
        for (let result of resultSearch) {
            if (option === result) {
                option.style.display = "block";
            }
        }
    }

}
function controlSearchBar() {//control value of search bar

    if (controlText.value == "") {
        searchBar.dataset.errorVisible = "true";
        searchBar.dataset.error = "";
        resultEvent = "false";
    }
    else if (controlText.value.length < 3) {
        searchBar.dataset.errorVisible = "true";
        searchBar.dataset.error = "Veuillez saisir au moins plus de 3 caractères.";
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

            for (let searchUser of arrTextSearchUser) {
                regexSearch = new RegExp(searchUser);


                //match title recipe 
                let titRecipe = removeAccentText(recipes[indexRecipe]["name"]);

                // for (let searchUser of arrTextSearchUser) {
                // regexSearch = new RegExp(searchUser);
                if (titRecipe.match(regexSearch) !== null && titRecipe.match(regexSearch)[0].length > 2) {
                    // check if array of match is not null and 3 or more characters
                    resultSearch.push(listCardRecipes[indexRecipe]);
                }
                //}

                //match ingredient recipe 
                const listIngredientsRecipe = recipes[indexRecipe]["ingredients"];
                for (let ingredient of listIngredientsRecipe) {
                    let ingrRecipe = removeAccentText(ingredient["ingredient"]);

                    // for (let searchUser of arrTextSearchUser) {
                    // regexSearch = new RegExp(searchUser);
                    if (ingrRecipe.match(regexSearch) !== null && ingrRecipe.match(regexSearch)[0].length > 2) {
                        // check if array of match is not null and 3 or more characters
                        resultSearch.push(listCardRecipes[indexRecipe]);
                    }
                }
                // }
                //match appliance recipe 
                // const applianceRecipe = recipes[indexRecipe]["appliance"];
                let appliRecipe = removeAccentText(recipes[indexRecipe]["appliance"]);

                // for (let searchUser of arrTextSearchUser) {
                //     regexSearch = new RegExp(searchUser);
                if (appliRecipe.match(regexSearch) !== null && appliRecipe.match(regexSearch)[0].length > 2) {
                    // check if array of match is not null and 3 or more characters
                    resultSearch.push(listCardRecipes[indexRecipe]);
                }
                // }
                //match ustensils recipe 
                const listUstensilsRecipe = recipes[indexRecipe]["ustensils"];
                for (let ustensils of listUstensilsRecipe) {
                    let ustenRecipe = removeAccentText(ustensils);

                    // for (let searchUser of arrTextSearchUser) {
                    //     regexSearch = new RegExp(searchUser);
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
function createTag(value) {
    if (value !== undefined) {
        //create tag 
        const divTagOption = document.createElement('div');
        divTagOption.className = "recipes-filter__tag__option";
        const icon_Close = document.createElement('i');
        icon_Close.className = "fa-solid fa-xmark";
        const tag_Option = document.createElement('span');
        tag_Option.textContent = value;
        tagFilterRecipes.appendChild(divTagOption);
        divTagOption.appendChild(tag_Option);
        divTagOption.appendChild(icon_Close);

        //remove tag
        icon_Close.addEventListener("click", () => {
            icon_Close.parentElement.remove();//remove tag 
            let valueOptionOfIcon = removeAccentText(icon_Close.parentElement.querySelector('.recipes-filter__tag__option span').textContent);
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

            //match ingredients recipe with search of user
            for (let indexRecipe = 0; indexRecipe < recipes.length; indexRecipe++) {

                //match ingredient recipe 
                const listIngredientsRecipe = recipes[indexRecipe]["ingredients"];
                for (let ingredient of listIngredientsRecipe) {
                    let ingrRecipe = removeAccentText(ingredient["ingredient"]);

                    if (ingrRecipe === valueTag) {
                        resultSearch.push(listCardRecipes[indexRecipe]);
                    }
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
    }

    //result tag 
    let filterResultTag;
    let newResultGlobalSearch = new Array();
    if (filterByTag() !== undefined) {
        filterResultTag = filterByTag().resultSearch;
        //match global result with search of user  
        for (let indexRecipe = 0; indexRecipe < recipes.length; indexRecipe++) {

            let convertIdRecipeToStr = recipes[indexRecipe].id + "";

            for (let result of filterResultTag) {
                if (convertIdRecipeToStr === result.id) {

                    let countTag = 0;

                    const listIngredientsRecipe = recipes[indexRecipe]["ingredients"];
                    const applianceRecipe = removeAccentText(recipes[indexRecipe].appliance);
                    const listUstensilsRecipe = recipes[indexRecipe].ustensils;

                    for (let tag of arrTag) {

                        //match ingredient recipe
                        for (let ingredient of listIngredientsRecipe) {
                            let ingr = removeAccentText(ingredient["ingredient"]);

                            if (ingr === removeAccentText(tag)) {
                                countTag += 1;
                            }
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

                    //if recipe has all tag of search user
                    if (countTag == arrTag.length && arrTag.length !== 0) {
                        newResultGlobalSearch.push(result);
                    }
                }
            }
        }
    }
    let t = new Array();
    if (filterByTag() !== undefined && filterBySearchBar() !== undefined) {

        for (let result1 of filterResultSearchBar) {
            for (let result2 of newResultGlobalSearch) {

                if (result1 === result2) {
                    t.push(result1);
                }
            }
        }
    }

    return { filterResultSearchBar, filterResultTag, newResultGlobalSearch, t };
}
function displayRecipes() {//display result search


    // let newResultGlobalSearch = new Array();
    // let newResultSearchBar = [...new Set(resultSearchUser().filterResultSearchBar)];
    // let newResultTag = [...new Set(resultSearchUser().filterResultTag)];
    let countRecipes = new Number();
    // let t = new Array();


    //display recipes
    if (controlText.value !== "" && arrTag.length == 0) {// case user use the filter tag 

        let newResultSearchBar = [...new Set(resultSearchUser().filterResultSearchBar)];

        let baseDelay = 0.4;

        for (let recipe of listCardRecipes) {
            recipe.style.display = "none";
            //recipe.style.setProperty("--fadeinDelayRecipe", "");
            recipe.classList.remove("fade-in-recipe");//remove fade in animation

            for (let i = 0; i < newResultSearchBar.length; i++) {
                if (recipe === newResultSearchBar[i]) {
                    recipe.style.display = "block";
                    newResultSearchBar[i].style.setProperty("--fadeinDelayRecipe", baseDelay + ((i + 1) / 5) + "s");
                    recipe.offsetWidth;
                    recipe.classList.add("fade-in-recipe"); //trigger css animation
                }

            }
        }
        // calculate total of result recipe
        countRecipes = [...new Set(newResultSearchBar)].length;
    }
    else if (arrTag.length !== 0 && controlText.value == "") {// case user use the search bar 

        let newResultGlobalSearch = [...new Set(resultSearchUser().newResultGlobalSearch)];

        let baseDelay = 0.2;

        for (let recipe of listCardRecipes) {
            recipe.style.display = "none";
            // recipe.style.setProperty("--fadeinDelayRecipe", "");
            recipe.classList.remove("fade-in-recipe");

            for (let i = 0; i < newResultGlobalSearch.length; i++) {
                if (recipe === newResultGlobalSearch[i]) {
                    recipe.style.display = "block";
                    newResultGlobalSearch[i].style.setProperty("--fadeinDelayRecipe", baseDelay + ((i + 1) / 5) + "s");
                    recipe.offsetWidth;//trigger a DOM reflow by requesting the element width
                    recipe.classList.add("fade-in-recipe"); //trigger css animation
                }
            }
        }
        // calculate total of result recipe
        countRecipes = [...new Set(newResultGlobalSearch)].length;
    }
    else if (arrTag.length !== 0 && controlText.value !== "") {// case user use the search bar and filter tag

        let t = [...new Set(resultSearchUser().t)];

        // for (let result1 of newResultSearchBar) {
        //     for (let result2 of newResultGlobalSearch) {

        //         if (result1 === result2) {
        //             t.push(result1);
        //         }
        //     }
        // }

        let baseDelay = 0.2;

        for (let recipe of listCardRecipes) {
            recipe.style.display = "none";
            //recipe.style.setProperty("--fadeinDelayRecipe", "");
            recipe.classList.remove("fade-in-recipe");//remove fade in animation

            for (let i = 0; i < t.length; i++) {
                if (recipe === t[i]) {
                    recipe.style.display = "block";
                    t[i].style.setProperty("--fadeinDelayRecipe", baseDelay + ((i + 1) / 5) + "s");
                    recipe.offsetWidth;//trigger a DOM reflow by requesting the element width
                    recipe.classList.add("fade-in-recipe"); //trigger css animation
                }
            }
        }
        // calculate total of result recipe
        countRecipes = [...new Set(t)].length;
    }
    else {
        let baseDelay = 0.2;

        for (let i = 0; i < listCardRecipes.length; i++) {
            //listCardRecipes[i].style.setProperty("--fadeinDelayRecipe", "");
            listCardRecipes[i].classList.remove("fade-in-recipe");//remove fade in animation
            listCardRecipes[i].style.display = "block";
            listCardRecipes[i].style.setProperty("--fadeinDelayRecipe", baseDelay + ((i + 1) / 5) + "s");
            listCardRecipes[i].offsetWidth; //trigger a DOM reflow by requesting the element width
            listCardRecipes[i].classList.add("fade-in-recipe"); //trigger css animation
        }
        // calculate total of result recipe
        countRecipes = listCardRecipes.length;
    }
    //total recipes
    totRecipes.textContent = countRecipes + " recettes";

    //no recipe found 
    if (countRecipes == 0) {
        noRecipeFound.style.display = "block";
    }
    else {
        noRecipeFound.style.display = "none";
    }

}
