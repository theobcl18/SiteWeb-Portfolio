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
                const targetId = this.getAttribute('href');
                if (targetId === '#' || !targetId.startsWith('#')) return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

// ========================================================================================
// ============================== SCROLLSPY NAVBAR =========================================

(function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    function setActiveLink() {
        const navbarHeight = document.getElementById('mainNav').offsetHeight + 40;
        let currentSection = sections[0];

        sections.forEach(section => {
            if (section.getBoundingClientRect().top - navbarHeight <= 0) {
                currentSection = section;
            }
        });

        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === '#' + currentSection.id;
            link.classList.toggle('active', isActive);
        });
    }

    window.addEventListener('scroll', setActiveLink);
    window.addEventListener('load', setActiveLink);
})();


// ========================================================================================
// ============================== CARTE INTERACTIVE =======================================


            (function() {
        // --------------------------------------------------------------
        // 1. Définition des points (ordre personnalisé + coordonnées exactes)
        // --------------------------------------------------------------
        const timelinePoints = [
            // 1. Stage Concept Intérieur (Deauville)
            {
                type: "internship",
                title: "Concept Intérieur",
                sub: "Stage d'observation",
                dateStart: 2023,
                dateEnd: 2023,
                lat: 49.360291269760594,
                lng: 0.07867651318912605,
                popupHtml: `
                    <div class="popup-title">💼 Concept Intérieur</div>
                    <div class="popup-content">
                        <strong>Stage :</strong> Stage d'observation<br>
                        <strong>Période :</strong> 2023<br>
                        <strong>Lieu :</strong> Deauville<br>
                        <strong>Mission :</strong> Découverte du milieu professionnel
                    </div>
                `
            },
            // 2. Lycée André Maurois (Deauville)
            {
                type: "education",
                title: "Lycée André Maurois",
                sub: "Bac général",
                dateStart: 2018,
                dateEnd: 2021,
                lat: 49.363811788276855,
                lng: 0.07463947629130771,
                popupHtml: `
                    <div class="popup-title">🎓 Lycée Andrès Maurois de Deauville</div>
                    <div class="popup-content">
                        <strong>Formation :</strong> Collège et Lycée <br>
                        <strong>Période :</strong> 2015-2021<br>
                        <strong>Statut :</strong> Baccalauréat général obtenu avec spécialité Mathématiques et Numériques Sciences Informatiques
                    </div>
                    <a href="#item5" class="popup-link" onclick="document.querySelector('.item5').scrollIntoView({behavior: 'smooth'});">
                        📖 Voir les détails
                    </a>
                `
            },
            // 3. Licence générale (Université de Caen)
            {
                type: "education",
                title: "Université de Caen",
                sub: "Licence Géographie",
                dateStart: 2021,
                dateEnd: 2024,
                lat: 49.18993756187686,
                lng: -0.36364486657495393,
                popupHtml: `
                    <div class="popup-title">🎓 Université de Caen Normandie</div>
                    <div class="popup-content">
                        <strong>Formation :</strong> 2 années de licence de Géographie et Aménagement du Territoire puis la licence professionnelle Systèmes d'Information Géographique et Diagnostic d'Aménagement du Territoire (SIGDAT)<br>
                        <strong>Période :</strong> 2021-2025<br>
                        <strong>Statut :</strong> Licence 2 obtenue & Licence professionnelle obtenue avec mention Bien
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
                `
            },
            // 4. Licence professionnelle SIGDAT (même lieu, partage la même popup que le point 2)
            {
                type: "education",
                title: "Université de Caen",
                sub: "Licence pro SIGDAT",
                dateStart: 2024,
                dateEnd: 2025,
                lat: 49.18993756187686,
                lng: -0.36364486657495393,
                popupHtml: null,
                sharedWith: 2   // index du point 2 (licence générale)
            },
            // 5. Stage Entre Bièvre et Rhônes
            {
                type: "internship",
                title: "Entre Bièvre et Rhônes",
                sub: "Stage – BDD foncier",
                dateStart: 2025,
                dateEnd: 2025,
                lat: 45.39795080987009,
                lng: 4.778148157545114,
                popupHtml: `
                    <div class="popup-title">💼 Communauté de Communes Entre Bièvre et Rhône</div>
                    <div class="popup-content">
                        <strong>Stage :</strong> Stage de Licence Professionnelle SIGDAT <br>
                        <strong>Période :</strong> 4 mois et 1 semaine - 2025 <br>
                        <strong>Mission1 :</strong> Mise en place d'une base de données spatiale du foncier <br>
                        <strong>Mission2 :</strong> Réalisation d'un Atlas cartographique des Servitudes d'Utilités Publiques (SUP) pour le PLUi
                    </div>
                    <a href="./projects_list/Projet-stage-base-de-données-foncières.html" class="popup-link" target="_blank">
                        🔍 Voir le projet
                    </a>
                    <a href="https://www.entre-bievreetrhone.fr/" target="_blank" class="popup-link">
                        🔍 Voir le site de la Communauté de Communes
                    </a>
                `
            },
            // 6. Master SIGAT (Université Rennes 2)
            {
                type: "education",
                title: "Université Rennes 2",
                sub: "Master SIGAT",
                dateStart: 2025,
                dateEnd: 2027,
                lat: 48.11858739719634,
                lng: -1.702628259333512,
                popupHtml: `
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
                `
            },
            // 7. Stage Veolia Eau (Rennes)
            {
                type: "internship",
                title: "Veolia Eau",
                sub: "Stage – Réseaux AEP & ASS",
                dateStart: 2026,
                dateEnd: 2026,
                lat: 48.11581211439854,
                lng: -1.7102306453338298,
                popupHtml: `
                    <div class="popup-title">💼 Veolia Eau – Rennes</div>
                    <div class="popup-content">
                        <strong>Stage :</strong> Intégration, gestion et automatisation de données réseaux d’eau potable et d’assainissement<br>
                        <strong>Période :</strong> 3 mois - 2026 <br>
                        <strong>Mission1 :</strong> Intégration de branchements neufs (Mapping FME et correctif topologique) <br>
                        <strong>Mission2 :</strong> FME : Import de plans de récolement de Nantes Métropole au format compatible avec la BDD PostGIS de Veolia <br>
                        <strong>Mission3 :</strong> SQL (DBeaver) : Mise en place de vues pour export suivant le CTTP du client <br>
                        <strong>Mission4 :</strong> Model Builder QGIS / FME / SQL : Mise à jour des zones découpant le réseau d'AEP et d'ASS pour permettre aux cartographes mettre à jour de manière autonome et régulière leur périmètre. (Étage de sectorisation, de pression et bassin de collecte)
                    </div>
                `
            }
        ];

        // --------------------------------------------------------------
        // 2. Initialisation de la carte
        // --------------------------------------------------------------
        var mapTimeline = L.map('timeline-map').setView([46.5, 2.5], 5.8);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CartoDB',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(mapTimeline);

        // --------------------------------------------------------------
        // 3. Définition des icônes (celles que tu as fournies)
        // --------------------------------------------------------------
        var educationIcon = L.divIcon({
            html: '<i class="fas fa-graduation-cap" style="font-size: 18px; color: #488ed4; text-shadow: 0 0 4px black;"></i>',
            iconSize: [24, 24],
            className: 'custom-marker-icon'
        });
        var internshipIcon = L.divIcon({
            html: '<i class="fas fa-briefcase" style="font-size: 18px; color: #fe9b38; text-shadow: 0 0 4px black;"></i>',
            iconSize: [24, 24],
            className: 'custom-marker-icon'
        });

        // --------------------------------------------------------------
        // 4. Création des marqueurs (partage de la popup pour les deux licences)
        // --------------------------------------------------------------
        var markers = [];
        var markerMap = new Map(); // associe l'index du point au marqueur

        timelinePoints.forEach((point, idx) => {
            // Si ce point partage la popup d'un précédent, on ne crée pas de nouveau marqueur
            if (point.sharedWith !== undefined && point.sharedWith !== null) {
                markerMap.set(idx, markerMap.get(point.sharedWith));
                return;
            }

            // Choix de l'icône selon le type
            const icon = (point.type === 'education') ? educationIcon : internshipIcon;

            var marker = L.marker([point.lat, point.lng], { icon: icon }).addTo(mapTimeline);
            if (point.popupHtml) {
                marker.bindPopup(point.popupHtml, {
                    className: 'custom-popup',
                    maxWidth: 300
                });
            }
            markers.push(marker);
            markerMap.set(idx, marker);
        });

        // --------------------------------------------------------------
        // 5. Génération de la frise chronologique (couleurs bleu/orange)
        // --------------------------------------------------------------
        const timelineContainer = document.querySelector('#timeline-bar .timeline-scroll');
        if (timelineContainer) {
            timelineContainer.innerHTML = '';
            timelinePoints.forEach((point, idx) => {
                const yearSpan = point.dateStart === point.dateEnd ? point.dateStart : `${point.dateStart} - ${point.dateEnd}`;
                const div = document.createElement('div');
                div.className = `timeline-item ${point.type}`;
                div.innerHTML = `
                    <div class="timeline-year">${yearSpan}</div>
                    <div class="timeline-title">${point.title}</div>
                    <div class="timeline-sub">${point.sub}</div>
                `;
                div.addEventListener('click', () => {
                    const targetMarker = markerMap.get(idx);
                    if (targetMarker) {
                        // Calcul du centre décalé pour que le point soit en bas de la carte
                        const zoom = 12;
                        const pointPixel = mapTimeline.project([point.lat, point.lng], zoom);
                        const mapHeight = mapTimeline.getSize().y;
                        // Décaler de 40% de la hauteur vers le haut => point à 40% du bas
                        const newPixel = L.point(pointPixel.x, pointPixel.y + mapHeight * -0.4);
                        const newCenter = mapTimeline.unproject(newPixel, zoom);
                        
                        mapTimeline.flyTo(newCenter, zoom, { duration: 1.2 }); // Animation fluide
                        targetMarker.openPopup();
                    }
                });
                timelineContainer.appendChild(div);
            });
        }

        // --------------------------------------------------------------
        // 6. Ajuster la vue pour voir tous les marqueurs uniques
        // --------------------------------------------------------------
        var uniqueMarkers = [...new Set(markerMap.values())];
        var group = L.featureGroup(uniqueMarkers);
        mapTimeline.fitBounds(group.getBounds().pad(0.2));
    })();



