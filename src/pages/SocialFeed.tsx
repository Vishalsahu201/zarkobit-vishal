import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Heart, MessageCircle, Share2, Image, Film, Send, CheckCircle, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  user_id: string;
  caption: string;
  image_url: string;
  video_url: string;
  post_type: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  profile?: { full_name: string; avatar_url: string; verification: string };
}

const mockPosts: Post[] = [
  {
    id: "mock-1", user_id: "1", caption: "✨ Amazing hair transformation at Zarkobit! Loving my new look 💇‍♀️",
    image_url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop",
    video_url: "", post_type: "image", likes_count: 234, comments_count: 45, created_at: new Date().toISOString(),
    profile: { full_name: "Priya Sharma", avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop", verification: "blue" }
  },
  {
    id: "mock-2", user_id: "2", caption: "New fade haircut 🔥 Perfect for summer! #ZarkobitStyle",
    image_url: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=600&fit=crop",
    video_url: "", post_type: "image", likes_count: 567, comments_count: 89, created_at: new Date().toISOString(),
    profile: { full_name: "Royal Cuts Salon", avatar_url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=80&h=80&fit=crop", verification: "black" }
  },
  {
    id: "mock-3", user_id: "3", caption: "Bridal makeup done right 💄👰 Book your appointment now!",
    image_url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=600&fit=crop",
    video_url: "", post_type: "image", likes_count: 1200, comments_count: 156, created_at: new Date().toISOString(),
    profile: { full_name: "Glamour Studio", avatar_url: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=80&h=80&fit=crop", verification: "blue" }
  },
];

const VerificationBadge = ({ type }: { type: string }) => {
  if (type === "blue") return <CheckCircle className="h-4 w-4 text-blue-500 fill-blue-500" />;
  if (type === "black") return <ShieldCheck className="h-4 w-4 text-foreground fill-foreground" />;
  return null;
};

const SocialFeed = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [newCaption, setNewCaption] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const channel = supabase
      .channel("posts-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "posts" }, () => {
        // Refresh posts on change
        fetchPosts();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false }).limit(20);
    if (data && data.length > 0) {
      const mapped = data.map((p: any) => ({ ...p, profile: undefined }));
      setPosts([...mapped, ...mockPosts]);
    }
  };

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes_count: liked.has(id) ? p.likes_count - 1 : p.likes_count + 1 } : p));
  };

  const handlePost = async () => {
    if (!newCaption.trim()) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { toast({ title: "Login required", description: "Please sign in to post", variant: "destructive" }); return; }
    
    await supabase.from("posts").insert({ user_id: user.id, caption: newCaption, post_type: "text" });
    setNewCaption("");
    setShowCreate(false);
    toast({ title: "Posted! 🎉" });
    fetchPosts();
  };

  const formatCount = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toString();
  const timeAgo = (date: string) => {
    const mins = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
    if (mins < 60) return `${mins}m ago`;
    if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
    return `${Math.floor(mins / 1440)}d ago`;
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-display text-xl font-bold gold-gradient-text">Feed</h1>
        <button onClick={() => setShowCreate(!showCreate)} className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
          + Post
        </button>
      </div>

      {showCreate && (
        <div className="mb-4 rounded-2xl bg-card p-4 gold-border">
          <textarea value={newCaption} onChange={(e) => setNewCaption(e.target.value)} placeholder="What's on your mind? ✨"
            className="w-full rounded-xl bg-secondary p-3 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none h-20" />
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-2">
              <button className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5 text-xs text-muted-foreground"><Image className="h-3.5 w-3.5" /> Photo</button>
              <button className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5 text-xs text-muted-foreground"><Film className="h-3.5 w-3.5" /> Video</button>
            </div>
            <button onClick={handlePost} className="flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">
              <Send className="h-3.5 w-3.5" /> Post
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="rounded-2xl bg-card overflow-hidden gold-border">
            {/* Header */}
            <div className="flex items-center gap-3 p-3">
              <img src={post.profile?.avatar_url || `https://ui-avatars.com/api/?name=${post.user_id}&background=d4af37&color=1a1a1a`}
                alt="" className="h-10 w-10 rounded-full object-cover border-2 border-primary/30" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-sm font-semibold text-foreground truncate">{post.profile?.full_name || "User"}</p>
                  {post.profile?.verification && <VerificationBadge type={post.profile.verification} />}
                </div>
                <p className="text-[10px] text-muted-foreground">{timeAgo(post.created_at)}</p>
              </div>
            </div>

            {/* Image */}
            {post.image_url && (
              <div className="w-full aspect-square">
                <img src={post.image_url} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            )}

            {/* Actions */}
            <div className="p-3">
              <div className="flex items-center gap-4 mb-2">
                <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1.5">
                  <Heart className={`h-5 w-5 ${liked.has(post.id) ? "fill-red-500 text-red-500" : "text-foreground"}`} />
                  <span className="text-xs font-medium text-foreground">{formatCount(post.likes_count)}</span>
                </button>
                <button className="flex items-center gap-1.5">
                  <MessageCircle className="h-5 w-5 text-foreground" />
                  <span className="text-xs font-medium text-foreground">{formatCount(post.comments_count)}</span>
                </button>
                <button><Share2 className="h-5 w-5 text-foreground" /></button>
              </div>
              {post.caption && <p className="text-sm text-foreground">{post.caption}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialFeed;
