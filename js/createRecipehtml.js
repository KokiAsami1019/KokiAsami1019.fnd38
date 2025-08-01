function generateHTMLContent(recipe, index) {
    let htmlContent = `
        <div class="items">
            <div class="item">
                <img src="${arrayOfRecipe[index]}" alt="${recipe.title}">
                
                <div class="wrapper">
                    <h2>${recipe.title}</h2>
                    <p>${recipe.description}</p>
                    <div class="contents">
                        <h3>材料（${recipe.servings}人分）</h3>
                        <dl class="ingredients-list">
    `;

    recipe.ingredients.forEach(ingredient => {
        let formattedAmount;
        switch (ingredient.unit) {
            case 'grams':
                formattedAmount = `${ingredient.amount} g`; 
                break;
            case 'teaspoon':
                formattedAmount = `小さじ ${ingredient.amount}`; 
                break;
            case 'tablespoon':
                formattedAmount = `大さじ ${ingredient.amount}`; 
                break;
            case 'ml':
                formattedAmount = `${ingredient.amount} ml`; 
                break;
            case 'pieces1':
                formattedAmount = `${ingredient.amount} 個`; 
                break;
            case 'pieces2':
                formattedAmount = `${ingredient.amount} 片`; 
                break;
            case 'pieces3':
                formattedAmount = `${ingredient.amount} 粒`; 
                break;
            case 'pieces4':
                formattedAmount = `${ingredient.amount} 尾`; 
                break;
            case 'pieces5':
                formattedAmount = `${ingredient.amount} 房`; 
                break;
            case 'pieces6':
                formattedAmount = `${ingredient.amount} パック`; 
                break;
            case 'numbers1':
                formattedAmount = `${ingredient.amount} 本`; 
                break;
            case 'numbers2':
                formattedAmount = `${ingredient.amount} 枚`; 
                break;
            default:
                formattedAmount = ingredient.amount; 
        }
        
        htmlContent += `
                            <dt>${ingredient.name}</dt>
                            <dd>${formattedAmount}</dd>
        `;
    });

    htmlContent += `
                        </dl>
                    </div>
                </div>
            </div>
        </div>
        <section class="make">
            <div class="wrapper">
                <h2>作り方</h2>
                <ol>
    `;

    recipe.steps.forEach(step => {
        htmlContent += `
                    <li>${step}</li>
        `;
    });

    htmlContent += `
                </ol>
                <a class="button" href="index.html">レシピ一覧へ</a>
            </div>
        </section>
    `;

    return htmlContent;
}

function displayGeneratedHTML(index) {
    const htmlContent = generateHTMLContent(htmlsavedRecipes[index], index);
    document.body.innerHTML = htmlContent;
}
