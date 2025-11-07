# Synthèse des Besoins - Cartographie Orion Énergies

**Date d'analyse :** Janvier 2025  
**Nombre de tickets analysés :** 13  
**Équipes concernées :** Exploitation, Travaux, Dev Toitures/Sol/Mini-Sol, Raccordement, Prospection, Direction

---

## 📍 GROUPE A : Visualisation & Suivi du Portefeuille de Projets

**Tickets associés :** #2, #7, #8, #11

### Équipes concernées
Dev Toitures, Dev Mini-Sol, Grand Sol, Travaux, Direction

### Problème à résoudre
- Absence de vision géographique consolidée du portefeuille (projets en dev, construction, exploitation)
- Mise à jour manuelle et fastidieuse des cartes Google Maps existantes (plusieurs heures/mois)
- Impossibilité de filtrer dynamiquement par statut, équipe, département, chargé de travaux
- Difficulté d'accès mobile aux cartes à jour lors des déplacements terrain

### Valeur ajoutée pour l'utilisateur
- **Compréhension rapide** de l'implantation territoriale d'Orion
- **Répartition équilibrée** de la charge entre chargés de travaux/développeurs
- **Identification immédiate** des projets à proximité d'un lead pour argumentaire commercial
- **Vision stratégique** pour la Direction (densité géographique, couverture territoriale)

### Fréquence / Criticité
- **Haute** - Usage quotidien par 30+ personnes (Devs + Travaux)
- Mise à jour actuelle : mensuelle (vs besoin : temps réel)
- Impact : perte de temps estimée à 2-4h/mois par utilisateur

### Contraintes
- Doit supporter +500 projets simultanément
- Performance mobile indispensable
- Synchronisation temps réel avec Airtable

### Détail des tickets

#### Ticket #2 : "Exploitation : idées pour cartographie"
- **Créé par :** Victor Andrieu
- **Date :** 7/11/2025
- **Équipe :** Exploitation
- **Besoin :** Outil de groupement des interventions + interface carte géographique avec filtres sur événements

#### Ticket #7 : "Cartographie des projets minisol"
- **Créé par :** Emmanuelle Guillou
- **Date :** 29/10/2025
- **Équipe :** Dev Mini-Sol
- **Besoin :** Carte représentant projets en dev ou construits (toitures, sol, minisol) avec affichage par région ou toute la France + infos clés au clic

#### Ticket #8 : "Automatiser la carto des projets"
- **Créé par :** Grégoire Derville
- **Date :** 5/3/2025
- **Équipe :** Travaux, Dev Toitures
- **Besoin :** Automatisation de la carte My Maps actuelle (mise à jour manuelle mensuelle) pour voir rapidement si un site voisin nécessite une action

#### Ticket #11 : "Carte géographique des projets"
- **Créé par :** Augustin Antraygues
- **Date :** 4/2/2025
- **Équipe :** Travaux
- **Besoin :** Carte accessible depuis mobile pour manager travaux (répartition charge) et chargés de travaux (organisation déplacements, projets proches)

---

## 🚗 GROUPE B : Optimisation des Déplacements & Tournées

**Tickets associés :** #1 (idées 1-3, 5-7), #4, #5, #9, #12

### Équipes concernées
Exploitation, Travaux, Dev (tous pôles)

### Problème à résoudre
- Déplacements non optimisés : interventions isolées alors que plusieurs sites sont à proximité
- Pas de visibilité sur les événements ouverts à proximité d'un site d'intervention planifiée
- Organisation manuelle des tournées de maintenance préventive annuelle
- Perte d'opportunités de mutualisation (Snapactes, RDV propriétaires, photos chantier)

### Valeur ajoutée pour l'utilisateur
- **Réduction des coûts :** Moins de déplacements prestataires (groupement interventions)
- **Gain de temps :** Identification automatique des opportunités de mutualisation
- **Amélioration QSE :** Réduction empreinte carbone
- **Efficacité commerciale :** Rentabiliser chaque déplacement (prospection physique)

### Fréquence / Criticité
- **Critique** pour Exploitation : 50-100 interventions/mois
- ROI estimé : 15-20% de réduction des déplacements
- Temps gagné : 10-15h/mois par équipe

### Contraintes
- Critères de proximité paramétrables (rayon en km, délai en jours)
- Filtres multiples : type événement, urgence, qualifications mainteneurs
- Alertes proactives (email/notification)

### Détail des tickets

