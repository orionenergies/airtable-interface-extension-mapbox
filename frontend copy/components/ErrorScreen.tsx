interface ErrorScreenProps {
    errorMessage?: string;
}

export function ErrorScreen({errorMessage}: ErrorScreenProps) {
    return (
        <div className="flex items-center justify-center h-screen bg-red-50 dark:bg-red-900 p-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-4">
                    Configuration Error
                </h2>
                <p className="text-red-700 dark:text-red-200">
                    {errorMessage || 'There was an error with the custom properties configuration.'}
                </p>
            </div>
        </div>
    );
}

