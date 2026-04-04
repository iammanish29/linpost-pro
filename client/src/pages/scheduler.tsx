import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Plus, Trash2 } from "lucide-react";

type Post = {
  id: number;
  content: string;
  scheduledDate: string;
  scheduledTime: string;
  status: "scheduled" | "published" | "draft";
};

const initialPosts: Post[] = [
  { id: 1, content: "5 proven techniques to boost your LinkedIn engagement rate by 300%...", scheduledDate: "2026-04-05", scheduledTime: "09:00", status: "scheduled" },
  { id: 2, content: "The future of AI in professional networking — what you need to know now...", scheduledDate: "2026-04-06", scheduledTime: "11:30", status: "scheduled" },
  { id: 3, content: "Case study: How we grew from 0 to 10,000 LinkedIn followers in 6 months...", scheduledDate: "2026-04-04", scheduledTime: "14:00", status: "published" },
  { id: 4, content: "Top 10 LinkedIn content strategies that actually work in 2026...", scheduledDate: "2026-04-07", scheduledTime: "10:00", status: "draft" },
];

const statusColors: Record<string, string> = {
  scheduled: "bg-blue-500/10 text-blue-500",
  published: "bg-green-500/10 text-green-500",
  draft: "bg-yellow-500/10 text-yellow-500",
};

export default function SchedulerPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const deletePost = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const groupedPosts = posts.reduce((acc: Record<string, Post[]>, post) => {
    if (!acc[post.scheduledDate]) acc[post.scheduledDate] = [];
    acc[post.scheduledDate].push(post);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedPosts).sort();

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Scheduler</h2>
            <p className="text-muted-foreground">Manage and schedule your LinkedIn posts</p>
          </div>
          <Button className="gap-2" onClick={() => window.location.hash = "/compose"}>
            <Plus className="w-4 h-4" />
            Schedule New Post
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Scheduled", count: posts.filter((p) => p.status === "scheduled").length, color: "text-blue-500" },
            { label: "Published", count: posts.filter((p) => p.status === "published").length, color: "text-green-500" },
            { label: "Drafts", count: posts.filter((p) => p.status === "draft").length, color: "text-yellow-500" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <CalendarDays className={`w-8 h-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.count}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          {sortedDates.map((date) => (
            <div key={date}>
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold text-sm">
                  {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
                    weekday: "long", year: "numeric", month: "long", day: "numeric",
                  })}
                </h3>
              </div>
              <div className="space-y-3">
                {groupedPosts[date].map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                            <Clock className="w-3 h-3" />
                            <span>{post.scheduledTime}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm line-clamp-2">{post.content}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${statusColors[post.status]}`} variant="outline">
                            {post.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
                            onClick={() => deletePost(post.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
