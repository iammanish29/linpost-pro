import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, FileText, Plus, Star, Trash2 } from "lucide-react";

type Template = {
  id: number;
  title: string;
  content: string;
  category: string;
  usageCount: number;
  isFavorite: boolean;
};

const initialTemplates: Template[] = [
  {
    id: 1,
    title: "Value-Driven Insight",
    content: `🔑 [KEY INSIGHT] that changed how I approach [TOPIC]:

[MAIN POINT 1]
[MAIN POINT 2]  
[MAIN POINT 3]

The result? [OUTCOME]

What's your experience with [TOPIC]? Share below! 👇`,
    category: "Educational",
    usageCount: 24,
    isFavorite: true,
  },
  {
    id: 2,
    title: "Personal Story Arc",
    content: `[TIME PERIOD] ago, I [SITUATION].

It was [EMOTION].

But here's what I learned: [LESSON]

Today, [CURRENT STATE].

The journey taught me that [TAKEAWAY].

Has [SIMILAR EXPERIENCE] ever happened to you?`,
    category: "Storytelling",
    usageCount: 18,
    isFavorite: true,
  },
  {
    id: 3,
    title: "List of Tips",
    content: `[NUMBER] tips for [GOAL] that actually work:

1️⃣ [TIP 1]
2️⃣ [TIP 2]
3️⃣ [TIP 3]
4️⃣ [TIP 4]
5️⃣ [TIP 5]

Save this for later! ♻️

Which tip resonated most with you?`,
    category: "Educational",
    usageCount: 31,
    isFavorite: false,
  },
  {
    id: 4,
    title: "Achievement Announcement",
    content: `🎉 Excited to share: [ACHIEVEMENT]!

This milestone represents [MEANING].

Key factors that made it possible:
✅ [FACTOR 1]
✅ [FACTOR 2]
✅ [FACTOR 3]

Thank you to [PEOPLE] for [REASON].

[NEXT GOAL] is next — stay tuned!`,
    category: "Announcement",
    usageCount: 12,
    isFavorite: false,
  },
];

const categoryColors: Record<string, string> = {
  Educational: "bg-blue-500/10 text-blue-500",
  Storytelling: "bg-purple-500/10 text-purple-500",
  Announcement: "bg-green-500/10 text-green-500",
  Engagement: "bg-orange-500/10 text-orange-500",
};

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);

  const toggleFavorite = (id: number) => {
    setTemplates(templates.map((t) => t.id === id ? { ...t, isFavorite: !t.isFavorite } : t));
  };

  const copyTemplate = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const deleteTemplate = (id: number) => {
    setTemplates(templates.filter((t) => t.id !== id));
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Templates</h2>
            <p className="text-muted-foreground">Reusable post templates for consistent content</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Template
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <Card key={template.id} className="group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <CardTitle className="text-sm truncate">{template.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleFavorite(template.id)}
                      className={`p-1 rounded transition-colors ${template.isFavorite ? "text-yellow-500" : "text-muted-foreground hover:text-yellow-500"}`}
                    >
                      <Star className="w-3.5 h-3.5" fill={template.isFavorite ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs ${categoryColors[template.category] || ""}`}>
                    {template.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Used {template.usageCount}x</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground bg-muted/40 rounded-md p-3 whitespace-pre-wrap line-clamp-5 font-mono">
                  {template.content}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1.5 text-xs"
                    onClick={() => copyTemplate(template.content)}
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground hover:text-destructive"
                    onClick={() => deleteTemplate(template.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
