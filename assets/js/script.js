// Variables globales
let cart = [];
let favorites = [];
let recettesData = null; // Stocke les données JSON après récupération

// Fonction pour charger les recettes depuis un fichier JSON via fetch
async function fetchRecipes() {
    try {
        const response = await fetch('/setting.json'); // Chemin vers ton fichier JSON
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération du fichier JSON');
        }
        recettesData = await response.json();
        loadRecipes(); // Appeler la fonction pour afficher les recettes une fois les données récupérées
    } catch (error) {
        console.error('Erreur:', error);
        document.getElementById('recipe-grid').innerHTML = '<p>Erreur lors du chargement des recettes.</p>';
    }
}

// Charger les recettes dans la grille
function loadRecipes() {
    const recipeGrid = document.getElementById('recipe-grid');
    recipeGrid.innerHTML = ''; // Vider la grille avant de la remplir
    recettesData.recettes.forEach((recette, index) => {
        const card = document.createElement('div');
        card.classList.add('recipe-card', 'glass');
        card.innerHTML = `
            <h3>${recette.nom}</h3>
            <p>${recette.categorie} - ${recette.temps_preparation}</p>
        `;
        card.addEventListener('click', () => showRecipeModal(index));
        recipeGrid.appendChild(card);
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

    // Calcul fictif du prix basé sur le nombre d'ingrédients
    const price = recette.ingredients.length * 2.5;
    document.getElementById('modal-price').textContent = `Prix: ${price.toFixed(2)}€`;

    // Boutons d'action
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

// Initialisation : charger les recettes au démarrage
window.onload = function() {
    fetchRecipes(); // Appeler fetch pour récupérer et afficher les recettes
};