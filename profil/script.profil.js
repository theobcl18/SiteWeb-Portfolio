// ========================================
// SCRIPT POUR LA CARTE INTERACTIVE
// ======================================== 

// Initialisation de la carte
var mapParcours = L.map('map-parcours', {
    center: [47.5, 0.5], // Centre approximatif entre les 3 villes
    zoom: 6,
    zoomControl: true
});

// Fond de carte - style moderne et élégant
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(mapParcours);

// Définition des icônes personnalisées
var LycéeIcon = L.divIcon({
    html: '<div style="background-color: #3d658fff; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"><span style="color: white; font-size: 16px; font-weight: bold;">🎓</span></div>',
    className: 'custom-div-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 18]
});

var universiteIcon = L.divIcon({
    html: '<div style="background-color: #667eea; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"><span style="color: white; font-size: 16px; font-weight: bold;">🎓</span></div>',
    className: 'custom-div-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 18]
});

var stageIcon = L.divIcon({
    html: '<div style="background-color: #e2d0e4ff; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"><span style="color: white; font-size: 16px; font-weight: bold;">💼</span></div>',
    className: 'custom-div-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 18]
});

var masterIcon = L.divIcon({
    html: '<div style="background-color: #4facfe; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"><span style="color: white; font-size: 16px; font-weight: bold;">🎯</span></div>',
    className: 'custom-div-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 18]
});

// Marqueurs avec popups personnalisées

// 1. Lycée Andrés Maurois de Deauville
var deauvilleMarker = L.marker([49.3570, 0.0737], {icon: LycéeIcon}).addTo(mapParcours);
deauvilleMarker.bindPopup(`
    <div class="popup-title">🎓 Lycée Andrès Maurois de Deauville</div>
    <div class="popup-content">
        <strong>Formation :</strong> Collège et Lycée <br>
        <strong>Période :</strong> 2015-2021<br>
        <strong>Statut :</strong> Baccalauréat général obtenu avec spécialité Mathématiques et Numériques Sciences Informatiques
    </div>
    <a href="#item5" class="popup-link" onclick="document.querySelector('.item5').scrollIntoView({behavior: 'smooth'});">
        📖 Voir les détails
    </a>
`, {
    className: 'custom-popup',
    maxWidth: 300
});

// 2. Université de Caen
var caenMarker = L.marker([49.1829, -0.3707], {icon: universiteIcon}).addTo(mapParcours);
caenMarker.bindPopup(`
    <div class="popup-title">🎓 Université de Caen Normandie</div>
    <div class="popup-content">
        <strong>Formation :</strong> 2 année de licence de Géographie et Aménagement du Territoire puis la licence professionnelle Systèmes d'Information Géographique et Diagnostic d'Aménagement du Territoire (SIGDAT) <br>
        <strong>Période :</strong> 2021-2024<br>
        <strong>Statut :</strong> Licence 2 obtenue
    </div>
    <a href="#item4" class="popup-link" onclick="document.querySelector('.item4').scrollIntoView({behavior: 'smooth'});">
        📖 Voir les détails
    </a>
`, {
    className: 'custom-popup',
    maxWidth: 300
});

// 3. Communauté de Communes Entre Bièvre et Rhône (Beaurepaire)
var biervreMarker = L.marker([45.3397, 5.0531], {icon: stageIcon}).addTo(mapParcours);
biervreMarker.bindPopup(`
    <div class="popup-title">💼 Communauté de Communes Entre Bièvre et Rhône</div>
    <div class="popup-content">
        <strong>Stage :</strong> Stage de Licence Professionnelle SIGDAT <br>
        <strong>Période :</strong> 4 mois et 1 semaine - 2025 <br>
        <strong>Mission1 :</strong> Mise en place d'une base de données spatiale du foncier <br>
        <strong>Mission2 :</strong> Réalisation d'un Atlas cartographique des Servitudes d'Utilités Publiques (SUP) pour le PLUi
    </div>
    <a href="#item2" class="popup-link" onclick="document.querySelector('.item2').scrollIntoView({behavior: 'smooth'});">
        🔍 Voir l'expérience
    </a>
    <a href="https://www.entre-bievreetrhone.fr/" target="_blank" class="popup-link">
        🔍 Voir le site de la Communauté de Communes
    </a>
    <a href="chemin/vers/votre/rapport-stage.pdf" target="_blank" class="popup-link" style="margin-left: 8px;">
            📄 Rapport PDF
    </a>
`, {
    className: 'custom-popup',
    maxWidth: 300
});

// 4. Université Rennes 2
var rennesMarker = L.marker([48.119, -1.7013], {icon: masterIcon}).addTo(mapParcours);
rennesMarker.bindPopup(`
    <div class="popup-title">🎯 Université Rennes 2</div>
    <div class="popup-content">
        <strong>Formation :</strong> Master Géomatique SIGAT <br>
        <strong>Période :</strong> En cours<br>
        <strong>Spécialisation :</strong> Systèmes d'Information Géographique et Analyse des Territoires
    </div>
    <a href="#item1" class="popup-link" onclick="document.querySelector('.item1').scrollIntoView({behavior: 'smooth'});">
        🔍 Voir l'expérience
    </a>
    <a href="https://formations.univ-rennes2.fr/fr/formations/master-37/master-mention-geomatique-parcours-systeme-d-information-geographique-et-analyse-des-territoires-sigat-JEOC8L9A.html" target="_blank" class="popup-link">
        🌐 Site de l'université
    </a>
`, {
    className: 'custom-popup',
    maxWidth: 300
});

// Animation simple et stable des marqueurs
function addMarkerAnimation(marker) {
    // Animation légère au survol sans déplacement
    marker.on('mouseover', function(e) {
        var icon = this.getElement();
        if (icon) {
            icon.style.filter = 'brightness(1.2)';
            icon.style.transition = 'filter 0.2s ease';
        }
    });
    
    marker.on('mouseout', function(e) {
        var icon = this.getElement();
        if (icon) {
            icon.style.filter = 'brightness(1)';
        }
    });
}

// Appliquer l'animation à tous les marqueurs
addMarkerAnimation(deauvilleMarker);
addMarkerAnimation(caenMarker);
addMarkerAnimation(biervreMarker);
addMarkerAnimation(rennesMarker);




// --------------Contrôle de zoom personnalisé---------------
mapParcours.zoomControl.setPosition('topright');

// ------------Attribution personnalisée-----------
mapParcours.attributionControl.addAttribution('© Portfolio Théo Bucaille - Master SIGAT');