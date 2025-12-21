// ================================================
// PORTFOLIO.JS - Script principal
// ================================================


    // ================================================
    // FONCTIONS GÉNÉRALES
    // ================================================

        // Année automatique dans le footer, cela change l'année sans modifier le code chaque année
        document.getElementById("year").textContent = new Date().getFullYear();
        
        // Animation au défilement
        document.addEventListener('DOMContentLoaded', function() {
            const fadeElements = document.querySelectorAll('.fade-in');
            
            const fadeInOnScroll = function() {
                fadeElements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    const elementVisible = 150;
                    
                    if (elementTop < window.innerHeight - elementVisible) {
                        element.classList.add('visible');
                    }
                });
            };
            
            // Vérifier au chargement
            fadeInOnScroll();
            
            // Vérifier au défilement
            window.addEventListener('scroll', fadeInOnScroll);
        });
        
        // Navigation fluide
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // ========================================
        // CARTE INTERACTIVE
        // ======================================== 


        // Initialisation de la carte
        var mapParcours = L.map('map-parcours', {
        center: [47.5, 0.5], // Permet de centrer approximativement entre les 4 villes
        zoom: 6,
        zoomControl: true
        });

        // Fond de carte OSM CartoDB Voyager
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(mapParcours);

        // Définition des icônes personnalisées
        let LycéeIcon = L.divIcon({
            html: '<div style="background-color: #3d658fff; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"><span style="color: white; font-size: 16px; font-weight: bold;">🎓</span></div>',
            className: 'custom-div-icon',
            iconSize: [36, 36],
            iconAnchor: [18, 18]
        });

        let universiteIcon = L.divIcon({
            html: '<div style="background-color: #667eea; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"><span style="color: white; font-size: 16px; font-weight: bold;">🎓</span></div>',
            className: 'custom-div-icon',
            iconSize: [36, 36],
            iconAnchor: [18, 18]
        });

        let stageIcon = L.divIcon({
            html: '<div style="background-color: #e2d0e4ff; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"><span style="color: white; font-size: 16px; font-weight: bold;">💼</span></div>',
            className: 'custom-div-icon',
            iconSize: [36, 36],
            iconAnchor: [18, 18]
        });

        let masterIcon = L.divIcon({
            html: '<div style="background-color: #4facfe; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"><span style="color: white; font-size: 16px; font-weight: bold;">🎯</span></div>',
            className: 'custom-div-icon',
            iconSize: [36, 36],
            iconAnchor: [18, 18]
        });

        // Marqueurs avec popups personnalisées


        const LOCATIONS = [
            {
                id: 'deauville',
                name: 'Lycée Andrès Maurois de Deauville',
                type: 'education',
                coords: [49.3570, 0.0737],
                htmlContent: `
                    <div class="popup-title">🎓 Lycée Andrès Maurois de Deauville</div>
                    <div class="popup-content">
                        <strong>Formation :</strong> Collège et Lycée <br>
                        <strong>Période :</strong> 2015-2021<br>
                        <strong>Statut :</strong> Baccalauréat général obtenu avec spécialité Mathématiques et Numériques Sciences Informatiques
                    </div>
                    <a href="#item5" class="popup-link">
                        📖 Voir les détails
                    </a>
                `,
                targetElement: '.item5'
            }];

        // 1. Lycée Andrés Maurois de Deauville
        let deauvilleMarker = L.marker([49.3570, 0.0737], {icon: LycéeIcon}).addTo(mapParcours);
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
        let caenMarker = L.marker([49.1829, -0.3707], {icon: universiteIcon}).addTo(mapParcours);
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
            <a href="https://uniform.unicaen.fr/catalogue/formation/licences/5422-licence-geographie-et-amenagement?s=SEGGAT" target="_blank" class="popup-link">
                🌐 Site de la formation de licence géographie et aménagement du territoire
            </a>
            <a href="https://uniform.unicaen.fr/catalogue/formation/licences-pro/7184-licence-pro-cartographie--topographie-et-systemes-d-info.-geographique-p.-sig--diagnostic-et-amenagement-des-territoires?s=SEGGAT" target="_blank" class="popup-link">
                🌐 Site de la formation de licence professionnelle SIGDAT
            </a>
        `, {
            className: 'custom-popup',
            maxWidth: 300
        });

        // 3. Communauté de Communes Entre Bièvre et Rhône (Beaurepaire)
        let biervreMarker = L.marker([45.3397, 5.0531], {icon: stageIcon}).addTo(mapParcours);
        biervreMarker.bindPopup(`
            <div class="popup-title">💼 Communauté de Communes Entre Bièvre et Rhône</div>
            <div class="popup-content">
                <strong>Stage :</strong> Stage de Licence Professionnelle SIGDAT <br>
                <strong>Période :</strong> 4 mois et 1 semaine - 2025 <br>
                <strong>Mission1 :</strong> Mise en place d'une base de données spatiale du foncier <br>
                <strong>Mission2 :</strong> Réalisation d'un Atlas cartographique des Servitudes d'Utilités Publiques (SUP) pour le PLUi
            </div>
            <a href="#item2" class="popup-link" onclick="document.querySelector('.item2').scrollIntoView({behavior: 'smooth'});">
                🔍 Voir le projet
            </a>
            <a href="https://www.entre-bievreetrhone.fr/" target="_blank" class="popup-link">
                🔍 Voir le site de la Communauté de Communes
            </a>
            <a href="img/memoire_stage_cceber.pdf" target="_blank" class="popup-link" style="margin-left: 8px;">
                    📄 Rapport PDF
            </a>
        `, {
            className: 'custom-popup',
            maxWidth: 300
        });

        // 4. Université Rennes 2
        let rennesMarker = L.marker([48.119, -1.7013], {icon: masterIcon}).addTo(mapParcours);
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



        let map;
        let markers = [];
        let locations = [
            {
                name: "Université Rennes 2",
                type: "education",
                lat: 48.12060,
                lng: -1.70360,
                description: "Master SIGAT -> 2025-2027",
                icon: "education",
                logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/2/23/Logo_univ-rennes2-2016.svg/1180px-Logo_univ-rennes2-2016.svg.png"
            },
        ];

        // NOUVELLES DONNÉES POUR LES CARTES DE LA CARTOTHÈQUE
        const cartothequeLocations = [
            {
                name: "Entre Bièvre et Rhônes",
                type: "map",
                lat: 46.603354,
                lng: 1.888334,
                description: "Mise en place d'une base de données du foncier.",
                icon: "map",
                image: ""
            }
        ];

        // Fusionner les locations existantes avec les nouvelles locations de cartes
        const allLocations = [...locations, ...cartothequeLocations];

        // Initialisation de la carte
        /* function initMap() {
            // Centrer sur la France avec un zoom adapté
            map = L.map('map').setView([46.603354, 1.888334], 6);
            
            // Ajout du fond de carte
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                className: 'map-tiles'
            }).addTo(map);

        

            // Ajout des marqueurs
            allLocations.forEach(location => {
                const customIcon = L.divIcon({
                    className: 'custom-marker',
                    html: `<div style="background-color: ${iconColors[location.icon]}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white;"></div>`,
                    iconSize: [26, 26],
                    iconAnchor: [13, 13]
                });

                const popupContent = location.logo ? 
                    `<div style="color: #333; min-width: 200px;">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <img src="${location.logo}" style="width: 40px; height: 40px; object-fit: contain; background: white; padding: 5px; border-radius: 5px;">
                            <div>
                                <h6 style="margin: 0; color: ${iconColors[location.icon]}">${location.name}</h6>
                                <p style="margin: 0; font-size: 14px;">${location.description}</p>
                            </div>
                        </div>
                        <small style="color: #666;">${location.type === 'education' ? '📚 Études' : location.type === 'internship' ? '💼 Stage' : location.type === 'map' ? '🗺️ Carte' : '🔍 Recherche'}</small>
                    </div>` :
                    `<div style="color: #333;">
                        <h6 style="margin: 0 0 5px 0; color: ${iconColors[location.icon]}">${location.name}</h6>
                        <p style="margin: 0; font-size: 14px;">${location.description}</p>
                        <small style="color: #666;">${location.type === 'education' ? '📚 Études' : location.type === 'internship' ? '💼 Stage' : location.type === 'map' ? '🗺️ Carte' : '🔍 Recherche'}</small>
                        ${location.image ? `<div style="margin-top: 10px;"><img src="${location.image}" style="max-width: 200px; max-height: 150px; border-radius: 5px;"></div>` : ''}
                    </div>`;

                const marker = L.marker([location.lat, location.lng], { icon: customIcon })
                    .addTo(map)
                    .bindPopup(popupContent);

                markers.push({
                    marker: marker,
                    type: location.type,
                    name: location.name
                });
            });

            // Ajuster la carte pour afficher tous les marqueurs
            const group = new L.featureGroup(markers.map(m => m.marker));
            map.fitBounds(group.getBounds().pad(0.1));


            // Ajouter des événements de clic aux éléments de la liste
            document.querySelectorAll('.location-item').forEach(item => {
                item.addEventListener('click', function() {
                    const locationName = this.querySelector('h6').textContent;
                    // Trouver le marqueur correspondant
                    const marker = markers.find(m => m.name === locationName);
                    if (marker) {
                        map.setView(marker.marker.getLatLng(), 10);
                        marker.marker.openPopup();
                    }
                });
            });
        }

        // ---------------------------------------------
        // Initialiser la carte une fois le DOM chargé
        // ---------------------------------------------

        document.addEventListener('DOMContentLoaded', initMap);*/

        // Gestion de la cartothèque
        document.addEventListener('DOMContentLoaded', function() {
            const slider = document.getElementById('cartothequeSlider');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const indicatorsContainer = document.getElementById('cartothequeIndicators');
            const images = document.querySelectorAll('.cartotheque-image');
            
            let currentSlide = 0;
            const totalSlides = document.querySelectorAll('.cartotheque-slide').length;
            
            // Créer les indicateurs dynamiquement
            for (let i = 0; i < totalSlides; i++) {
                const indicator = document.createElement('div');
                indicator.className = 'cartotheque-indicator';
                indicator.setAttribute('data-index', i);
                if (i === 0) indicator.classList.add('active');
                indicatorsContainer.appendChild(indicator);
            }
            
            const indicators = document.querySelectorAll('.cartotheque-indicator');
            
            // -----------------------------------------------------
            // Créer le modal pour l'affichage en plein écran
            // -----------------------------------------------------
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <button class="close-modal">&times;</button>
                <img class="modal-content" src="" alt="">
            `;
            document.body.appendChild(modal);
            
            const modalImg = modal.querySelector('.modal-content');
            const closeModal = modal.querySelector('.close-modal');
            
            // Fonction pour ouvrir l'image en plein écran
            function openModal(imgSrc, imgAlt) {
                modalImg.src = imgSrc; // Met à jour la source de l'image dans le modal
                modalImg.alt = imgAlt; // Met à jour le texte alternatif
                modal.classList.add('active'); // Affiche le modal
                document.body.style.overflow = 'hidden'; // Empêche le défilement de la page derrière le modal
            }
            
            // Fonction pour fermer le modal
            function closeModalFunc() { // Renomme la fonction pour éviter le conflit avec la variable
                modal.classList.remove('active'); // Cache le modal
                document.body.style.overflow = ''; // Restaure le défilement de la page
            }
            
            // Événements pour les images
            images.forEach(img => { // Ajoute un écouteur d'événement à chaque image
                img.addEventListener('click', function() { // Lorsqu'une image est cliquée
                    openModal(this.src, this.alt); // Ouvre le modal avec la source et le texte alternatif de l'image cliquée
                });
            });
            
            // Événements pour fermer le modal
            closeModal.addEventListener('click', closeModalFunc);
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModalFunc();
                }
            });
            
            // Fermer avec la touche Échap
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    closeModalFunc();
                }
            });
            
            // Fonction pour mettre à jour l'affichage
            function updateSlider() {
                slider.style.transform = `translateX(-${currentSlide * 100}%)`;
                
                // Mettre à jour les indicateurs
                indicators.forEach((indicator, index) => {
                    if (index === currentSlide) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
                
                // Désactiver les boutons si nécessaire
                prevBtn.disabled = currentSlide === 0;
                nextBtn.disabled = currentSlide === totalSlides - 1;
            }
            
            // Événements pour les boutons de navigation
            prevBtn.addEventListener('click', function() {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSlider();
                }
            });
            
            nextBtn.addEventListener('click', function() {
                if (currentSlide < totalSlides - 1) {
                    currentSlide++;
                    updateSlider();
                }
            });
            
            // Événements pour les indicateurs
            indicators.forEach(indicator => {
                indicator.addEventListener('click', function() {
                    currentSlide = parseInt(this.getAttribute('data-index'));
                    updateSlider();
                });
            });
            
            // Initialisation
            updateSlider();
        });


        // ================================================
        // SYSTÈME DE FILTRAGE DYNAMIQUE PAR BADGES
        // ================================================

        document.addEventListener('DOMContentLoaded', function() {
            initBadgeFilterSystem();
        });

        function initBadgeFilterSystem() {
            // Éléments DOM
            const projectsContainer = document.getElementById('projects-container');
            const badgeFiltersContainer = document.getElementById('badge-filters');
            const resetButton = document.getElementById('reset-filters');
            const resetButton2 = document.getElementById('reset-filters-btn');
            const filterModeToggle = document.getElementById('filter-mode');
            const projectCountSpan = document.getElementById('project-count');
            const noProjectsMessage = document.getElementById('no-projects-message');
            const filterInfo = document.getElementById('filter-info');
            
            // État du filtre
            let activeBadges = new Set(); // Set pour éviter les doublons
            let filterMode = 'OR'; // 'OR' = au moins un badge, 'AND' = tous les badges
            
            // Étape 1: Récupérer tous les badges uniques des projets
            function extractUniqueBadges() {
                const badgeSet = new Set();
                const projectCards = document.querySelectorAll('.project-card');
                
                projectCards.forEach(card => {
                    // Récupère les badges depuis l'attribut data-badges
                    const badges = card.getAttribute('data-badges');
                    if (badges) {
                        badges.split(' ').forEach(badge => {
                            if (badge.trim()) {
                                badgeSet.add(badge.trim());
                            }
                        });
                    }
                    
                    // Récupère aussi les badges depuis les spans dans le projet
                    const badgeSpans = card.querySelectorAll('[data-badges]');
                    badgeSpans.forEach(span => {
                        const badgeValue = span.getAttribute('data-badges');
                        if (badgeValue) {
                            badgeSet.add(badgeValue);
                        }
                    });
                });
                
                return Array.from(badgeSet).sort(); // Convertir en tableau et trier
            }
            
            // Étape 2: Compter combien de projets ont chaque badge
            function countProjectsPerBadge(badge) {
                let count = 0;
                const projectCards = document.querySelectorAll('.project-card');
                
                projectCards.forEach(card => {
                    const badges = card.getAttribute('data-badges');
                    if (badges && badges.includes(badge)) {
                        count++;
                    }
                });
                
                return count;
            }
            
            // Étape 3: Générer les badges de filtre
            function generateFilterBadges() {
                const uniqueBadges = extractUniqueBadges();
                
                if (uniqueBadges.length === 0) {
                    badgeFiltersContainer.innerHTML = 
                        '<div class="text-muted">Aucun badge trouvé dans les projets</div>';
                    return;
                }
                
                badgeFiltersContainer.innerHTML = '';
                
                uniqueBadges.forEach(badge => {
                    const projectCount = countProjectsPerBadge(badge);
                    
                    // Créer l'élément badge
                    const badgeElement = document.createElement('div');
                    badgeElement.className = 'filter-badge';
                    badgeElement.setAttribute('data-badge', badge);
                    
                    // Afficher le badge avec son compteur
                    badgeElement.innerHTML = `
                        <span>${badge.toUpperCase()}</span>
                        <span class="badge-count">${projectCount}</span>
                    `;
                    
                    // Ajouter l'événement de clic
                    badgeElement.addEventListener('click', function() {
                        toggleBadgeFilter(badge);
                    });
                    
                    badgeFiltersContainer.appendChild(badgeElement);
                });
            }
            
            // Étape 4: Basculer un badge dans les filtres actifs
            function toggleBadgeFilter(badge) {
                if (activeBadges.has(badge)) {
                    activeBadges.delete(badge);
                } else {
                    activeBadges.add(badge);
                }
                
                updateFilterUI();
                filterProjects();
            }
            
            // Étape 5: Mettre à jour l'interface des filtres
            function updateFilterUI() {
                // Mettre à jour l'apparence des badges de filtre
                document.querySelectorAll('.filter-badge').forEach(badgeElement => {
                    const badgeValue = badgeElement.getAttribute('data-badge');
                    if (activeBadges.has(badgeValue)) {
                        badgeElement.classList.add('active');
                    } else {
                        badgeElement.classList.remove('active');
                    }
                });
                
                // Mettre à jour les informations du filtre
                if (activeBadges.size > 0) {
                    const badgesArray = Array.from(activeBadges);
                    const badgeNames = badgesArray.map(b => b.toUpperCase()).join(', ');
                    filterInfo.innerHTML = `
                        <span id="project-count">0</span> projet(s) avec: ${badgeNames}
                    `;
                } else {
                    filterInfo.innerHTML = `
                        <span id="project-count">${document.querySelectorAll('.project-card').length}</span> projet(s) au total
                    `;
                }
            }
            
            // Étape 6: Filtrer les projets
            function filterProjects() {
                const projectCards = document.querySelectorAll('.project-card');
                let visibleCount = 0;
                
                // Si aucun filtre actif, tout afficher
                if (activeBadges.size === 0) {
                    projectCards.forEach(card => {
                        card.classList.remove('hidden');
                        card.classList.add('visible');
                        visibleCount++;
                    });
                    noProjectsMessage.classList.add('d-none');
                } else {
                    // Appliquer le filtre
                    const activeBadgesArray = Array.from(activeBadges);
                    
                    projectCards.forEach(card => {
                        const cardBadges = card.getAttribute('data-badges');
                        if (!cardBadges) {
                            card.classList.add('hidden');
                            card.classList.remove('visible');
                            return;
                        }
                        
                        const cardBadgesArray = cardBadges.split(' ');
                        let shouldShow = false;
                        
                        if (filterMode === 'AND') {
                            // Mode AND: le projet doit avoir TOUS les badges actifs
                            shouldShow = activeBadgesArray.every(badge => 
                                cardBadgesArray.includes(badge)
                            );
                        } else {
                            // Mode OR (par défaut): le projet doit avoir AU MOINS UN des badges actifs
                            shouldShow = activeBadgesArray.some(badge => 
                                cardBadgesArray.includes(badge)
                            );
                        }
                        
                        if (shouldShow) {
                            card.classList.remove('hidden');
                            card.classList.add('visible');
                            visibleCount++;
                        } else {
                            card.classList.add('hidden');
                            card.classList.remove('visible');
                        }
                    });
                    
                    // Afficher/masquer le message "aucun projet"
                    if (visibleCount === 0) {
                        noProjectsMessage.classList.remove('d-none');
                    } else {
                        noProjectsMessage.classList.add('d-none');
                    }
                }
                
                // Mettre à jour le compteur
                projectCountSpan.textContent = visibleCount;
                
                // Animation
                animateProjects();
            }
            
            // Étape 7: Animation des projets
            function animateProjects() {
                const visibleProjects = document.querySelectorAll('.project-card:not(.hidden)');
                
                visibleProjects.forEach((project, index) => {
                    project.style.transitionDelay = `${index * 0.05}s`;
                });
                
                projectsContainer.style.opacity = '0.8';
                setTimeout(() => {
                    projectsContainer.style.opacity = '1';
                }, 300);
            }
            
            // Étape 8: Réinitialiser les filtres
            function resetFilters() {
                activeBadges.clear();
                updateFilterUI();
                filterProjects();
                
                // Désactiver le mode AND si nécessaire
                if (filterModeToggle) {
                    filterModeToggle.checked = false;
                    filterMode = 'OR';
                }
            }
            
            // Étape 9: Changer le mode de filtre
            function toggleFilterMode() {
                filterMode = filterModeToggle.checked ? 'AND' : 'OR';
                filterProjects();
            }
            
            // Étape 10: Initialisation
            function init() {
                // Générer les badges de filtre
                generateFilterBadges();
                
                // Événements
                if (resetButton) {
                    resetButton.addEventListener('click', resetFilters);
                }
                if (resetButton2) {
                    resetButton2.addEventListener('click', resetFilters);
                }
                if (filterModeToggle) {
                    filterModeToggle.addEventListener('change', toggleFilterMode);
                }
                
                // Mettre à jour l'UI initiale
                updateFilterUI();
                
                // Ajouter un événement pour détecter les nouveaux projets (si ajoutés dynamiquement)
                const observer = new MutationObserver(function() {
                    generateFilterBadges();
                    updateFilterUI();
                });
                
                observer.observe(projectsContainer, {
                    childList: true,
                    subtree: true
                });
            }
            
            // Démarrer le système
            init();
        }

        // Fonction utilitaire pour ajouter des données de badge à un projet
        function addBadgeToProject(projectElement, badge) {
            // Ajouter le badge à l'attribut data-badges
            const currentBadges = projectElement.getAttribute('data-badges') || '';
            const badgesArray = currentBadges ? currentBadges.split(' ') : [];
            
            if (!badgesArray.includes(badge)) {
                badgesArray.push(badge);
                projectElement.setAttribute('data-badges', badgesArray.join(' '));
            }
        }