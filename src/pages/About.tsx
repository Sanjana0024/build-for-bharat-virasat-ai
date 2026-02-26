import { motion } from "framer-motion";
import { Sparkles, Globe, Users, BookOpen, Target, Heart } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const values = [
  { icon: Target, title: "Preservation First", description: "Documenting traditions before they vanish, ensuring every voice and art form is captured for posterity." },
  { icon: Sparkles, title: "AI-Augmented", description: "Leveraging speech recognition, NLP, and semantic search to make heritage accessible and discoverable." },
  { icon: Globe, title: "Multilingual Access", description: "Breaking language barriers with support for 45+ Indian languages and cross-lingual search." },
  { icon: Users, title: "Community Driven", description: "Empowering communities to document their own heritage with simple tools and expert moderation." },
  { icon: BookOpen, title: "Educational Impact", description: "Creating resources for students, scholars, and curious minds to connect with cultural roots." },
  { icon: Heart, title: "Cultural Pride", description: "Celebrating the diversity and richness of Indian traditions for present and future generations." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container py-16 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Build for Bharat · Virasat se Vikas Tak
            </span>
            <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              About Virasat
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Virasat is an AI-powered digital heritage platform dedicated to preserving India's intangible cultural heritage. 
              We believe that oral traditions, folk arts, rituals, languages, and local customs are as valuable as any monument — 
              and deserve the same care in preservation.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-16">
        <div className="container">
          <h2 className="mb-10 text-center font-display text-2xl font-bold text-foreground">Our Values</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <v.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold text-foreground">How AI Powers Heritage Preservation</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our platform uses advanced AI models to automatically transcribe audio and video content in regional languages, 
              extract semantic metadata, identify cultural connections, and enable multilingual search. 
              This goes beyond basic digitization — we create structured, searchable, interconnected knowledge 
              that helps researchers, educators, and communities discover and learn from India's cultural wealth.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
