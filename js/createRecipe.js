// ページ読み込み時にレシピを読み込む
window.onload = loadRecipes;
let savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
let htmlsavedRecipes = JSON.parse(localStorage.getItem('htmlrecipes')) || [];
let arrayOfRecipe = [
    'img/ahigeo.jpg',
    'img/humburg.jpg',
    'img/onigiri.jpg',
    'img/paeria.jpg',
    'img/pasta.jpg',
    'img/salad.jpg',
    'img/siro.jpg',
    'img/soup.jpg',
    'img/steak.jpg',
    'img/tyawanmushi.jpg',
    'img/mabo-dofu.jpg',

];

// localStorageからレシピを読み込む関数
function loadRecipes() {
    console.log(savedRecipes);
    console.log(htmlsavedRecipes);
    savedRecipes.forEach((recipe, index) => {
        addRecipeToDOM(recipe, index);
    });  
}

// DOMにレシピを追加する関数
function addRecipeToDOM(recipe, index) {
    const recipearea = document.getElementById("recipe-area");
    const template = document.getElementById("recipe-template");
    const clone = template.content.cloneNode(true);
    const element = clone.querySelector(".recipe");
    element.id = 'recipe_area_' + index;
    const imgElement = clone.querySelector("img");
    const urlElement = clone.querySelector("a");
    const deletebtn = clone.querySelector(".button2");
    const editbtn = clone.querySelector(".button3"); 

    editbtn.addEventListener("mouseenter", function() {
        this.style.cursor = "pointer"; 
    });
    editbtn.addEventListener("mouseleave", function() {
        this.style.cursor = "default"; 
    });
    editbtn.addEventListener("click", function() {
        window.location.href = `recipe-form.html?id=${index}`;
    });
    deletebtn.addEventListener("mouseenter", function() {
        this.style.cursor = "pointer"; 
    });

    deletebtn.addEventListener("mouseleave", function() {
        this.style.cursor = "default"; 
    });

    deletebtn.addEventListener("click", function(){
        const confirmation = confirm("本当に削除しますか？");
        if(confirmation) {
            delete_recipe_element(`recipe_area_${index}`);
        }
    })
    urlElement.addEventListener('click', (event) => {
        event.preventDefault(); 
        displayGeneratedHTML(index);
    });
  
    urlElement.href = recipe.url;
    imgElement.src = arrayOfRecipe[index];
    imgElement.alt = recipe.imgalt;
    clone.querySelector(".recipe-name").textContent = recipe.name;
    clone.querySelector(".recipe-time").textContent = recipe.time + "分";
    clone.querySelector(".recipe-impression").textContent = recipe.impression;
    recipearea.appendChild(clone);
}