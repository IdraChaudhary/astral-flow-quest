# AstroLive Journey

Absolutely. Since you already have the AstroLive 2.0 flow, don't ask Lovable to "design an astrology app" broadly. Give it a strict product + UI + interaction specification so it builds the prototype around your exact flow.

Copy-paste this entire prompt into Lovable:

Build a polished, fully interactive web prototype called:

ASTROLIVE 2.0
AI-powered discovery, trust & habit-forming astrology platform

This is a PRODUCT MANAGEMENT HACKATHON prototype for AstroHack 2026. The prototype must demonstrate a complete end-to-end user journey, not just static screens.

IMPORTANT:
- Build a working frontend prototype.
- Every major button must work.
- Use mock data only; no real payment, astrology API, AI API, or authentication is required.
- Use localStorage/state so user selections, streak, predictions, feedback and profile changes persist during the session.
- The prototype should feel like a real production mobile-first astrology product.
- Do NOT remove or redesign the core functionality specified below.
- Keep existing AstroLive services visible but clearly separate them from the new 2.0 features.
- The primary focus is AI-powered astrologer discovery, trust, retention and prediction accountability.
- Make the UI polished enough for a hackathon judging demo.

==================================================
1. DESIGN DIRECTION
==================================================

Create a modern premium astrology product.

Visual style:
- Clean white/light lavender background.
- Deep navy/purple primary text.
- Purple/violet primary CTA.
- Soft green for positive/success states.
- Warm gold/yellow for trust, astrology and important highlights.
- Rounded cards.
- Subtle shadows.
- Modern typography.
- Spacious layout.
- Avoid excessive gradients.
- Avoid a childish "fortune teller" aesthetic.
- The product should feel like a serious modern consumer-tech product with an astrology layer.

Use subtle astrology visual elements:
- small stars
- moon icons
- constellation patterns
- zodiac-inspired decorative elements

Do not overload the interface with astrology graphics.

Desktop:
- centered application container approximately 1200px wide.
- dashboard can use a sidebar/navigation structure where appropriate.

Mobile:
- responsive mobile layout.
- bottom navigation for Home, Journey, Astrologers and Profile.

The prototype must work well on both desktop and mobile.

==================================================
2. CORE PRODUCT IDEA
==================================================

AstroLive 2.0 solves three major problems:

1. Users don't always know which astrologer is right for their specific concern.
2. Users have limited reasons to return between consultations.
3. Users have limited ways to evaluate whether an astrologer's predictions were useful or accurate over time.

The solution introduces:

A. AI TRIAGE
Understand the user's problem and categorize it.

B. TRUST SCORE
Help users evaluate astrologers using transparent signals such as experience, specialization, user feedback, prediction consistency and specificity.

C. DAILY HABIT LOOP
Personalized daily insight + streak.

D. PREDICTION ACCOUNTABILITY
Save predictions after consultations and ask users later whether they came true.

E. REFERRAL LOOP
Allow users to invite friends and unlock a free AI triage session.

Existing AstroLive services remain available.

==================================================
3. APP STRUCTURE
==================================================

Create these routes/screens:

/
 /login
 /personalization
 /home
 /triage
 /analysis
 /astrologers
 /astrologer/:id
 /consultation
 /consultation-summary
 /prediction/:id
 /journey
 /trust-score/:id
 /referral
 /profile
 /logout

Use client-side routing.

The user should be able to navigate through the entire main flow without encountering dead ends.

==================================================
4. SCREEN 1 — LOGIN / SIGN UP
==================================================

Route: /login

Header:
ASTROLIVE logo.

Main content:

"Sign in to continue"

Buttons:
- Continue with Google
- Continue with Phone

Text:
"New user? Create account"

Interaction:
- Clicking either login button should simulate successful authentication.
- Show a small loading state for approximately 500ms.
- Then navigate to /personalization.
- No real OAuth is needed.

Use a demo user:
Name: Idra
Email: idra@example.com

==================================================
5. SCREEN 2 — PERSONALIZATION
==================================================

