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

// ===================================================================================
// ==================== CARTOTHEQUE ==================================================

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
// ====================SYSTÈME DE FILTRAGE DYNAMIQUE PAR BADGES=======================

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