import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Sparkles, Globe, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryCard from "@/components/CategoryCard";
import HeritageCard from "@/components/HeritageCard";
import { categories, sampleItems } from "@/data/heritage";
import heroImage from "@/assets/hero-heritage.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: "890+", label: "Heritage Items" },
  { value: "28", label: "States Covered" },
  { value: "45+", label: "Languages" },
  { value: "1.2K", label: "Contributors" },
];

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Transcription",
    description: "Automatic speech-to-text in 45+ Indian languages with semantic tagging and metadata extraction.",
  },
  {
    icon: Globe,
    title: "Multilingual Discovery",
    description: "Search and explore heritage content across languages with AI-powered translation and cross-lingual search.",
  },
  {
    icon: Users,
    title: "Community Contributions",
    description: "Upload, tag, and share cultural content from your region. Every voice matters in preservation.",
  },
  {
    icon: Shield,
    title: "Curated & Moderated",
    description: "Expert-reviewed content with quality moderation to ensure authentic and respectful representation.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Indian Cultural Heritage" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-heritage-deep/95 via-heritage-deep/80 to-heritage-deep/60" />
          <div className="absolute inset-0 bg-heritage-pattern opacity-10" />
        </div>

        <div className="container relative z-10 flex min-h-[85vh] flex-col items-start justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="mb-4 inline-block rounded-full border border-heritage-gold/30 bg-heritage-gold/10 px-4 py-1.5 text-sm font-medium text-heritage-gold">
              Build for Bharat · Virasat se Vikas Tak
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight text-heritage-cream sm:text-5xl lg:text-6xl">
              Preserving India's
              <span className="block text-gradient-heritage">Living Heritage</span>
            </h1>
            <p className="mt-5 text-lg text-heritage-cream/80 sm:text-xl">
              An AI-powered platform to document, discover, and celebrate India's intangible cultural heritage — 
              from folk songs to sacred rituals, endangered languages to living traditions.
            </p>

            <form onSubmit={handleSearch} className="mt-8 flex w-full max-w-lg gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search heritage — Baul songs, Theyyam, Warli..."
                  className="h-12 border-heritage-cream/20 bg-heritage-cream/10 pl-10 text-heritage-cream placeholder:text-heritage-cream/40 backdrop-blur-sm focus-visible:ring-heritage-gold"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                Search
              </Button>
            </form>

            <div className="mt-8 flex flex-wrap gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold text-heritage-gold">{stat.value}</div>
                  <div className="text-xs text-heritage-cream/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-heritage-pattern py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="mb-12 text-center"
          >
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Explore Heritage Categories
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Discover India's rich cultural tapestry across five core domains of intangible heritage.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
              >
                <CategoryCard {...cat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20">
        <div className="container">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">Recently Added</h2>
              <p className="mt-2 text-muted-foreground">Fresh contributions from across India's cultural landscape.</p>
            </div>
            <Link to="/explore">
              <Button variant="ghost" className="gap-2 text-primary hover:text-primary/80">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sampleItems.slice(0, 6).map((item, i) => (
              <motion.div
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <HeritageCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-card py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="mb-12 text-center"
          >
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              AI Meets Cultural Preservation
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Beyond basic digitization — intelligent tools to preserve, understand, and share India's heritage.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
                className="rounded-xl border border-border bg-background p-6 text-center shadow-card-hover"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-secondary py-20">
        <div className="absolute inset-0 bg-heritage-pattern opacity-5" />
        <div className="container relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="font-display text-3xl font-bold text-secondary-foreground sm:text-4xl">
              Every Tradition Deserves to Be Remembered
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-secondary-foreground/70">
              Join thousands of contributors preserving cultural heritage. Upload audio, video, images, or text — our AI handles the rest.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/contribute">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Start Contributing
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10">
                  Explore Heritage
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
