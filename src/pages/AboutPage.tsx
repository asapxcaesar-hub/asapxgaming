export function AboutPage() {
  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-hot">Over</p>
        <h1 className="mt-2 font-display text-5xl tracking-wide md:text-6xl">De redactie</h1>
      </div>
      <p className="text-lg leading-relaxed text-muted">
        ASAPxGaming is een Nederlandse gamesite voor mensen die klaar zijn met thumbnail-hysterie.
        We schrijven reviews met een cijfer én een verdict, en nieuws dat je kunt gebruiken: kopen,
        wachten, of hard nexen.
      </p>
      <p className="leading-relaxed">
        Deze build is bewust statisch. Geen accounts, geen comment-backend, geen CMS. Reviews en
        nieuws zitten in de repo zodat je de site gratis op Wasmer Edge kunt hosten vanaf GitHub.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border border-line bg-panel p-5">
          <p className="font-display text-3xl text-acid">Wat we doen</p>
          <p className="mt-2 text-sm text-muted">
            Uitspelen, noteren, oordelen. Platforms: pc, consoles, handhelds. Toon: gamer, niet
            persbericht.
          </p>
        </div>
        <div className="border border-line bg-panel p-5">
          <p className="font-display text-3xl text-acid">Wat we laten</p>
          <p className="mt-2 text-sm text-muted">
            Affiliate-walm, leak-screenshots zonder bron, en “10 dingen die je moet weten”-lijstjes
            zonder mening.
          </p>
        </div>
      </div>
      <p className="text-sm text-muted">
        Contact voor persbuilds of tips: gebruik je eigen mail zodra de live-site op Wasmer staat —
        deze sample-redactie is de speelbare slice, geen inbox.
      </p>
    </div>
  )
}
