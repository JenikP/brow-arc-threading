import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const faqs = [
  {
    q: "Is threading safe for sensitive or reactive skin?",
    a: "Yes — threading is one of the gentlest hair-removal methods available. We use only a single cotton thread, no hot wax, harsh chemicals or adhesives, so there's nothing to irritate the skin. It's our most-recommended option for clients with rosacea, eczema, or anyone using retinol, acids or acne treatments.",
  },
  {
    q: "How is threading better than waxing?",
    a: "Threading removes individual hairs with surgical precision, giving you a sharper, more sculpted shape than waxing can. It also doesn't pull or stretch the delicate skin around the eyes and lips, which means less redness, no burns, and far less risk of premature ageing over time.",
  },
  {
    q: "Do I need to book an appointment, or can I walk in?",
    a: "Walk-ins are always welcome at every one of our five Melbourne salons — no booking required. If you'd like to guarantee a specific time, simply call the salon directly and we'll hold a slot for you.",
  },
  {
    q: "How long does an eyebrow threading session take?",
    a: "Most eyebrow shaping appointments take just 10–15 minutes. Combo treatments like brows, lip and chin together still finish in under 30 minutes — perfect for a lunch-break refresh.",
  },
  {
    q: "Will it hurt? What should first-timers expect?",
    a: "There's a brief, quick sensation as each row of hairs is lifted, but most clients describe it as a tickle rather than pain. Any pinkness settles within an hour. We'll always talk you through your first session and shape gradually so you stay in control.",
  },
  {
    q: "How often should I come back?",
    a: "Most clients return every 2–4 weeks to maintain a clean, polished shape. Threading regularly also helps weaken the follicle over time, so regrowth becomes finer and easier to manage.",
  },
];

const FAQ = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-20 lg:py-28 bg-pearl">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <p className="kicker text-bronze mb-4">— Common Questions —</p>
          <h2 id="faq-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl text-secondary leading-[1.1]">
            Things Our Guests <em className="italic text-bronze">Often Ask</em>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-[#faf8f5] border border-stone-200/80 rounded-2xl shadow-soft px-5 sm:px-6 data-[state=open]:shadow-card transition-shadow"
            >
              <AccordionTrigger className="font-serif text-lg sm:text-xl text-secondary hover:text-bronze hover:no-underline text-left py-5 [&[data-state=open]>svg]:text-bronze">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-warmGray text-[15px] leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
};

export default FAQ;
