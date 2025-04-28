// Data: recipes array
const recipes = [
    {
        id: "1",
        name: "Pasta Carbonara",
        description: "A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
        ingredients: ["200g spaghetti", "100g pancetta", "2 eggs", "50g Parmesan cheese", "Black pepper", "Salt"],
        preparationTime: 20,
        difficulty: "Medium",
        image: "images/pasta.jpg"
    },
    {
        id: "2",
        name: "Grilled Cheese Sandwich",
        description: "A golden, crispy sandwich with gooey melted cheese inside.",
        ingredients: ["2 slices of bread", "2 slices cheddar cheese", "Butter"],
        preparationTime: 10,
        difficulty: "Easy",
        image: "images/grilledcheese.jpg"
    },
    {
        id: "3",
        name: "Ramen Bowl",
        description: "Japanese noodle soup with a flavorful broth and toppings.",
        ingredients: ["1 ramen noodle pack", "2 boiled eggs", "1 cup chicken broth", "Spring onions", "Soy sauce", "Nori", "Mushrooms"],
        preparationTime: 30,
        difficulty: "Medium",
        image: "images/ramen.jpg"
    },
    {
        id: "4",
        name: "Avocado Toast",
        description: "A healthy, quick breakfast made with mashed avocado on toasted bread.",
        ingredients: ["2 slices of bread", "1 avocado", "Salt", "Pepper", "Lemon juice", "Chili flakes"],
        preparationTime: 8,
        difficulty: "Easy",
        image: "images/avocadotoast.jpg"
    },
    {
        id: "5",
        name: "Strawberry Cheesecake",
        description: "A rich and creamy dessert topped with fresh strawberries.",
        ingredients: ["200g digestive biscuits", "100g butter", "300g cream cheese", "200ml whipped cream", "Strawberries", "Sugar", "Vanilla extract"],
        preparationTime: 60,
        difficulty: "Hard",
        image: "images/cheesecake.jpg"
    },
    {
        id: "6",
        name: "Greek Salad",
        description: "A refreshing salad with cucumber, tomato, and feta cheese.",
        ingredients: ["1 cucumber", "4 tomatoes", "1 red onion", "100g feta cheese", "Olives", "Olive oil", "Salt"],
        preparationTime: 15,
        difficulty: "Easy",
        image: "images/salad.jpg"
    },
    {
        id: "7",
        name: "Chocolate Soufflé",
        description: "A decadent chocolate dessert that's fluffy and light.",
        ingredients: ["100g dark chocolate", "4 eggs", "50g butter", "50g sugar", "20g flour", "Vanilla extract"],
        preparationTime: 45,
        difficulty: "Hard",
        image: "images/dessert.jpg"
    }
];

// LocalStorage keys
const FAVORITES_KEY = "recipeAppFavorites";
const ORDER_KEY = "recipeAppOrder";

