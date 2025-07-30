// レシピを削除する関数
function delete_recipe_element(recipeId) {
    const recipeElement = document.getElementById(recipeId);
    if (!recipeElement) {
        console.error('Element not found: ' + recipeId);
        return;
    }
    console.log(recipeElement);
    recipeElement.remove();
  
    // const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const indexToRemove = parseInt(recipeId.replace('recipe_area_', ''));
    console.log(indexToRemove);
    savedRecipes.splice(indexToRemove, 1);
    htmlsavedRecipes.splice(indexToRemove, 1);
    localStorage.setItem('recipes', JSON.stringify(savedRecipes));
    console.log(savedRecipes);

    // savedRecipesが空になった場合、両方の配列をクリア
    if (savedRecipes.length === 0) {
        htmlsavedRecipes.length = 0; // 配列をクリア
        localStorage.removeItem('recipes'); // localStorageをクリア
        localStorage.removeItem('htmlrecipes');
    } else {
        localStorage.setItem('htmlrecipes', JSON.stringify(htmlsavedRecipes));
    }
  
    // 削除後、DOMを再構築してIDを更新
    const recipearea = document.getElementById("recipe-area");

    // 子要素をすべて取得
    const children = recipearea.children;

    // 配列に変換してループでクローン要素を削除
    Array.from(children).forEach(child => {
        if (child.id !== 'recipe-template') {
            recipearea.removeChild(child);
        }
    });

    // クローン要素を再追加
    savedRecipes.forEach((recipe, index) => {
        addRecipeToDOM(recipe, index);
    });
}