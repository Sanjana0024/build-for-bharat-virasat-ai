import { useState } from "react";
import { Upload, FileAudio, FileVideo, Image, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const mediaTypes = [
  { value: "audio", label: "Audio Recording", icon: FileAudio },
  { value: "video", label: "Video Recording", icon: FileVideo },
  { value: "image", label: "Photograph / Artwork", icon: Image },
  { value: "text", label: "Written Document", icon: FileText },
];

export default function Contribute() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Contribution Received!",
      description: "Thank you! Your submission will be reviewed by our team.",
    });
  };

  if (submitted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">Thank You!</h2>
          <p className="mt-2 text-muted-foreground">Your contribution has been submitted for review.</p>
          <p className="mt-1 text-sm text-muted-foreground">Our AI will transcribe and tag your content automatically.</p>
          <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setSubmitted(false)}>
            Submit Another
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container py-10">
          <h1 className="font-display text-3xl font-bold text-foreground">Contribute Heritage</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Share cultural traditions from your community. Upload audio, video, images, or text — our AI will automatically transcribe and tag your contribution.
          </p>
        </div>
      </div>

      <div className="container py-10">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl space-y-8"
        >
          {/* Basic Info */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-5">
            <h2 className="font-display text-lg font-semibold text-foreground">Basic Information</h2>

            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" placeholder="e.g., Baul Songs of Kushtia District" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" rows={4} placeholder="Describe the cultural significance, context, and background of this heritage item..." required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select required>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="folk-arts">Folk Arts</SelectItem>
                    <SelectItem value="oral-traditions">Oral Traditions</SelectItem>
                    <SelectItem value="rituals">Rituals & Ceremonies</SelectItem>
                    <SelectItem value="languages">Languages & Scripts</SelectItem>
                    <SelectItem value="customs">Local Customs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Region / State *</Label>
                <Input id="region" placeholder="e.g., West Bengal" required />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="language">Primary Language</Label>
                <Input id="language" placeholder="e.g., Bengali, Hindi, Tamil" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input id="tags" placeholder="e.g., folk music, devotional, rural" />
              </div>
            </div>
          </div>

          {/* Media Upload */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-5">
            <h2 className="font-display text-lg font-semibold text-foreground">Media Upload</h2>
            <p className="text-sm text-muted-foreground">Upload audio, video, images, or text documents. AI will automatically transcribe audio/video content.</p>

            <div className="grid gap-3 sm:grid-cols-2">
              {mediaTypes.map((type) => (
                <label
                  key={type.value}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-all hover:border-primary hover:bg-primary/5"
                >
                  <input type="radio" name="mediaType" value={type.value} className="accent-primary" />
                  <type.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">{type.label}</span>
                </label>
              ))}
            </div>

            <div className="rounded-lg border-2 border-dashed border-border bg-muted/50 p-10 text-center">
              <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium text-foreground">Drag & drop your file here</p>
              <p className="mt-1 text-xs text-muted-foreground">Supports MP3, MP4, WAV, JPG, PNG, PDF (max 50MB)</p>
              <Button type="button" variant="outline" className="mt-4" size="sm">
                Browse Files
              </Button>
            </div>
          </div>

          {/* Contributor Info */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-5">
            <h2 className="font-display text-lg font-semibold text-foreground">Contributor Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input id="name" placeholder="Full name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="affiliation">Organization / Affiliation</Label>
              <Input id="affiliation" placeholder="e.g., University, NGO, Cultural body" />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Submit Contribution
          </Button>
        </motion.form>
      </div>
    </div>
  );
}