Route: /personalization

Heading:

"What brings you here today?"

Subheading:

"Choose one or more areas you'd like guidance on."

Selectable chips:

Career
Love & Relationships
Money
Family
Personal Growth
Just Curious

Allow multiple selections.

Default demo selection:
Career

CTA:
"Continue"

Validation:
At least one category must be selected.

On continue:
Save selected categories to localStorage/state.
Navigate to /home.

==================================================
6. SCREEN 3 — HOME DASHBOARD
==================================================

Route: /home

Greeting:

"Good morning, Idra 👋"

Main card:

YOUR DAILY INSIGHT

Focus: Career

Example text:

"You may find new opportunities if you take one small step today."

Button:
"View Full Insight"

Clicking opens a modal containing:
- Today's focus
- Short personalized interpretation
- One suggested action
- Close button

Second card:

"7 Day Streak 🔥"

Display 7 circular day indicators.

Example:
Day 1 through Day 7 completed.
Day 8 and 9 inactive.

Include:
"You're doing great!"

Third card:

"Need Guidance?"

Text:
"Tell us what's on your mind. Our AI will understand and guide you."

CTA:
"What's on my mind?"

Click -> /triage

Also include a clearly separated section:

OTHER EXISTING SERVICES

These are existing services and should remain visually secondary.

Create cards:

Book a Pooja
Free Services
Wallet
AstroRemedy
Astrology Blog
Chat with Astrologers
My Kundli
My Orders
Support Chat

These cards can show realistic UI feedback/modal such as:
"This existing AstroLive service is available in the full product."

Do not build full functionality for these services.

==================================================
7. SCREEN 4 — AI TRIAGE
==================================================

Route: /triage

Heading:

"What's on your mind?"

Show AI assistant interface.

Initial user message:

"I'm confused about whether I should accept this job offer."

AI response:

"I understand. I'll help you with that. Let me ask a few quick questions."

Question:

"What matters most to you right now?"

Selectable chips:

Salary
Growth
Stability
Work-life Balance

Then:

"Any specific concern you want clarity on?"

Text input.

Demo default:
"Will accepting this opportunity be good for my career?"

CTA button:
arrow/send icon.

Interaction:
When submitted:
- Show AI processing animation for 800ms.
- Navigate to /analysis.

==================================================
8. SCREEN 5 — AI ANALYSIS / ISSUE CATEGORY
==================================================

Route: /analysis

Show processing state briefly:

"We've understood your concern."

Then display:

"Your Concern"

Large category card:

Career → Job Decision

Below:

"Let's find the best astrologers for you."

Show animated loading indicator for approximately 1000ms.

Then automatically navigate to /astrologers.

Also show a small explanation:

"We matched your concern with astrologers based on specialization, experience, user feedback and Trust Score."

==================================================
9. SCREEN 6 — RECOMMENDED ASTROLOGERS
==================================================

Route: /astrologers

Heading:

"Top matches for you"

Subheading:

"Recommended based on your concern"

Display 3 astrologer cards.

ASTROLOGER A
- Career Specialist
- Trust Score: 82
- ₹15/min
- 10+ years experience
- High success in job decision queries

ASTROLOGER B
- Vedic Expert
- Trust Score: 76
- ₹12/min
- 8+ years experience

ASTROLOGER C
- Career & Finance Expert
- Trust Score: 74
- ₹18/min
- 9+ years experience

Each card:
- avatar
- name
- specialization
- Trust Score
- price
- rating
- View Profile button
- Start Consultation button

Make AstroLoger A visually recommended.

Badge:
"Best Match"

When clicking "Why this match?" open a side panel/modal:

WHY THIS MATCH?

✓ Career specialist
✓ High success in job decision queries
✓ Strong positive prediction feedback
✓ Trust Score 82

Button:
"Close"

Click View Profile -> /astrologer/a

Click Start Consultation -> /consultation

==================================================
10. SCREEN 7 — ASTROLOGER PROFILE + TRANSPARENT PRICING
==================================================

