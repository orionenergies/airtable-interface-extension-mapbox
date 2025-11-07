# User Stories - Cartographie Orion Énergies

**Date d'analyse :** Janvier 2025  
**Nombre de tickets analysés :** 13  
**Nombre de User Stories :** 15

---

## 📍 GROUPE A : Visualisation & Suivi du Portefeuille

### **US-A1 : Affichage cartographique des projets**

> **En tant que** Chargé de Travaux / Développeur  
> **Je veux** visualiser tous mes projets sur une carte interactive avec marqueurs cliquables  
> **Afin de** comprendre leur répartition géographique et organiser mes déplacements

**Critères d'acceptation**
- [ ] Affichage de tous les projets (dev, construction, exploitation) sous forme de marqueurs géolocalisés
- [ ] Clic sur un marqueur ouvre une popup avec : nom projet, puissance, ville, statut
- [ ] Chargement < 3 secondes pour 500+ projets
- [ ] Responsive : fonctionne sur mobile (navigation terrain)
- [ ] Synchronisation automatique avec base Airtable (temps réel)

**Tickets associés :** #2, #7, #8, #11

---

### **US-A2 : Filtrage dynamique multi-critères**

> **En tant que** Manager Travaux / Dev Manager  
> **Je veux** filtrer les projets affichés selon plusieurs critères (statut, équipe, chargé de travaux, type)  
> **Afin de** analyser la répartition de charge et identifier les déséquilibres géographiques

**Critères d'acceptation**
- [ ] Filtres disponibles : statut projet, équipe, chargé de travaux/développeur, type projet (sol/toiture/mini-sol), département
- [ ] Filtres combinables (ET logique)
- [ ] Compteur en temps réel du nombre de projets affichés
- [ ] Sauvegarde des filtres favoris par utilisateur
- [ ] Réinitialisation rapide des filtres

**Tickets associés :** #2, #7, #8, #11

---

### **US-A3 : Vue comparative équipes/régions**

> **En tant que** Membre de la Direction  
> **Je veux** visualiser la densité géographique de nos projets par région et par équipe  
> **Afin de** piloter notre stratégie d'implantation territoriale

**Critères d'acceptation**
- [ ] Mode "heatmap" affichant la densité de projets par zone
- [ ] KPIs affichés : nombre de projets par région, puissance cumulée, répartition par statut
- [ ] Comparaison visuelle entre équipes (couleurs distinctes)
- [ ] Export PNG/PDF de la vue pour présentations
- [ ] Vue "plein écran" pour réunions

**Tickets associés :** #2, #7, #8, #11

---

## 🚗 GROUPE B : Optimisation des Déplacements & Tournées

### **US-B1 : Identification des interventions à proximité**

> **En tant qu'** Exploitant  
> **Je veux** voir tous les événements ouverts dans un rayon paramétrable autour d'un site d'intervention planifiée  
> **Afin de** grouper plusieurs interventions et réduire les coûts de déplacement

**Critères d'acceptation**
- [ ] Sélection d'un site d'intervention sur la carte
- [ ] Paramétrage du rayon de recherche (5, 10, 20, 50 km)
- [ ] Affichage des événements ouverts dans ce rayon avec marqueurs colorés selon urgence
- [ ] Liste détaillée sous la carte : centrale, type événement, niveau urgence, date ouverture
- [ ] Filtres applicables : type événement, niveau urgence
- [ ] Export liste au format CSV pour envoi prestataire

**Tickets associés :** #1 (idée 2), #4

---

### **US-B2 : Alertes automatiques de mutualisation**

> **En tant qu'** Exploitant  
> **Je veux** recevoir une alerte email automatique lorsque 2+ interventions sont planifiées à proximité (< 20km, < 3 jours)  
> **Afin de** ne manquer aucune opportunité de groupement

**Critères d'acceptation**
- [ ] Détection automatique quotidienne des opportunités de groupement
- [ ] Critères paramétrables : distance max (km), écart temporel max (jours)
- [ ] Email à exploitation@orion avec liste des interventions concernées
- [ ] Lien direct vers vue cartographique centrée sur la zone
- [ ] Historique des alertes consultable

**Tickets associés :** #1 (idée 6)

---

### **US-B3 : Planification tournées maintenance préventive**

