export interface ProjectSection {
  label: string
  description: string
}

export interface ProjectDetailSection {
  thinking: string
  body: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

// ─── Generic Detail Block ───────────────────────────────────────────────────
// Used to build the flexible "Identity / Visual Identity / Application / ..."
// area of a case study. Each project defines its own `detailSections` array —
// mix as many 'images' and 'content' blocks, in any order, as the case study
// needs. The page template just maps over this array and renders it.
//
//  { type: 'images', images: [{ src, alt }, ...] }
//    → one or more full-bleed 16:9 images stacked in a row
//
//  { type: 'content', heading: 'Identity', fields: [{ label, text }, ...] }
//    → headline + any number of label/text pairs (Thinking Statement, Body,
//      Color, Typography, Positioning — whatever the case study needs)
// ─────────────────────────────────────────────────────────────────────────────
export type DetailBlock =
  | { type: 'images'; images: { src: string; alt: string }[] }
  | { type: 'content'; heading: string; fields: { label: string; text: string }[] }

export interface Project {
  id: number
  name: string
  description: string
  category: string
  industry: string
  year: string
  ctas: { label: string }[]
  images: string[]
  overview?: string
  challengeDesc?: string
  strategicDirection?: string
  deliverables?: string[]
  duration?: string
  reflection?: {
    line1: string
    line2: string
    line3: string
  }
  detailChallenge?: ProjectDetailSection
  detailStrategy?: {
    thinking: string
    positioning: string
    audience: string
    personality: string[]
    objective: string
  }
  detailProcess?: ProcessStep[]
  detailSections?: DetailBlock[]
  sections: {
    challenge: ProjectSection
    strategy: ProjectSection
    identity: ProjectSection
    application: ProjectSection
    outcome: ProjectSection
  }
}

export const projectsData: Project[] = [
  {
    id: 1,
    name: 'Lozinr',
    description: 'Lozinr was built to prove that world-class branding isnt defined by geography. Its defined by clear thinking, intentional systems, and craftsmanship that lasts.',
    category: 'Branding Agency, Creative Company',
    industry: 'Design Agency',
    year: '2026',
    overview: 'Lozinr is a brand identity studio focused on building strategic brand systems for ambitious founders. This rebrand aligned every part of the business—from positioning to visual identity—into one clear, consistent system.',
    challengeDesc: 'The previous identity no longer reflected the quality of the work or the direction of the studio.',
    strategicDirection: 'Design less. Think deeper. Every decision was made to increase clarity, consistency, and long-term recognition.',
    deliverables: [
      'Brand Strategy',
      'Positioning',
      'Visual Identity',
      'Website Design',
      'Brand Guidelines'
    ],
    duration: '2024 - 2026',
    ctas: [
      { label: 'Brand Strategy' },
      { label: 'Positioning' },
      { label: 'Visual Identity' },
      { label: 'Brand Guidelines' }
    ],
    reflection: {
      line1: 'Every brand we build starts long before the first logo is designed.',
      line2: 'This project reminded us that strong brands are rarely the result of more creativity—they\'re the result of clearer decisions. Every element, from positioning to typography, was designed to reinforce trust and long-term consistency rather than short-term attention.',
      line3: 'That\'s the standard we bring to every brand we build.'
    },
    detailChallenge: {
      thinking: 'Thinking Statement',
      body: 'Every growing business eventually outgrows its identity.\n\nThe original brand had done its job.\n\nBut Lozinr had changed.\n\nThe work became more strategic.\nThe clients became more ambitious.\nThe identity stayed behind.\n\nThis wasn\'t about creating a better logo.\n\nIt was about creating a brand that reflected the standard behind the work.'
    },
    detailStrategy: {
      thinking: 'Before people trust your work, they trust what your brand communicates.',
      positioning: 'Brand systems for founders building companies worth remembering.',
      audience: 'Founders investing in long-term growth—not short-term attention.',
      personality: ['Calm', 'Precise', 'Confident', 'Timeless'],
      objective: 'Create a brand that earns trust before the first conversation.'
    },
    detailProcess: [
      {
        number: '01',
        title: 'Discovery',
        description: 'Understand the business before touching design.'
      },
      {
        number: '02',
        title: 'Positioning',
        description: 'Define what the brand should be known for.'
      },
      {
        number: '03',
        title: 'Exploration',
        description: 'Explore typography, color, composition, and direction. Remove everything that doesn\'t support the strategy.'
      },
      {
        number: '04',
        title: 'System Building',
        description: 'Turn individual assets into one consistent identity system.'
      },
      {
        number: '05',
        title: 'Refinement',
        description: 'Reduce visual noise until every element has a purpose.'
      }
    ],

    // ─── Flexible Identity / Visual Identity / Application area ───────────
    // Reorder, remove, or add blocks freely — page.tsx just maps over this.
    detailSections: [
      {
        type: 'images',
        images: [
          { src: '#', alt: 'Lozinr Logo Construction Grid' },
          { src: '#', alt: 'Lozinr Logo and Typography Variation' },
          { src: '#', alt: 'Lozinr Primary Lockup' },
        ]
      },
      {
        type: 'content',
        heading: 'Identity',
        fields: [
          { label: 'Thinking Statement', text: 'Recognition comes from repetition, not complexity.' },
          { label: 'Body', text: 'The identity was designed as a flexible system—not a single logo. Every variation follows the same principles, making the brand recognizable across every touchpoint.' },
        ]
      },
      {
        type: 'images',
        images: [
          { src: '#', alt: 'Helvetica Neue Typography System' },
          { src: '#', alt: 'Color Palette - Autumn Orange, Off-White, Charcoal' },
        ]
      },
      {
        type: 'content',
        heading: 'Visual Identity',
        fields: [
          { label: 'Thinking Statement', text: 'Every visual choice should reinforce the same perception.' },
          { label: 'Color', text: 'Three colors. One purpose. Confidence through restraint.' },
          { label: 'Typography', text: 'One type family. Nine weights. Unlimited flexibility. Helvetica Neue became the foundation of the entire system because consistency scales better than variety.' },
        ]
      },
      {
        type: 'images',
        images: [
          { src: '#', alt: 'Lozinr Application 1' },
          { src: '#', alt: 'Lozinr Application 2' },
          { src: '#', alt: 'Lozinr Application 3' },
        ]
      },
      {
        type: 'content',
        heading: 'Application',
        fields: [
          { label: 'Body', text: 'The identity was applied across every touchpoint a design studio encounters — business cards, letterhead, envelopes, tote bags, and digital platforms. The stationery suite uses green as a surface with black materials layered on top, creating a system immediately recognisable across print and screen.' },
        ]
      },
      {
        type: 'images',
        images: [
          { src: '#', alt: 'Lozinr Outcome 1' },
          { src: '#', alt: 'Lozinr Outcome 2' },
        ]
      },
      {
        type: 'content',
        heading: 'Outcome',
        fields: [
          { label: 'Body', text: 'The hidden face concept gives clients and collaborators an immediate story to hold onto, turning a logo into a talking point. It established a clear visual language that now extends across all Lozinr projects—a foundation that scales as the studio grows.' },
        ]
      },
    ],

    images: [
      '#',
    ],
    sections: {
      challenge: {
        label: 'Challenge',
        description: 'Building a brand identity for a design studio from scratch presents a unique pressure — the studio itself becomes the proof of concept. Every design decision is scrutinised because the audience is designers, founders, and businesses who judge quality instantly. The challenge was to create an identity that was not just visually strong, but conceptually undeniable. It had to communicate intelligence, craft, and humanity — all without a single word.'
      },
      strategy: {
        label: 'Strategy',
        description: 'Rather than designing a logo first, we started with a question: what if the identity came entirely from the name itself? This constraint-led approach pushed us away from generic geometric shapes and toward something genuinely discovered. The strategy was to build the entire visual system around a single insight — one idea strong enough to carry every touchpoint from business card to website. Three colours, two fonts, one concept. Maximum restraint for maximum impact.'
      },
      identity: {
        label: 'Identity',
        description: 'Inside the first two letters — "L" and "o" — we discovered a hidden face: two eyes and a nose formed by the negative space between them. This became the heart of Lozinr\'s identity. The logomark is both a letterform and a human expression — conceptual yet warm, minimal yet full of meaning. The colour system is built on Solid Black (#0E0C0A) as the primary canvas, Light Silver (#E2E2E2) for contrast and warmth, and Tribal Green (#26775C) as the accent that gives the brand its distinct, memorable personality. Typography is set in a single geometric sans-serif — clean, confident, and consistent across all applications.'
      },
      application: {
        label: 'Application',
        description: 'The identity was applied across every touchpoint a design studio encounters — business cards, letterhead, envelopes, tote bags, and digital platforms. Each application was designed to feel intentional: the business card uses the green as the primary face with the logomark anchoring the front, while the back carries the wordmark bold and full-bleed in black. The stationery suite uses the green as a surface, with black materials layered on top — creating a visual system that is immediately recognisable across print and screen. The website carries the same palette and typographic rhythm, ensuring consistency from first impression to final interaction.'
      },
      outcome: {
        label: 'Outcome',
        description: 'The Lozinr identity achieved what every studio brand should — it became a portfolio piece in itself. The hidden face concept gives clients and collaborators an immediate story to hold onto, turning a logo into a talking point. More importantly, it established a clear visual language that now extends across all Lozinr projects — a foundation that scales as the studio grows.'
      }
    }
  },
  {
    id: 2,
    name: 'CloudSync',
    description: 'A comprehensive cloud storage solution built for teams to collaborate seamlessly with enterprise-grade security and intuitive interface.',
    category: 'SaaS, Product Design',
    industry: 'Technology',
    year: '2025',
    overview: 'CloudSync is a cloud storage platform designed for modern teams who need secure, fast, and collaborative file management. The product combines powerful features with a clean, minimal interface.',
    challengeDesc: 'Competing in a saturated market required clear differentiation through exceptional UX design and brand presence.',
    strategicDirection: 'Simplify complexity. Make enterprise features accessible to every team member through thoughtful design and clear information hierarchy.',
    deliverables: [
      'Product Design',
      'Brand Identity',
      'Website Design',
      'UI/UX System'
    ],
    duration: '2024 - 2025',
    ctas: [
      { label: 'Product Strategy' },
      { label: 'UX/UI Design' },
      { label: 'Brand Design' }
    ],
    reflection: {
      line1: 'The best SaaS products are invisible in execution but memorable in experience.',
      line2: 'CloudSync proved that adding features is easy — but removing friction is hard. Every element was designed to answer one question: what does the user need right now?',
      line3: 'The result is a product that feels less like enterprise software and more like a natural extension of how teams work.'
    },
    detailChallenge: {
      thinking: 'Enterprise software doesn\'t have to feel corporate.',
      body: 'The cloud storage market is crowded.\n\nEvery player promises security, speed, and collaboration.\n\nBut none of them feel like they were built for teams.\n\nThey feel built for enterprise buyers.\n\nCloudSync needed to break that pattern.\n\nIt needed to be the software teams choose — not the software IT mandates.'
    },
    detailStrategy: {
      thinking: 'Trust comes from clarity, not complexity.',
      positioning: 'Enterprise storage that teams actually want to use.',
      audience: 'Growing teams who value speed and simplicity over features.',
      personality: ['Modern', 'Dependable', 'Clear', 'Powerful'],
      objective: 'Create a SaaS brand that feels familiar, not foreign.'
    },
    detailProcess: [
      {
        number: '01',
        title: 'Research',
        description: 'Interview teams about their storage frustrations.'
      },
      {
        number: '02',
        title: 'Strategy',
        description: 'Define core differentiators: speed, security, and simplicity.'
      },
      {
        number: '03',
        title: 'Design',
        description: 'Create interfaces that anticipate user needs.'
      },
      {
        number: '04',
        title: 'Refinement',
        description: 'Test with real teams and iterate based on feedback.'
      }
    ],
    detailSections: [
      {
        type: 'content',
        heading: 'Product Vision',
        fields: [
          { label: 'Thinking Statement', text: 'Enterprise software doesn\'t have to feel corporate.' },
          { label: 'Body', text: 'CloudSync was built around one insight: teams don\'t want advanced features they don\'t understand. They want solutions that work immediately, scale silently, and get out of the way.' }
        ]
      }
    ],
    images: ['#'],
    sections: {
      challenge: {
        label: 'Challenge',
        description: 'The cloud storage market is crowded with enterprise solutions that prioritize features over experience. Teams choose these tools because they have to, not because they want to. CloudSync needed to enter this space and immediately feel different — more modern, more trustworthy, and more human.'
      },
      strategy: {
        label: 'Strategy',
        description: 'Rather than match competitors feature-for-feature, CloudSync focused on three pillars: speed (files accessible instantly), security (enterprise-grade but invisible), and simplicity (interface anyone can use). The brand positioning became: the enterprise storage solution that teams choose first, not last.'
      },
      identity: {
        label: 'Identity',
        description: 'The visual identity was built to feel contemporary and trustworthy. A modern geometric mark paired with a clean sans-serif creates instant recognition in a crowded market. The color palette uses deep blue for trust, bright cyan for innovation, and off-white for clarity. Every design decision was made to communicate: this is serious software, but it doesn\'t take itself too seriously.'
      },
      application: {
        label: 'Application',
        description: 'The brand extends across product interface, website, marketing materials, and user onboarding. The dashboard uses the color system to create visual hierarchy, making powerful features feel simple. The website communicates value instantly, showing that this isn\'t just another storage provider — it\'s a team productivity platform.'
      },
      outcome: {
        label: 'Outcome',
        description: 'CloudSync launched with a strong brand presence that immediately differentiated it in the market. The product design led to 40% faster onboarding times, and brand recognition increased 3x year-over-year. Teams started choosing CloudSync first, proving that design and brand strategy can win in competitive markets.'
      }
    }
  },
  {
    id: 3,
    name: 'Momentum',
    description: 'A fitness and wellness app that combines AI-driven coaching with social accountability to help users build sustainable habits.',
    category: 'App Design, Brand Strategy',
    industry: 'Health & Wellness',
    year: '2024',
    overview: 'Momentum is a fitness and wellness application that makes habit building personal, social, and achievable. Using AI coaching and community features, it transforms how people approach fitness.',
    challengeDesc: 'The fitness app market is saturated with solutions that focus on tracking, not transformation. Momentum needed a brand that felt achievable, not intimidating.',
    strategicDirection: 'Make fitness feel like progress, not punishment. Every interaction should celebrate effort, not just results.',
    deliverables: [
      'App Design',
      'Brand Identity',
      'Marketing Design',
      'Community Platform'
    ],
    duration: '2024',
    ctas: [
      { label: 'App Strategy' },
      { label: 'UI/UX Design' },
      { label: 'Brand Design' }
    ],
    reflection: {
      line1: 'Most fitness apps motivate through guilt. Momentum motivates through progress.',
      line2: 'The design philosophy centered on celebrating small wins. Every completed workout, every habit tracked, every community milestone became a moment of genuine achievement. This changed the entire psychology of the app.',
      line3: 'Users didn\'t download Momentum to get punished into fitness — they downloaded it because the brand and design made them feel capable.'
    },
    detailChallenge: {
      thinking: 'Motivation is personal, not universal.',
      body: 'The fitness industry has a messaging problem.\n\nMost apps speak to guilt: "You\'re not working out enough. You\'re not eating right. You\'re falling behind."\n\nBut guilt never sustained long-term change.\n\nMomentum needed to flip this script.\n\nIt needed to speak to progress, not problems.\n\nTo celebrate effort, not judge results.'
    },
    detailStrategy: {
      thinking: 'Sustainable fitness starts with psychological safety.',
      positioning: 'Fitness app for people building habits, not chasing perfection.',
      audience: 'People who want to get healthier but are tired of feeling broken.',
      personality: ['Encouraging', 'Real', 'Progressive', 'Community-Driven'],
      objective: 'Create a fitness brand that makes people feel capable, not inadequate.'
    },
    detailProcess: [
      {
        number: '01',
        title: 'Discovery',
        description: 'Understand why people quit fitness apps.'
      },
      {
        number: '02',
        title: 'Strategy',
        description: 'Build around progress, not perfection.'
      },
      {
        number: '03',
        title: 'Design',
        description: 'Create interfaces that celebrate every win.'
      },
      {
        number: '04',
        title: 'Community',
        description: 'Layer in social accountability without pressure.'
      }
    ],
    detailSections: [
      {
        type: 'content',
        heading: 'Design Philosophy',
        fields: [
          { label: 'Thinking Statement', text: 'Progress compounds faster when you feel it daily.' },
          { label: 'Body', text: 'Every screen in Momentum was designed to answer one question: "Am I getting better?" The interface makes progress visible, tangible, and celebrated. This psychological shift turned the app into a habit-building tool rather than just a tracking tool.' }
        ]
      }
    ],
    images: ['#'],
    sections: {
      challenge: {
        label: 'Challenge',
        description: 'The fitness app industry is built on guilt and gamification. Apps use red alarm bells, missed workout notifications, and comparative leaderboards to motivate users — but these tactics drive disengagement. Momentum needed to prove that sustainable fitness comes from psychological safety and genuine progress celebration, not pressure and judgment.'
      },
      strategy: {
        label: 'Strategy',
        description: 'The brand strategy centered on reframing fitness from "getting in shape" to "building momentum." This subtle shift in language changed everything. Users weren\'t training for a body type — they were building a habit. The app design reflected this through celebrating consistency over intensity, progress over perfection, and personal wins over public comparison.'
      },
      identity: {
        label: 'Identity',
        description: 'The visual identity uses warm, encouraging colors: energetic orange, calm blue, and approachable neutral tones. The typography feels modern but accessible. The logo, a simplified upward arrow contained in a circle, symbolizes continuous progress within a sustainable system. Every design element was chosen to feel achievable, not aspirational.'
      },
      application: {
        label: 'Application',
        description: 'The app interface uses the color system to guide users through their fitness journey. Completed workouts trigger celebratory feedback, progress views show personal momentum over time, and community features connect users through shared progress rather than competition. The design makes every interaction feel like an achievement, reinforcing the behavior change.'
      },
      outcome: {
        label: 'Outcome',
        description: 'Momentum launched with 50,000 users in the first month, driven primarily by word-of-mouth and community growth. User retention after 30 days was 65% — significantly higher than industry average of 25%. The brand strategy proved that fitness apps could succeed by making users feel capable, not guilty.'
      }
    }
  },
  {
    id: 4,
    name: 'DesignFlow',
    description: 'A collaborative design system and prototyping tool that streamlines the design-to-development handoff for product teams.',
    category: 'Design Tools, SaaS',
    industry: 'Design & Technology',
    year: '2023',
    overview: 'DesignFlow is a comprehensive design platform that bridges the gap between designers and developers. It accelerates product creation through intelligent component systems and real-time collaboration.',
    challengeDesc: 'Designers and developers work in separate tools, creating delays and inconsistencies. DesignFlow needed to unify the workflow without compromising either profession\'s tools.',
    strategicDirection: 'One source of truth. Build a system where design changes instantly reflect in code, and developers can propose UI updates that designers review and approve.',
    deliverables: [
      'Product Strategy',
      'Design System',
      'Platform Design',
      'Brand Identity'
    ],
    duration: '2023 - 2024',
    ctas: [
      { label: 'Product Design' },
      { label: 'Design System' },
      { label: 'Brand Strategy' }
    ],
    reflection: {
      line1: 'The best design tools disappear. They become part of the workflow, not interruptions to it.',
      line2: 'DesignFlow\'s success came from understanding that designers and developers aren\'t enemies — they\'re partners. The tool was built around that trust, creating a system where both sides felt heard and accelerated.',
      line3: 'The result is a platform that doesn\'t just improve hand-offs — it eliminates the concept of hand-offs entirely.'
    },
    detailChallenge: {
      thinking: 'Design and development should move at the speed of thought.',
      body: 'Today\'s workflow:\n\n1. Designer creates in Figma\n2. Developer waits for hand-off\n3. Developer rebuilds in code\n4. Designer sees inconsistencies\n5. Cycle repeats\n\nDesignFlow asked: what if this wasn\'t necessary?\n\nWhat if changes in design instantly updated code?\n\nWhat if developers could prototype and designers could see it immediately?\n\nWhat if there was no "hand-off" at all?'
    },
    detailStrategy: {
      thinking: 'Speed comes from trust and alignment.',
      positioning: 'Design platform where designers and developers work together in real-time.',
      audience: 'Product teams who lose days in design-to-dev hand-offs.',
      personality: ['Fast', 'Collaborative', 'Precise', 'Intuitive'],
      objective: 'Eliminate design hand-off delays by making design changes live in code instantly.'
    },
    detailProcess: [
      {
        number: '01',
        title: 'Research',
        description: 'Spend a week shadowing design and dev teams.'
      },
      {
        number: '02',
        title: 'Architecture',
        description: 'Design component system that both sides understand.'
      },
      {
        number: '03',
        title: 'Interface',
        description: 'Create UI that feels native to designers and developers.'
      },
      {
        number: '04',
        title: 'Integration',
        description: 'Build real-time sync between design and code.'
      }
    ],
    detailSections: [
      {
        type: 'content',
        heading: 'Core Innovation',
        fields: [
          { label: 'Thinking Statement', text: 'One source of truth eliminates translation errors.' },
          { label: 'Body', text: 'DesignFlow\'s breakthrough was treating design components as code components. When a designer updates a button in the design system, every instance updates across both the design file and live code simultaneously. This eliminates the most common source of design-development misalignment: inconsistent updates.' }
        ]
      }
    ],
    images: ['#'],
    sections: {
      challenge: {
        label: 'Challenge',
        description: 'Modern product development has a hidden bottleneck: the design-to-development handoff. Designers work in one tool, developers work in another. Changes get lost in translation. Inconsistencies multiply. By the time a design reaches production, it may look nothing like the original. DesignFlow needed to create a system where this problem simply doesn\'t exist.'
      },
      strategy: {
        label: 'Strategy',
        description: 'Rather than trying to be "Figma for developers," DesignFlow took a different approach: what if design and code lived in the same system? Components in the design system automatically generate code-ready components. Changes in one instantly reflect in the other. Developers can propose UI updates that designers review and approve. The entire workflow becomes one unified process.'
      },
      identity: {
        label: 'Identity',
        description: 'The visual identity needed to feel equally at home in a designer\'s hand and a developer\'s IDE. The brand uses a geometric, modular mark that represents components and systems. The color palette is technical but not cold: sophisticated grays paired with energetic accent colors. Typography is modern and system-based, reflecting the philosophy behind the product.'
      },
      application: {
        label: 'Application',
        description: 'The platform itself is the primary application. The interface uses the visual system consistently across design tools, developer dashboards, and documentation. The website communicates how teams can accelerate by eliminating handoffs. Every touchpoint reinforces the core message: design and development should be one process, not two.'
      },
      outcome: {
        label: 'Outcome',
        description: 'DesignFlow attracted enterprise customers within the first six months, including companies that save 10+ hours per week on design-dev coordination. The platform proved that unifying workflows creates compounding productivity gains. Teams didn\'t just work faster — they shipped better products because inconsistencies between design and code were virtually eliminated.'
      }
    }
  }
]
