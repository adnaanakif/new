'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'

const sections = [
  ['01', 'The brand'],
  ['02', 'The mark'],
  ['03', 'The wordmark'],
  ['04', 'The palette'],
  ['05', 'Typography'],
  ['06', 'Applications'],
  ['07', 'In practice'],
]

function BrandGuidelinesHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-18%', '18%'])

  return (
    <section ref={heroRef} className="relative -mx-[calc(50vw-50%)] h-[min(100vh,56.25vw)] min-h-[620px] overflow-hidden bg-night">
      <motion.div className="absolute inset-[-12%]" style={{ y: imageY }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_42%,rgba(221,73,27,.32),transparent_25%),linear-gradient(125deg,#11100f_10%,#211914_48%,#050505_100%)]" />
        <div className="absolute left-[12%] top-[20%] h-[52vw] w-[52vw] rounded-full border border-paper/10" />
        <div className="absolute right-[10%] top-[12%] h-[35vw] w-[35vw] rounded-full border border-ember/40" />
      </motion.div>
      <div className="absolute inset-0 bg-night/45" />
      <div className="relative flex h-full flex-col justify-between px-5 pb-8 pt-32 text-paper md:px-10 md:pb-12">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[.18em] text-paper/65">
          <span>Lozinr / Brand guidelines</span><span>2024—25</span>
        </div>
        <div>
          <p className="mb-5 max-w-sm text-sm leading-relaxed text-paper/70">A practical expression of a small studio built around clear thinking, useful restraint, and the people brave enough to start.</p>
          <h1 className="max-w-5xl text-[clamp(4.5rem,14vw,13rem)] font-medium uppercase leading-[.78] tracking-[-.09em]">Guidelines<span className="text-ember">.</span></h1>
        </div>
      </div>
    </section>
  )
}

