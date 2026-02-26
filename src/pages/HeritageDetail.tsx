import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Mic, FileText, MapPin, Globe, Calendar, User, Tag, Sparkles, Shield, ExternalLink, Loader2, Fingerprint, CheckCircle2, Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleItems } from "@/data/heritage";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useHeritageNft } from "@/context/HeritageNftContext";

const mockTranscript = `This is a Baul song from the Kushtia district of West Bengal. The Baul tradition represents a mystical spiritual practice that combines elements of Vaishnavism, Sufism, and Buddhism.

The singer, a wandering minstrel, expresses the search for "Moner Manush" — the divine human within. The lyrics speak of the river of devotion and the quest for inner truth.

"ও আমার মনের মানুষ যে রে, দেখা পাব কবে তারে..."
(Oh, when will I meet the person of my heart...)

This particular rendition was recorded during the annual Lalon Mela festival, where Bauls from across Bengal gather to share their songs and philosophy.`;

const mockAiInsights = [
  "Connected to Sufi musical traditions of the 15th century",
  "Uses the Dotara instrument, characteristic of Bengal folk music",
  "Related to the Fakiri tradition of wandering mystics",
  "Linguistic analysis shows mixed Bengali-Sylheti dialect patterns",
];

export default function HeritageDetail() {
  const { id } = useParams();
  const item = sampleItems.find((i) => i.id === id);
  const { toast } = useToast();
  const { isVerified, isMinted, mintNft, getMinted } = useHeritageNft();

  const [minting, setMinting] = useState(false);

  if (!item) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">Heritage item not found</h1>
        <Link to="/explore">
          <Button className="mt-4" variant="outline">Back to Explore</Button>
        </Link>
      </div>
    );
  }

  const verified = isVerified(item.id);
  const minted = isMinted(item.id);
  const nft = getMinted(item.id);

  const handleMintNft = () => {
    setMinting(true);
    setTimeout(() => {
      const result = mintNft(item.id, item.contributor);
      setMinting(false);
      toast({ title: "🎉 Heritage NFT Created!", description: `Preserved on ${result.blockchain}. ID: ${result.nftId}` });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <Link to="/explore" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Explore
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="relative aspect-video">
                <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />
                {(item.type === "video" || item.type === "audio") && (
                  <div className="absolute inset-0 flex items-center justify-center bg-heritage-deep/30">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-warm cursor-pointer hover:bg-primary transition-colors">
                      <Play className="h-7 w-7 ml-1" />
                    </div>
                  </div>
                )}

                {/* Preserved overlay badge */}
                <AnimatePresence>
                  {minted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-4 top-4 flex items-center gap-1.5 rounded-lg bg-heritage-gold/90 px-3 py-2 backdrop-blur-sm shadow-md"
                    >
                      <Fingerprint className="h-4 w-4 text-white" />
                      <span className="text-xs font-bold text-white tracking-wide">DIGITALLY PRESERVED</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <h1 className="mt-6 font-display text-2xl font-bold text-foreground sm:text-3xl">{item.title}</h1>
            <p className="mt-3 text-muted-foreground leading-relaxed">{item.description}</p>

            {/* Transcript Section */}
            <div className="mt-8 rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="font-display text-lg font-semibold text-foreground">AI-Generated Transcript</h2>
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">Auto-transcribed</Badge>
              </div>
              <p className="whitespace-pre-line text-sm leading-relaxed text-card-foreground/80">{mockTranscript}</p>
            </div>

            {/* AI Insights */}
            <div className="mt-6 rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-heritage-gold" />
                <h2 className="font-display text-lg font-semibold text-foreground">AI Cultural Insights</h2>
              </div>
              <ul className="space-y-3">
                {mockAiInsights.map((insight, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-card-foreground/80">
                    <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-heritage-gold" />
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Details card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Details</h3>
              <dl className="mt-4 space-y-4">
                {[
                  { icon: MapPin, label: "Region", value: item.region },
                  { icon: Globe, label: "Language", value: item.language },
                  { icon: User, label: "Contributor", value: item.contributor },
                  { icon: Calendar, label: "Date Added", value: new Date(item.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }) },
                  { icon: item.type === "audio" ? Mic : FileText, label: "Media Type", value: item.type, capitalize: true },
                ].map((d) => (
                  <div key={d.label} className="flex items-start gap-3">
                    <d.icon className="mt-0.5 h-4 w-4 text-primary" />
                    <div>
                      <dt className="text-xs text-muted-foreground">{d.label}</dt>
                      <dd className={`text-sm font-medium text-card-foreground ${d.capitalize ? "capitalize" : ""}`}>{d.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            {/* Tags */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tags</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground">
                    <Tag className="mr-1 h-3 w-3" />{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* ── Digital Authenticity / NFT Card ── */}
            <div className={`rounded-xl border p-6 transition-colors ${
              minted ? "border-heritage-gold/30 bg-heritage-gold/[0.04]" : "border-heritage-gold/20 bg-heritage-gold/[0.02]"
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <Fingerprint className="h-5 w-5 text-heritage-gold" />
                <h3 className="font-display text-sm font-semibold text-foreground">Digital Authenticity</h3>
                <Badge className="bg-heritage-gold/15 text-heritage-gold border-heritage-gold/20 text-[10px] ml-auto">Demo</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                NFTs ensure long-term authenticity and recognition for cultural heritage contributors.
              </p>

              <AnimatePresence mode="wait">
                {minted && nft ? (
                  <motion.div
                    key="minted"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-2 rounded-lg bg-accent/10 border border-accent/20 px-3 py-2">
                      <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
                      <span className="text-xs font-semibold text-accent-foreground">Digitally Preserved</span>
                    </div>

                    <div className="space-y-2 text-[11px]">
                      {[
                        { label: "NFT ID", value: nft.nftId, mono: true },
                        { label: "Owner", value: nft.owner },
                        { label: "Network", value: nft.blockchain },
                        { label: "Minted", value: new Date(nft.mintedAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }) },
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between rounded-lg bg-muted/50 px-3 py-2">
                          <span className="text-muted-foreground">{row.label}</span>
                          <span className={`font-medium text-card-foreground ${row.mono ? "font-mono" : ""}`}>{row.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg bg-muted/50 px-3 py-2">
                      <p className="text-[10px] text-muted-foreground mb-0.5">Transaction Hash</p>
                      <p className="text-[11px] font-mono text-card-foreground break-all">{nft.txHash}</p>
                    </div>

                    <Button variant="outline" size="sm" className="w-full gap-2 text-xs" disabled>
                      <ExternalLink className="h-3 w-3" /> View on Explorer (Demo)
                    </Button>
                  </motion.div>
                ) : verified ? (
                  <motion.div key="verified" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="flex items-center gap-1.5 mb-3 text-xs text-accent-foreground">
                      <CheckCircle2 className="h-3 w-3" />
                      <span className="font-medium">Verified — eligible for preservation</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={handleMintNft}
                      disabled={minting}
                      className="w-full gap-2 bg-heritage-gold text-white hover:bg-heritage-gold/90"
                    >
                      {minting ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Creating Heritage NFT...
                        </>
                      ) : (
                        <>
                          <Shield className="h-3.5 w-3.5" /> Create Heritage NFT
                        </>
                      )}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key="unverified" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Button size="sm" variant="outline" className="w-full gap-2 text-xs" disabled>
                      <Shield className="h-3.5 w-3.5" /> Verify via AI OCR first
                    </Button>
                    <p className="mt-2 text-[10px] text-muted-foreground text-center">
                      Use <Link to="/ocr" className="text-primary underline">AI Heritage OCR</Link> to verify this item before minting.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contribute CTA */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <h3 className="font-display text-sm font-semibold text-primary">Contribute to this record</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Have additional context, corrections, or related media? Help improve this heritage record.
              </p>
              <Link to="/contribute">
                <Button size="sm" className="mt-3 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Add Information
                </Button>
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
