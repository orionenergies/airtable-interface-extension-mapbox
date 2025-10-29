# Système de Personnalisation des Couleurs

## Vue d'ensemble

Système de personnalisation inspiré de l'interface native Airtable pour permettre aux utilisateurs finaux de configurer dynamiquement la couleur des marqueurs en fonction d'un champ.

## Interface utilisateur

### Barre de personnalisation (en haut de la carte)

**État initial** (aucun champ sélectionné) :
```
Couleur par: [+ Ajouter un champ]
```

**Avec un champ sélectionné** :
```
Couleur par: [Statut (7 couleurs) ▼]
```

### Workflow complet

#### 1. Sélection du champ

Cliquer sur **"+ Ajouter un champ"** ouvre un modal avec :
- Barre de recherche pour filtrer les champs
- Liste des champs Single Select et Multiple Selects
- Icônes par type de champ
- Bouton "Annuler" pour fermer

#### 2. Personnalisation des couleurs

Après sélection du champ, un second modal s'ouvre automatiquement avec :
- **Barre de recherche** : Filtrer les valeurs
- **Bouton "Auto"** : Assigner automatiquement 10 couleurs distinctes
- **Liste des valeurs** : Chaque valeur affiche :
  - Un cercle de couleur cliquable
  - Le nom de la valeur
- **Footer** : 
  - Compteur de valeurs
  - Bouton "Supprimer ce champ" (réinitialisation)

#### 3. Sélection de couleur

Cliquer sur un cercle de couleur ouvre le **ColorPicker** :
- Modal centré avec overlay semi-transparent
- Grille 5×2 des 10 couleurs Airtable
- Checkmark sur la couleur sélectionnée
- Fermeture automatique après sélection

## Palette de couleurs Airtable

Les couleurs disponibles sont:
- blue
- cyan
- teal
- green
- yellow
- orange
- red
- pink
- purple
- gray

Ces couleurs sont converties en hexadécimal via `colorUtils.getHexForColor()` pour respecter l'identité visuelle d'Airtable.

## Persistance

- **Champ sélectionné**: Stocké dans `localStorage` avec la clé `colorFieldId:{baseId}:{tableId}`
- **Configuration des couleurs**: Stockée dans `localStorage` avec la clé `colorConfig:{baseId}:{tableId}`
- Les préférences sont restaurées automatiquement au chargement de la page

## Architecture technique

### Composants

#### ColorCustomizationBar
- Barre compacte en haut de la carte
- Bouton "+ Ajouter un champ" (état initial)
- Bouton du champ actif avec compteur de couleurs (état configuré)

#### ColorFieldSelectionModal
- Modal de sélection de champ
- Barre de recherche
- Icônes par type de champ (CaretCircleDown, Tag)
- Liste scrollable
- Bouton "Annuler"

#### ColorValuesModal
- Modal de personnalisation des couleurs
- Barre de recherche pour filtrer les valeurs
- Bouton "Auto" pour assignation automatique
- Liste des valeurs avec cercles de couleur
- Footer avec compteur et bouton "Supprimer"

#### ColorPicker
- Modal plein écran avec overlay
- Grille 5×2 des couleurs Airtable
- Checkmark sur la couleur sélectionnée
- Conversion hex via `colorUtils.getHexForColor()`

### Hook personnalisé

#### useColorCustomization
- Gestion complète de l'état de coloration
- Persistance dans localStorage
- Calcul des valeurs uniques
- Handlers pour tous les événements

### Flux de données

```
1. User clicks "+ Ajouter un champ"
    ↓
2. ColorFieldSelectionModal opens
    ↓
3. User selects field → handleFieldSelect()
    ↓
4. ColorValuesModal opens automatically
    ↓
5. User clicks color circle → ColorPicker opens
    ↓
6. User selects color → handleColorChange()
    ↓
7. useGPSLocations receives colorField + colorConfiguration
    ↓
8. LocationData[] populated with colors
    ↓
9. MapMarker renders with dynamic color
```

## Guide d'utilisation

### Première configuration

