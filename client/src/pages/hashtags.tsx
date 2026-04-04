import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Hash, Plus, Search, TrendingUp, X } from "lucide-react";

type HashtagData = {
  tag: string;
  followers: string;
  difficulty: "Low" | "Medium" | "High";
  category: string;
};

const popularHashtags: HashtagData[] = [
  { tag: "#LinkedInTips", followers: "2.4M", difficulty: "High", category: "Networking" },
  { tag: "#ContentMarketing", followers: "1.8M", difficulty: "High", category: "Marketing" },
  { tag: "#B2BMarketing", followers: "890K", difficulty: "Medium", category: "Marketing" },
  { tag: "#Leadership", followers: "3.2M", difficulty: "High", category: "Career" },
  { tag: "#Entrepreneurship", followers: "4.1M", difficulty: "High", category: "Business" },
  { tag: "#CareerAdvice", followers: "1.1M", difficulty: "Medium", category: "Career" },
  { tag: "#PersonalBranding", followers: "760K", difficulty: "Medium", category: "Branding" },
  { tag: "#DigitalMarketing", followers: "2.8M", difficulty: "High", category: "Marketing" },
  { tag: "#SaaS", followers: "540K", difficulty: "Low", category: "Technology" },
  { tag: "#StartupLife", followers: "680K", difficulty: "Low", category: "Business" },
  { tag: "#ProductivityTips", followers: "920K", difficulty: "Medium", category: "Productivity" },
  { tag: "#RemoteWork", followers: "1.5M", difficulty: "Medium", category: "Workplace" },
];

const difficultyColors: Record<string, string> = {
  Low: "bg-green-500/10 text-green-500",
  Medium: "bg-yellow-500/10 text-yellow-600",
  High: "bg-red-500/10 text-red-500",
};

const categoryColors: Record<string, string> = {
  Networking: "bg-blue-500/10 text-blue-500",
  Marketing: "bg-purple-500/10 text-purple-500",
  Career: "bg-orange-500/10 text-orange-500",
  Business: "bg-teal-500/10 text-teal-500",
  Technology: "bg-cyan-500/10 text-cyan-500",
  Branding: "bg-pink-500/10 text-pink-500",
  Productivity: "bg-indigo-500/10 text-indigo-500",
  Workplace: "bg-green-500/10 text-green-600",
};

export default function HashtagsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>(["#LinkedInTips", "#ContentMarketing"]);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const categories = [...new Set(popularHashtags.map((h) => h.category))];

  const filtered = popularHashtags.filter((h) => {
    const matchesSearch = !search || h.tag.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !filterCategory || h.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleTag = (tag: string) => {
    if (selected.includes(tag)) {
      setSelected(selected.filter((t) => t !== tag));
    } else {
      setSelected([...selected, tag]);
    }
  };

  const copySelected = () => {
    navigator.clipboard.writeText(selected.join(" "));
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Hashtag Research</h2>
          <p className="text-muted-foreground">Find the best hashtags to maximize your post reach</p>
        </div>

        {selected.length > 0 && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Selected Hashtags ({selected.length})
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs" onClick={copySelected}>
                    Copy All
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs" onClick={() => setSelected([])}>
                    Clear
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selected.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => toggleTag(tag)} />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hashtags..."
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory(null)}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filterCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategory(cat === filterCategory ? null : cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((hashtag) => (
            <Card
              key={hashtag.tag}
              className={`cursor-pointer transition-all ${selected.includes(hashtag.tag) ? "border-primary/50 bg-primary/5" : "hover:border-primary/30"}`}
              onClick={() => toggleTag(hashtag.tag)}
            >
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-sm font-semibold">{hashtag.tag.replace("#", "")}</span>
                  </div>
                  {selected.includes(hashtag.tag) && (
                    <Badge className="text-[10px] bg-primary text-primary-foreground">Selected</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {hashtag.followers} followers
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <Badge variant="outline" className={`text-[10px] ${categoryColors[hashtag.category] || ""}`}>
                    {hashtag.category}
                  </Badge>
                  <Badge variant="outline" className={`text-[10px] ${difficultyColors[hashtag.difficulty]}`}>
                    {hashtag.difficulty}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