// Utility functions for localStorage
function getFavorites() {
    const fav = localStorage.getItem(FAVORITES_KEY);
    return fav ? JSON.parse(fav) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function getOrder() {
    const order = localStorage.getItem(ORDER_KEY);
    return order ? JSON.parse(order) : [];
}

function saveOrder(order) {
    localStorage.setItem(ORDER_KEY, JSON.stringify(order));
}

// Navigation bar active link
function setActiveNavLink(page) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update order notification badge in nav bar
function updateOrderNotification() {
    const order = getOrder();
    const orderLink = document.querySelector('a.nav-link[href="order.html"]');
    if (!orderLink) return;

    // Remove existing badge if any
    const existingBadge = orderLink.querySelector('.order-badge');
    if (existingBadge) {
        existingBadge.remove();
    }

    if (order.length > 0) {
        const badge = document.createElement('span');
        badge.className = 'order-badge';
        badge.textContent = order.length;
        badge.style.backgroundColor = 'red';
        badge.style.color = 'white';
        badge.style.borderRadius = '50%';
        badge.style.padding = '2px 6px';
        badge.style.fontSize = '12px';
        badge.style.marginLeft = '5px';
        badge.style.verticalAlign = 'super';
        orderLink.appendChild(badge);
    }
}

// Update order notification badge in nav bar
function updateOrderNotification() {
    const order = getOrder();
    const orderLink = document.querySelector('a.nav-link[href="order.html"]');
    if (!orderLink) return;

    // Remove existing badge if any
    const existingBadge = orderLink.querySelector('.order-badge');
    if (existingBadge) {
        existingBadge.remove();
    }

    if (order.length > 0) {
        const badge = document.createElement('span');
        badge.className = 'order-badge';
        badge.textContent = order.length;
        badge.style.backgroundColor = 'red';
        badge.style.color = 'white';
        badge.style.borderRadius = '50%';
        badge.style.padding = '2px 6px';
        badge.style.fontSize = '12px';
        badge.style.marginLeft = '5px';
        badge.style.verticalAlign = 'super';
        orderLink.appendChild(badge);
    }
}

// Render recipe list on index.html
function renderRecipeList() {
    const list = document.getElementById('recipe-list');
    if (!list) return;

    const favorites = getFavorites();

    list.innerHTML = "";
    recipes.forEach(recipe => {
        const li = document.createElement('li');
        li.onclick = () => {
            window.location.href = `recipe.html?id=${recipe.id}`;
        };

        const img = document.createElement('img');
        img.src = recipe.image;
        img.alt = recipe.name;

        const infoDiv = document.createElement('div');
        infoDiv.className = 'recipe-info';

        const name = document.createElement('p');
        name.className = 'recipe-name';
        name.textContent = recipe.name;

        const subtitle = document.createElement('p');
        subtitle.className = 'recipe-subtitle';

        // Add difficulty color class
        let difficultyClass = '';
        switch (recipe.difficulty.toLowerCase()) {
            case 'easy':
                difficultyClass = 'difficulty-easy';
                break;
            case 'medium':
                difficultyClass = 'difficulty-medium';
                break;
            case 'hard':
                difficultyClass = 'difficulty-hard';
                break;
        }
        subtitle.innerHTML = `${recipe.preparationTime} mins | <span class="${difficultyClass}">${recipe.difficulty}</span>`;

        infoDiv.appendChild(name);
        infoDiv.appendChild(subtitle);

        li.appendChild(img);
        li.appendChild(infoDiv);

        if (favorites.includes(recipe.id)) {
            const favIcon = document.createElement('span');
            favIcon.className = 'favorite-icon';
            favIcon.textContent = '♥';
            li.appendChild(favIcon);
        }

        list.appendChild(li);
    });
}

// Get recipe by id from URL param
function getRecipeIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Render recipe detail on recipe.html
function renderRecipeDetail() {
    const container = document.getElementById('recipe-detail');
    if (!container) return;

    const recipeId = getRecipeIdFromUrl();
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) {
        container.innerHTML = "<p>Recipe not found.</p>";
        return;
    }

    const favorites = getFavorites();
    const isFavorite = favorites.includes(recipe.id);

    container.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" />
        <h2>${recipe.name}</h2>
        <div class="labels">
            <span>⏱️ ${recipe.preparationTime} mins</span>
            <span>📊 ${recipe.difficulty}</span>
        </div>
        <div class="section">
            <h3>Description</h3>
            <p>${recipe.description}</p>
        </div>
        <div class="section">
            <h3>Ingredients</h3>
            <ul class="ingredients-list">
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>
        <button id="toggle-favorite-btn" class="btn">${isFavorite ? 'Remove from Favorites ♥' : 'Add to Favorites ♡'}</button>
        <button id="order-ingredients-btn" class="btn" style="margin-left: 10px;">Order Ingredient</button>
        <div id="order-quantities" style="margin-top: 1rem; display:none;">
            <h3>Order Ingredients</h3>
            <form id="order-form" class="order-ingredients-form">
                ${recipe.ingredients.map(ing => `
                    <label>
                        ${ing}:
                        <input type="number" name="quantity" data-ingredient="${ing}" min="0" max="10" value="0" />
                    </label>
                `).join('')}
                <button type="submit" class="btn" style="margin-top: 10px;">Order</button>
                <button type="button" id="cancel-order-btn" class="btn btn-clear" style="margin-left: 10px;">Cancel</button>
            </form>
        </div>
    `;

    document.getElementById('toggle-favorite-btn').addEventListener('click', () => {
        toggleFavorite(recipe.id);
        renderRecipeDetail();
    });

    const orderBtn = document.getElementById('order-ingredients-btn');
    const orderQuantitiesDiv = document.getElementById('order-quantities');
    const orderForm = document.getElementById('order-form');
    const cancelOrderBtn = document.getElementById('cancel-order-btn');

    orderBtn.addEventListener('click', () => {
        orderQuantitiesDiv.style.display = 'block';
        orderBtn.style.display = 'none';
    });

    cancelOrderBtn.addEventListener('click', () => {
        orderQuantitiesDiv.style.display = 'none';
        orderBtn.style.display = 'inline-block';
    });

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(orderForm);
        const quantities = {};
        for (const [key, value] of formData.entries()) {
            console.log(`Form data entry: key=${key}, value=${value}`);
            const input = orderForm.querySelector(`input[data-ingredient="${key}"]`);
            if (input) {
                const qty = parseInt(input.value);
                if (qty > 0) {
                    quantities[key] = qty;
                }
            }
        }
        console.log("Quantities to add:", quantities);
        addIngredientsToOrder(quantities);
            alert('Ingredient order successfully.');
        orderQuantitiesDiv.style.display = 'none';
        orderBtn.style.display = 'inline-block';
    });
}

// Toggle favorite recipe
function toggleFavorite(recipeId) {
    let favorites = getFavorites();
    if (favorites.includes(recipeId)) {
        favorites = favorites.filter(id => id !== recipeId);
    } else {
        favorites.push(recipeId);
    }
    saveFavorites(favorites);
}

// Render favorites list on favorites.html
function renderFavoritesList() {
    const list = document.getElementById('favorites-list');
    const noFav = document.getElementById('no-favorites');
    if (!list || !noFav) return;

    const favorites = getFavorites();
    if (favorites.length === 0) {
        list.style.display = 'none';
        noFav.style.display = 'block';
        return;
    } else {
        list.style.display = 'block';
        noFav.style.display = 'none';
    }

    list.innerHTML = "";
    favorites.forEach(id => {
        const recipe = recipes.find(r => r.id === id);
        if (!recipe) return;

        const li = document.createElement('li');
        li.onclick = () => {
            window.location.href = `recipe.html?id=${recipe.id}`;
        };

        const img = document.createElement('img');
        img.src = recipe.image;
        img.alt = recipe.name;

        const infoDiv = document.createElement('div');
        infoDiv.className = 'recipe-info';

        const name = document.createElement('p');
        name.className = 'recipe-name';
        name.textContent = recipe.name;

        const subtitle = document.createElement('p');
        subtitle.className = 'recipe-subtitle';
        subtitle.textContent = `${recipe.preparationTime} mins | ${recipe.difficulty}`;

        infoDiv.appendChild(name);
        infoDiv.appendChild(subtitle);

        li.appendChild(img);
        li.appendChild(infoDiv);

        const favIcon = document.createElement('span');
        favIcon.className = 'favorite-icon';
        favIcon.textContent = '♥';
        li.appendChild(favIcon);

        list.appendChild(li);
    });
}

// Add ingredients to order
function addIngredientsToOrder(quantities) {
    console.log("Adding ingredients to order:", quantities);
    let order = getOrder();
    console.log("Current order before adding:", order);

    for (const [ingredient, quantity] of Object.entries(quantities)) {
        const existingItem = order.find(item => item.name === ingredient);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            order.push({ name: ingredient, quantity: quantity, price: 2.99 });
        }
    }
    saveOrder(order);
    console.log("Order after adding and saving:", order);
}

// Render order list on order.html
function renderOrderList() {
    const list = document.getElementById('order-list');
    const emptyOrderDiv = document.getElementById('empty-order');
    const orderSummary = document.querySelector('.order-summary');
    const totalSpan = document.getElementById('order-total');
    const placeOrderBtn = document.getElementById('place-order-btn');

    if (!list || !emptyOrderDiv || !orderSummary || !totalSpan || !placeOrderBtn) return;

    const order = getOrder();

    if (!order || order.length === 0) {
        list.style.display = 'none';
        emptyOrderDiv.style.display = 'block';
        orderSummary.style.display = 'none';
        placeOrderBtn.disabled = true;
        return;
    } else {
        list.style.display = 'block';
        emptyOrderDiv.style.display = 'none';
        orderSummary.style.display = 'flex';
        placeOrderBtn.disabled = false;
    }

    list.innerHTML = "";
    order.forEach((item, index) => {
        const li = document.createElement('li');

        const nameSpan = document.createElement('span');
        nameSpan.textContent = item.name;

        const qtyPriceSpan = document.createElement('span');
        qtyPriceSpan.textContent = `${item.quantity} × $${item.price.toFixed(2)}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Remove';
        deleteBtn.className = 'btn btn-clear';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.addEventListener('click', () => {
            removeOrderItem(index);
            renderOrderList();
        });

        li.appendChild(nameSpan);
        li.appendChild(qtyPriceSpan);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });

    const totalPrice = order.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalSpan.textContent = totalPrice.toFixed(2);
}

// Remove order item by index
function removeOrderItem(index) {
    let order = getOrder();
    order.splice(index, 1);
    saveOrder(order);
}

// Clear entire order
function clearOrder() {
    saveOrder([]);
}
