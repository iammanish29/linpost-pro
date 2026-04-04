import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Eye, Heart, MessageSquare, Share2, TrendingUp, Users } from "lucide-react";

const engagementData = [
  { date: "Mar 29", impressions: 1200, likes: 45, comments: 12, shares: 8 },
  { date: "Mar 30", impressions: 1800, likes: 67, comments: 23, shares: 15 },
  { date: "Mar 31", impressions: 1400, likes: 52, comments: 18, shares: 11 },
  { date: "Apr 1", impressions: 2200, likes: 89, comments: 34, shares: 22 },
  { date: "Apr 2", impressions: 3100, likes: 127, comments: 45, shares: 31 },
  { date: "Apr 3", impressions: 2800, likes: 108, comments: 38, shares: 27 },
  { date: "Apr 4", impressions: 3500, likes: 145, comments: 56, shares: 39 },
];

const topPosts = [
  { id: 1, content: "5 proven techniques to boost your LinkedIn engagement...", impressions: 5200, likes: 189, comments: 67, engagementRate: "7.4%" },
  { id: 2, content: "How AI is changing professional networking in 2026...", impressions: 3800, likes: 127, comments: 34, engagementRate: "5.3%" },
  { id: 3, content: "Case study: From 0 to 10K followers in 6 months...", impressions: 3200, likes: 98, comments: 41, engagementRate: "4.3%" },
];

export default function AnalyticsPage() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Analytics</h2>
          <p className="text-muted-foreground">Track your LinkedIn performance and engagement metrics</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Total Impressions", value: "48.2K", change: "+18%", icon: Eye, color: "text-blue-500" },
            { title: "Total Likes", value: "1,890", change: "+22%", icon: Heart, color: "text-pink-500" },
            { title: "Comments", value: "456", change: "+15%", icon: MessageSquare, color: "text-green-500" },
            { title: "Followers Gained", value: "+156", change: "this month", icon: Users, color: "text-purple-500" },
          ].map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.title}</p>
                    <p className="text-xl font-bold mt-0.5">{stat.value}</p>
                    <p className="text-xs text-green-500 mt-0.5">{stat.change}</p>
                  </div>
                  <stat.icon className={`w-5 h-5 mt-0.5 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Over Time</CardTitle>
            <CardDescription>Last 7 days performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "6px" }}
                />
                <Line type="monotone" dataKey="impressions" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="likes" stroke="#ec4899" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="comments" stroke="#22c55e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-primary inline-block" /> Impressions</span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-pink-500 inline-block" /> Likes</span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-green-500 inline-block" /> Comments</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
            <CardDescription>Posts with highest engagement this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topPosts.map((post) => (
              <div key={post.id} className="p-4 rounded-lg border bg-muted/20 space-y-2">
                <p className="text-sm line-clamp-2">{post.content}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.impressions.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {post.likes}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {post.comments}</span>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    <TrendingUp className="w-2.5 h-2.5 mr-1" />
                    {post.engagementRate}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