> **En tant qu'** Exploitant  
> **Je veux** organiser automatiquement les tournées de MP annuelles en groupant les sites proches et en les attribuant aux mainteneurs à proximité  
> **Afin de** optimiser les coûts et le planning des MP

**Critères d'acceptation**
- [ ] Sélection des centrales nécessitant une MP (multi-sélection ou filtre)
- [ ] Paramétrage : trimestre cible, liste mainteneurs disponibles
- [ ] Algorithme de clustering : groupes de centrales à < 30 km
- [ ] Attribution automatique aux mainteneurs les plus proches
- [ ] Visualisation des groupes sur la carte avec codes couleur par mainteneur
- [ ] Export planning par mainteneur (PDF ou Excel)
- [ ] Ajustement manuel possible (drag & drop)

**Tickets associés :** #1 (idée 5)

---

### **US-B4 : Optimisation déplacements commerciaux/travaux**

> **En tant que** Développeur / Chargé de Travaux  
> **Je veux** identifier les tâches annexes à réaliser à proximité d'un déplacement planifié (Snapactes, RDV proprio, prospects)  
> **Afin de** rentabiliser chaque déplacement terrain

**Critères d'acceptation**
- [ ] Sélection d'un déplacement (point sur carte ou projet)
- [ ] Affichage superposé : projets nécessitant Snapacte, RDV à planifier, prospects/leads à visiter
- [ ] Filtres par type de tâche et rayon de recherche
- [ ] Création de checklist pré-déplacement (tâches sélectionnées)
- [ ] Intégration avec tâches Airtable (création automatique si nécessaire)

**Tickets associés :** #5, #9, #12

---

## 🔌 GROUPE C : Cartographie des Ressources Externes

### **US-C1 : Affichage des postes sources et zones saturées**

> **En tant que** Développeur / Chargé de Raccordement  
> **Je veux** visualiser les postes sources sur la carte avec indication de leur niveau de saturation  
> **Afin d'** éviter de prospecter/développer dans des zones non raccordables

**Critères d'acceptation**
- [ ] Import des données postes sources (coordonnées, capacité, saturation)
- [ ] Affichage sur la carte avec codes couleur : vert (disponible), orange (tendu), rouge (saturé)
- [ ] Clic sur poste source affiche : nom, capacité totale, capacité disponible, gestionnaire réseau
- [ ] Superposition avec projets en cours pour anticiper saturation future
- [ ] Filtre pour n'afficher que les postes saturés
- [ ] Mise à jour trimestrielle des données (import CSV ou API)

**Tickets associés :** #3

---

### **US-C2 : Carte des bureaux d'études avec notation**

> **En tant que** Chargé de Projet Sol  
> **Je veux** visualiser les antennes des bureaux d'études sur une carte avec leurs prestations et notations  
> **Afin de** sélectionner rapidement le bon BE pour une consultation

**Critères d'acceptation**
- [ ] Affichage des antennes BE avec marqueurs distincts
- [ ] Popup au survol/clic : nom BE, prestations proposées (VRD, G2, géotech, etc.), note moyenne (/5), commentaires
- [ ] Rayon d'intervention affiché (cercle) - généralement 2h de trajet max
- [ ] Système de notation collaboratif : ajout note + commentaire après mission
- [ ] Filtre par type de prestation
- [ ] Export liste BE à proximité d'un projet (PDF)

**Tickets associés :** #6

---

## 🏗️ GROUPE D : Coordination Opérationnelle

### **US-D1 : Vue croisée mainteneurs & centrales avec événements**

> **En tant qu'** Exploitant  
> **Je veux** afficher simultanément la position des mainteneurs et des centrales avec événements ouverts, filtrables par qualification  
> **Afin de** mobiliser rapidement le mainteneur qualifié le plus proche en cas d'urgence

**Critères d'acceptation**
- [ ] Affichage double couche : marqueurs mainteneurs (bleu) + centrales avec événements (rouge/orange selon urgence)
- [ ] Filtres mainteneurs : tous / QualiPV / Habilitations BT uniquement
- [ ] Filtres centrales : type événement, niveau urgence
- [ ] Calcul automatique distance mainteneur ↔ centrale la plus proche
- [ ] Liste triée : pour chaque événement, mainteneurs par ordre de proximité
- [ ] Respect RGPD : accès limité aux managers Exploitation

**Tickets associés :** #1 (idée 4)

