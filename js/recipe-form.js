htmlsavedRecipes = JSON.parse(localStorage.getItem('htmlrecipes')) || [];
savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];

function addIngredient() {
    const ingredientDiv = document.createElement('div');
    ingredientDiv.classList.add('ingredient');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'ingredient-name';
    nameInput.placeholder = '材料名';
    const unitSelect = document.createElement('select');
    unitSelect.name = 'ingredient-unit';
    unitSelect.innerHTML = `
        <option value="grams">グラム</option>
        <option value="teaspoon">小さじ</option>
        <option value="tablespoon">大さじ</option>
    `;
    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.name = 'ingredient-amount';
    amountInput.placeholder = '量';
    amountInput.min = '0';
    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.classList.add('add-button');
    addButton.textContent = '+';
    addButton.onclick = addIngredient;
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.classList.add('remove-button');
    removeButton.textContent = '-';
    removeButton.onclick = removeIngredient;
    ingredientDiv.appendChild(nameInput);
    ingredientDiv.appendChild(unitSelect);
    ingredientDiv.appendChild(amountInput);
    ingredientDiv.appendChild(addButton);
    ingredientDiv.appendChild(removeButton);
    const ingredientList = document.getElementById('ingredient-list');
    ingredientList.appendChild(ingredientDiv);
}

function removeIngredient() {
    const ingredientList = document.getElementById('ingredient-list');
    const ingredients = ingredientList.querySelectorAll('.ingredient');
    if (ingredients.length > 1) {
        ingredientList.removeChild(ingredients[ingredients.length - 1]);
    }
}

// document.addEventListener("DOMContentLoaded", function() {
//     const form = document.getElementById("recipe-form");
//     form.addEventListener("submit", function(event) {
//         event.preventDefault(); // デフォルトのフォーム送信を防ぐ
//         createRecipe(); // createRecipe関数を呼び出す
//     });
//     // キャンセルボタンのクリックイベントを監視
//     const cancelButton = document.getElementById("cancel-button");
//     cancelButton.addEventListener("click", function() {
//         // recipe-listページに移動
//         window.location.href = "recipe-list.html";
//     });
// });
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("recipe-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // デフォルトのフォーム送信を防ぐ
        createRecipe(); // createRecipe関数を呼び出す
    });
    const cancelButton = document.getElementById("cancel-button");
    cancelButton.addEventListener("click", function() {
        window.location.href = "recipe-list.html";
    });
    // URLからIDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    if (recipeId !== null) {
        const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        const recipe = savedRecipes[recipeId]; // 該当するレシピを取得
        populateForm(recipe); // フォームにデータをセット
    }
});

function createRecipe() {
    const title = document.getElementById("title").value;
    const serving = document.getElementById("serving").value;
    const time = document.getElementById("time").value;
    const steps = document.getElementById("steps").value.split("\n");
    const comments = document.getElementById("comments").value;
    const ingredients = Array.from(document.querySelectorAll("#ingredient-list .ingredient")).map(ingredient => ({
        name: ingredient.querySelector("input[name='ingredient-name']").value,
        unit: ingredient.querySelector("select[name='ingredient-unit']").value,
        amount: ingredient.querySelector("input[name='ingredient-amount']").value
    }));
    const photo = document.getElementById("photo").files[0];
    const imgsrc = photo ? URL.createObjectURL(photo) : "img/no_img.jpg";
    const newRecipe = {
        imgsrc: imgsrc,
        imgalt: title,
        name: title,
        time: parseInt(time, 10),
        impression: comments
    };
    const newhtmlRecipe = {
        title: title,
        description: comments,
        servings: serving,
        ingredients: ingredients,
        image: imgsrc,
        steps: steps
    };
    console.log("New HTML Recipe:", newhtmlRecipe); // デバッグ用ログ
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    savedRecipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(savedRecipes));
    const savedHtmlRecipes = JSON.parse(localStorage.getItem('htmlrecipes')) || [];
    savedHtmlRecipes.push(newhtmlRecipe);
    localStorage.setItem('htmlrecipes', JSON.stringify(savedHtmlRecipes));
    window.location.href = "recipe-list.html";
}

function populateForm(recipe) {
    document.getElementById("title").value = recipe.name;
    document.getElementById("serving").value = recipe.servings;
    document.getElementById("time").value = recipe.time;
    document.getElementById("comments").value = recipe.impression;
    const ingredientList = document.getElementById("ingredient-list");
    ingredientList.innerHTML = ""; // 既存の材料リストをクリア
    recipe.ingredients.forEach(ingredient => {
        const ingredientDiv = document.createElement('div');
        ingredientDiv.classList.add('ingredient');
      
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = 'ingredient-name';
        nameInput.placeholder = '材料名';
        nameInput.value = ingredient.name; // 既存の材料名をセット
      
        const unitSelect = document.createElement('select');
        unitSelect.name = 'ingredient-unit';
        unitSelect.innerHTML = `
            <option value="grams" ${ingredient.unit === 'grams' ? 'selected' : ''}>グラム</option>
            <option value="teaspoon" ${ingredient.unit === 'teaspoon' ? 'selected' : ''}>小さじ</option>
            <option value="tablespoon" ${ingredient.unit === 'tablespoon' ? 'selected' : ''}>大さじ</option>
        `;
      
        const amountInput = document.createElement('input');
        amountInput.type = 'number';
        amountInput.name = 'ingredient-amount';
        amountInput.placeholder = '量';
        amountInput.value = ingredient.amount; // 既存の量をセット
      
        ingredientDiv.appendChild(nameInput);
        ingredientDiv.appendChild(unitSelect);
        ingredientDiv.appendChild(amountInput);
      
        ingredientList.appendChild(ingredientDiv);
    });
}