1. Cliquez sur **"+ Ajouter un champ"**
2. Recherchez et sélectionnez un champ (ex: "Statut")
3. Le modal de couleurs s'ouvre automatiquement
4. Cliquez sur **"Auto"** pour une assignation rapide
5. Les marqueurs se colorent instantanément

### Personnalisation fine

1. Cliquez sur le champ actif (ex: "Statut (7 couleurs)")
2. Cliquez sur un cercle de couleur
3. Choisissez une nouvelle couleur dans la palette
4. Répétez pour chaque valeur
5. Les changements sont immédiats

### Changer de champ

1. Cliquez sur **"Supprimer ce champ"** dans le modal
2. Cliquez sur **"+ Ajouter un champ"**
3. Sélectionnez un nouveau champ

### Recherche de valeurs

- Utilisez la barre de recherche pour filtrer les valeurs
- Pratique quand il y a beaucoup de valeurs différentes

## Avantages de cette approche

### UX optimale

✅ **Interface familière** : Reprend le pattern des filtres Airtable  
✅ **Pas de surcharge visuelle** : Barre compacte, modals à la demande  
✅ **Recherche intégrée** : Trouver rapidement un champ ou une valeur  
✅ **Feedback visuel** : Compteur de couleurs assignées  
✅ **Accessibilité** : Icônes, hover states, keyboard navigation

### Technique

✅ **Séparation des responsabilités** :
- `ColorCustomizationBar` : Affichage de la barre
- `ColorFieldSelectionModal` : Sélection de champ
- `ColorValuesModal` : Personnalisation des couleurs
- `ColorPicker` : Sélecteur de couleurs
- `useColorCustomization` : Logique métier isolée

✅ **Performance** :
- `useMemo` pour les valeurs uniques
- `useCallback` pour les handlers stables
- Persistance localStorage optimisée

✅ **Maintenabilité** :
- Code modulaire et réutilisable
- Types TypeScript stricts
- Hooks testables indépendamment

## Fichiers créés

```
frontend/
├── components/
│   ├── ColorCustomizationBar.tsx    (60 lignes)
│   ├── ColorFieldSelectionModal.tsx (86 lignes)
│   ├── ColorValuesModal.tsx        (174 lignes)
│   └── ColorPicker.tsx             (52 lignes)
└── hooks/
    └── useColorCustomization.ts    (141 lignes)
```

**Total** : ~513 lignes de code organisé et modulaire

## Types de champs supportés

Les types de champs suivants peuvent être utilisés pour la colorisation :

### Champs principaux
- **Single Select** : Champs à choix unique
- **Multiple Selects** : Champs à choix multiples
- **Checkbox** : Champs case à cocher (Oui/Non)

### Champs utilisateur
- **User** : Champ utilisateur unique
- **Created by** : Créateur de l'enregistrement
- **Last modified by** : Dernier modificateur

### Champs calculés
- **Formula** : Champs formule (la valeur textuelle est utilisée)

**Note** : Pour les champs utilisateur, le nom complet de l'utilisateur est utilisé comme valeur.

## Limitations

- Un seul champ de coloration à la fois
- Palette limitée à 10 couleurs Airtable
- Si plus de 10 valeurs, utiliser "Auto" répartit les couleurs en cycle

## Compatibilité

✅ Compatible avec les filtres de vue Airtable natifs  
✅ Fonctionne en mode sombre (`dark:` Tailwind)  
✅ Préférences par base et par table (localStorage)  
✅ Réactif et responsive  
✅ Pas de conflit avec les autres fonctionnalités

## Comparaison avec l'ancien système

| Aspect | Ancien (inline) | Nouveau (modals) |
|--------|----------------|------------------|
| Visibilité | Toujours visible | À la demande |
| Recherche | ❌ Non | ✅ Oui |
| Encombrement | ⚠️ Barre large | ✅ Minimal |
| UX | Basique | ⭐ Airtable-like |
| Maintenance | Monolithique | Modulaire |
| Performance | ⚠️ Re-renders | ✅ Optimisé |