function SectionIntro({ number, eyebrow, title, children }: { number: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return <div className="grid gap-8 border-t border-neutral-600/50 py-12 md:grid-cols-[1fr_2fr] md:gap-16 md:py-20"><div className="flex justify-between text-xs uppercase tracking-[.18em] text-neutral-300"><span>{number}</span><span>{eyebrow}</span></div><div><h2 className="max-w-3xl text-4xl font-medium uppercase leading-[.95] tracking-[-.05em] text-paper md:text-7xl">{title}</h2><p className="mt-8 max-w-xl text-base leading-relaxed text-neutral-300 md:text-lg">{children}</p></div></div>
}

function ApplicationCard({ type, children }: { type: string; children: React.ReactNode }) {
  return <div className="overflow-hidden rounded-sm border border-neutral-600/50 bg-neutral-900"><div className="flex items-center justify-between border-b border-neutral-600/50 px-4 py-3 text-[10px] uppercase tracking-[.16em] text-neutral-300"><span>Lozinr / {type}</span><span>01</span></div>{children}</div>
}

export default function BrandGuidelinesPage() {
  const [active, setActive] = useState(false)
  useEffect(() => { const onScroll = () => setActive(window.scrollY > 480); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll) }, [])
  return <>
    <Header preloaderDone={true} />
    <main className="overflow-hidden bg-night text-paper">
      <BrandGuidelinesHero />
      <aside className={`fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 transition-opacity lg:block ${active ? 'opacity-100' : 'opacity-0'}`} aria-label="Page index"><div className="flex flex-col gap-2 border-l border-neutral-600/70 pl-4">{sections.map(([number, label]) => <a key={number} href={`#section-${number}`} className="text-[10px] uppercase tracking-[.13em] text-neutral-300 transition-colors hover:text-ember"><span className="mr-2 text-ember">{number}</span>{label}</a>)}</div></aside>
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <section id="section-01"><SectionIntro number="01" eyebrow="Positioning" title="Make the brave choice obvious.">Lozinr is a brand identity studio for founders with a point of view. We turn early conviction into a visual system that can grow, sell, and stay recognisable when the room gets loud.</SectionIntro><div className="grid gap-4 pb-20 md:grid-cols-3"><div className="bg-ember p-6 text-night md:col-span-2 md:min-h-64"><p className="text-4xl font-medium uppercase leading-[.9] tracking-[-.05em] md:text-6xl">Clear is a competitive advantage.</p></div><div className="flex min-h-64 flex-col justify-between border border-neutral-600/50 p-6"><span className="text-xs uppercase tracking-[.18em] text-neutral-300">Our promise</span><p className="text-xl leading-tight">Build the signal before you scale the noise.</p></div></div></section>
        <section id="section-02"><SectionIntro number="02" eyebrow="Primary asset" title="A mark with room to move.">The Lozinr mark is a compact signal of momentum. It works at the edge of a page, in a browser tab, or as a quiet signature on work made for people who are going somewhere.</SectionIntro><div className="grid gap-4 pb-20 md:grid-cols-[1.4fr_.6fr]"><div className="flex min-h-[360px] items-center justify-center bg-paper"><img src="/lozinr-mark.svg" alt="Lozinr mark" className="w-40 text-night md:w-60" /></div><div className="flex flex-col justify-between border border-neutral-600/50 p-6"><span className="text-xs uppercase tracking-[.18em] text-neutral-300">Clear space</span><div className="flex aspect-square items-center justify-center border border-dashed border-ember/70"><img src="/lozinr-mark.svg" alt="Lozinr mark clear space example" className="w-20" /></div><p className="text-sm leading-relaxed text-neutral-300">Keep the mark generous. Never crowd it with type or decorative elements.</p></div></div></section>
        <section id="section-03"><SectionIntro number="03" eyebrow="Wordmark" title="Say it like you mean it.">The wordmark carries the name with a measured, open rhythm. It should feel direct, never loud; confident enough to stand alone and flexible enough to sit inside a wider system.</SectionIntro><div className="mb-20 bg-paper p-8 md:p-16"><img src="/lozinr-wordmark-approved.svg" alt="Lozinr wordmark" className="w-full" /></div></section>
        <section id="section-04"><SectionIntro number="04" eyebrow="Colour" title="Night, paper, ember.">Our palette is intentionally small. Night gives the system its depth. Paper brings clarity. Ember is the human note: used sparingly, it points to what matters.</SectionIntro><div className="grid grid-cols-2 gap-px bg-neutral-600/60 pb-20 md:grid-cols-4"><div className="aspect-square bg-night p-5 text-xs uppercase tracking-[.12em] text-neutral-300">Night<br />#11100F</div><div className="aspect-square bg-paper p-5 text-xs uppercase tracking-[.12em] text-night">Paper<br />#F2F0EA</div><div className="aspect-square bg-ember p-5 text-xs uppercase tracking-[.12em] text-night">Ember<br />#DD491B</div><div className="aspect-square bg-neutral-600 p-5 text-xs uppercase tracking-[.12em] text-paper">Neutral<br />#6B6762</div></div></section>
        <section id="section-05"><SectionIntro number="05" eyebrow="Typography" title="One voice, many scales.">Helvetica Neue keeps the system familiar, fast, and legible. Weight and scale do the expressive work. Use uppercase display type for conviction; sentence case for considered detail.</SectionIntro><div className="mb-20 border-y border-neutral-600/50 py-10"><div className="flex items-end justify-between border-b border-neutral-600/50 pb-8"><span className="text-xs uppercase tracking-[.18em] text-neutral-300">Display / medium</span><span className="text-[clamp(3rem,10vw,9rem)] leading-[.8] tracking-[-.08em]">Aa</span></div><p className="pt-8 text-2xl leading-tight md:text-4xl">A good identity gives a founder more room to focus on the work.</p></div></section>
        <section id="section-06"><SectionIntro number="06" eyebrow="Applications" title="Designed to leave the screen.">The system earns its keep in the everyday details: a proposal that feels considered, an invoice that feels human, a card that is easy to hold onto.</SectionIntro><div className="grid gap-4 pb-20 md:grid-cols-3"><ApplicationCard type="Business card"><div className="aspect-[1.6] bg-ember p-5 text-night"><img src="/lozinr-mark.svg" alt="Lozinr mark on business card" className="w-12" /><div className="mt-12 text-xs uppercase tracking-[.12em]">Adnan Akif<br />Founder, Lozinr</div></div></ApplicationCard><ApplicationCard type="Proposal deck"><div className="flex aspect-[1.6] flex-col justify-between bg-paper p-5 text-night"><img src="/lozinr-wordmark-approved.svg" alt="Lozinr wordmark on proposal deck" className="w-24" /><p className="max-w-[10rem] text-2xl uppercase leading-[.9] tracking-[-.05em]">A sharper<br />starting point.</p></div></ApplicationCard><ApplicationCard type="Invoice"><div className="aspect-[1.6] bg-neutral-300 p-5 text-night"><div className="flex justify-between"><img src="/lozinr-mark.svg" alt="Lozinr mark on invoice" className="w-8" /><span className="text-[9px] uppercase">Invoice / 001</span></div><div className="mt-12 border-t border-night/30 pt-3 text-[9px] uppercase tracking-[.1em]">Brand identity system<br /><br />Total due / $4,800</div></div></ApplicationCard></div></section>
        <section id="section-07"><SectionIntro number="07" eyebrow="Closing note" title="Build what only you can build.">A brand is not a costume. It is the clearest version of the work, repeated with care. When the system is right, every touchpoint makes the next brave decision a little easier.</SectionIntro><div className="mb-24 flex min-h-[420px] flex-col justify-between bg-ember p-6 text-night md:p-10"><div className="flex justify-between text-xs uppercase tracking-[.18em]"><span>Lozinr</span><span>End / Begin</span></div><p className="max-w-3xl text-5xl font-medium uppercase leading-[.84] tracking-[-.07em] md:text-8xl">Go make it<br />recognisable<span className="text-paper">.</span></p></div></section>
      </div>
    </main>
    <Footer />
  </>
}
