# 🍽️ HappyMeal - Application de Gestion de Recettes

Une application web moderne et intuitive pour découvrir, organiser et planifier vos recettes de cuisine favorites.

## 📋 Table des matières

- [À propos du projet](#-à-propos-du-projet)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Structure du projet](#-structure-du-projet)
- [Installation et utilisation](#-installation-et-utilisation)
- [Guide d'utilisation](#-guide-dutilisation)
- [Contributeurs](#-contributeurs)
- [Licence](#-licence)

## 🎯 À propos du projet

**HappyMeal** est une application web complète de gestion de recettes qui permet aux utilisateurs de :
- Découvrir de nouvelles recettes 
- Organiser leurs recettes favorites
- Planifier leurs repas pour la semaine
- Générer automatiquement des listes de courses
- Rechercher des recettes par nom ou ingrédients

L'application a été développée en équipe en utilisant les technologies web modernes pour offrir une expérience utilisateur fluide et responsive.

## ✨ Fonctionnalités

### 🏠 Page d'accueil
- **Recettes aléatoires** : Découvrez 6 recettes sélectionnées aléatoirement à chaque visite
- **Barre de recherche intelligente** : Recherche en temps réel par nom de recette ou ingrédients
- **Autocomplétion** : Suggestions automatiques pendant la saisie

### 📖 Catalogue de recettes
- **Affichage paginé** : Parcourez toutes les recettes disponibles (9 par page)
- **Navigation intuitive** : Boutons précédent/suivant avec indicateur de page
- **Cartes interactives** : Chaque recette est présentée avec son image, catégorie et temps de préparation

### ⭐ Système de favoris
- **Gestion des favoris** : Ajoutez/retirez des recettes de vos favoris d'un simple clic
- **Persistance des données** : Vos favoris sont sauvegardés dans le localStorage
- **Indicateur visuel** : Les recettes favorites sont marquées d'une étoile ★

### 🛒 Liste de courses intelligente
- **Génération automatique** : Créez une liste de courses à partir de vos recettes favorites
- **Gestion manuelle** : Ajoutez des ingrédients directement depuis les détails des recettes
- **Export** : Téléchargez votre liste au format .txt
- **Suppression sélective** : Retirez des éléments individuellement

### 📅 Planning de repas
- **Planification hebdomadaire** : Organisez vos repas pour toute la semaine
- **3 repas par jour** : Petit-déjeuner, déjeuner et dîner
- **Génération aléatoire** : Créez un planning automatique basé sur vos favoris
- **Gestion flexible** : Ajoutez/supprimez des repas à volonté

### 🔍 Recherche avancée
- **Recherche multicritères** : Par nom de recette ou par ingrédients
- **Résultats en temps réel** : Affichage instantané des suggestions
- **Interface intuitive** : Cliquez sur une suggestion pour voir les détails

### 📱 Design responsive
- **Interface moderne** : Design épuré et professionnel
- **Navigation fluide** : Transitions smooth entre les sections
- **Compatibilité mobile** : Optimisé pour tous les appareils

## 🛠️ Technologies utilisées

### Frontend
- **HTML5** : Structure sémantique de l'application
- **CSS3** : Styles modernes avec flexbox et grid
- **JavaScript ES6+** : Logique applicative et interactions
- **LocalStorage** : Persistance des données côté client

### Données
- **JSON** : Base de données des recettes au format JSON
- **Images optimisées** : Assets visuels pour chaque recette

### Outils de développement
- **Git** : Contrôle de version et collaboration
- **GitHub** : Hébergement du code et gestion des branches
- **VS Code** : Environnement de développement

## 📁 Structure du projet

```
HappyMeal/
├── 📄 index.html                 # Page principale
├── 📄 README.md                  # Documentation du projet
├── 📄 setting.json              # Configuration du projet
├── 📁 .vscode/                  # Configuration VS Code
│   └── settings.json
└── 📁 assets/                   # Ressources du projet
    ├── 📁 images/               # Images des recettes
    │   ├── poulet.png
    │   ├── salade_quinoa.png
    │   ├── lasagnes.png
    │   ├── tiramisu.png
    │   └── ... (13 images au total)
    ├── 📁 js/                   # Scripts JavaScript
    │   ├── scripts.js           # Script principal de l'application
    │   ├── script.js            # Scripts supplémentaires
    │   └── planning.js          # Logique de planification
    ├── 📁 json/                 # Données JSON
    │   └── recettes.json        # Base de données des recettes
    └── 📁 styles/               # Feuilles de style
        └── style.css            # Styles principaux
```

## 🚀 Installation et utilisation

### Prérequis
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Un serveur web local (WAMP, XAMPP, Live Server, etc.)

### Installation
1. **Cloner le repository**
   ```bash
   git clone https://github.com/Uthman88/HappyMeal.git
   cd HappyMeal
   ```

2. **Lancer un serveur local**
   
   **Option 1 : Avec WAMP/XAMPP**
   - Placez le dossier dans `www/` ou `htdocs/`
   - Accédez à `http://localhost/HappyMeal`
   
   **Option 2 : Avec Live Server (VS Code)**
   - Installez l'extension Live Server
   - Clic droit sur `index.html` → "Open with Live Server"
   
   **Option 3 : Avec Python**
   ```bash
   python -m http.server 8000
   ```
   - Accédez à `http://localhost:8000`

### Première utilisation
1. Ouvrez l'application dans votre navigateur
2. Les recettes se chargent automatiquement
3. Explorez les différentes sections via la navigation
4. Commencez à ajouter des recettes à vos favoris !

## 📖 Guide d'utilisation

### Navigation
- **Accueil** : Page d'accueil avec recettes aléatoires et recherche
- **Toutes les recettes** : Catalogue complet avec pagination
- **Favoris** : Vos recettes favorites sauvegardées
- **Liste de courses** : Gestion de votre liste d'achats
- **Planning** : Organisation de vos repas hebdomadaires

### Ajouter une recette aux favoris
1. Cliquez sur une recette pour voir ses détails
2. Cliquez sur "Ajouter aux favoris"
3. La recette apparaît maintenant dans votre section Favoris

### Créer une liste de courses
**Méthode 1 : Automatique**
1. Allez dans "Liste de courses"
2. Cliquez sur "Générer la liste"
3. Tous les ingrédients de vos favoris sont ajoutés

**Méthode 2 : Manuelle**
1. Ouvrez les détails d'une recette
2. Cliquez sur "+ liste" à côté des ingrédients souhaités

### Planifier vos repas
1. Allez dans la section "Planning"
2. Ouvrez une recette et cliquez "Ajouter au planning"
3. Sélectionnez le jour et le repas
4. Confirmez l'ajout

**Planning automatique :**
1. Assurez-vous d'avoir des recettes dans vos favoris
2. Cliquez "Générer un planning"
3. Un planning aléatoire est créé basé sur vos favoris

## 👥 Contributeurs

Ce projet a été développé en collaboration par :

- **Oussama** - Développeur Frontend
- **Abdul** - Développeur Frontend & Intégration
- **Otman** - Développeur & Testing

### Branches de développement
- `main` : Branche principale (production)
- `oussama` : Branche de développement d'Oussama
- `Abdul` : Branche de développement d'Abdul
- `otman` : Branche de développement d'Otman

## 📊 Données des recettes

L'application contient **13 recettes variées** incluant :

### Plats principaux
- Poulet rôti aux herbes
- Lasagnes à la bolognaise
- Risotto aux champignons
- Pâtes à la carbonara
- Ratatouille provençale

### Entrées et salades
- Salade de quinoa aux légumes grillés
- Salade César
- Salade niçoise

### Soupes
- Soupe de légumes

### Desserts
- Tiramisu
- Tarte aux pommes
- Muffins aux myrtilles
- Salade de fruits

Chaque recette contient :
- **Nom et image** : Identification visuelle
- **Catégorie** : Type de plat
- **Temps de préparation** : Durée estimée
- **Liste d'ingrédients** : Avec quantités
- **Étapes de préparation** : Instructions détaillées

## 🔧 Fonctionnalités techniques

### Persistance des données
- **LocalStorage** : Sauvegarde automatique des favoris, listes et planning
- **Format JSON** : Données structurées et facilement extensibles

### Performance
- **Chargement optimisé** : Images et données chargées de manière efficace
- **Pagination** : Affichage optimisé pour de grandes collections
- **Recherche en temps réel** : Algorithme de recherche rapide

### Accessibilité
- **Navigation au clavier** : Support complet
- **Sémantique HTML** : Structure accessible
- **Contrastes optimisés** : Lisibilité améliorée

## 🚀 Améliorations futures

### Fonctionnalités prévues
- [ ] **Filtres avancés** : Par catégorie, temps de préparation, difficulté
- [ ] **Notation des recettes** : Système d'évaluation par les utilisateurs
- [ ] **Mode sombre** : Interface adaptée pour la nuit
- [ ] **Export planning** : Téléchargement du planning au format PDF
- [ ] **Suggestions intelligentes** : Recommandations basées sur les préférences
- [ ] **Base de données étendue** : Plus de recettes et catégories
- [ ] **Partage social** : Intégration réseaux sociaux
- [ ] **Version PWA** : Application installable

### Améliorations techniques
- [ ] **Backend API** : Intégration d'une API REST
- [ ] **Base de données** : Migration vers une BDD relationnelle
- [ ] **Authentification** : Comptes utilisateurs personnalisés
- [ ] **Tests automatisés** : Suite de tests unitaires et d'intégration
- [ ] **CI/CD** : Pipeline de déploiement automatisé

## 📄 Licence

Ce projet est sous licence libre. Vous êtes libres de l'utiliser, le modifier et le distribuer selon vos besoins.

---

**HappyMeal** - *Votre compagnon culinaire pour des repas savoureux et bien organisés !* 🍽️✨

*Développé avec ❤️ par l'équipe HappyMeal*
