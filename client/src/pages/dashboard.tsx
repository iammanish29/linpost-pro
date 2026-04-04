import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Eye, Heart, MessageSquare, Share2, TrendingUp, Users, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

const statCards = [
  { title: "Total Posts", value: "124", change: "+12%", icon: Zap, color: "text-blue-500" },
  { title: "Total Impressions", value: "48.2K", change: "+18%", icon: Eye, color: "text-purple-500" },
  { title: "Engagement Rate", value: "4.7%", change: "+0.3%", icon: TrendingUp, color: "text-green-500" },
  { title: "Followers", value: "2,840", change: "+156", icon: Users, color: "text-orange-500" },
];

const recentPosts = [
  { id: 1, content: "Excited to share our latest insights on AI-driven content strategies for LinkedIn...", date: "2 hours ago", impressions: 1240, likes: 45, comments: 12 },
  { id: 2, content: "5 proven techniques to boost your LinkedIn engagement rate by 300%...", date: "1 day ago", impressions: 3800, likes: 127, comments: 34 },
  { id: 3, content: "Just reached 2,000 followers! Thank you all for the incredible support and engagement...", date: "2 days ago", impressions: 5200, likes: 89, comments: 67 },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-muted-foreground">
              Welcome back, {user?.displayName || user?.username}!
            </p>
          </div>
          <Button className="gap-2">
            <Zap className="w-4 h-4" />
            Create Post
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
              <CardDescription>Your latest LinkedIn posts performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="p-4 rounded-lg border bg-muted/30 space-y-3">
                  <p className="text-sm line-clamp-2">{post.content}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.impressions.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks at your fingertips</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {[
                { label: "Schedule Post", icon: Zap, href: "/compose" },
                { label: "View Analytics", icon: BarChart3, href: "/analytics" },
                { label: "Browse Templates", icon: Share2, href: "/templates" },
                { label: "Research Hashtags", icon: TrendingUp, href: "/hashtags" },
              ].map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  className="h-20 flex-col gap-2 text-sm"
                  onClick={() => window.location.hash = action.href}
                >
                  <action.icon className="w-5 h-5" />
                  {action.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
