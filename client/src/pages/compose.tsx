import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Hash, ImageIcon, Send, Sparkles, X } from "lucide-react";

const suggestedHashtags = [
  "#LinkedInTips", "#ContentMarketing", "#B2B", "#ProfessionalDevelopment",
  "#Leadership", "#Marketing", "#Networking", "#CareerGrowth",
];

export default function ComposePage() {
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState<string[]>(["#LinkedInTips", "#ContentMarketing"]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const maxChars = 3000;

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setCharCount(e.target.value.length);
  };

  const generateWithAI = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1500));
    const generated = `🚀 Exciting news in the world of professional networking!

I've been exploring how AI is transforming the way professionals connect and share insights on LinkedIn. The results are remarkable:

✅ 3x higher engagement with AI-optimized posting times
✅ 40% more profile visits from strategic content
✅ 2x follower growth through consistent value delivery

The key insight? It's not about posting MORE — it's about posting SMARTER.

What strategies have worked best for your LinkedIn growth? Share in the comments! 👇

#LinkedInGrowth #ProfessionalNetworking #AIMarketing`;
    setContent(generated);
    setCharCount(generated.length);
    setIsGenerating(false);
  };

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter((h) => h !== tag));
  };

  const addHashtag = (tag: string) => {
    if (!hashtags.includes(tag)) {
      setHashtags([...hashtags, tag]);
    }
  };

  const handlePublish = () => {
    const fullContent = content + "\n\n" + hashtags.join(" ");
    alert("Post published! (In production, this would be sent to LinkedIn via the API)");
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Compose Post</h2>
            <p className="text-muted-foreground">Create and schedule your LinkedIn content</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Post Content</CardTitle>
                  <Button variant="outline" size="sm" className="gap-2" onClick={generateWithAI} disabled={isGenerating}>
                    <Sparkles className="w-4 h-4" />
                    {isGenerating ? "Generating..." : "AI Generate"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  value={content}
                  onChange={handleContentChange}
                  placeholder="What professional insights would you like to share today?"
                  className="min-h-[250px] resize-none"
                  maxLength={maxChars}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Tip: Use line breaks and emojis for better engagement</span>
                  <span className={charCount > maxChars * 0.9 ? "text-destructive" : ""}>
                    {charCount}/{maxChars}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Hashtags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 cursor-pointer">
                      {tag}
                      <X className="w-3 h-3" onClick={() => removeHashtag(tag)} />
                    </Badge>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Suggested hashtags:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedHashtags
                      .filter((h) => !hashtags.includes(h))
                      .map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer hover:bg-secondary"
                          onClick={() => addHashtag(tag)}
                        >
                          + {tag}
                        </Badge>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Post Preview</CardTitle>
                <CardDescription>How your post will look on LinkedIn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border p-4 bg-white dark:bg-gray-900 space-y-3 min-h-[200px]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">LP</div>
                    <div>
                      <p className="text-xs font-semibold">LinPost Pro User</p>
                      <p className="text-[10px] text-muted-foreground">LinkedIn Automation Expert</p>
                    </div>
                  </div>
                  {content ? (
                    <p className="text-xs whitespace-pre-wrap leading-relaxed line-clamp-10">{content}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">Your post content will appear here...</p>
                  )}
                  {hashtags.length > 0 && (
                    <p className="text-xs text-blue-500">{hashtags.join(" ")}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-3">
                <Button className="w-full gap-2" onClick={handlePublish} disabled={!content.trim()}>
                  <Send className="w-4 h-4" />
                  Publish Now
                </Button>
                <Button variant="outline" className="w-full" disabled={!content.trim()}>
                  Schedule Post
                </Button>
                <Button variant="ghost" className="w-full">
                  Save as Draft
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
