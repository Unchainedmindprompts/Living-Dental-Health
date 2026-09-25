import Link from "next/link";
import Image from "next/image";
import { careEvidence, EvidenceKey, EvidenceLink, practiceAwards } from "@/lib/care-evidence";

export default function CareEvidence({ kind, awards = false }: { kind: EvidenceKey; awards?: boolean }) {
  const evidence = careEvidence[kind];
  if (kind === "home") return (
    <section id="dentist" aria-labelledby="care-evidence-home" className="mx-auto max-w-[1200px] px-6 py-12 sm:py-16">
      <div className="grid overflow-hidden rounded-2xl bg-cream-deep md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px] md:mx-0 md:h-full md:max-w-none">
          <Image src="/dr-andy.png" alt="Dr. Andy Engel, founder of Living Dental Health in Bend, Oregon" fill sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, 320px" className="object-cover object-top" />
        </div>
        <div className="p-6 sm:p-9 lg:p-10">
          <p className="eyebrow">Meet your dentist</p>
          <h2 id="care-evidence-home" className="mt-3 font-serif text-[34px] leading-tight text-charcoal sm:text-[44px]">Dr. Andy Engel, DMD</h2>
          <p className="mt-4 font-inter text-[16px] leading-relaxed text-charcoal-soft">Caring for Bend since 1998. Dr. Engel brings an OHSU dental degree and more than 1,000 hours of continuing education in smile design, cosmetic dentistry, and full mouth reconstruction to your care.</p>
          <Link href="/about" className="mt-4 inline-block font-inter text-[15px] underline underline-offset-4">Get to know Dr. Engel</Link>
          <div className="mt-6 border-t border-sage/25 pt-5">
            <h3 className="font-serif text-[24px]">Recognized by the Bend community</h3>
            <p className="mt-2 font-inter text-[13px] text-charcoal-soft">CommunityVotes Bend awards for Living Dental Health</p>
            <ul className="mt-3 flex flex-wrap gap-2">{practiceAwards.map(award => <li key={award.href}><a href={award.href} className="inline-block rounded-md border border-sage/25 bg-white/60 px-3 py-2 font-inter text-[13px] leading-relaxed underline decoration-sage/40 underline-offset-4 hover:bg-white">{award.label}</a></li>)}</ul>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/before-and-after" className="rounded-md bg-charcoal px-5 py-3 font-inter text-[14px] text-cream hover:opacity-90">Explore Smile Transformations</Link>
            <a href={careEvidence.home.links[3].href} className="rounded-md border border-charcoal/30 px-5 py-3 font-inter text-[14px] text-charcoal hover:bg-white/60">Read Patient Reviews</a>
          </div>
          <p className="mt-4 font-inter text-[13px] leading-relaxed text-charcoal-soft">Explore examples of <Link href="/before-and-after#case-01" className="underline underline-offset-4">porcelain veneers</Link> and <Link href="/before-and-after#case-02" className="underline underline-offset-4">full mouth reconstruction</Link>.</p>
        </div>
      </div>
    </section>
  );

  return <section aria-labelledby={`care-evidence-${kind}`} className="mx-auto max-w-[1200px] px-6 py-14 sm:py-20">
    <div className="border-t border-sage/30 pt-10">
      <p className="eyebrow">Experience, treatment &amp; patient perspectives</p>
      <h2 id={`care-evidence-${kind}`} className="mt-4 max-w-[800px] font-serif text-[32px] leading-tight text-charcoal sm:text-[44px]">{evidence.title}</h2>
      <p className="mt-5 max-w-[760px] font-inter text-[16px] leading-relaxed text-charcoal-soft">{evidence.intro}</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(evidence.links as EvidenceLink[]).map(link => <article key={link.href} className="overflow-hidden rounded-xl border border-sage/20 bg-white/50">
          {link.image && <div className="relative aspect-square"><Image src={link.image} alt={link.alt || ""} fill sizes="(min-width: 1024px) 350px, (min-width: 640px) 45vw, 90vw" className="object-contain" /></div>}
          <div className="p-6"><h3 className="font-serif text-[25px] leading-tight"><Link href={link.href} className="underline decoration-sage/40 underline-offset-4 hover:decoration-sage">{link.title}</Link></h3><p className="mt-4 font-inter text-[15px] leading-relaxed text-charcoal-soft">{link.description}</p></div>
        </article>)}
      </div>
      {awards && <div className="mt-10 rounded-xl bg-cream-deep p-6 sm:p-8"><h3 className="font-serif text-[28px]">Recognized by the Bend community</h3><p className="mt-3 font-inter text-[15px] leading-relaxed">Living Dental Health received these CommunityVotes awards. Explore the publisher’s results for each year and category.</p><ul className="mt-5 space-y-3 font-inter text-[15px]">{practiceAwards.map(award => <li key={award.href}><a href={award.href} className="underline underline-offset-4">CommunityVotes Bend {award.label}</a></li>)}</ul></div>}
      <p className="mt-8 font-inter text-[15px]"><Link href="/contact" className="underline underline-offset-4">Discuss your goals with Living Dental Health</Link></p>
    </div>
  </section>;
}
