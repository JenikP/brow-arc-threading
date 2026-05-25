import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah J.",
    comment: "The best threading experience I've ever had. The attention to detail is amazing — my brows have never looked better.",
    rating: 5,
  },
  {
    name: "Emily C.",
    comment: "I won't trust anyone else with my brows. Professional, clean, and always perfect results every single visit.",
    rating: 5,
  },
  {
    name: "Maria G.",
    comment: "Finally found my go-to place for threading. The staff is skilled and so friendly. Highly recommend!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-pearl">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
          <p className="kicker text-bronze mb-4">Reviews</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-secondary mb-5">
            Loved by Melbourne
          </h2>

          {/* Google rating block */}
          <div className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-soft border border-sand">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-bronze text-bronze" />
              ))}
            </div>
            <span className="text-secondary font-semibold">5.0</span>
            <span className="text-warmGray text-sm">on Google · 200+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, index) => (
            <article
              key={index}
              className="relative bg-white p-7 lg:p-9 rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 border border-sand/60"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-primary/40" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-bronze text-bronze" />
                ))}
              </div>
              <p className="font-serif text-lg lg:text-xl text-secondary italic leading-relaxed mb-6">
                "{t.comment}"
              </p>
              <div className="pt-4 border-t border-sand">
                <p className="font-semibold text-secondary">{t.name}</p>
                <p className="text-warmGray text-sm">Verified client</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
