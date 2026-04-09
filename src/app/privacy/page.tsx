import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Ainomiq",
  description: "How Ainomiq collects, uses, and protects your personal data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="pt-40 pb-24 px-6">
      <div className="mx-auto max-w-3xl prose prose-gray">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Privacybeleid</h1>
        <p className="text-ainomiq-text-muted mb-2">Ainomiq — ainomiq.com</p>
        <p className="text-ainomiq-text-muted mb-10">Versie 1.0 — 9 april 2026</p>

        <p className="p-4 rounded-xl bg-ainomiq-blue-glow text-sm text-ainomiq-text-muted mb-10">
          <strong>Let op:</strong> Onze applicatie (app.ainomiq.com) heeft een apart privacybeleid
          dat de verwerking van gegevens via onze integraties en AI-diensten beschrijft.{" "}
          <a href="https://app.ainomiq.com/privacy-policy" className="text-ainomiq-blue hover:underline">
            Lees het app-privacybeleid →
          </a>
        </p>

        <h2>1. Introductie</h2>
        <p>
          Dit privacybeleid beschrijft hoe Ainomiq (hierna: &quot;wij&quot;, &quot;ons&quot; of &quot;onze&quot;)
          persoonsgegevens verzamelt, verwerkt en beschermt via onze website ainomiq.com.
        </p>
        <p>
          Ainomiq is gevestigd in Nederland en opereert in overeenstemming met de Algemene Verordening
          Gegevensbescherming (AVG/GDPR), de Uitvoeringswet AVG (UAVG) en overige toepasselijke privacywetgeving.
        </p>
        <p>
          Verwerkingsverantwoordelijke: Ainomiq, gevestigd te Nederland. Voor vragen kunt u contact
          opnemen via <a href="mailto:privacy@ainomiq.com">privacy@ainomiq.com</a>.
        </p>

        <h2>2. Welke gegevens verzamelen wij</h2>

        <h3>2.1 Gegevens die u aan ons verstrekt</h3>
        <ul>
          <li><strong>Contactgegevens:</strong> naam, e-mailadres en eventueel bedrijfsnaam wanneer u een contactformulier invult, een offerte aanvraagt of zich aanmeldt voor onze nieuwsbrief.</li>
          <li><strong>Communicatie:</strong> berichten die u ons stuurt via e-mail, contactformulieren of andere kanalen, inclusief de inhoud en metadata van deze berichten.</li>
        </ul>

        <h3>2.2 Gegevens die automatisch worden verzameld</h3>
        <ul>
          <li><strong>Technische gegevens:</strong> IP-adres (geanonimiseerd), browsertype, besturingssysteem, verwijzende URL, bezochte pagina&apos;s, klikgedrag en sessieduur.</li>
          <li><strong>Cookies:</strong> functionele en analytische cookies. Zie sectie 7 voor ons cookiebeleid.</li>
        </ul>

        <h3>2.3 Wat wij niet verzamelen</h3>
        <p>
          Wij verzamelen geen bijzondere categorieën van persoonsgegevens (zoals gezondheidsgegevens
          of biometrische gegevens). Wij plaatsen geen tracking- of advertentiecookies en bouwen geen
          advertentieprofielen op.
        </p>

        <h2>3. Grondslagen voor verwerking</h2>
        <p>Wij verwerken persoonsgegevens op basis van de volgende rechtsgronden:</p>
        <ul>
          <li><strong>Toestemming (art. 6 lid 1 sub a AVG):</strong> voor het plaatsen van analytische cookies en het verzenden van nieuwsbrieven. U kunt deze toestemming te allen tijde intrekken.</li>
          <li><strong>Gerechtvaardigd belang (art. 6 lid 1 sub f AVG):</strong> voor het functioneren en beveiligen van onze website en het verbeteren van onze dienstverlening.</li>
          <li><strong>Uitvoering van de overeenkomst (art. 6 lid 1 sub b AVG):</strong> voor het beantwoorden van offerteaanvragen en contactverzoeken.</li>
        </ul>

        <h2>4. Doeleinden van verwerking</h2>
        <p>Wij gebruiken uw gegevens uitsluitend voor:</p>
        <ul>
          <li>Het beantwoorden van uw vragen en contactverzoeken</li>
          <li>Het versturen van gevraagde informatie, offertes of nieuwsbrieven</li>
          <li>Het analyseren en verbeteren van het gebruik van onze website</li>
          <li>Het waarborgen van de veiligheid en beschikbaarheid van onze website</li>
        </ul>
        <p>
          Wij verkopen uw gegevens niet. Wij delen uw gegevens niet met adverteerders.
          Wij gebruiken uw gegevens niet voor het trainen van AI-modellen.
        </p>

        <h2>5. Derde partijen en subverwerkers</h2>
        <p>Wij maken gebruik van de volgende derde partijen:</p>
        <ul>
          <li><strong>Vercel (hosting):</strong> hosting van onze website. Vercel verwerkt technische verzoekgegevens (IP-adres, headers) ten behoeve van het uitleveren van de website. Gevestigd in de VS; verwerking op basis van Standard Contractual Clauses (SCC&apos;s).</li>
          <li><strong>Anthropic (AI):</strong> levering van AI-taalmodellen die op de website worden ingezet. Gevestigd in de VS; verwerking op basis van Standard Contractual Clauses (SCC&apos;s).</li>
          <li><strong>GitHub (code hosting):</strong> hosting van de broncode van onze website. Geen directe verwerking van bezoekersgegevens. Gevestigd in de VS; verwerking op basis van Standard Contractual Clauses (SCC&apos;s).</li>
        </ul>
        <p>
          Met alle subverwerkers zijn verwerkersovereenkomsten afgesloten conform de vereisten van de AVG.
          Persoonsgegevens worden niet overgedragen aan partijen buiten de Europese Economische Ruimte (EER)
          zonder passende waarborgen conform Hoofdstuk V van de AVG.
        </p>

        <h2>6. Bewaartermijnen</h2>
        <p>Wij bewaren persoonsgegevens niet langer dan noodzakelijk:</p>
        <ul>
          <li><strong>Contactgegevens en communicatie:</strong> maximaal 2 jaar na het laatste contact, tenzij er een lopende overeenkomst is.</li>
          <li><strong>Nieuwsbrief-abonnees:</strong> tot het moment van uitschrijving, waarna gegevens binnen 30 dagen worden verwijderd.</li>
          <li><strong>Analytische gegevens:</strong> maximaal 26 maanden, waarna deze worden geanonimiseerd of verwijderd.</li>
        </ul>

        <h2>7. Cookiebeleid</h2>
        <p>Onze website maakt gebruik van de volgende categorieën cookies:</p>
        <ul>
          <li><strong>Strikt noodzakelijke cookies:</strong> vereist voor de basisfunctionaliteit van de website. Kunnen niet worden uitgeschakeld.</li>
          <li><strong>Analytische cookies:</strong> geanonimiseerde cookies voor het analyseren van websitegebruik. Worden alleen geplaatst met uw toestemming.</li>
        </ul>
        <p>
          Wij plaatsen geen tracking-, advertentie- of social media cookies. U kunt uw cookievoorkeuren
          te allen tijde aanpassen via uw browserinstellingen.
        </p>

        <h2>8. Beveiliging</h2>
        <p>
          Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen, waaronder:
        </p>
        <ul>
          <li>Versleuteling van data in transit (TLS 1.2+)</li>
          <li>Toegangscontrole op basis van het principle of least privilege</li>
          <li>Regelmatige beveiligingscontroles</li>
        </ul>
        <p>
          In het geval van een datalek dat een risico vormt voor uw rechten en vrijheden, stellen wij
          u en de Autoriteit Persoonsgegevens hiervan op de hoogte binnen 72 uur na ontdekking, conform
          artikel 33 en 34 van de AVG.
        </p>

        <h2>9. Uw rechten</h2>
        <p>Op grond van de AVG heeft u de volgende rechten:</p>
        <ul>
          <li><strong>Recht op inzage (art. 15):</strong> u kunt opvragen welke persoonsgegevens wij van u verwerken.</li>
          <li><strong>Recht op rectificatie (art. 16):</strong> u kunt verzoeken om onjuiste of onvolledige gegevens te corrigeren.</li>
          <li><strong>Recht op verwijdering (art. 17):</strong> u kunt verzoeken om verwijdering van uw persoonsgegevens.</li>
          <li><strong>Recht op beperking (art. 18):</strong> u kunt verzoeken om beperking van de verwerking.</li>
          <li><strong>Recht op dataportabiliteit (art. 20):</strong> u kunt verzoeken om uw gegevens in een gestructureerd, gangbaar en machineleesbaar formaat te ontvangen.</li>
          <li><strong>Recht van bezwaar (art. 21):</strong> u kunt bezwaar maken tegen verwerking op basis van gerechtvaardigd belang.</li>
          <li><strong>Recht op intrekking toestemming:</strong> waar verwerking is gebaseerd op toestemming, kunt u deze te allen tijde intrekken.</li>
        </ul>
        <p>
          U kunt uw rechten uitoefenen via <a href="mailto:privacy@ainomiq.com">privacy@ainomiq.com</a>.
          Wij reageren binnen 30 dagen. U heeft tevens het recht een klacht in te dienen bij de{" "}
          <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">
            Autoriteit Persoonsgegevens
          </a>.
        </p>

        <h2>10. Minderjarigen</h2>
        <p>
          Onze website is niet gericht op personen jonger dan 16 jaar. Wij verzamelen niet bewust
          persoonsgegevens van minderjarigen. Indien wij ontdekken dat wij onbedoeld gegevens van
          een minderjarige hebben verzameld, verwijderen wij deze onverwijld.
        </p>

        <h2>11. Wijzigingen</h2>
        <p>
          Wij behouden ons het recht voor dit privacybeleid te wijzigen. Bij substantiële wijzigingen
          informeren wij u via een melding op onze website, minimaal 30 dagen voor inwerkingtreding.
          De meest recente versie is altijd beschikbaar op ainomiq.com/privacy.
        </p>

        <h2>12. Contact</h2>
        <p>
          Voor vragen over dit privacybeleid:<br />
          <strong>Ainomiq</strong><br />
          E-mail: <a href="mailto:privacy@ainomiq.com">privacy@ainomiq.com</a><br />
          Website: <a href="https://ainomiq.com">ainomiq.com</a>
        </p>

        <hr className="my-16" />

        {/* English version */}
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-ainomiq-text-muted mb-2">Ainomiq — ainomiq.com</p>
        <p className="text-ainomiq-text-muted mb-10">Version 1.0 — April 9, 2026</p>

        <p className="p-4 rounded-xl bg-ainomiq-blue-glow text-sm text-ainomiq-text-muted mb-10">
          <strong>Note:</strong> Our application (app.ainomiq.com) has a separate privacy policy
          covering data processing for integrations and AI services.{" "}
          <a href="https://app.ainomiq.com/privacy-policy" className="text-ainomiq-blue hover:underline">
            Read the app privacy policy →
          </a>
        </p>

        <h2>1. Introduction</h2>
        <p>
          This privacy policy describes how Ainomiq (hereinafter: &quot;we&quot;, &quot;us&quot; or &quot;our&quot;)
          collects, processes and protects personal data through our website ainomiq.com.
        </p>
        <p>
          Ainomiq is established in the Netherlands and operates in compliance with the General Data
          Protection Regulation (GDPR), the Dutch GDPR Implementation Act (UAVG) and other applicable
          privacy legislation.
        </p>
        <p>
          Data Controller: Ainomiq, established in the Netherlands. For questions, please contact us
          at <a href="mailto:privacy@ainomiq.com">privacy@ainomiq.com</a>.
        </p>

        <h2>2. Data we collect</h2>

        <h3>2.1 Data you provide to us</h3>
        <ul>
          <li><strong>Contact information:</strong> name, email address and optionally company name when you submit a contact form, request a quote or subscribe to our newsletter.</li>
          <li><strong>Communications:</strong> messages you send us via email, contact forms or other channels, including the content and metadata of these messages.</li>
        </ul>

        <h3>2.2 Data collected automatically</h3>
        <ul>
          <li><strong>Technical data:</strong> IP address (anonymized), browser type, operating system, referring URL, pages visited, click behavior and session duration.</li>
          <li><strong>Cookies:</strong> functional and analytical cookies. See section 7 for our cookie policy.</li>
        </ul>

        <h3>2.3 Data we do not collect</h3>
        <p>
          We do not collect special categories of personal data (such as health data or biometric data).
          We do not place tracking or advertising cookies and do not build advertising profiles.
        </p>

        <h2>3. Legal basis for processing</h2>
        <p>We process personal data on the following legal grounds:</p>
        <ul>
          <li><strong>Consent (Art. 6(1)(a) GDPR):</strong> for placing analytical cookies and sending newsletters. You may withdraw this consent at any time.</li>
          <li><strong>Legitimate interest (Art. 6(1)(f) GDPR):</strong> for the functioning and security of our website and improving our services.</li>
          <li><strong>Performance of contract (Art. 6(1)(b) GDPR):</strong> for responding to quote requests and contact inquiries.</li>
        </ul>

        <h2>4. Purposes of processing</h2>
        <p>We use your data exclusively for:</p>
        <ul>
          <li>Responding to your inquiries and contact requests</li>
          <li>Sending requested information, quotes or newsletters</li>
          <li>Analyzing and improving the use of our website</li>
          <li>Ensuring the security and availability of our website</li>
        </ul>
        <p>
          We do not sell your data. We do not share your data with advertisers.
          We do not use your data to train AI models.
        </p>

        <h2>5. Third parties and sub-processors</h2>
        <p>We use the following third parties:</p>
        <ul>
          <li><strong>Vercel (hosting):</strong> hosting of our website. Vercel processes technical request data (IP address, headers) for the purpose of serving the website. Established in the US; processing based on Standard Contractual Clauses (SCCs).</li>
          <li><strong>Anthropic (AI):</strong> provision of AI language models used on the website. Established in the US; processing based on Standard Contractual Clauses (SCCs).</li>
          <li><strong>GitHub (code hosting):</strong> hosting of our website source code. No direct processing of visitor data. Established in the US; processing based on Standard Contractual Clauses (SCCs).</li>
        </ul>
        <p>
          We have entered into data processing agreements with all sub-processors in accordance with GDPR
          requirements. Personal data is not transferred to parties outside the European Economic Area (EEA)
          without appropriate safeguards in accordance with Chapter V of the GDPR.
        </p>

        <h2>6. Retention periods</h2>
        <p>We do not retain personal data longer than necessary:</p>
        <ul>
          <li><strong>Contact information and communications:</strong> up to 2 years after the last contact, unless there is an ongoing agreement.</li>
          <li><strong>Newsletter subscribers:</strong> until the moment of unsubscription, after which data is deleted within 30 days.</li>
          <li><strong>Analytical data:</strong> up to 26 months, after which it is anonymized or deleted.</li>
        </ul>

        <h2>7. Cookie policy</h2>
        <p>Our website uses the following categories of cookies:</p>
        <ul>
          <li><strong>Strictly necessary cookies:</strong> required for the basic functionality of the website. These cannot be disabled.</li>
          <li><strong>Analytical cookies:</strong> anonymized cookies for analyzing website usage. Only placed with your consent.</li>
        </ul>
        <p>
          We do not place tracking, advertising or social media cookies. You can adjust your cookie
          preferences at any time through your browser settings.
        </p>

        <h2>8. Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal data, including:
        </p>
        <ul>
          <li>Encryption of data in transit (TLS 1.2+)</li>
          <li>Access control based on the principle of least privilege</li>
          <li>Regular security assessments</li>
        </ul>
        <p>
          In the event of a data breach that poses a risk to your rights and freedoms, we will notify
          you and the Dutch Data Protection Authority (Autoriteit Persoonsgegevens) within 72 hours of
          discovery, in accordance with Articles 33 and 34 of the GDPR.
        </p>

        <h2>9. Your rights</h2>
        <p>Under the GDPR, you have the following rights:</p>
        <ul>
          <li><strong>Right of access (Art. 15):</strong> you may request information about which personal data we process about you.</li>
          <li><strong>Right to rectification (Art. 16):</strong> you may request correction of inaccurate or incomplete data.</li>
          <li><strong>Right to erasure (Art. 17):</strong> you may request deletion of your personal data.</li>
          <li><strong>Right to restriction (Art. 18):</strong> you may request restriction of the processing of your data.</li>
          <li><strong>Right to data portability (Art. 20):</strong> you may request to receive your data in a structured, commonly used and machine-readable format.</li>
          <li><strong>Right to object (Art. 21):</strong> you may object to processing based on legitimate interest.</li>
          <li><strong>Right to withdraw consent:</strong> where processing is based on consent, you may withdraw it at any time.</li>
        </ul>
        <p>
          You may exercise your rights by contacting us at <a href="mailto:privacy@ainomiq.com">privacy@ainomiq.com</a>.
          We will respond within 30 days. You also have the right to lodge a complaint with the{" "}
          <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">
            Dutch Data Protection Authority
          </a>.
        </p>

        <h2>10. Children</h2>
        <p>
          Our website is not directed at individuals under the age of 16. We do not knowingly collect
          personal data from minors. If we discover that we have inadvertently collected data from a
          minor, we will delete it without delay.
        </p>

        <h2>11. Changes to this privacy policy</h2>
        <p>
          We reserve the right to amend this privacy policy. In the event of material changes, we will
          inform you via a notification on our website, at least 30 days before the change takes effect.
          The most recent version is always available at ainomiq.com/privacy.
        </p>

        <h2>12. Contact</h2>
        <p>
          For questions regarding this privacy policy:<br />
          <strong>Ainomiq</strong><br />
          Email: <a href="mailto:privacy@ainomiq.com">privacy@ainomiq.com</a><br />
          Website: <a href="https://ainomiq.com">ainomiq.com</a>
        </p>
      </div>
    </main>
  );
}