---

### **US-D2 : Visibilité chantiers & déplacements conducteurs de travaux**

> **En tant qu'** Exploitant  
> **Je veux** voir les chantiers en cours et zones de déplacement des conducteurs de travaux  
> **Afin de** solliciter un conducteur présent à proximité d'un événement urgent

**Critères d'acceptation**
- [ ] Import données base "déplacements" (conducteurs de travaux)
- [ ] Affichage sur carte : chantiers en cours + zone de déplacement prévue (rayon ou itinéraire)
- [ ] Superposition avec événements Exploitation
- [ ] Identification rapide du conducteur à contacter (nom, téléphone)
- [ ] Mise à jour hebdomadaire des planning déplacements

**Tickets associés :** #1 (idée 7)

---

## 🎨 GROUPE E : Visualisation Commerciale

### **US-E1 : Carte prospects & leads pour préparation déplacements**

> **En tant qu'** Ingénieur Commercial Mini-Sol  
> **Je veux** visualiser sur une même carte mes prospects et leads filtrables par statut  
> **Afin de** préparer efficacement mes déplacements commerciaux en identifiant les contacts à proximité

**Critères d'acceptation**
- [ ] Affichage superposé prospects (marker rond) + leads (marker étoile)
- [ ] Géocodage automatique des communes (pour prospects sans coordonnées précises)
- [ ] Filtres : statut retour (positif, négatif, en attente, à recontacter, abandon), département
- [ ] Sélection zone géographique (dessin polygone) pour extraire liste contacts
- [ ] Code couleur par statut de retour
- [ ] Export itinéraire Google Maps (10 points max)

**Tickets associés :** #9, #10

---

### **US-E2 : Identification opportunités prospection lors de déplacements**

> **En tant qu'** Ingénieur Commercial  
> **Je veux** afficher les prospects et terrains non qualifiés (Glint) à proximité d'un déplacement lead planifié  
> **Afin de** rentabiliser le déplacement avec de la prospection physique additionnelle

**Critères d'acceptation**
- [ ] Sélection d'un lead = destination déplacement
- [ ] Rayon paramétrable autour du lead (10, 20, 30 km)
- [ ] Affichage prospects en attente de relance + terrains Glint non contactés
- [ ] Liste ordonnée par priorité (statut retour, ancienneté dernier contact)
- [ ] Création rapide checklist "déplacement" avec contacts sélectionnés

**Tickets associés :** #9

---

## 🎯 Priorisation

### 🔴 **PRIORITÉ 0 (P0) - CRITIQUE - À développer en priorité**

Ces 3 User Stories constituent le **MVP fonctionnel**. Sans elles, aucun des autres besoins ne peut être adressé. Impact immédiat sur 30+ utilisateurs.

| User Story | Impact | Effort | Équipes bénéficiaires | Tickets |
|------------|--------|--------|------------------------|---------|
| **US-A1** : Affichage cartographique de base | 🔥 Très élevé | 🛠️ Moyen | Tous | #2, #7, #8, #11 |
| **US-A2** : Filtrage multi-critères | 🔥 Très élevé | 🛠️ Faible | Tous | #2, #7, #8, #11 |
| **US-B1** : Interventions à proximité | 💰 ROI élevé | 🛠️ Moyen | Exploitation (quotidien) | #1, #4 |

