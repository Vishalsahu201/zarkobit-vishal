import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  time: string;
}

const quickReplies = [
  "Best haircut for my face?",
  "Show trending styles",
  "Book a salon near me",
  "Skin care tips",
  "Premium plan benefits",
];

const botResponses: Record<string, string> = {
  "best haircut for my face": "Based on common face shapes:\n\n• **Oval Face**: Almost any style works! Try layered cuts or side parts.\n• **Round Face**: Go for longer styles with volume on top - a textured quiff or fade.\n• **Square Face**: Soft layers and side-swept bangs balance strong jawlines.\n• **Heart Face**: Bob cuts and chin-length styles work great!\n\n💡 **Pro Tip**: Use our AI Face Scan for a precise analysis! It measures your jawline, cheekbones & forehead ratio for exact recommendations.",
  "show trending styles": "🔥 **Trending Styles Right Now:**\n\n1. **Curtain Bangs** - #1 most requested\n2. **Textured Fade** - Fade level 2.3mm is hot 🔥\n3. **Balayage Highlights** - Sun-kissed look\n4. **Korean Perm** - Soft natural waves\n5. **Buzz Cut Fade** - Clean & minimal\n\nCheck out our Reels section for live demos! 📱",
  "book a salon near me": "🏪 **Top Salons Near You:**\n\n1. **Glamour Studio** ⭐ 4.9 - 0.5 km away\n2. **Royal Cuts** ⭐ 4.8 - 1.2 km away\n3. **Luxe Beauty Bar** ⭐ 4.7 - 2.0 km away\n\nWould you like me to book an appointment? Just go to Services and pick your preferred salon! 📅",
  "skin care tips": "🧖 **Daily Skincare Routine:**\n\n**Morning:**\n1. Gentle cleanser\n2. Vitamin C serum\n3. Moisturizer\n4. Sunscreen SPF 50+\n\n**Night:**\n1. Double cleanse\n2. Retinol serum\n3. Night cream\n\n💡 Our AI Face Scan can detect:\n- Dandruff & scalp issues\n- Oil/dry scalp analysis\n- Dark circles & pores\n- Personalized product suggestions!",
  "premium plan benefits": "👑 **Premium Plan - ₹99/month:**\n\n✅ Unlimited AI Face Scans (worth ₹2 each)\n✅ 20% off all services\n✅ Priority booking - skip queues\n✅ Ad-free experience\n✅ Premium badge on profile\n✅ Exclusive style trends first\n✅ Personal style consultant\n\n🎉 That's saving over ₹500/month if you scan regularly!\n\nGo to Pricing page to upgrade now!",
};

const getResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  for (const [key, value] of Object.entries(botResponses)) {
    if (lower.includes(key) || key.split(" ").some((w) => w.length > 3 && lower.includes(w))) {
      return value;
    }
  }
  return `Thanks for your message! 😊\n\nI can help you with:\n• **Haircut recommendations** based on face shape\n• **Trending styles** this season\n• **Booking** salon appointments\n• **Skin care** tips & analysis\n• **Premium plan** details\n\nTry asking one of these or use our **AI Face Scan** for a detailed 3D analysis of your face! 🤖`;
};

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: "Hey! 👋 I'm **ZarkoBot**, your AI style assistant.\n\nI can help you find the perfect hairstyle, book salons, analyze your skin, and more!\n\nWhat can I help you with today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: getResponse(text),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((p) => [...p, botMsg]);
      setTyping(false);
    }, 1200);
  };

  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>')
      .replace(/\n/g, "<br/>");
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg gold-glow hover:scale-105 transition-transform"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive animate-pulse" />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-4 right-4 z-50 flex h-[520px] w-[380px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-primary/20 to-card px-4 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary gold-glow">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">ZarkoBot</p>
                <p className="text-[10px] text-green-400">Online • AI Style Assistant</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-card border border-border rounded-bl-sm"
                }`}>
                  <div
                    className="text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                  />
                  <p className={`text-[10px] mt-1 ${msg.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-card border border-border px-4 py-3 rounded-bl-sm">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 2 && (
            <div className="flex gap-2 overflow-x-auto px-4 py-2 scrollbar-hide">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="flex-shrink-0 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs text-foreground hover:bg-primary/10 whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-border p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Ask ZarkoBot anything..."
              className="flex-1 rounded-full bg-secondary px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
