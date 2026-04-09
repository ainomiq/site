import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions — Ainomiq",
  description: "Terms and conditions for using Ainomiq services and platform.",
};

export default function TermsOfService() {
  return (
    <main className="pt-40 pb-24 px-6">
      <div className="mx-auto max-w-3xl prose prose-gray">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Terms and Conditions</h1>
        <p className="text-ainomiq-text-muted mb-2">Ainomiq</p>
        <p className="text-ainomiq-text-muted mb-10">Last updated: April 9, 2026</p>

        <p>
          These Terms and Conditions (&quot;Terms&quot;) apply to the use of the website ainomiq.com
          (&quot;Website&quot;), the Ainomiq e-commerce platform and associated applications
          (&quot;Platform&quot;), and all services offered by Ainomiq (&quot;Services&quot;). By using
          the Website, Platform, or Services, you agree to these Terms.
        </p>
        <p>
          Ainomiq is a trade name of Ainomiq, registered at the Dutch Chamber of Commerce (Kamer van
          Koophandel) under number 42032616, hereinafter referred to as &quot;Ainomiq&quot;, &quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;.
        </p>

        <h2>1. Definitions</h2>
        <ul>
          <li><strong>&quot;User&quot;:</strong> any natural or legal person who visits the Website, uses the Platform, or purchases Services.</li>
          <li><strong>&quot;Platform&quot;:</strong> the Ainomiq e-commerce platform, including AI agents, dashboards, integrations, and associated functionality.</li>
          <li><strong>&quot;Services&quot;:</strong> all services provided by Ainomiq, including but not limited to AI automation, platform access, custom projects, and consultancy.</li>
          <li><strong>&quot;Subscription&quot;:</strong> a recurring payment plan for access to the Platform.</li>
          <li><strong>&quot;Custom Project&quot;:</strong> a project-based engagement with a defined scope and fee.</li>
          <li><strong>&quot;Content&quot;:</strong> all text, images, data, configurations, AI models, and other materials made available through the Website or Platform.</li>
        </ul>

        <h2>2. Description of Services</h2>
        <p>
          Ainomiq provides an AI automation platform for e-commerce businesses. The Platform integrates
          with external tools and platforms (including Shopify, WooCommerce, Magento, Lightspeed, and
          Bol.com) and uses AI agents that automate business processes, including customer service,
          marketing automation, and product recommendations.
        </p>
        <p>
          Additionally, Ainomiq offers custom automation solutions on a project basis, including process
          automation, data analytics, document processing, and strategic consulting.
        </p>

        <h2>3. Account Registration and Security</h2>
        <p>
          To use the Platform, you must create an account. You are responsible for providing accurate and
          up-to-date information and for maintaining the confidentiality of your login credentials.
        </p>
        <p>
          You are fully responsible for all activities that occur under your account. Ainomiq shall not be
          liable for damages resulting from unauthorized use of your account due to negligence in protecting
          your credentials.
        </p>
        <p>
          Ainomiq reserves the right to refuse, suspend, or terminate accounts in the event of abuse or
          violation of these Terms.
        </p>

        <h2>4. Subscriptions, Billing, and Payment</h2>

        <h3>4.1 Subscriptions (Platform)</h3>
        <p>
          Access to the Platform is offered through monthly recurring subscriptions. Billing is processed
          via Stripe or a payment provider designated by us.
        </p>
        <ul>
          <li>Subscription fees are charged monthly in advance.</li>
          <li>All amounts are in euros and exclusive of VAT, unless stated otherwise.</li>
          <li>Price changes will be communicated at least 30 days in advance.</li>
        </ul>

        <h3>4.2 Custom Projects</h3>
        <p>
          Custom projects are invoiced on a project basis in accordance with a pre-agreed quotation.
          Payment is made according to the payment terms set out in the quotation.
        </p>

        <h3>4.3 Refunds</h3>
        <p>
          All fees are non-refundable, unless expressly provided otherwise in these Terms or in a separate agreement.
        </p>

        <h2>5. Intellectual Property</h2>

        <h3>5.1 Ainomiq&apos;s Ownership</h3>
        <p>
          All intellectual property rights relating to the Platform, Website, Content, AI configurations,
          skills, workflows, and underlying technology are owned by Ainomiq or its licensors. Nothing in
          these Terms transfers any ownership rights to the User.
        </p>
        <p>
          You are granted a limited, non-exclusive, non-transferable, non-sublicensable, and revocable
          license to use the Platform for the duration of your Subscription, solely for your own business operations.
        </p>

        <h3>5.2 User&apos;s Ownership</h3>
        <p>
          You retain all rights to your own business data, content, and materials that you upload to or
          process through the Platform. Ainomiq does not claim any ownership rights over your data.
        </p>

        <h2>6. Prohibited Conduct</h2>
        <p>You may not:</p>
        <ul>
          <li>Reverse engineer, decompile, or disassemble the Platform or Services.</li>
          <li>Copy, extract, or scrape AI configurations, skills, workflows, or other proprietary components.</li>
          <li>Resell, redistribute, or sublicense access to the Platform.</li>
          <li>Create derivative works based on the Platform or Content.</li>
          <li>Circumvent or tamper with security measures.</li>
          <li>Gain unauthorized access to data or accounts of other users.</li>
          <li>Use the Platform for illegal purposes.</li>
          <li>Benchmark or scrape the Platform for the purpose of building competing products.</li>
        </ul>

        <h2>7. Suspension and Termination</h2>

        <h3>7.1 Immediate Suspension</h3>
        <p>
          Violation of Section 5 (Intellectual Property) or Section 6 (Prohibited Conduct) will result in
          the immediate and automatic suspension of your account, without prior notice. In such cases, no
          refund, credit, or pro-rata reimbursement of any fees paid shall be issued.
        </p>

        <h3>7.2 Cancellation by User</h3>
        <p>
          You may cancel your Subscription at any time. Cancellation takes effect at the end of the current
          billing period. You will retain access to the Platform until that time.
        </p>

        <h3>7.3 Termination by Ainomiq</h3>
        <p>
          Ainomiq may suspend or terminate your account with or without cause. In the event of termination
          for breach of these Terms, no refund shall be issued. In the event of termination without cause
          on your part, you will receive a pro-rata refund for the remaining subscription period.
        </p>

        <h2>8. Your Data and Credentials</h2>
        <p>
          Ainomiq handles your data with care. API keys and third-party login credentials are stored
          exclusively within your own platform environment and not in centralized systems.
        </p>
        <p>
          Support staff have limited access to your environment. Infrastructure teams may only access
          instances for maintenance purposes, with restrictions on viewing your data.
        </p>
        <p>
          For detailed information on data processing, please refer to our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>

        <h2>9. Third-Party AI Providers and Integrations</h2>
        <p>
          The Platform uses third-party AI providers (including, but not limited to, Claude by Anthropic,
          OpenAI, and Google Gemini) and integrates with external platforms. Your use of these services is
          subject to the terms and conditions of the respective providers.
        </p>
        <p>
          Ainomiq assumes no liability for the performance, availability, or output of third-party AI
          providers or integrated platforms.
        </p>

        <h2>10. Disclaimer of Warranties</h2>
        <p className="uppercase font-semibold text-sm">
          The Platform and Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis,
          without warranties of any kind, whether express or implied.
        </p>
        <p>
          Ainomiq does not warrant that AI-generated output is error-free, complete, or fit for a particular
          purpose. The User is responsible at all times for verifying and validating AI output before acting upon it.
        </p>
        <p>
          Ainomiq does not guarantee uninterrupted or error-free operation of the Platform.
        </p>

        <h2>11. Limitation of Liability</h2>
        <p>
          Ainomiq&apos;s total liability is limited to the amount you have paid to Ainomiq in the three months
          preceding the event giving rise to the claim.
        </p>
        <p>
          In no event shall Ainomiq be liable for indirect, incidental, special, consequential, or punitive
          damages, including but not limited to lost profits, lost data, or business interruption.
        </p>
        <p>
          This limitation applies regardless of the legal basis (contract, tort, or otherwise) and even if
          Ainomiq has been advised of the possibility of such damages.
        </p>

        <h2>12. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Ainomiq, its directors, employees, and partners against
          all claims, demands, damages, costs, and expenses (including reasonable legal fees) arising from:
        </p>
        <ul>
          <li>Your use of the Platform or Services.</li>
          <li>Violation of these Terms.</li>
          <li>Violation of applicable laws or regulations.</li>
          <li>Infringement of third-party intellectual property rights.</li>
          <li>Actions performed by AI agents on your connected accounts or systems.</li>
        </ul>

        <h2>13. Governing Law and Dispute Resolution</h2>
        <p>
          These Terms are governed by the laws of the Netherlands. All disputes arising out of or in
          connection with these Terms shall be submitted exclusively to the competent court in Amsterdam,
          the Netherlands.
        </p>

        <h2>14. Modifications</h2>
        <p>
          Ainomiq reserves the right to modify these Terms. Material changes shall be communicated at least
          fifteen (15) days prior to taking effect, via email or a notification on the Platform.
        </p>
        <p>
          Continued use of the Platform or Services after modified Terms take effect constitutes acceptance
          of those changes.
        </p>

        <h2>15. Severability</h2>
        <p>
          If any provision of these Terms is found to be invalid or unenforceable, that provision shall be
          modified to the minimum extent necessary to achieve enforceability, while preserving its original
          intent. The remaining provisions shall continue in full force and effect.
        </p>

        <h2>16. Entire Agreement</h2>
        <p>
          These Terms, together with the <Link href="/privacy">Privacy Policy</Link> and any supplementary
          agreements, constitute the entire agreement between you and Ainomiq with respect to the use of
          the Website, Platform, and Services.
        </p>

        <h2>17. Contact</h2>
        <p>
          If you have any questions about these Terms, you can reach us at:<br />
          <strong>Ainomiq</strong><br />
          Email: <a href="mailto:info@ainomiq.com">info@ainomiq.com</a><br />
          Website: <a href="https://ainomiq.com">ainomiq.com</a>
        </p>
      </div>
    </main>
  );
}
