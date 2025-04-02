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

// Afficher le planning en mode flottant
function showFloatingPlanning() {
    const floatingPlanning = document.getElementById('floating-planning');
    floatingPlanning.innerHTML = Object.entries(planning).map(([date, recettes]) => `
        <div>
            <h4>${date}</h4>
            <ul>
                ${recettes.map(r => `<li>${r.nom}</li>`).join('')}
            </ul>
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