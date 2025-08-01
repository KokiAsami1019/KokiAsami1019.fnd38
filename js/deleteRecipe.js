// レシピを削除する関数
function delete_recipe_element(recipeId) {
    const recipeElement = document.getElementById(recipeId);
    if (!recipeElement) {
        console.error('Element not found: ' + recipeId);
        return;
    }
    console.log(recipeElement);
    recipeElement.remove();
    const indexToRemove = parseInt(recipeId.replace('recipe_area_', ''));
    console.log(indexToRemove);
    savedRecipes.splice(indexToRemove, 1);
    htmlsavedRecipes.splice(indexToRemove, 1);
    localStorage.setItem('recipes', JSON.stringify(savedRecipes));
    console.log(savedRecipes);

    if (savedRecipes.length === 0) {
        htmlsavedRecipes.length = 0; 
        localStorage.removeItem('recipes'); 
        localStorage.removeItem('htmlrecipes');
    } else {
        localStorage.setItem('htmlrecipes', JSON.stringify(htmlsavedRecipes));
    }
  
  
    const recipearea = document.getElementById("recipe-area");


    const children = recipearea.children;

  
    Array.from(children).forEach(child => {
        if (child.id !== 'recipe-template') {
            recipearea.removeChild(child);
        }
    });


    savedRecipes.forEach((recipe, index) => {
        addRecipeToDOM(recipe, index);
    });
}