import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileImage, FileVideo, Image as ImageIcon, Plus, Trash2, Upload } from "lucide-react";

type MediaItem = {
  id: number;
  name: string;
  type: "image" | "video";
  size: string;
  url: string;
  uploadedAt: string;
};

const mockMedia: MediaItem[] = [
  { id: 1, name: "linkedin-banner.jpg", type: "image", size: "245 KB", url: "", uploadedAt: "2 days ago" },
  { id: 2, name: "product-demo.mp4", type: "video", size: "12.4 MB", url: "", uploadedAt: "3 days ago" },
  { id: 3, name: "infographic-stats.png", type: "image", size: "890 KB", url: "", uploadedAt: "1 week ago" },
  { id: 4, name: "team-photo.jpg", type: "image", size: "1.2 MB", url: "", uploadedAt: "1 week ago" },
  { id: 5, name: "webinar-recording.mp4", type: "video", size: "45.2 MB", url: "", uploadedAt: "2 weeks ago" },
  { id: 6, name: "company-logo.png", type: "image", size: "120 KB", url: "", uploadedAt: "3 weeks ago" },
];

const colorMap = [
  "bg-blue-500/20", "bg-purple-500/20", "bg-green-500/20",
  "bg-orange-500/20", "bg-pink-500/20", "bg-teal-500/20",
];

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>(mockMedia);
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");

  const filtered = filter === "all" ? media : media.filter((m) => m.type === filter);

  const deleteItem = (id: number) => setMedia(media.filter((m) => m.id !== id));

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Media Library</h2>
            <p className="text-muted-foreground">Manage images and videos for your posts</p>
          </div>
          <Button className="gap-2">
            <Upload className="w-4 h-4" />
            Upload Media
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {(["all", "image", "video"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f === "image" && <FileImage className="w-3.5 h-3.5 mr-1.5" />}
              {f === "video" && <FileVideo className="w-3.5 h-3.5 mr-1.5" />}
              {f === "all" ? "All Files" : `${f}s`}
              <Badge variant="secondary" className="ml-1.5 text-xs">
                {f === "all" ? media.length : media.filter((m) => m.type === f).length}
              </Badge>
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, i) => (
            <Card key={item.id} className="group overflow-hidden">
              <div className={`aspect-square flex items-center justify-center ${colorMap[i % colorMap.length]}`}>
                {item.type === "image" ? (
                  <FileImage className="w-12 h-12 text-muted-foreground/50" />
                ) : (
                  <FileVideo className="w-12 h-12 text-muted-foreground/50" />
                )}
              </div>
              <CardContent className="p-3 space-y-1">
                <p className="text-xs font-medium truncate">{item.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">{item.size}</span>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground">{item.uploadedAt}</p>
              </CardContent>
            </Card>
          ))}

          <Card className="border-dashed">
            <div className="aspect-square flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/30 transition-colors">
              <Plus className="w-8 h-8 text-muted-foreground/50" />
              <p className="text-xs text-muted-foreground">Upload new</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
