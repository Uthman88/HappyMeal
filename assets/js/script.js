// Variables globales
let cart = [];
let favorites = [];
let recettesData = null;

// Fonction pour charger les recettes depuis un fichier JSON via fetch
async function fetchRecipes() {
    try {
        const response = await fetch('./setting.json'); // Chemin vers ton fichier JSON
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération du fichier JSON');
        }
        recettesData = await response.json();
        loadRecipes(); // Charger les recettes dans la grille et le menu déroulant
        updateFavoritesMenu(); // Mettre à jour les favoris au démarrage
    } catch (error) {
        console.error('Erreur:', error);
        document.getElementById('recipe-grid').innerHTML = '<p>Erreur lors du chargement des recettes.</p>';
    }
}

// Charger les recettes dans la grille et le menu déroulant
function loadRecipes() {
    const recipeGrid = document.getElementById('recipe-grid');
    const recipesMenu = document.getElementById('recipes-menu');
    recipeGrid.innerHTML = '';
    recipesMenu.innerHTML = '';
    recettesData.recettes.forEach((recette, index) => {
        // Grille principale
        const card = document.createElement('div');
        card.classList.add('recipe-card', 'glass');
        card.innerHTML = `
            <h3>${recette.nom}</h3>
            <p>${recette.categorie} - ${recette.temps_preparation}</p>
        `;
        card.addEventListener('click', () => showRecipeModal(index));
        recipeGrid.appendChild(card);

        // Menu déroulant "Recettes"
        const recipeLink = document.createElement('a');
        recipeLink.href = '#';
        recipeLink.textContent = recette.nom;
        recipeLink.addEventListener('click', (e) => {
            e.preventDefault();
            showRecipeModal(index);
        });
        recipesMenu.appendChild(recipeLink);
    });
}

// Afficher la popup avec détails
function showRecipeModal(index) {
    const recette = recettesData.recettes[index];
    const modal = document.getElementById('recipe-modal');
    document.getElementById('modal-title').textContent = recette.nom;
    document.getElementById('modal-time').textContent = `Temps: ${recette.temps_preparation}`;
    
    const ingredientsList = document.getElementById('modal-ingredients');
    ingredientsList.innerHTML = '';
    recette.ingredients.forEach(ing => {
        const li = document.createElement('li');
        li.textContent = `${ing.nom} - ${ing.quantite}`;
        ingredientsList.appendChild(li);
    });

    const price = recette.ingredients.length * 2.5;
    document.getElementById('modal-price').textContent = `Prix: ${price.toFixed(2)}€`;

    document.getElementById('add-to-cart').onclick = () => addToCart(recette);
    document.getElementById('add-to-favorites').onclick = () => addToFavorites(recette);

    modal.style.display = 'flex';
}

// Fermer la popup
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('recipe-modal').style.display = 'none';
});

// Ajouter au panier
function addToCart(recette) {
    cart.push(recette);
    updateCart();
}

// Ajouter aux favoris
function addToFavorites(recette) {
    if (!favorites.includes(recette)) {
        favorites.push(recette);
        updateFavoritesMenu();
        alert(`${recette.nom} ajouté aux favoris !`);
    }
}

// Mettre à jour le panier
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    cartCount.textContent = cart.length;
    cartItems.innerHTML = cart.map(item => `<p>${item.nom}</p>`).join('');
}

// Mettre à jour le menu des favoris
function updateFavoritesMenu() {
    const favoritesMenu = document.getElementById('favorites-menu');
    favoritesMenu.innerHTML = favorites.length > 0 
        ? favorites.map(fav => `<a href="#">${fav.nom}</a>`).join('')
        : '<p>Aucun favori pour le moment</p>';
}

// Gestion du clic pour ouvrir/fermer les menus déroulants
document.querySelectorAll('.dropbtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdownContent = btn.nextElementSibling;
        const isVisible = dropdownContent.style.display === 'block';
        document.querySelectorAll('.dropdown-content').forEach(menu => menu.style.display = 'none');
        dropdownContent.style.display = isVisible ? 'none' : 'block';
    });
});

// Fermer les menus si clic en dehors
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown') && !e.target.closest('.modal')) {
        document.querySelectorAll('.dropdown-content').forEach(menu => menu.style.display = 'none');
    }
});

// Gestion de la barre de recherche
const searchInput = document.getElementById('search-input');
const suggestions = document.getElementById('suggestions');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    suggestions.innerHTML = '';
    if (query) {
        const filtered = recettesData.recettes.filter(recette => recette.nom.toLowerCase().includes(query));
        suggestions.innerHTML = filtered.length > 0 
            ? filtered.map(recette => `<p>${recette.nom}</p>`).join('')
            : '<p>Aucun résultat</p>';
        suggestions.style.display = 'block';
    } else {
        suggestions.style.display = 'none';
    }
});

// Initialisation
window.onload = function() {
    fetchRecipes(); // Charger les recettes via fetch
};