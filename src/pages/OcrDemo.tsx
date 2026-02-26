import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, ScanText, FileImage, Copy, Check, Sparkles, ShieldCheck,
  Loader2, CheckCircle2, ArrowRight, Hexagon, Eye, BookOpen, MapPin, Languages, Tag, Brain, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useHeritageNft } from "@/context/HeritageNftContext";

/* ───── Demo Data ───── */
const mockOcrResults: Record<string, {
  text: string; language: string; confidence: number;
  tags: string[]; title: string; category: string; region: string;
}> = {
  manuscript: {
    title: "Ancient Music Manuscript — Rajasthan",
    text: `श्री गणेशाय नमः\n\nयह पांडुलिपि राजस्थान के जयपुर से प्राप्त हुई है। इसमें 18वीं शताब्दी के दरबारी संगीत के रागों का विवरण है।\n\nराग भैरवी — प्रातःकालीन राग, शांत रस\nराग मालकौंस — रात्रिकालीन राग, करुण रस\nराग यमन — संध्या राग, श्रृंगार रस\n\nइस ग्रंथ में कुल 36 रागों का वर्णन मिलता है।`,
    language: "Hindi (Devanagari)",
    confidence: 94.2,
    tags: ["Classical Music", "Rajasthan", "18th Century", "Manuscript", "Ragas"],
    category: "Folk Arts",
    region: "Rajasthan, India",
  },
  inscription: {
    title: "Stone Inscription — Gujarat",
    text: `ॐ स्वस्ति श्री विक्रमादित्य महाराजाधिराज परमेश्वर परमभट्टारक\n\nसंवत् 1083 चैत्र शुक्ल पंचमी\n\nयह शिलालेख गुजरात के पाटन नगर से प्राप्त किया गया है।\nइसमें सोलंकी राजवंश के शासनकाल में निर्मित वाव (बावड़ी) का उल्लेख है।`,
    language: "Sanskrit / Old Gujarati",
    confidence: 87.8,
    tags: ["Inscription", "Gujarat", "Solanki Dynasty", "Stepwell", "Epigraphy"],
    category: "Languages & Scripts",
    region: "Gujarat, India",
  },
  folkart: {
    title: "Kalighat Folk Art — Bengal",
    text: `পটচিত্র - কালীঘাট মন্দির সংগ্রহ\n\nশিল্পী: নিবারণ চন্দ্র ঘোষ\nসময়কাল: আনুমানিক ১৮৮০-১৯০০ খ্রিস্টাব্দ\n\nএই পটচিত্রে দেবী দুর্গার মহিষাসুর বধের দৃশ্য অঙ্কিত।\nকালীঘাট পটচিত্র বাংলার লোককলার এক অনন্য ধারা।`,
    language: "Bengali",
    confidence: 91.5,
    tags: ["Kalighat Painting", "Bengal", "Folk Art", "19th Century", "Durga"],
    category: "Folk Arts",
    region: "West Bengal, India",
  },
  ritual: {
    title: "Harvest Ritual Song — Odisha",
    text: `This ritual song is traditionally performed during harvest festivals in rural Odisha.\n\nThe song invokes the earth goddess for a bountiful harvest and is accompanied by traditional dhol and mahuri instruments.\n\nPerformed by village elders during the Nuakhai festival, it represents the deep connection between agriculture and spirituality in Odia culture.\n\n"ଧାନ ଧାନ ଧରଣୀ ମାଆ, ତୋର ଆଶୀର୍ବାଦ ମାଗୁଛୁ..."`,
    language: "Odia",
    confidence: 96.1,
    tags: ["Ritual Music", "Harvest Festival", "Odisha", "Nuakhai", "Folk Song"],
    category: "Oral Traditions",
    region: "Odisha, India",
  },
};

const presetImages = [
  { key: "manuscript", label: "Ancient Manuscript", icon: "📜", desc: "Rajasthani music notation" },
  { key: "inscription", label: "Stone Inscription", icon: "🪨", desc: "Solanki era epigraphy" },
  { key: "folkart", label: "Kalighat Folk Art", icon: "🎨", desc: "Bengali pat painting" },
  { key: "ritual", label: "Harvest Ritual Song", icon: "🎵", desc: "Odia harvest tradition" },
];

type FlowStep = "upload" | "processing" | "result";

/* ───── Processing Steps Animation ───── */
const processingSteps = [
  { label: "Scanning document...", icon: Eye },
  { label: "Detecting script & language...", icon: Languages },
  { label: "Extracting cultural text...", icon: BookOpen },
  { label: "Generating heritage tags...", icon: Tag },
  { label: "Classifying category...", icon: Brain },
];

