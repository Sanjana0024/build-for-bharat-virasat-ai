import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, Grid3X3, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HeritageCard from "@/components/HeritageCard";
import { sampleItems, categories } from "@/data/heritage";
import { motion } from "framer-motion";

const languages = ["All Languages", "Bengali", "Marwari", "Malayalam", "Tulu", "Punjabi", "Marathi"];
const types = ["All Types", "audio", "video", "text", "image"];

export default function Explore() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages");
  const [selectedType, setSelectedType] = useState("All Types");

  const filtered = useMemo(() => {
    return sampleItems.filter((item) => {
      const matchQuery = !query || item.title.toLowerCase().includes(query.toLowerCase()) || item.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
      const matchCat = selectedCategory === "all" || item.category === selectedCategory;
      const matchLang = selectedLanguage === "All Languages" || item.language === selectedLanguage;
      const matchType = selectedType === "All Types" || item.type === selectedType;
      return matchQuery && matchCat && matchLang && matchType;
    });
  }, [query, selectedCategory, selectedLanguage, selectedType]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container py-10">
          <h1 className="font-display text-3xl font-bold text-foreground">Explore Heritage</h1>
          <p className="mt-2 text-muted-foreground">
            Discover India's intangible cultural heritage across regions, languages, and art forms.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, tag, or keyword..."
                className="h-11 pl-10"
              />
            </div>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="h-11 w-full sm:w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((l) => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="h-11 w-full sm:w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {types.map((t) => (
                  <SelectItem key={t} value={t}>{t === "All Types" ? t : t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === "all" ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Badge>
            {categories.map((cat) => (
              <Badge
                key={cat.slug}
                variant={selectedCategory === cat.slug ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(cat.slug)}
              >
                {cat.title}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container py-10">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filtered.length} heritage item{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <HeritageCard item={item} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-display text-xl text-muted-foreground">No heritage items match your search.</p>
            <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
