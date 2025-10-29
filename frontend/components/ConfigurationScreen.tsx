export function ConfigurationScreen() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <div className="text-center">
                <div
                    style={{width: '525px'}}
                    className="inline-flex flex-col justify-start items-center gap-3"
                >
                    <div className="justify-start text-3xl font-semibold text-black dark:text-white leading-7">
                        This map has not been configured
                    </div>
                    <div className="justify-center text-left text-lg text-gray-500 dark:text-gray-300 leading-6">
                        <ol className="list-decimal">
                            <li>
                                Sign up for a{' '}
                                <a
                                    href="https://www.mapbox.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline hover:cursor-pointer hover:opacity-50"
                                >
                                    Mapbox account
                                </a>{' '}
                                and create an{' '}
                                <a
                                    href="https://console.mapbox.com/account/access-tokens/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline hover:cursor-pointer hover:opacity-50"
                                >
                                    access token
                                </a>
                                .
                            </li>
                            <li>
                                In Airtable, fill out this element&apos;s custom properties. Select a
                                field containing GPS coordinates in the format &quot;latitude, longitude&quot;.
                            </li>
                            <li>
                                To open a record when clicking a pin, enable{' '}
                                <span className="font-semibold">Click into record details</span>.
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

