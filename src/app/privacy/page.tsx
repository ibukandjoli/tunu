export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Politique de Confidentialité</h1>
            <p className="text-muted-foreground mb-12 italic">Dernière mise à jour : 06 Janvier 2026</p>

            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                        Collecte des Données
                    </h2>
                    <p className="leading-relaxed text-muted-foreground mb-4">
                        Nous collectons uniquement les informations strictement nécessaires au bon fonctionnement de nos services. Cela inclut :
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-4">
                        <li className="bg-muted/50 p-4 rounded-lg border">
                            <span className="font-semibold block mb-1">Identité</span>
                            Nom, Prénom, Username
                        </li>
                        <li className="bg-muted/50 p-4 rounded-lg border">
                            <span className="font-semibold block mb-1">Contact</span>
                            Adresse Email, Numéro de téléphone
                        </li>
                        <li className="bg-muted/50 p-4 rounded-lg border">
                            <span className="font-semibold block mb-1">Transactionnel</span>
                            Historique des enchères et achats
                        </li>
                        <li className="bg-muted/50 p-4 rounded-lg border">
                            <span className="font-semibold block mb-1">Paiement</span>
                            Données traitées sécuritairement par Stripe/Wave
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                        Utilisation des Données
                    </h2>
                    <p className="leading-relaxed text-muted-foreground mb-4">Vos données personnelles sont utilisées exclusivement pour :</p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground marker:text-primary/50">
                        <li>Gérer votre compte utilisateur et vos accès.</li>
                        <li>Faciliter et sécuriser vos enchères et transactions.</li>
                        <li>Vous notifier du statut de vos enchères (surenchère, victoire, paiement).</li>
                        <li>Améliorer l'expérience utilisateur sur la plateforme.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                        Partage des Données
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                        <strong className="text-foreground">Nous ne vendons jamais vos données personnelles.</strong> Elles peuvent être partagées avec des tiers de confiance uniquement lorsque cela est nécessaire à l'exécution du service (ex: processeurs de paiement, services d'hébergement sécurisés).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">4</span>
                        Vos Droits
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                        Conformément aux lois de protection des données en vigueur (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.
                    </p>
                    <p className="leading-relaxed text-muted-foreground mt-2">
                        Pour exercer ces droits, il vous suffit de nous contacter. Nous traiterons votre demande dans les meilleurs délais.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">5</span>
                        Cookies et Sécurité
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                        Nous utilisons des cookies essentiels pour maintenir votre session active et sécurisée. Nous mettons en œuvre des mesures de sécurité techniques (chiffrement, HTTPS) pour protéger vos données contre tout accès non autorisé.
                    </p>
                </section>
            </div>

            <div className="mt-20 pt-8 border-t text-center">
                <p className="text-muted-foreground">
                    Une question sur vos données ? Écrivez-nous à <a href="mailto:privacy@tunudrop.com" className="font-semibold text-foreground hover:underline">privacy@tunudrop.com</a>
                </p>
            </div>
        </div>
    )
}