**Justification :**
- **US-A1** : Fondation technique indispensable (sans carte, rien n'est possible)
- **US-A2** : Multiplie la valeur de US-A1 (filtres = usage réel)
- **US-B1** : ROI immédiat pour Exploitation (50-100 interventions/mois)

**Sprint recommandé :** Sprint 1-2 (MVP)

---

### 🟠 **PRIORITÉ 1 (P1) - IMPORTANT - Quick wins & forte valeur**

Fort impact business avec effort raisonnable. À intégrer dans les 2-3 sprints suivant le MVP.

| User Story | Impact | Effort | Équipes bénéficiaires | Tickets |
|------------|--------|--------|------------------------|---------|
| **US-B4** : Optimisation déplacements (Snapacte, etc.) | 💰 Élevé | 🛠️ Faible | Travaux, Devs | #5, #9, #12 |
| **US-C1** : Postes sources saturés | 🎯 Stratégique | 🛠️ Moyen | Raccordement, Devs | #3 |
| **US-E1** : Carte prospects/leads | 💰 Moyen | 🛠️ Faible | Prospection | #9, #10 |
| **US-A3** : Vue comparative (heatmap) | 📊 Stratégique | 🛠️ Moyen | Direction | #2, #7, #8, #11 |

**Justification :**
- **US-B4** : Réutilise US-A1/A2, effort faible, impact immédiat Travaux/Devs
- **US-C1** : Évite perte de temps sur leads non viables (stratégique)
- **US-E1** : Gain temps commercial (30min-1h par déplacement)
- **US-A3** : Vision Direction (pilotage stratégique)

**Sprint recommandé :** Sprint 3-4

---

### 🟡 **PRIORITÉ 2 (P2) - AMÉLIORATION - À planifier selon capacité**

Valeur incrémentale. US-B3 complexe (algorithme clustering) → à envisager V2 si temps disponible.

| User Story | Impact | Effort | Équipes bénéficiaires | Tickets |
|------------|--------|--------|------------------------|---------|
| **US-B2** : Alertes automatiques mutualisation | 🤖 Automation | 🛠️ Élevé | Exploitation | #1 |
| **US-B3** : Planification tournées MP | 🤖 Automation | 🛠️🛠️ Très élevé | Exploitation | #1 |
| **US-C2** : Carte BE avec notation | 🎯 Nice-to-have | 🛠️ Moyen | Devs Sol | #6 |
| **US-D1** : Vue mainteneurs/centrales | 🚨 Urgences | 🛠️ Élevé | Exploitation | #1 |
| **US-D2** : Chantiers & conducteurs travaux | 🤝 Coordination | 🛠️ Moyen | Exploitation, Travaux | #1 |
| **US-E2** : Prospection lors déplacements | 💰 Faible | 🛠️ Faible | Prospection | #9 |

**Justification :**
- **US-B2** : Automation intéressante mais complexe (détection + email)
- **US-B3** : Très complexe (algorithme clustering + attribution) → V2
- **US-C2** : Nice-to-have, système notation collaboratif à concevoir
- **US-D1** : Impact fort en urgence mais contraintes RGPD
- **US-D2** : Coordination utile mais usage ponctuel
- **US-E2** : Amélioration incrémentale de US-E1

**Sprint recommandé :** Sprint 5+ (selon retours terrain)

---

## 📊 Répartition par Priorité

| Priorité | Nombre US | % du total | Impact global |
|----------|-----------|------------|--------------|
| **P0 - Critique** | 3 | 20% | 🔥🔥🔥 Très élevé |
| **P1 - Important** | 4 | 27% | 🔥🔥 Élevé |
| **P2 - Amélioration** | 6 | 40% | 🔥 Moyen |
| **Non priorisé** | 2 | 13% | - |

---

## 🚀 Roadmap Suggérée

### **Sprint 1-2 : MVP (P0)**
- US-A1 : Affichage cartographique de base
- US-A2 : Filtrage multi-critères
- US-B1 : Interventions à proximité
- **Livrable :** Carte fonctionnelle avec filtres + recherche proximité

### **Sprint 3-4 : Quick Wins (P1)**
- US-B4 : Optimisation déplacements
- US-C1 : Postes sources saturés
- US-E1 : Carte prospects/leads
- **Livrable :** 3 nouvelles fonctionnalités métier

### **Sprint 5-6 : Vision Direction (P1)**
- US-A3 : Vue comparative (heatmap)
- Tests utilisateurs P0/P1
- **Livrable :** Dashboard Direction + retours terrain

### **Sprint 7+ : Améliorations (P2)**
- Priorisation P2 selon retours terrain
- US-B2, US-D1, US-D2 en priorité si besoin urgent
- US-B3 et US-C2 en V2 si temps disponible

---

## 📈 Indicateurs de Succès

| KPI | Cible | Mesure |
|-----|-------|--------|
| **Adoption** | 80% des Devs/Travaux utilisent hebdo | Analytics usage |
| **Gain temps** | 2h/mois/utilisateur économisées | Survey avant/après |
| **Réduction trajets** | 15% interventions groupées | Analyse base Commandes |
| **Satisfaction** | NPS > 40 | Survey trimestriel |
| **Abandon Google Maps** | 100% | Monitoring accès MyMaps |

---

**Document généré le :** Janvier 2025  
**Version :** 1.0