#### Ticket #1 : "Exploitation : idées pour cartographie"
- **Créé par :** Victor Andrieu
- **Date :** 7/11/2025
- **Équipe :** Exploitation
- **Idées concernées :**
  - Idée 1 : Outil de groupement des interventions
  - Idée 2 : Interface carte avec cercle concentrique autour d'un point + filtres événements
  - Idée 3 : Sur fiche événement, lister tous les autres événements alentour
  - Idée 5 : Interface organisation tournées MP annuelle (groupement centrales proches + attribution mainteneurs)
  - Idée 6 : Alerte email si 2 interventions planifiées < 3 jours et < 20km
  - Idée 7 : Vue chantiers en cours + zones déplacement conducteurs travaux

#### Ticket #4 : "Développement d'un outil de groupement des interventions"
- **Créé par :** Paul Salvetat
- **Date :** 25/9/2025
- **Équipe :** Exploitation
- **Besoin :** Voir les tickets ouverts à proximité d'un site pour grouper interventions et minimiser déplacements prestataires

#### Ticket #5 : "Automatiser la carto des projets"
- **Créé par :** Grégoire Derville
- **Date :** 5/3/2025
- **Équipe :** Travaux, Dev Toitures
- **Besoin :** Voir rapidement si un site voisin nécessite une action (photo chantier, RDV proprio, Snapacte) lors d'un déplacement

#### Ticket #9 : "Mettre en place une carte de suivi des Snapactes"
- **Créé par :** Guillaume Demeilliers
- **Date :** 22/8/2023
- **Équipe :** Travaux, Dev Toitures
- **Besoin :** Identifier les panneaux de chantier à prendre en photo à proximité d'un déplacement envisagé

#### Ticket #12 : "Carte avec tous les projets en exploitations ou en cours"
- **Créé par :** Alexandre Halbout
- **Date :** 27/1/2025
- **Équipe :** Dev Toitures
- **Besoin :** Accès aux projets voisins de potentiels leads pour indiquer références dans leurs coins

---

## 🔌 GROUPE C : Cartographie des Ressources Externes (Postes Sources & BE)

**Tickets associés :** #3, #6

### Équipes concernées
Raccordement, Grand Sol, Dev Toitures

### Problème à résoudre
- **Postes sources :** Pas de visibilité sur les zones de saturation réseau → perte de temps sur leads non viables
- **Bureaux d'études :** Tableaux obsolètes, recherche internet chronophage, pas de vision géographique des antennes BE

### Valeur ajoutée pour l'utilisateur
- **Qualification rapide des leads :** Éviter les zones saturées dès la prospection
- **Optimisation consultations BE :** Identifier rapidement les antennes à portée (< 2h de route)
- **Capitalisation des retours d'expérience :** Notation/commentaires sur les BE par antenne

### Fréquence / Criticité
- **Moyenne-Haute** - Usage hebdomadaire par Devs et Raccordement
- Impact : 1-2h gagnées par consultation BE

### Contraintes
- Import données externes (RTE pour postes sources)
- Système de notation/commentaires collaboratif sur les BE
- Affichage des prestations proposées par antenne

### Détail des tickets

#### Ticket #3 : "Intégrer les postes sources sur une cartographie"
- **Créé par :** Nina Loiseau
- **Date :** 29/10/2025
- **Équipe :** Dev Toitures, Grand sol, Prospection Mini-Sol, Raccordement
- **Besoin :** Visualiser les zones avec postes sources saturés pour les éviter

#### Ticket #6 : "Map antennes BE avec système de notation"
- **Créé par :** Tiphaine Pliquet
- **Date :** 12/2/2025
- **Équipe :** Grand sol
- **Besoin :** Map répertoriant toutes les antennes BE avec prestations proposées et note attribuée par nos soins

---

## 🏗️ GROUPE D : Coordination Opérationnelle Travaux/Exploitation

**Tickets associés :** #1 (idée 4, 7)

### Équipes concernées
Exploitation, Travaux, Opérations

### Problème à résoudre
- Pas de vision croisée entre localisation des mainteneurs et des centrales avec événements ouverts
- Impossible de filtrer par qualifications (QualiPV, habilitations BT)
- Pas de visibilité sur les chantiers en cours et zones de déplacement des conducteurs de travaux

### Valeur ajoutée pour l'utilisateur
- **Réactivité accrue :** Mobiliser rapidement la ressource la plus proche
- **Gestion des compétences :** Matcher événements avec qualifications requises
- **Synergie inter-équipes :** Solliciter un conducteur de travaux présent à proximité

### Fréquence / Criticité
- **Moyenne** - Usage ponctuel mais fort impact en situation d'urgence
- Gain : réduction délai d'intervention de 24-48h

### Contraintes
- Géolocalisation mainteneurs (privacy, RGPD)
- Base de données "déplacements" des conducteurs de travaux

