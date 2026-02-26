import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-heritage-deep text-heritage-cream">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="font-display text-lg font-bold text-primary-foreground">V</span>
              </div>
              <span className="font-display text-xl font-bold">Virasat</span>
            </Link>
            <p className="mt-3 text-sm text-heritage-warm-gray">
              Preserving India's intangible cultural heritage through AI-powered documentation and community collaboration.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-heritage-gold">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm text-heritage-warm-gray">
              <li><Link to="/explore" className="hover:text-heritage-cream transition-colors">Browse Heritage</Link></li>
              <li><Link to="/explore?category=folk-arts" className="hover:text-heritage-cream transition-colors">Folk Arts</Link></li>
              <li><Link to="/explore?category=oral-traditions" className="hover:text-heritage-cream transition-colors">Oral Traditions</Link></li>
              <li><Link to="/explore?category=rituals" className="hover:text-heritage-cream transition-colors">Rituals</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-heritage-gold">Community</h4>
            <ul className="mt-3 space-y-2 text-sm text-heritage-warm-gray">
              <li><Link to="/contribute" className="hover:text-heritage-cream transition-colors">Contribute</Link></li>
              <li><Link to="/about" className="hover:text-heritage-cream transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-heritage-gold">Initiative</h4>
            <p className="mt-3 text-sm text-heritage-warm-gray">
              Aligned with <strong>Build for Bharat</strong> and <strong>Virasat se Vikas Tak</strong> — blending modern technology with cultural preservation.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-heritage-warm-gray/20 pt-6 text-center text-xs text-heritage-warm-gray">
          © 2026 Virasat — Digital Heritage Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
