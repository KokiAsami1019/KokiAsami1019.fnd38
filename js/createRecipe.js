// ページ読み込み時にレシピを読み込む
window.onload = loadRecipes;
let savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
let htmlsavedRecipes = JSON.parse(localStorage.getItem('htmlrecipes')) || [];

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
    const editbtn = clone.querySelector(".button3"); // 編集ボタンを取得
    // マウスオーバー時のカーソルを変更
    editbtn.addEventListener("mouseenter", function() {
        this.style.cursor = "pointer"; // ここでカーソルをポインタに変更
    });
    // マウスアウト時のカーソルを元に戻す
    editbtn.addEventListener("mouseleave", function() {
        this.style.cursor = "default"; // ここでカーソルをデフォルトに戻す
    });
    editbtn.addEventListener("click", function() {
        // フォームのURLにレシピIDを追加してリダイレクト
        window.location.href = `recipe-form.html?id=${index}`;
    });
    // マウスオーバー時のカーソルを変更
    deletebtn.addEventListener("mouseenter", function() {
        this.style.cursor = "pointer"; // ここでカーソルをポインタに変更
    });

    // マウスアウト時のカーソルを元に戻す
    deletebtn.addEventListener("mouseleave", function() {
        this.style.cursor = "default"; // ここでカーソルをデフォルトに戻す
    });

    deletebtn.addEventListener("click", function(){
        const confirmation = confirm("本当に削除しますか？");
        if(confirmation) {
            delete_recipe_element(`recipe_area_${index}`);
        }
    })
    // クリックイベントを設定
    urlElement.addEventListener('click', (event) => {
        event.preventDefault(); // デフォルトのリンク動作を無効化
        displayGeneratedHTML(index);
    });
  
    urlElement.href = recipe.url;
    imgElement.src = recipe.imgsrc;
    imgElement.alt = recipe.imgalt;
    clone.querySelector(".recipe-name").textContent = recipe.name;
    clone.querySelector(".recipe-time").textContent = recipe.time + "分";
    clone.querySelector(".recipe-impression").textContent = recipe.impression;
    recipearea.appendChild(clone);
}
