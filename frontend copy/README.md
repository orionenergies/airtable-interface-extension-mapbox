# Frontend Architecture - Map Visualisation Mapbox

## 📁 Structure du Projet

```
frontend/
├── components/          # Composants UI réutilisables
│   ├── ColorPicker.tsx           # Sélecteur de couleurs Airtable
│   ├── ConfigurationScreen.tsx   # Écran de configuration initiale
│   ├── ErrorScreen.tsx           # Écran d'erreur
│   ├── FieldSelectionModal.tsx   # Modal de sélection de champs
│   ├── FilterBar.tsx             # Barre de filtres personnalisés
│   ├── MapContainer.tsx          # Container principal de la carte
│   ├── MapMarker.tsx             # Marqueur individuel sur la carte
│   ├── ResultCounters.tsx        # Compteurs de résultats
│   └── ValueSelectionModal.tsx   # Modal de sélection de valeurs
│
├── hooks/              # Hooks personnalisés pour la logique métier
│   ├── useAutoCentering.ts          # Logique de centrage automatique de la carte
│   ├── useColorCounters.ts          # Compteurs par couleur
│   ├── useCustomPropertiesConfig.ts # Configuration des custom properties
│   ├── useFilters.ts                # Gestion des filtres personnalisés
│   ├── useLocationData.ts           # Parsing et gestion des données GPS
│   ├── useMapInteractions.ts        # Interactions carte (clic, hover)
│   ├── useMapViewState.ts           # État de la vue + localStorage
│   └── useUniqueFieldValues.ts      # Extraction de valeurs uniques
│
├── utils/              # Utilitaires et constantes
│   └── airtableColors.ts           # Palette de couleurs Airtable
│
├── index.tsx           # Point d'entrée principal (181 lignes)
└── style.css           # Styles Tailwind CSS
```

## 🎯 Principes d'Organisation

### **Separation of Concerns**
- **`index.tsx`** : Point d'entrée minimaliste - orchestration des hooks et composants
- **`components/`** : Composants UI purs, responsables uniquement du rendu
- **`hooks/`** : Logique métier isolée, réutilisable, testable
- **`utils/`** : Constantes et fonctions utilitaires

### **Composants**

#### **Composants d'Affichage**
- `ConfigurationScreen` : Écran de configuration (non configuré)
- `ErrorScreen` : Écran d'erreur
- `MapContainer` : Container de la carte Mapbox + marqueurs
- `MapMarker` : Marqueur individuel avec tooltip

#### **Composants d'Interaction**
- `FilterBar` : Barre de filtres avec bouton "+ Ajouter un filtre"
- `FieldSelectionModal` : Sélection de champ à filtrer
- `ValueSelectionModal` : Sélection de valeurs + personnalisation couleurs
- `ColorPicker` : Grille de sélection de couleurs Airtable
- `ResultCounters` : Affichage des compteurs de points

### **Hooks**

#### **Hooks de Données**
- `useCustomPropertiesConfig` : Configuration Airtable (champs GPS, label, etc.)
- `useLocationData` : Parsing des coordonnées GPS depuis Airtable
- `useUniqueFieldValues` : Extraction de valeurs uniques d'un champ

#### **Hooks de Filtrage**
- `useFilters` : Gestion complète des filtres personnalisés
- `useColorCounters` : Compteurs de points par couleur

#### **Hooks de Carte**
- `useMapViewState` : État de la vue (zoom, centre) + localStorage
- `useMapInteractions` : Gestion des clics et hovers
- `useAutoCentering` : Logique de centrage automatique au chargement

## 📊 Statistiques

- **`index.tsx`** : 181 lignes (contre 407 avant refactoring)
- **Composants** : 9 fichiers bien séparés
- **Hooks** : 8 hooks spécialisés
- **Aucune erreur** de linting ou typecheck

## ✅ Bonnes Pratiques Respectées

### **Airtable Interface Extensions**
- ✅ Point d'entrée `frontend/index.tsx`
- ✅ `initializeBlock({ interface: () => <MyComponent /> })`
- ✅ Imports depuis `@airtable/blocks/interface/ui`
- ✅ Custom Properties pour configuration
- ✅ `expandRecord()` pour détails des records
- ✅ Permissions vérifiées avant actions

### **React Best Practices**
- ✅ Hooks personnalisés pour la logique réutilisable
- ✅ Composants fonctionnels purs
- ✅ `useMemo` et `useCallback` pour optimisation
- ✅ Props typées avec TypeScript
- ✅ Separation of Concerns stricte

### **TypeScript**
- ✅ `verbatimModuleSyntax` respecté
- ✅ Imports de types avec `import type`
- ✅ Interfaces bien définies
- ✅ Pas de `any`

## 🔄 Flux de Données

```
index.tsx (orchestration)
    ↓
useCustomPropertiesConfig → Custom Properties Airtable
    ↓
useFilters → Gestion des filtres personnalisés
    ↓
useLocationData → Parsing GPS + filtrage
    ↓
MapContainer → Affichage de la carte
    ↓
MapMarker (x N) → Marqueurs individuels
```

## 🚀 Évolutions Futures

Le code est maintenant organisé pour faciliter :
- Ajout de nouveaux hooks métier
- Création de nouveaux composants UI
- Tests unitaires des hooks
- Réutilisation de composants dans d'autres projets
- Maintenance et debugging simplifiés

---

**Dernière mise à jour** : 8 octobre 2025  
**Version** : 3.0  
**Statut** : Production-ready - Code refactorisé et optimisé

