export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl prose dark:prose-invert">
            <h1>Politique de Confidentialité</h1>
            <p>Dernière mise à jour : 06 Janvier 2026</p>

            <h2>1. Collecte des Données</h2>
            <p>
                Nous collectons les informations nécessaires au bon fonctionnement du service : nom, email, et informations de paiement (traitées par Stripe/Wave).
            </p>

            <h2>2. Utilisation des Données</h2>
            <p>
                Vos données sont utilisées pour :
                <ul>
                    <li>Gérer votre compte et vos enchères.</li>
                    <li>Sécuriser les transactions.</li>
                    <li>Vous contacter concernant vos acquisitions.</li>
                </ul>
            </p>

            <h2>3. Partage des Données</h2>
            <p>
                Nous ne vendons jamais vos données personnelles. Elles peuvent être partagées avec des tiers uniquement pour l'exécution du service (ex: processeurs de paiement).
            </p>

            <h2>4. Vos Droits</h2>
            <p>
                Conformément aux lois en vigueur, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Contactez-nous pour exercer ces droits.
            </p>

            <h2>5. Cookies</h2>
            <p>
                Nous utilisons des cookies essentiels pour l'authentification et la sécurité.
            </p>
        </div>
    )
}
