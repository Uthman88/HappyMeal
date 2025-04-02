// Variables globales pour le planning
let planning = JSON.parse(localStorage.getItem('planning')) || {};

// Ajouter une recette au planning
function openPlanningModal(recette) {
    const planningModal = document.getElementById('planning-modal');
    planningModal.style.display = 'flex';
    document.getElementById('confirm-planning').onclick = () => {
        const date = document.getElementById('planning-date').value;
        if (!date) {
            alert('Veuillez sélectionner une date.');
            return;
        }
        if (!planning[date]) planning[date] = [];
        planning[date].push(recette);
        localStorage.setItem('planning', JSON.stringify(planning));
        planningModal.style.display = 'none';
        alert('Recette ajoutée au planning');
    };
}

// Afficher le planning hebdomadaire dans le planning flottant
function showFloatingPlanning() {
    const floatingPlanning = document.getElementById('floating-planning');
    const weeklyPlanning = JSON.parse(localStorage.getItem('weeklyPlanning')) || {};

    floatingPlanning.innerHTML = Object.entries(weeklyPlanning).map(([day, recette]) => `
        <div>
            <h4>${day}</h4>
            <p>${recette ? recette.nom : 'Aucune recette sélectionnée'}</p>
        </div>
    `).join('');
    floatingPlanning.style.display = 'block';
}

// Supprimer une recette du planning
function removeFromPlanning(date, recetteIndex) {
    if (planning[date]) {
        planning[date].splice(recetteIndex, 1);
        if (planning[date].length === 0) delete planning[date];
        localStorage.setItem('planning', JSON.stringify(planning));
        alert('Recette supprimée du planning');
        showFloatingPlanning();
    }
}

// Fermer le planning flottant
function closeFloatingPlanning() {
    const floatingPlanning = document.getElementById('floating-planning');
    floatingPlanning.style.display = 'none';
}

// Ouvrir le popup pour le planning hebdomadaire
function openWeeklyPlanningModal() {
    const weeklyPlanningModal = document.getElementById('weekly-planning-modal');
    const weeklyPlanningContainer = document.getElementById('weekly-planning-container');

    // Réinitialiser le contenu
    weeklyPlanningContainer.innerHTML = '';

    // Jours de la semaine
    const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

    // Générer les sections pour chaque jour
    daysOfWeek.forEach(day => {
        const daySection = document.createElement('div');
        daySection.classList.add('day-section');
        daySection.innerHTML = `
            <h4>${day}</h4>
            <select class="recipe-select" data-day="${day}">
                <option value="">-- Choisir une recette --</option>
                ${recettesData.recettes.map(recette => `<option value="${recette.nom}">${recette.nom}</option>`).join('')}
            </select>
        `;
        weeklyPlanningContainer.appendChild(daySection);
    });

    // Afficher le popup
    weeklyPlanningModal.style.display = 'flex';
}

// Enregistrer le planning hebdomadaire
document.getElementById('save-weekly-planning').addEventListener('click', () => {
    const selectedRecipes = {};
    const selects = document.querySelectorAll('.recipe-select');

    selects.forEach(select => {
        const day = select.getAttribute('data-day');
        const recipeName = select.value;
        if (recipeName) {
            const recette = recettesData.recettes.find(r => r.nom === recipeName);
            selectedRecipes[day] = recette;
        }
    });

    // Sauvegarder dans le localStorage
    localStorage.setItem('weeklyPlanning', JSON.stringify(selectedRecipes));
    alert('Planning hebdomadaire enregistré !');
    document.getElementById('weekly-planning-modal').style.display = 'none';
});