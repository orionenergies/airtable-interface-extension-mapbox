export function ConfigurationScreen() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <div className="text-center">
                <div
                    style={{width: '525px'}}
                    className="inline-flex flex-col justify-start items-center gap-3"
                >
                    <div className="justify-start text-3xl font-semibold text-black dark:text-white leading-7">
                        Cette carte n&apos;est pas configurée
                    </div>
                    <div className="justify-center text-left text-lg text-gray-500 dark:text-gray-300 leading-6">
                        <ol className="list-decimal">
                            <li>
                                Configurez les propriétés personnalisées de cette extension :
                                <ul className="list-disc ml-6 mt-2">
                                    <li><strong>Champ nom/label</strong> : Champ contenant le nom des points</li>
                                    <li><strong>Champ coordonnées GPS</strong> : Champ contenant les coordonnées (format &quot;latitude, longitude&quot;)</li>
                                    <li><strong>Zone géographique à afficher</strong> : Choisissez entre France entière ou une région spécifique</li>
                                </ul>
                            </li>
                            <li>
                                Le token Mapbox est optionnel - utilisé uniquement pour les styles personnalisés.
                            </li>
                            <li>
                                Pour ouvrir un enregistrement en cliquant sur un point, activez{' '}
                                <span className="font-semibold">Click into record details</span>
                                .
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