### Détail des tickets

#### Ticket #1 : "Exploitation : idées pour cartographie"
- **Créé par :** Victor Andrieu
- **Date :** 7/11/2025
- **Équipe :** Exploitation
- **Idées concernées :**
  - Idée 4 : Disposer sur une même cartographie la position des mainteneurs et la position des centrales avec filtres qualifications (QualiPV, BT) et événements ouverts
  - Idée 7 : Vue chantiers en cours + zones déplacement conducteurs travaux pour savoir qui appeler en cas de besoin proche

---

## 🎨 GROUPE E : Visualisation Commerciale (Prospection)

**Tickets associés :** #9, #10

### Équipes concernées
Prospection Mini-Sol

### Problème à résoudre
- Préparation manuelle des déplacements commerciaux (extraction + import dans Google Maps)
- Filtre par département inadapté (projets éloignés dans même département, projets proches dans départements voisins)
- Pas de vision consolidée prospects + leads sur une même carte

### Valeur ajoutée pour l'utilisateur
- **Optimisation agenda commercial :** Visites groupées sur une zone géographique
- **Efficacité prospection physique :** Identifier les communes contactées à proximité d'un déplacement lead

### Fréquence / Criticité
- **Moyenne** - Usage hebdomadaire par ingénieurs commerciaux (5-6 personnes)
- Gain : 30min-1h par préparation de déplacement

### Contraintes
- Géocodage communes (pas toujours de coordonnées précises pour prospects)
- Filtres par statut retour (positif, négatif, en attente, etc.)

### Détail des tickets

#### Ticket #9 : "Ajout d'une Maps de prospects / leads pour orga déplacement"
- **Créé par :** Marie Bourgeois
- **Date :** 20/6/2024
- **Équipe :** Prospection Mini-Sol
- **Besoin :** Afficher sur une maps les prospects et leads pour faciliter préparations de déplacement (coordonnées déjà dans Airtable ou mairie contactée)

#### Ticket #10 : "Prospection : Visualisation à améliorer"
- **Créé par :** Marie Bourgeois
- **Date :** 20/6/2024
- **Équipe :** Prospection Mini-Sol
- **Besoin :** Système de couleur pour différencier prospects par rapport aux derniers retours (positif, négatif, en attente, à recontacter, abandon, redirection)

---

## 📊 Synthèse Globale

### Répartition des besoins par groupe

| Groupe | Nombre de tickets | Priorité métier | Impact utilisateurs |
|--------|------------------|-----------------|---------------------|
| **A : Visualisation Portefeuille** | 4 | 🔴 Critique | 30+ utilisateurs quotidiens |
| **B : Optimisation Déplacements** | 5 | 🔴 Critique | 20+ utilisateurs (ROI élevé) |
| **C : Ressources Externes** | 2 | 🟠 Important | 10+ utilisateurs hebdo |
| **D : Coordination Opérationnelle** | 2 | 🟠 Important | 5-10 utilisateurs ponctuels |
| **E : Visualisation Commerciale** | 2 | 🟡 Amélioration | 5-6 utilisateurs hebdo |

### Thèmes transversaux identifiés

1. **Automatisation & Temps Réel** (70% des tickets)
   - Éliminer les mises à jour manuelles de Google Maps
   - Synchronisation live avec Airtable

2. **Optimisation Déplacements** (60% des tickets)
   - ROI majeur : réduction 15-20% des trajets
   - Mutualisation interventions/tâches

3. **Aide à la Décision** (40% des tickets)
   - Répartition charge, zones saturées, BE disponibles
   - Vision stratégique Direction

4. **Multi-équipes** (100% des tickets)
   - Besoin transverse à toute l'organisation
   - Nécessité de vues/filtres spécifiques par métier

### Opportunités de refonte

1. **Architecture modulaire par couche**
   - Layer système : fond de carte, navigation, recherche
   - Layer métier : projets, événements, prospects, postes sources, BE, mainteneurs
   - → Activation/désactivation selon profil utilisateur

2. **Personnalisation par rôle**
   - **Développeur** : projets + prospects + postes sources + BE
   - **Chargé de Travaux** : projets + Snapactes + chantiers
   - **Exploitant** : centrales + événements + mainteneurs + interventions
   - **Commercial** : prospects + leads + projets (références)
   - **Direction** : vue consolidée + heatmaps

3. **Intégration écosystème Orion**
   - Lien profond vers fiches Airtable depuis popups
   - Export données filtrées vers Excel/CSV
   - API pour intégration future (mobile app, Power BI)

---

**Document généré le :** Janvier 2025  
**Version :** 1.0