export default function OcrDemo() {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [step, setStep] = useState<FlowStep>("upload");
  const [result, setResult] = useState<typeof mockOcrResults[string] | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const { toast } = useToast();
  const { verifyItem, mintNft, isVerified, isMinted } = useHeritageNft();
  const [currentNft, setCurrentNft] = useState<ReturnType<typeof mintNft> | null>(null);

  const handleProcess = useCallback((key: string) => {
    setSelectedPreset(key);
    setStep("processing");
    setResult(null);
    setCurrentNft(null);
    setActiveProcessStep(0);

    // Animate through processing steps
    processingSteps.forEach((_, i) => {
      setTimeout(() => setActiveProcessStep(i), i * 600);
    });

    setTimeout(() => {
      setResult(mockOcrResults[key]);
      setStep("result");
      toast({ title: "✨ OCR Complete", description: "AI extracted text, detected language, and generated cultural tags." });
    }, 3200);
  }, [toast]);

  const handleVerify = () => {
    if (!result || !selectedPreset) return;
    verifyItem({
      id: selectedPreset,
      title: result.title,
      extractedText: result.text,
      language: result.language,
      tags: result.tags,
      confidence: result.confidence,
      verifiedAt: new Date().toISOString(),
    });
    toast({ title: "✅ Content Verified", description: "This heritage item is now verified and eligible for NFT minting." });
  };

  const handleMint = () => {
    if (!selectedPreset) return;
    const nft = mintNft(selectedPreset, "Demo Contributor");
    setCurrentNft(nft);
    toast({ title: "🎉 NFT Minted!", description: `Heritage preserved on ${nft.blockchain}. ID: ${nft.nftId}` });
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setSelectedPreset(null);
    setStep("upload");
    setResult(null);
    setCurrentNft(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-heritage-pattern opacity-[0.03]" />
        <div className="container relative py-12 md:py-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-primary/10 text-primary border-primary/20 gap-1.5 text-xs">
                <Sparkles className="h-3 w-3" /> AI-Powered
              </Badge>
              <Badge variant="outline" className="text-xs text-muted-foreground">Demo</Badge>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              AI Heritage OCR
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Digitize cultural knowledge from scanned manuscripts, handwritten notes, and archival images
              using artificial intelligence.
            </p>
          </motion.div>

          {/* Pipeline indicator */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center gap-2 text-xs font-medium"
          >
            {["Select Document", "AI Analysis", "Results & Actions"].map((label, i) => {
              const stepIndex = step === "upload" ? 0 : step === "processing" ? 1 : 2;
              const isActive = i <= stepIndex;
              const isCurrent = i === stepIndex;
              return (
                <div key={label} className="flex items-center gap-2">
                  {i > 0 && <ArrowRight className={`h-3 w-3 ${isActive ? "text-primary" : "text-muted-foreground/30"}`} />}
                  <span className={`rounded-full px-3 py-1.5 transition-all duration-300 ${
                    isCurrent ? "bg-primary text-primary-foreground shadow-sm" : isActive ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground/50"
                  }`}>{label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="container py-10">
        {/* Mission Caption */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10 rounded-2xl border border-primary/15 bg-primary/[0.03] p-5 flex items-start gap-4"
        >
          <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <ScanText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">AI-powered OCR helps preserve endangered cultural knowledge</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              by converting physical records into searchable digital heritage — enabling multilingual access, scholarly research, and intergenerational knowledge transfer.
            </p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ── STEP 1: Upload / Select ── */}
          {step === "upload" && (
            <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">Choose a Heritage Document</h2>
              <p className="text-sm text-muted-foreground mb-6">Select a sample cultural document to analyze with AI OCR.</p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                {presetImages.map((preset, i) => (
                  <motion.button
                    key={preset.key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleProcess(preset.key)}
                    className="group relative rounded-2xl border-2 border-border bg-card p-6 text-left transition-colors hover:border-primary/50 hover:shadow-warm"
                  >
                    <span className="text-5xl block">{preset.icon}</span>
                    <h3 className="mt-4 font-display text-sm font-semibold text-card-foreground">{preset.label}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{preset.desc}</p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      <ScanText className="h-3 w-3" /> Analyze with AI OCR
                    </div>

                    {/* Status badges */}
                    {(isVerified(preset.key) || isMinted(preset.key)) && (
                      <div className="absolute top-3 right-3 flex flex-col gap-1">
                        {isVerified(preset.key) && (
                          <Badge className="bg-accent/20 text-accent-foreground border-accent/30 text-[10px]">
                            <ShieldCheck className="mr-1 h-2.5 w-2.5" /> Verified
                          </Badge>
                        )}
                        {isMinted(preset.key) && (
                          <Badge className="bg-secondary/20 text-secondary-foreground border-secondary/30 text-[10px]">
                            <Hexagon className="mr-1 h-2.5 w-2.5" /> NFT
                          </Badge>
                        )}
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Upload dropzone */}
              <div className="rounded-2xl border-2 border-dashed border-border bg-muted/20 p-12 text-center">
                <Upload className="mx-auto h-10 w-10 text-muted-foreground/40" />
                <p className="mt-3 text-sm font-medium text-foreground">Or drag & drop your heritage document</p>
                <p className="mt-1 text-xs text-muted-foreground">Demo mode — select a sample above to begin</p>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Processing ── */}
          {step === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="mx-auto max-w-lg rounded-2xl border border-primary/20 bg-card p-10 text-center"
            >
              <motion.div
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Brain className="h-10 w-10 text-primary" />
              </motion.div>
              <h3 className="font-display text-xl font-semibold text-foreground">Analyzing Document...</h3>

              {/* Animated step list */}
              <div className="mt-6 space-y-2 text-left">
                {processingSteps.map((ps, i) => {
                  const Icon = ps.icon;
                  const isActive = i <= activeProcessStep;
                  const isCurrent = i === activeProcessStep;
                  return (
                    <motion.div
                      key={ps.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: isActive ? 1 : 0.3, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-colors ${
                        isCurrent ? "bg-primary/10 text-primary font-medium" : isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {isActive && !isCurrent ? (
                        <CheckCircle2 className="h-4 w-4 text-accent-foreground shrink-0" />
                      ) : isCurrent ? (
                        <Loader2 className="h-4 w-4 animate-spin text-primary shrink-0" />
                      ) : (
                        <Icon className="h-4 w-4 shrink-0" />
                      )}
                      {ps.label}
                    </motion.div>
                  );
                })}
              </div>

              <div className="mx-auto mt-6 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Results ── */}
          {step === "result" && result && selectedPreset && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              {/* Success indicator */}
              <div className="flex items-center gap-3 rounded-xl bg-accent/10 border border-accent/20 px-5 py-3">
                <CheckCircle2 className="h-5 w-5 text-accent-foreground" />
                <span className="text-sm font-medium text-accent-foreground">
                  AI analysis complete — text extracted, language detected, and heritage tags generated
                </span>
              </div>

              {/* Result cards grid */}
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Main extracted text */}
                <div className="lg:col-span-2 rounded-2xl border border-border bg-card overflow-hidden">
                  <div className="flex items-center justify-between border-b border-border px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileImage className="h-5 w-5 text-primary" />
                      <h3 className="font-display text-base font-semibold text-card-foreground">Extracted Text</h3>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1.5 text-xs">
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <div className="p-6">
                    <pre className="whitespace-pre-wrap font-body text-sm leading-relaxed text-card-foreground/90">
                      {result.text}
                    </pre>
                  </div>
                </div>

                {/* Metadata sidebar */}
                <div className="space-y-4">
                  {/* Language & Confidence */}
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Languages className="h-4 w-4 text-primary" />
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Language</h4>
                    </div>
                    <p className="text-lg font-display font-semibold text-card-foreground">{result.language}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={{ width: "0%" }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                      <span className="text-xs font-medium text-primary">{result.confidence}%</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">AI confidence score</p>
                  </motion.div>

                  {/* Category */}
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</h4>
                    </div>
                    <p className="text-sm font-semibold text-card-foreground">{result.category}</p>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {result.region}
                    </div>
                  </motion.div>

                  {/* Tags */}
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="h-4 w-4 text-primary" />
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Heritage Tags</h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.tags.map((tag, i) => (
                        <motion.div key={tag} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.06 }}>
                          <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs">{tag}</Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Action buttons — Verify & Mint */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {!isVerified(selectedPreset) ? (
                  <Button onClick={handleVerify} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    <ShieldCheck className="h-4 w-4" /> Verify Content
                  </Button>
                ) : !isMinted(selectedPreset) ? (
                  <Button onClick={handleMint} className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    <Hexagon className="h-4 w-4" /> Mint Heritage NFT
                  </Button>
                ) : currentNft ? (
                  <div className="flex items-center gap-2 rounded-xl border border-accent/20 bg-accent/10 px-4 py-2.5 text-sm">
                    <Shield className="h-4 w-4 text-accent-foreground" />
                    <span className="font-medium text-accent-foreground">NFT Minted</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="font-mono text-xs text-muted-foreground">{currentNft.nftId}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-xl border border-accent/20 bg-accent/10 px-4 py-2.5 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
                    <span className="font-medium text-accent-foreground">Previously minted</span>
                  </div>
                )}

                {isVerified(selectedPreset) && !isMinted(selectedPreset) && (
                  <Badge className="bg-accent/15 text-accent-foreground border-accent/20 text-xs gap-1">
                    <ShieldCheck className="h-3 w-3" /> Verified
                  </Badge>
                )}

                <Button variant="ghost" size="sm" onClick={handleReset} className="ml-auto text-muted-foreground">
                  ← Analyze Another
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