Route: /astrologer/a

Profile:

Astrologer A

Career Specialist

Trust Score 82/100

Star rating.

About:

"10+ years experience in career counselling and job decision queries."

Show transparent pricing:

₹15/min
Astrologer Fee: ₹15/min
Platform Fee: ₹3/min
Total: ₹18/min

Estimated cost for 10 min:
₹180

IMPORTANT:
Clearly explain that this is a prototype estimate.

Buttons:
Chat
Call
Video Call

Primary CTA:
"Start Consultation"

Click -> /consultation

==================================================
11. SCREEN 8 — CONSULTATION
==================================================

Route: /consultation

Create a realistic chat consultation UI.

Header:
Astrologer A
Career Specialist
Online indicator
Timer

Conversation:

Astrologer:
"I see strong potential in this opportunity, but there are a few things to evaluate carefully."

User:
"What should I keep in mind?"

Astrologer:
"Focus on long-term growth and skill building. Avoid rushing the decision."

Include:
- message input
- send button
- microphone icon
- consultation timer
- estimated cost

Demo timer should start automatically.

Estimated cost should update based on elapsed demo time, but keep it simple.

Red end-call button.

When user clicks end consultation:
Show confirmation modal:

"End consultation?"

Buttons:
Continue
End Consultation

End Consultation -> /consultation-summary

==================================================
12. SCREEN 9 — CONSULTATION SUMMARY
==================================================

Route: /consultation-summary

Heading:

"Consultation Summary"

Topic:
Career → Job Decision

Section:

KEY GUIDANCE

• Evaluate long-term growth
• Don't rush the decision
• Better clarity may come within 2 weeks

Section:

PREDICTION SAVED

"You will receive a job opportunity within the next 2–3 months."

CTA:
"Set Reminder"

Click:
Show success toast:
"Prediction reminder set for 2 months from now."

Also show:

"Your prediction has been added to My Journey."

CTA:
"Back to Home"

==================================================
13. SCREEN 10 — PREDICTION ACCOUNTABILITY TRACKER
==================================================

Route: /prediction/:id

Heading:

"Prediction Accountability"

Subheading:

"We'd like to check on your previous prediction."

Card:

Prediction
(Aug 10, 2025)

"You will receive a job opportunity within the next 2–3 months."

Question:

"Did this come true?"

Buttons:

Yes
Partially
No

Also:

"Add a note (optional)"

Text area.

CTA:
"Submit Feedback"

After selection:
Show success state:

"Thanks for helping improve prediction transparency."

Show:
"Your feedback contributes to the astrologer's Trust Score."

Save response to localStorage/state.

==================================================
14. SCREEN 11 — TRUST SCORE UPDATE
==================================================

Route: /trust-score/a

Show:

Astrologer A
Career Specialist

Updated Trust Score

83 / 100

Badge:
↑ Improved

Explain:

"Based on user feedback, prediction accountability, consistency and specificity."

Show a visual breakdown:

Experience
████████░░ 90%

User Feedback
████████░░ 88%

Prediction Consistency
███████░░░ 78%

Specificity
████████░░ 84%

IMPORTANT:
This is a prototype scoring model, not a real scientific accuracy score.

Include information icon with tooltip:

"Trust Score is a transparent prototype metric designed to help users compare astrologers. It should not be interpreted as a guarantee of prediction accuracy."

==================================================
15. SCREEN 12 — MY JOURNEY
==================================================

Route: /journey

Heading:

"My Journey"

Show dashboard cards:

Daily Streak
7 days

Consultations
6

Predictions Tracked
5

Feedback Given
3

Show timeline:

Aug 10
Career consultation
Prediction saved

Aug 17
Prediction follow-up
Feedback submitted

Aug 18
Trust Score updated

CTA:
"View Full History"

Also show:

"Keep your streak going 🔥"

Daily check-in CTA.

==================================================
16. SCREEN 13 — REFERRAL LOOP
==================================================

Route: /referral

Heading:

"Invite a friend"

Subheading:

