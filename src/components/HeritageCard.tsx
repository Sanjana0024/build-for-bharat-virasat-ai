import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, FileText, Mic, Shield, Hexagon, Loader2, ShieldCheck, Eye, Fingerprint, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useHeritageNft } from "@/context/HeritageNftContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export interface HeritageItem {
  id: string;
  title: string;
  description: string;
  category: string;
  region: string;
  language: string;
  type: "audio" | "video" | "text" | "image";
  tags: string[];
  thumbnail: string;
  contributor: string;
  date: string;
}

const typeIcons = {
  audio: Mic,
  video: Play,
  text: FileText,
  image: FileText,
};

export default function HeritageCard({ item }: { item: HeritageItem }) {
  const Icon = typeIcons[item.type];
  const { isVerified, isMinted, mintNft, getMinted } = useHeritageNft();
  const { toast } = useToast();
  const [minting, setMinting] = useState(false);
  const [showNftModal, setShowNftModal] = useState(false);

  const verified = isVerified(item.id);
  const minted = isMinted(item.id);
  const nft = getMinted(item.id);

  const handleMint = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMinting(true);
    setTimeout(() => {
      const nftResult = mintNft(item.id, item.contributor);
      setMinting(false);
      toast({ title: "🎉 Heritage NFT Created!", description: `${item.title} is now digitally preserved. ID: ${nftResult.nftId}` });
    }, 2500);
  };

  const handleViewNft = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowNftModal(true);
  };

  return (
    <>
      <Link to={`/heritage/${item.id}`}>
        <motion.div
          whileHover={{ y: -4 }}
          className={`group overflow-hidden rounded-xl border bg-card shadow-card-hover transition-all hover:shadow-elevated ${
            minted ? "border-heritage-gold/30" : "border-border"
          }`}
        >
          <div className="relative aspect-video overflow-hidden">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-secondary/90 px-3 py-1 text-xs font-medium text-secondary-foreground backdrop-blur-sm">
              <Icon className="h-3 w-3" />
              {item.type}
            </div>

            {/* Digitally Preserved badge */}
            <AnimatePresence>
              {minted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-heritage-gold/90 px-2.5 py-1.5 backdrop-blur-sm shadow-sm"
                >
                  <Fingerprint className="h-3 w-3 text-white" />
                  <span className="text-[10px] font-bold text-white tracking-wide">PRESERVED</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-4">
            <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{item.region}</span>
              <span>•</span>
              <span>{item.language}</span>
            </div>
            <h3 className="font-display text-base font-semibold text-card-foreground line-clamp-2">
              {item.title}
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{item.description}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-muted text-muted-foreground">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* ── Digital Authenticity Section ── */}
            {minted && nft ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 rounded-xl border border-heritage-gold/20 bg-heritage-gold/[0.04] p-3.5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Fingerprint className="h-3.5 w-3.5 text-heritage-gold" />
                  <span className="text-xs font-bold text-heritage-gold tracking-wide uppercase">Digital Authenticity</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">NFT ID</span>
                    <span className="font-mono font-medium text-card-foreground">{nft.nftId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Owner</span>
                    <span className="font-medium text-card-foreground">{nft.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network</span>
                    <span className="font-medium text-card-foreground">{nft.blockchain}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleViewNft}
                  className="mt-2.5 w-full gap-1.5 text-[11px] h-7 text-heritage-gold hover:text-heritage-gold hover:bg-heritage-gold/10"
                >
                  <Eye className="h-3 w-3" /> View NFT Details
                </Button>
              </motion.div>
            ) : verified ? (
              <div className="mt-4">
                <div className="flex items-center gap-1.5 mb-2 text-[11px] text-accent-foreground">
                  <ShieldCheck className="h-3 w-3" />
                  <span className="font-medium">Verified — eligible for digital preservation</span>
                </div>
                <Button
                  size="sm"
                  onClick={handleMint}
                  disabled={minting}
                  className="w-full gap-2 bg-heritage-gold text-white hover:bg-heritage-gold/90 text-xs h-9"
                >
                  {minting ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" /> Creating Heritage NFT...
                    </>
                  ) : (
                    <>
                      <Shield className="h-3 w-3" /> Create Heritage NFT
                    </>
                  )}
                </Button>
              </div>
            ) : null}
          </div>
        </motion.div>
      </Link>

      {/* NFT Details Modal */}
      <Dialog open={showNftModal} onOpenChange={setShowNftModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display">
              <Fingerprint className="h-5 w-5 text-heritage-gold" />
              NFT Certificate of Authenticity
            </DialogTitle>
            <DialogDescription>
              This heritage item has been digitally preserved on-chain.
            </DialogDescription>
          </DialogHeader>

          {nft && (
            <div className="space-y-4">
              {/* Item Info */}
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <p className="text-xs text-muted-foreground mb-1">Heritage Item</p>
                <p className="text-sm font-display font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.region} · {item.language}</p>
              </div>

              {/* NFT Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">NFT ID</p>
                  <p className="text-sm font-mono font-semibold text-primary">{nft.nftId}</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Owner</p>
                  <p className="text-sm font-semibold text-foreground">{nft.owner}</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Blockchain</p>
                  <p className="text-sm font-semibold text-foreground">{nft.blockchain}</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Minted</p>
                  <p className="text-sm font-semibold text-foreground">
                    {new Date(nft.mintedAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                </div>
              </div>

              {/* Tx Hash */}
              <div className="rounded-xl bg-muted/50 border border-border px-4 py-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Transaction Hash</p>
                <p className="text-xs font-mono text-foreground break-all">{nft.txHash}</p>
              </div>

              {/* Authenticity message */}
              <div className="flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/5 p-3.5">
                <CheckCircle2 className="h-4 w-4 text-accent-foreground mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">NFTs ensure long-term authenticity</span> and recognition for cultural heritage contributors — creating tamper-proof, permanent records of ownership and provenance.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
