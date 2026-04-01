# Ainomiq.com — Project Guide

## What This Is
 ainomiq.com is the MARKETING WEBSITE for Ainomiq (AI automation company).
 This is NOT the app — the app is at app.ainomiq.com.
 
 ## CRITICAL RULES
 - NEVER touch app.ainomiq.com — that's a separate project
 - NEVER change the design, colors, layout, or sections
 - ONLY fix/improve TEXT content
 - ALWAYS check every page after deploying
 - ALL content must be in ENGLISH — no Dutch

## Brand Identity

 ### Colors
 - Dark navy: #0f1b2d
 - Blue accent: #3b82f6
 - White text on dark backgrounds

 ### Font
 - Plus Jakarta Sans

 ### Slogan
 - Always Ahead

 ### Style
 - Apple/Linear/Cursor inspired
 - Clean, dark, minimalist
 - Glassmorphism effects
 - Subtle animations
 - Futuristic CTA buttons with glow

## Company

 ### Who We Are
 - Founders: Pim (e-commerce specialist) + Bink (IT specialist)
 - Two young founders on the bleeding edge of AI
 - No outdated company with 100+ staff
 - We were the customer — we know the pain
 - "Brilliant friend who happens to be a tech genius"

 ### Mission
 - "Automate everything that doesn't need a human touch"

 ## Services

 ### App (app.ainomiq.com)
 - AI automation platform for e-commerce
 - Customer Service AI (200+ tickets/day)
 - Ad Management (Meta, Google, TikTok)
 - Email Marketing (Klaviyo)
 - Inventory tracking
 - Performance dashboard (FREE)
 - Prices: on the app itself (different per service)
 - CTA: "Start free" → app.ainomiq.com

 ### Enterprise
 - Custom AI systems for larger clients
 - Domino's, Alpine, SchoolRegister, Nerds
 - No public pricing — on request only
 - CTA: "Request access" → contact form

 ## Cases

 ### Enterprise
 - Domino's
 - Alpine
 - SchoolRegister
 - Nerds
 - (with logos)

 ### E-commerce
 - Billie Jeans
 - Smoothly
 - Button Amsterdam

 ## Tone of Voice

 ### DO
 - Be formal but not stiff
 - Be tech-heavy but accessible
 - Explain what it does without dumbing it down
 - Be specific: "200+ tickets/day" not "lots of tickets"
 - Use "You" (not "we" all the time)

 ### DON'T
 - Use buzzwords: synergy, leverage, disrupt, best-in-class
 - Be vague: "lots of", "many", "great"
 - Be corporate: no jargon, no fluff
 - Mix languages: ALL ENGLISH

 ## Site Structure

 ```
 ainomiq.com
 ├── / Home
 │   ├── Hero: "AI that works for your business"
 │   ├── Story: who we are
 │   ├── Why Us: 3 pillars (latest tech, 2 weeks live, no legacy)
 │   ├── Services preview (App + Enterprise)
 │   ├── Cases: Enterprise logos + E-commerce brands
 │   ├── Trust badges
 │   └── CTA: Book a call
 │
 ├── /app (or /ecommerce)
 │   ├── Features per service
 │   ├── Demo's/screenshots
 │   ├── CTA → app.ainomiq.com
 │
 ├── /enterprise
 │   ├── Cases with logos
 │   ├── What we build
 │   └── CTA → contact form
 │
 ├── /about
 │   ├── Story
 │   ├── Pim + Bink (photo placeholders)
 │   ├── Mission
 │   └── Core values
 │
 └── /contact
     └── Request form
 ```

 ## Deploy Process

 ### Project
 - GitHub: ainomiq/site
 - Vercel: ainomiq-site project
 - Domain: ainomiq.com

 ### Deploy
 ```bash
 cd /path/to/ainomiq-site
 # Make changes to text only
 git add -A && git commit -m "fix: description of changes"
 git push
 npx vercel --prod --yes
 ```

 ### After Deploy
 ALWAYS check every page:
 ```bash
 for page in "" "ecommerce" "enterprise" "academy" "about" "contact" "cases"; do
   curl -s "https://ainomiq.com/${page}" | sed 's/<[^>]*>//g' | grep -i "dutch_word"
 done
 ```

 ## Known Issues to Fix
 - Pricing section on ecommerce.html: should not show specific prices
 - Some pages still have Dutch text mixed in
 - Empty links (href="#") need real URLs
 - Enterprise logos needed (Domino's, Alpine, SchoolRegister, Nerds)
 - E-commerce brand logos needed (Billie Jeans, Smoothly, Button Amsterdam)

 ## What NOT To Do
 - Don't change colors (#0f1b2d, #3b82f6)
 - Don't change layout or sections
 - Don't add new sections
 - Don't remove existing sections
 - Don't change fonts
 - Don't change animations
 - Don't deploy without checking every page first
 - Don't touch app.ainomiq.com
 MD
 echo "CLAUDE.md created"