"Both you and your friend get a free AI Triage Session."

Show referral card:

Your referral link:

astrolive.com/ref/idra20

Button:
"Copy Link"

Click:
Copy to clipboard.
Show toast:
"Referral link copied!"

Buttons:

WhatsApp
Instagram
More

These can simulate sharing with a toast:
"Share flow opened."

Show:

Friends joined: 3
Free sessions earned: 3

IMPORTANT:
This should be presented as a product-led referral loop, not just a generic referral page.

Explain:

"Your friend gets personalized guidance. You unlock an additional AI triage session."

==================================================
17. SCREEN 14 — PROFILE & SETTINGS
==================================================

Route: /profile

Heading:

"My Profile"

Options:

My Profile
Edit Birth Details
Notification Settings
Language
Privacy & Security
Help & Support
Logout

Make each option clickable.

For settings, use modals or simple functional screens.

Logout -> /logout

==================================================
18. SCREEN 15 — LOGOUT
==================================================

Route: /logout

Confirmation:

"Are you sure you want to logout?"

Buttons:

"Yes, Logout"
"Cancel"

Yes, Logout:
Clear temporary session state.
Navigate to /login.

Cancel:
Navigate to /profile.

==================================================
19. NAVIGATION
==================================================

Create persistent navigation after login.

Desktop navigation:

Home
My Journey
Astrologers
Profile

Mobile bottom navigation:

Home
Journey
Astrologers
Profile

Also include a floating or prominent "What's on my mind?" CTA on Home.

The main demo flow must be:

Login
↓
Personalization
↓
Home
↓
What's on my mind
↓
AI Triage
↓
AI Analysis
↓
Recommended Astrologers
↓
Why this match
↓
Astrologer Profile
↓
Consultation
↓
Consultation Summary
↓
Prediction Tracker
↓
Trust Score Update
↓
My Journey
↓
Referral

==================================================
20. FUTURE ROADMAP SECTION
==================================================

Add a small "Future Roadmap" section on the Journey or Profile page.

Show:

1. Billing Transparency Copilot
Auto-refund and dispute handling.

2. Membership Plans
Free triage + priority access.

3. Paid AI Pre-Report
Detailed written interpretation before astrologer consultation.

4. Live Sessions / Community
Trusted astrologers Q&A.

Mark all of these clearly as:
"Coming Soon"

Do NOT make them core prototype flows.

==================================================
21. DATA + FUNCTIONALITY
==================================================

Use mock data objects for:

User
Astrologers
Consultations
Predictions
Trust Scores
Referral data
Daily streak

Use localStorage for:

- selected personalization categories
- logged-in state
- daily streak
- prediction feedback
- referral count
- profile settings
- consultation history

Create reusable components:

Button
Card
Modal
Toast
AstrologerCard
TrustScore
BottomNavigation
TopNavigation
ChatMessage
PredictionCard
ProgressBar
LoadingState

Use clean component architecture.

==================================================
22. INTERACTIONS THAT MUST WORK
==================================================

Do not create fake buttons that do nothing.

At minimum:

Login buttons → Personalization

Personalization chips → selectable

Continue → Home

Daily Insight → modal

What's on my mind → Triage

Triage options → selectable

Triage submit → Analysis

Analysis → Astrologers

Why this match → modal

View Profile → Astrologer Profile

Start Consultation → Consultation

Chat messages → send new message

End Consultation → confirmation → Summary

Set Reminder → success toast

Prediction feedback → selected state

Submit Feedback → saved + Trust Score update

Journey → history

Referral copy → clipboard + toast

Profile → settings

Logout → confirmation → Login

Mobile navigation → correct routes

==================================================
23. AI BEHAVIOUR
==================================================

DO NOT use a real AI API.

Create a deterministic mock AI experience.

The AI should classify user input into:

Career
Love & Relationships
Money
Family
Personal Growth

For the demo question:

"I'm confused about whether I should accept this job offer."

Return:

Category:
Career → Job Decision

Recommended priorities:
Growth
Stability
Salary

