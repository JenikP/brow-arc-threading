const ThreadingInfo = () => {
  return (
    <section className="py-20 lg:py-28 bg-sand/40">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-card">
            <img
              src="https://media.istockphoto.com/photos/eyebrow-threading-epilation-procedure-for-brow-shape-correction-picture-id1189794702?k=20&m=1189794702&s=612x612&w=0&h=1xl8fgpCkMk88SVyfPgdOJRtG23yCjFNXHl8fayi7Ys="
              alt="Eyebrow threading demonstration showing the ancient hair removal technique"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="kicker text-bronze mb-4">The art of threading</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-secondary mb-6 leading-[1.1]">
              What is <em className="italic text-bronze">Eyebrow Threading?</em>
            </h2>
            <p className="text-warmGray text-base sm:text-lg leading-relaxed mb-5">
              Threading is an ancient method of hair removal originating in Central Asia and India. A twisted piece of cotton thread is rolled over the skin to lift hairs straight from the follicle — giving cleaner lines and more precise shaping than waxing or tweezing.
            </p>
            <p className="text-warmGray text-base sm:text-lg leading-relaxed">
              We use only <span className="text-secondary font-medium">organic cotton</span>, perfect for sensitive skin. Quick, hygienic, and beautifully precise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreadingInfo;
