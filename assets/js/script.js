document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const pages = {
        home: document.getElementById('home-page'),
        recipes: document.getElementById('recipes-page'),
        favorites: document.getElementById('favorites-page'),
        shopping: document.getElementById('shopping-page'),
        planning: document.getElementById('planning-page')
    };
    
    const navButtons = {
        home: document.getElementById('home-btn'),
        recipes: document.getElementById('recipes-btn'),
        favorites: document.getElementById('favorites-btn'),
        shopping: document.getElementById('shopping-btn'),
        planning: document.getElementById('planning-btn')
    };
    
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('suggestions');
    const randomRecipesContainer = document.getElementById('random-recipes');
    const allRecipesContainer = document.getElementById('all-recipes');
    const favoritesContainer = document.getElementById('favorites-recipes');
    const shoppingListContainer = document.getElementById('shopping-list');
    const weeklyPlanningContainer = document.getElementById('weekly-planning');
    
    const recipeModal = document.getElementById('recipe-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalTime = document.getElementById('modal-time');
    const modalIngredients = document.getElementById('modal-ingredients');
    const modalSteps = document.getElementById('modal-steps');
    const addToFavoritesBtn = document.getElementById('add-to-favorites');
    const addToPlanningBtn = document.getElementById('add-to-planning');
    
    const planningModal = document.getElementById('planning-modal');
    const confirmPlanningBtn = document.getElementById('confirm-planning');
    
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    
    const generateListBtn = document.getElementById('generate-list');
    const downloadListBtn = document.getElementById('download-list');
    const clearListBtn = document.getElementById('clear-list');
    const generatePlanningBtn = document.getElementById('generate-planning');
    const clearPlanningBtn = document.getElementById('clear-planning');
    
    // Variables d'état
    let recipes = [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    let planning = JSON.parse(localStorage.getItem('planning')) || {
        lundi: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null },
        mardi: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null },
        mercredi: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null },
        jeudi: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null },
        vendredi: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null },
        samedi: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null },
        dimanche: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null }
    };
    
    let currentPage = 1;
    const recipesPerPage = 9;
    let currentRecipe = null;
    
    // Charger les recettes
    fetch('./assets/json/recettes.json')
        .then(response => response.json())
        .then(data => {
            recipes = data.recettes;
            displayRandomRecipes();
            displayAllRecipes();
            updateFavoritesDisplay();
            updateShoppingListDisplay();
            updatePlanningDisplay();
        })
        .catch(error => console.error('Erreur de chargement des recettes:', error));
    
    // Navigation entre les pages
    function showPage(page) {
        Object.values(pages).forEach(p => p.classList.remove('active'));
        pages[page].classList.add('active');
    }
    
    navButtons.home.addEventListener('click', () => {
        showPage('home');
        displayRandomRecipes();
    });
    
    navButtons.recipes.addEventListener('click', () => {
        showPage('recipes');
    });
    
    navButtons.favorites.addEventListener('click', () => {
        showPage('favorites');
        updateFavoritesDisplay();
    });
    
    navButtons.shopping.addEventListener('click', () => {
        showPage('shopping');
    });
    
    navButtons.planning.addEventListener('click', () => {
        showPage('planning');
        updatePlanningDisplay();
    });
    
    // Système de recherche avec autocomplétion
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        if (query.length < 2) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        const matches = [];
        
        // Recherche par nom de recette
        recipes.forEach(recipe => {
            if (recipe.nom.toLowerCase().includes(query)) {
                matches.push({
                    type: 'recette',
                    name: recipe.nom,
                    recipe: recipe
                });
            }
        });
        
        // Recherche par ingrédient
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                if (typeof ingredient === 'string') {
                    if (ingredient.toLowerCase().includes(query)) {
                        matches.push({
                            type: 'ingrédient',
                            name: ingredient,
                            recipe: recipe
                        });
                    }
                } else if (ingredient.nom.toLowerCase().includes(query)) {
                    matches.push({
                        type: 'ingrédient',
                        name: ingredient.nom,
                        recipe: recipe
                    });
                }
            });
        });
        
        displaySuggestions(matches);
    });
    
    function displaySuggestions(matches) {
        suggestionsContainer.innerHTML = '';
        
        if (matches.length === 0) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        matches.slice(0, 5).forEach(match => {
            const item = document.createElement('div');
            item.classList.add('suggestion-item');
            item.textContent = `${match.name} (${match.type} - ${match.recipe.nom})`;
            
            item.addEventListener('click', () => {
                searchInput.value = '';
                suggestionsContainer.style.display = 'none';
                showRecipeDetails(match.recipe);
            });
            
            suggestionsContainer.appendChild(item);
        });
        
        suggestionsContainer.style.display = 'block';
    }
    
    document.addEventListener('click', function(e) {
        if (e.target !== searchInput) {
            suggestionsContainer.style.display = 'none';
        }
    });
    
    // Affichage des recettes aléatoires
    function displayRandomRecipes() {
        randomRecipesContainer.innerHTML = '';
        
        // Mélanger les recettes et en prendre 6
        const shuffled = [...recipes].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 6);
        
        selected.forEach(recipe => {
            randomRecipesContainer.appendChild(createRecipeCard(recipe));
        });
    }
    
    // Affichage de toutes les recettes avec pagination
    function displayAllRecipes() {
        allRecipesContainer.innerHTML = '';
        
        const start = (currentPage - 1) * recipesPerPage;
        const end = start + recipesPerPage;
        const paginatedRecipes = recipes.slice(start, end);
        
        paginatedRecipes.forEach(recipe => {
            allRecipesContainer.appendChild(createRecipeCard(recipe));
        });
        
        pageInfo.textContent = `Page ${currentPage} sur ${Math.ceil(recipes.length / recipesPerPage)}`;
        
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === Math.ceil(recipes.length / recipesPerPage);
    }
    
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayAllRecipes();
        }
    });
    
    nextPageBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(recipes.length / recipesPerPage)) {
            currentPage++;
            displayAllRecipes();
        }
    });
    
    // Création d'une carte de recette
    function createRecipeCard(recipe) {
        const card = document.createElement('div');
        card.classList.add('recipe-card');
        
        const isFavorite = favorites.some(fav => fav.nom === recipe.nom);
        
        card.innerHTML = `
            <div class="recipe-image" style="background-image: url('./assets/images/${recipe.image}')"></div>
            <div class="recipe-info">
                <h3 class="recipe-title">${recipe.nom} ${isFavorite ? '<span class="favorite-icon">★</span>' : ''}</h3>
                <div class="recipe-meta">
                    <span>${recipe.categorie}</span>
                    <span>${recipe.temps_preparation}</span>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => showRecipeDetails(recipe));
        return card;
    }
    
    // Affichage des détails d'une recette
    function showRecipeDetails(recipe) {
        currentRecipe = recipe;
        modalTitle.textContent = recipe.nom;
        modalCategory.textContent = recipe.categorie;
        modalTime.textContent = recipe.temps_preparation;
        
        modalIngredients.innerHTML = '';
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            
            if (typeof ingredient === 'string') {
                li.textContent = ingredient;
            } else {
                li.innerHTML = `
                    ${ingredient.nom} - ${ingredient.quantite}
                    <button class="add-to-list" data-ingredient="${ingredient.nom}">+ liste</button>
                `;
            }
            
            modalIngredients.appendChild(li);
        });
        
        modalSteps.innerHTML = '';
        recipe.etapes.forEach(etape => {
            const li = document.createElement('li');
            li.textContent = etape;
            modalSteps.appendChild(li);
        });
        
        // Gestion du bouton favori
        const isFavorite = favorites.some(fav => fav.nom === recipe.nom);
        addToFavoritesBtn.textContent = isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris';
        
        recipeModal.style.display = 'block';
    }
    
    // Gestion des modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === recipeModal) {
            recipeModal.style.display = 'none';
        }
        if (e.target === planningModal) {
            planningModal.style.display = 'none';
        }
    });
    
    // Gestion des favoris
    addToFavoritesBtn.addEventListener('click', function() {
        const isFavorite = favorites.some(fav => fav.nom === currentRecipe.nom);
        
        if (isFavorite) {
            favorites = favorites.filter(fav => fav.nom !== currentRecipe.nom);
            this.textContent = 'Ajouter aux favoris';
        } else {
            favorites.push(currentRecipe);
            this.textContent = 'Retirer des favoris';
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesDisplay();
    });
    
    function updateFavoritesDisplay() {
        favoritesContainer.innerHTML = '';
        
        if (favorites.length === 0) {
            favoritesContainer.innerHTML = '<p>Aucune recette favorite pour le moment.</p>';
            return;
        }
        
        favorites.forEach(recipe => {
            favoritesContainer.appendChild(createRecipeCard(recipe));
        });
    }
    
    // Gestion de la liste de courses
    modalIngredients.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-list')) {
            const ingredientName = e.target.getAttribute('data-ingredient');
            addToShoppingList(ingredientName);
        }
    });
    
    function addToShoppingList(ingredient) {
        if (!shoppingList.includes(ingredient)) {
            shoppingList.push(ingredient);
            localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
            updateShoppingListDisplay();
        }
    }
    
    function updateShoppingListDisplay() {
        shoppingListContainer.innerHTML = '';
        
        if (shoppingList.length === 0) {
            shoppingListContainer.innerHTML = '<p>Votre liste de courses est vide.</p>';
            return;
        }
        
        shoppingList.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item}
                <button class="remove-item" data-index="${index}">×</button>
            `;
            shoppingListContainer.appendChild(li);
        });
        
        // Gestion de la suppression d'éléments
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                shoppingList.splice(index, 1);
                localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
                updateShoppingListDisplay();
            });
        });
    }
    
    // Générer une liste de courses à partir des recettes favorites
    generateListBtn.addEventListener('click', function() {
        const ingredients = new Set();
        
        favorites.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                if (typeof ingredient === 'string') {
                    ingredients.add(ingredient);
                } else {
                    ingredients.add(ingredient.nom);
                }
            });
        });
        
        shoppingList = Array.from(ingredients);
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        updateShoppingListDisplay();
    });
    
    // Télécharger la liste de courses
    downloadListBtn.addEventListener('click', function() {
        if (shoppingList.length === 0) {
            alert('Votre liste de courses est vide !');
            return;
        }
        
        const content = `Liste de courses:\n\n${shoppingList.join('\n')}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'liste_de_courses.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
    
    // Vider la liste de courses
    clearListBtn.addEventListener('click', function() {
        if (confirm('Voulez-vous vraiment vider votre liste de courses ?')) {
            shoppingList = [];
            localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
            updateShoppingListDisplay();
        }
    });
    
    // Gestion du planning
    addToPlanningBtn.addEventListener('click', function() {
        planningModal.style.display = 'block';
    });
    
    confirmPlanningBtn.addEventListener('click', function() {
        const day = document.getElementById('planning-day').value;
        const meal = document.getElementById('planning-meal').value;
        
        planning[day][meal] = currentRecipe;
        localStorage.setItem('planning', JSON.stringify(planning));
        
        planningModal.style.display = 'none';
        updatePlanningDisplay();
    });
    
    function updatePlanningDisplay() {
        weeklyPlanningContainer.innerHTML = '';
        
        for (const [day, meals] of Object.entries(planning)) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day-planning');
            
            let dayContent = `<div class="day-title">${day.charAt(0).toUpperCase() + day.slice(1)}</div>`;
            
            for (const [meal, recipe] of Object.entries(meals)) {
                dayContent += `
                    <div class="meal-section">
                        <div class="meal-title">${getMealName(meal)}</div>
                        ${recipe ? `
                            <div class="meal-recipe">
                                ${recipe.nom}
                                <button class="remove-planning" data-day="${day}" data-meal="${meal}">×</button>
                            </div>
                        ` : '<div class="meal-recipe">-</div>'}
                    </div>
                `;
            }
            
            dayElement.innerHTML = dayContent;
            weeklyPlanningContainer.appendChild(dayElement);
        }
        
        // Gestion de la suppression des éléments du planning
        document.querySelectorAll('.remove-planning').forEach(btn => {
            btn.addEventListener('click', function() {
                const day = this.getAttribute('data-day');
                const meal = this.getAttribute('data-meal');
                
                planning[day][meal] = null;
                localStorage.setItem('planning', JSON.stringify(planning));
                updatePlanningDisplay();
            });
        });
    }
    
    function getMealName(meal) {
        switch (meal) {
            case 'petit-dejeuner': return 'Petit-déjeuner';
            case 'dejeuner': return 'Déjeuner';
            case 'diner': return 'Dîner';
            default: return meal;
        }
    }
    
    // Générer un planning aléatoire
    generatePlanningBtn.addEventListener('click', function() {
        if (favorites.length === 0) {
            alert('Ajoutez d\'abord des recettes à vos favoris !');
            return;
        }
        
        if (confirm('Générer un planning aléatoire à partir de vos favoris ?')) {
            const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
            const meals = ['petit-dejeuner', 'dejeuner', 'diner'];
            
            // Réinitialiser le planning
            planning = {
                lundi: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null },
                mardi: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null },
                mercredi: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null },
                jeudi: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null },
                vendredi: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null },
                samedi: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null },
                dimanche: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null }
            };
            
            // Pour chaque jour et chaque repas, choisir une recette aléatoire parmi les favoris
            days.forEach(day => {
                meals.forEach(meal => {
                    if (meal !== 'petit-dejeuner') {
                        const randomIndex = Math.floor(Math.random() * favorites.length);
                        planning[day][meal] = favorites[randomIndex];
                    }
                });
            });
            
            localStorage.setItem('planning', JSON.stringify(planning));
            updatePlanningDisplay();
        }
    });
    
    // Effacer le planning
    clearPlanningBtn.addEventListener('click', function() {
        if (confirm('Voulez-vous vraiment effacer tout votre planning ?')) {
            planning = {
                lundi: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null },
                mardi: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null },
                mercredi: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null },
                jeudi: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null },
                vendredi: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null },
                samedi: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null },
                dimanche: { 'petit-dejeuner': null, 'dejeuner': null, 'diner': null }
            };
            
            localStorage.setItem('planning', JSON.stringify(planning));
            updatePlanningDisplay();
        }
    });
});