Then recommend astrologers according to specialization and Trust Score.

Show realistic loading animations to make the experience feel AI-powered.

==================================================
24. TRUST SCORE LOGIC
==================================================

Use a transparent prototype formula.

Example:

Trust Score =
30% User Feedback
25% Prediction Consistency
20% Specificity
15% Experience
10% Session Quality

Display the components visually.

Do NOT claim this is scientifically validated.

When prediction feedback is submitted as "Yes", increase the demo astrologer's Trust Score from 82 to 83.

When "Partially", increase by 0.5.

When "No", decrease by 1.

Round the displayed score appropriately.

==================================================
25. RESPONSIVE REQUIREMENTS
==================================================

The prototype must work at:

Mobile width: 390px
Tablet: 768px
Desktop: 1440px

On mobile:
- cards stack vertically
- navigation becomes bottom navigation
- modals become bottom sheets where appropriate
- buttons remain easy to tap
- consultation chat fills screen

On desktop:
- use centered max-width layout
- use two-column layouts where useful
- preserve generous whitespace

==================================================
26. ACCESSIBILITY + UX
==================================================

Use:
- clear contrast
- visible focus states
- keyboard accessible buttons
- descriptive labels
- readable font sizes
- clear success/error messages

Forms should have labels.

Buttons should have hover states.

Loading states should be visible.

Never leave users wondering whether their action worked.

==================================================
27. DEMO MODE
==================================================

Add a subtle "Demo Mode" indicator in the footer or profile.

The app is a hackathon prototype.

Do not make claims that real astrology predictions are guaranteed.

Use realistic mock content.

==================================================
28. IMPORTANT PRODUCT STORY
==================================================

The UI should communicate this product loop:

PERSONALIZATION
↓
DAILY INSIGHT
↓
USER HAS A QUESTION
↓
AI TRIAGE
↓
UNDERSTANDS THE USER
↓
MATCHES THE RIGHT ASTROLOGER
↓
TRANSPARENT TRUST SCORE
↓
CONSULTATION
↓
PREDICTION SAVED
↓
FOLLOW-UP
↓
USER FEEDBACK
↓
TRUST SCORE UPDATE
↓
MY JOURNEY
↓
DAILY RETURN
↓
REFERRAL
↓
NEW USER

This is the central product loop of the prototype.

==================================================
29. HOME PAGE PRIORITY
==================================================

The Home page must immediately communicate the three new AstroLive 2.0 pillars:

1. Personalized Daily Insight
2. AI Guidance
3. Trusted Astrologer Discovery

Use three visually strong cards for these.

Existing AstroLive services should be visible below them under:

"More AstroLive Services"

Do not allow existing services to visually overpower the new 2.0 experience.

==================================================
30. FINAL QUALITY BAR
==================================================

The final result must NOT look like a generic AI-generated template.

It should look like a polished startup product prototype suitable for a Product Management hackathon.

Prioritize:
- excellent hierarchy
- consistent spacing
- consistent cards
- polished micro-interactions
- clear user journey
- believable product copy
- strong empty/loading/success states
- realistic astrologer profiles
- transparent pricing
- strong Trust Score visualization
- strong prediction accountability experience
- visually compelling dashboard

The prototype should be understandable within 30 seconds by a hackathon judge.

The most important demo should be:

"Tell us your problem → AI understands it → recommends the right astrologer → transparent Trust Score → consultation → prediction tracking → Trust Score improves → user returns → user refers a friend."

Build the entire prototype now.

One important thing

Don't let Lovable build all 15 screens as separate dead pages. The prompt above specifically forces the important journey to be functional:

Login → AI → Match → Consultation → Prediction → Trust → Journey → Referral.

That's the story you'll actually demonstrate to the judges.

Also, your uploaded flow already has the right backbone: AI Triage, Trust Score, Daily Streak, Prediction Accountability, My Journey and Referral Loop. I would keep that architecture rather than adding random features.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a3b49d6b-5ad1-4b73-97cd-b7e18efb4419).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