// =========================================================================================================
// ============================================ CARTOTHEQUE ================================================

        (function () {
            const filterBtns = document.querySelectorAll('[data-carto-filter]');
            const items      = document.querySelectorAll('.carto-item');
            let activeFilter = 'all';

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    activeFilter = btn.dataset.cartoFilter;
                    items.forEach(item => {
                        const tags = (item.dataset.tags || '').split(' ');
                        const show = activeFilter === 'all' || tags.includes(activeFilter);
                        item.classList.toggle('hidden', !show);
                    });
                });
            });

            // Lightbox
            const lightbox  = document.getElementById('cartoLightbox');
            const lbImg     = document.getElementById('lbImg');
            const lbTitle   = document.getElementById('lbTitle');
            const lbDesc    = document.getElementById('lbDesc');
            const lbLink    = document.getElementById('lbLink');
            const lbClose   = document.getElementById('lbClose');
            const lbPrev    = document.getElementById('lbPrev');
            const lbNext    = document.getElementById('lbNext');
            const lbCounter = document.getElementById('lbCounter');
            let currentIdx  = 0;

            function visibleItems() {
                return [...items].filter(i => !i.classList.contains('hidden'));
            }

            function openLightbox(idx) {
                const vis = visibleItems();
                if (!vis[idx]) return;
                currentIdx = idx;
                const item = vis[idx];
                lbImg.src   = item.querySelector('img').src;
                lbImg.alt   = item.dataset.title;
                lbTitle.textContent = item.dataset.title;
                lbDesc.textContent  = item.dataset.desc;
                const href = item.dataset.href;
                lbLink.style.display = href ? 'inline-block' : 'none';
                if (href) lbLink.href = href;
                lbCounter.textContent = `${idx + 1} / ${vis.length}`;
                lightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            }

            function closeLightbox() {
                lightbox.classList.remove('open');
                document.body.style.overflow = '';
            }

            items.forEach(item => {
                item.addEventListener('click', () => {
                    const vis = visibleItems();
                    const idx = vis.indexOf(item);
                    if (idx !== -1) openLightbox(idx);
                });
            });

            lbClose.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
            lbPrev.addEventListener('click', () => { const v = visibleItems(); openLightbox((currentIdx - 1 + v.length) % v.length); });
            lbNext.addEventListener('click', () => { const v = visibleItems(); openLightbox((currentIdx + 1) % v.length); });
            document.addEventListener('keydown', e => {
                if (!lightbox.classList.contains('open')) return;
                if (e.key === 'Escape')     closeLightbox();
                if (e.key === 'ArrowLeft')  lbPrev.click();
                if (e.key === 'ArrowRight') lbNext.click();
            });
        })();


// ===================================================================================
// ==================== SYSTÈME DE FILTRAGE DYNAMIQUE PAR BADGES =======================

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