const About = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-card">
              <img
                src="/lovable-uploads/4a6d259e-2c69-4327-9302-2fd3265a87cc.png"
                alt="Threading expert at work shaping eyebrows"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-5 -right-3 sm:-right-6 bg-pearl border border-sand px-6 py-5 rounded-2xl shadow-card">
              <p className="font-serif text-3xl text-secondary leading-none">10+</p>
              <p className="kicker text-bronze mt-1.5">Years of Experience</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="kicker text-bronze mb-4">About us</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-secondary mb-6 leading-[1.1]">
              Your Beauty, <em className="italic text-bronze">Our Expertise</em>
            </h2>
            <p className="text-warmGray text-base sm:text-lg leading-relaxed mb-5">
              Since 2014, Brow Arc Threading has been Melbourne's trusted destination for expert eyebrow threading and beauty services. Our skilled artists are passionate about creating the perfect brow shape to enhance your natural features.
            </p>
            <p className="text-warmGray text-base sm:text-lg leading-relaxed mb-8">
              We pride ourselves on using premium products, maintaining the highest hygiene standards, and delivering results that exceed your expectations — every single visit.
            </p>

            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {[
                { n: "5", l: "Locations" },
                { n: "30k+", l: "Happy Clients" },
                { n: "7", l: "Days a Week" },
              ].map((s) => (
                <div key={s.l} className="text-center bg-pearl border border-sand rounded-2xl py-5 px-2">
                  <p className="font-serif text-2xl sm:text-3xl text-bronze">{s.n}</p>
                  <p className="kicker text-warmGray mt-1.5">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
