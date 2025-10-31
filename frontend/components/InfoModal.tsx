import {XIcon, MapPinIcon, MagnifyingGlassIcon, PaletteIcon, ListBulletsIcon, CodeIcon, LifebuoyIcon, FunnelIcon} from '@phosphor-icons/react';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalPoints: number;
    hasColorCustomization: boolean;
}

export function InfoModal({isOpen, onClose, totalPoints, hasColorCustomization}: InfoModalProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden pointer-events-auto transform transition-all"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <MapPinIcon size={28} className="text-blue-600 dark:text-blue-400" weight="fill" />
                            Guide d'utilisation de la carte
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            aria-label="Fermer"
                        >
                            <XIcon size={24} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                        <div className="space-y-6">

                            {/* Navigation de la carte */}
                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <MagnifyingGlassIcon size={24} className="text-blue-600 dark:text-blue-400" />
                                    Navigation sur la carte
                                </h3>
                                <ul className="space-y-3 text-base text-gray-700 dark:text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                        <span className="flex-1 leading-6"><strong>Déplacement sur la carte</strong> : Cliquez et faites glisser pour déplacer la vue</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                        <span className="flex-1 leading-6"><strong>Zoomer</strong> : Utilisez la molette de la souris ou les boutons de contrôle en haut à droite</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                        <span className="flex-1 leading-6"><strong>Bouton Recentrer</strong> : Cliquez sur le bouton avec l'icône de viseur (en bas à droite) pour revenir à la vue complète de tous les points</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                        <span className="flex-1 leading-6"><strong>Panneau de configuration</strong> : Cliquez sur "Configuration de la carte" en haut pour ouvrir/fermer le panneau de personnalisation</span>
                                    </li>
                                </ul>
                            </section>

                            {/* Interaction avec les marqueurs */}
                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <MapPinIcon size={24} className="text-blue-600 dark:text-blue-400" />
                                    Interaction avec les marqueurs
                                </h3>
                                <ul className="space-y-3 text-base text-gray-700 dark:text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                        <span className="flex-1 leading-6"><strong>Survoler un marqueur</strong> : Affiche le nom du lieu</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                        <span className="flex-1 leading-6"><strong>Cliquer sur un marqueur</strong> : Ouvre un menu contextuel avec deux options :</span>
                                    </li>
                                    <ul className="ml-8 space-y-2 mt-2">
                                        <li className="flex items-start gap-3">
                                            <span className="text-gray-500 dark:text-gray-400 flex-shrink-0 leading-6">→</span>
                                            <span className="flex-1 leading-6"><strong>Zoomer sur le lieu</strong> : Centre la carte sur ce point avec un zoom approprié</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-gray-500 dark:text-gray-400 flex-shrink-0 leading-6">→</span>
                                            <span className="flex-1 leading-6"><strong>Afficher le détail</strong> : Ouvre la page de détail Airtable de l'enregistrement</span>
                                        </li>
                                    </ul>
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                        <span className="flex-1 leading-6"><strong>Cliquer sur la carte</strong> : Ferme le menu contextuel ouvert</span>
                                    </li>
                                </ul>
                            </section>

                            {/* Personnalisation des marqueurs */}
                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <MapPinIcon size={24} className="text-blue-600 dark:text-blue-400" weight="fill" />
                                    Personnalisation des marqueurs
                                </h3>
                                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
                                    <p className="text-base text-gray-700 dark:text-gray-300">
                                        Utilisez les contrôles en bas à droite de la carte pour personnaliser l'apparence des marqueurs :
                                    </p>
                                    <ul className="space-y-3 text-base text-gray-700 dark:text-gray-300">
                                        <li className="flex items-start gap-3">
                                            <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                            <span className="flex-1 leading-6"><strong>Forme du marqueur</strong> : Cliquez sur l'icône affichée pour choisir parmi 3 formes (épingle, cercle, triangle) utilisant les icônes Mapbox Maki</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                            <span className="flex-1 leading-6"><strong>Taille du marqueur</strong> : Utilisez le curseur vertical pour ajuster la taille des marqueurs de 16 à 48 pixels</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                            <span className="flex-1 leading-6"><strong>Bordures blanches</strong> : Tous les marqueurs ont automatiquement une bordure blanche pour une meilleure visibilité lors des chevauchements</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                            <span className="flex-1 leading-6"><strong>Préférences sauvegardées</strong> : Vos choix de forme et de taille sont automatiquement sauvegardés pour cette base et cette table</span>
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* Filtrer les valeurs */}
                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <FunnelIcon size={24} className="text-blue-600 dark:text-blue-400" />
                                    Filtrer les valeurs
                                </h3>
                                <ul className="space-y-3 text-base text-gray-700 dark:text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                        <span className="flex-1 leading-6"><strong>Filtres natifs Airtable</strong> : Les filtres situés au-dessus de la carte permettent de filtrer les enregistrements affichés sur la carte</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                        <span className="flex-1 leading-6"><strong>Filtres par défaut</strong> : Certains filtres peuvent être configurés par défaut selon la configuration de votre page Interface</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                        <span className="flex-1 leading-6"><strong>Filtres personnalisés</strong> : Utilisez les boutons à droite des filtres pour créer des filtres personnalisés et rechercher des éléments spécifiques</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                        <span className="flex-1 leading-6"><strong>Impact sur les couleurs</strong> : Les valeurs disponibles dans le choix des couleurs dépendent des filtres globaux actifs sur la page. Si vous filtrez par statut, seules les valeurs de ce champ présentes dans les enregistrements filtrés seront disponibles pour la personnalisation</span>
                                    </li>
                                </ul>
                            </section>

                            {/* Personnalisation des couleurs */}
                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <PaletteIcon size={24} className="text-blue-600 dark:text-blue-400" />
                                    Personnalisation des couleurs
                                </h3>
                                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
                                    <p className="text-base text-gray-700 dark:text-gray-300">
                                        Le panneau de configuration en haut de la carte vous permet de colorer les marqueurs selon les valeurs d'un champ.
                                    </p>
                                    <ul className="space-y-3 text-base text-gray-700 dark:text-gray-300">
                                        <li className="flex items-start gap-3">
                                            <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                            <span className="flex-1 leading-6"><strong>Ouvrir le panneau</strong> : Cliquez sur "Configuration de la carte" en haut pour ouvrir le panneau de configuration (fermé par défaut)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                            <span className="flex-1 leading-6"><strong>Choisir un champ</strong> : Dans la colonne "Personnalisation des couleurs", cliquez sur "Choisir un champ" pour sélectionner un champ catégoriel (Select, Checkbox, User, etc.)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                            <span className="flex-1 leading-6"><strong>Configurer les couleurs</strong> : Cliquez sur le nom du champ sélectionné pour ouvrir le modal de configuration des couleurs</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                            <span className="flex-1 leading-6"><strong>Auto-assignation aléatoire</strong> : Utilisez le bouton "Auto" pour assigner automatiquement des couleurs aléatoires à toutes les valeurs</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                            <span className="flex-1 leading-6"><strong>Couleurs manuelles</strong> : Cliquez sur un cercle de couleur à côté d'une valeur pour choisir une couleur spécifique parmi les 10 couleurs officielles Airtable</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                            <span className="flex-1 leading-6"><strong>Masquer/Afficher des valeurs</strong> : Cliquez sur l'icône d'œil à côté d'une valeur pour masquer ou afficher les marqueurs correspondants. Les valeurs masquées apparaissent grisées</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                            <span className="flex-1 leading-6"><strong>Recherche</strong> : Utilisez la barre de recherche dans le modal pour filtrer rapidement les valeurs</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                            <span className="flex-1 leading-6"><strong>Retirer le champ</strong> : Cliquez sur l'icône X à droite du nom du champ pour supprimer rapidement la personnalisation des couleurs</span>
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* Compteurs et statistiques */}
                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <ListBulletsIcon size={24} className="text-blue-600 dark:text-blue-400" />
                                    Compteurs et statistiques
                                </h3>
                                <ul className="space-y-3 text-base text-gray-700 dark:text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                        <span className="flex-1 leading-6"><strong>Compteur total</strong> : En haut à gauche, affiche le nombre total de points visibles sur la carte</span>
                                    </li>
                                    {hasColorCustomization && (
                                        <li className="flex items-start gap-3">
                                            <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                            <span className="flex-1 leading-6"><strong>Détail par couleur</strong> : Sous le compteur total, affiche un décompte pour chaque couleur configurée (ex: "15 En cours", "12 Annulé")</span>
                                        </li>
                                    )}
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                        <span className="flex-1 leading-6"><strong>Mise à jour en temps réel</strong> : Les compteurs se mettent à jour automatiquement lorsque les données changent</span>
                                    </li>
                                </ul>
                            </section>

                            {/* Formats GPS */}
                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <CodeIcon size={24} className="text-blue-600 dark:text-blue-400" />
                                    Format des coordonnées GPS
                                </h3>
                                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                                    <p className="text-base text-amber-900 dark:text-amber-100 mb-2">
                                        <strong>Format requis</strong> : latitude, longitude
                                    </p>
                                    <p className="text-sm text-amber-800 dark:text-amber-200 mb-2">
                                        Exemple : <code className="bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded">44.48273, 3.053849</code>
                                    </p>
                                    <p className="text-sm text-amber-800 dark:text-amber-200">
                                        Les coordonnées doivent être séparées par une virgule suivie d'un espace. Les enregistrements avec des coordonnées invalides ne seront pas affichés sur la carte.
                                    </p>
                                </div>
                            </section>

                            {/* Support */}
                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <LifebuoyIcon size={24} className="text-blue-600 dark:text-blue-400" />
                                    Support
                                </h3>
                                <ul className="space-y-3 text-base text-gray-700 dark:text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                        <span className="flex-1 leading-6"><strong>En cas de bug</strong> : Contacter l'équipe ERP via le canal Teams dédié à votre équipe</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0 leading-6">•</span>
                                        <span className="flex-1 leading-6"><strong>En cas de besoin d'amélioration ou d'une nouvelle fonctionnalité</strong> : Créer un ticket :)</span>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            J'ai compris
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

