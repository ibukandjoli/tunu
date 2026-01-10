export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Conditions Générales d'Utilisation (CGU)</h1>
            <p className="text-muted-foreground mb-12 italic">Dernière mise à jour : 06 Janvier 2026</p>

            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                        Introduction
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                        Bienvenue sur TUNU ("la Plateforme"). En accédant à notre site web et en utilisant nos services, vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation. Ces conditions régissent votre accès et votre utilisation de tous les services fournis par TUNU.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                        Description du Service
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                        TUNU est une plateforme d'enchères en ligne innovante proposant quotidiennement des projets digitaux à la vente. Ces actifs incluent, sans s'y limiter, des SaaS (Software as a Service), des sites E-commerce, des Applications Mobiles et des accoutns DNVB.
                    </p>
                    <p className="leading-relaxed text-muted-foreground mt-2">
                        Notre mission est de fluidifier le marché secondaire des actifs digitaux en assurant transparence et rapidité.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                        Inscription et Compte
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground marker:text-primary/50">
                        <li>Pour participer aux enchères, vous devez créer un compte utilisateur vérifié.</li>
                        <li>Vous certifiez que les informations fournies lors de l'inscription sont exactes et complètes.</li>
                        <li>Vous êtes seul responsable de la confidentialité de vos identifiants de connexion et de toutes les activités sur votre compte.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">4</span>
                        Déroulement des Enchères
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                        Chaque enchère est juridiquement contraignante. En plaçant une offre, vous vous engagez irrévocablement à acheter l'actif au prix indiqué si vous êtes le meilleur enchérisseur à la clôture de la vente.
                    </p>
                    <p className="leading-relaxed text-muted-foreground mt-2">
                        Toute tentative de manipulation des enchères entraînera une suspension immédiate du compte.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">5</span>
                        Paiement et Transfert
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                        Le paiement est sécurisé via nos partenaires bancaires (Stripe, Wave). Le paiement doit être effectué dans les délais spécifiés après la fin de l'enchère.
                    </p>
                    <p className="leading-relaxed text-muted-foreground mt-2">
                        Une fois les fonds sécurisés, le transfert de propriété (code source, noms de domaine, accès administrateur) est initié et complété sous 24 à 48 heures ouvrables.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">6</span>
                        Limitation de Responsabilité
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                        TUNU agit strictement en tant qu'intermédiaire technique. Bien que nous effectuons des vérifications diligentes sur chaque projet, nous ne saurions être tenus responsables des performances financières futures des business acquis. Il appartient à l'acheteur d'effectuer sa propre due diligence ("DYOR").
                    </p>
                </section>
            </div>

            <div className="mt-20 pt-8 border-t text-center">
                <p className="text-muted-foreground">
                    Pour toute question juridique, contactez-nous à <a href="mailto:legal@tunudrop.com" className="font-semibold text-foreground hover:underline">legal@tunudrop.com</a>
                </p>
            </div>
        </div>
    )
}
