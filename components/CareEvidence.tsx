import Link from "next/link";
import Image from "next/image";
import { careEvidence, EvidenceKey, EvidenceLink, practiceAwards } from "@/lib/care-evidence";

export default function CareEvidence({ kind, awards = false }: { kind: EvidenceKey; awards?: boolean }) {
  const evidence = careEvidence[kind];
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
