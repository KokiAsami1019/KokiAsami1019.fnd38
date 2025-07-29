function generateHTMLContent(recipe) {
    let htmlContent = `
        <div class="items">
            <div class="item">
                <img src="${recipe.image}" alt="${recipe.title}">
                <div class="wrapper">
                    <h2>${recipe.title}</h2>
                    <p>${recipe.description}</p>
                    <div class="contents">
                        <h3>材料（${recipe.servings}人分）</h3>
                        <dl>
    `;

    recipe.ingredients.forEach(ingredient => {
        let formattedAmount;
        switch (ingredient.unit) {
            case 'grams':
                formattedAmount = `${ingredient.amount}g`; // For grams, append 'g' after the amount
                break;
            case 'teaspoon':
                formattedAmount = `小さじ ${ingredient.amount}`; // For teaspoons, prepend '小さじ'
                break;
            case 'tablespoon':
                formattedAmount = `大さじ ${ingredient.amount}`; // For tablespoons, prepend '大さじ'
                break;
            default:
                formattedAmount = ingredient.amount; // Default case, just use the amount
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
                <a class="button" href="recipe-list.html">レシピ一覧へ</a>
            </div>
        </section>
    `;

    return htmlContent;
}

function displayGeneratedHTML(index) {
    const htmlContent = generateHTMLContent(htmlsavedRecipes[index]);
    document.body.innerHTML = htmlContent;
}

function displayGeneratedHTML(index) {
    const htmlContent = generateHTMLContent(htmlsavedRecipes[index]);
    document.body.innerHTML = htmlContent;
}
