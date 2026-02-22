import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Mail, MessageSquare, Phone, StickyNote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TimelineItem {
  id: string;
  type: "note" | "email" | "sms" | "call";
  date: string;
  content: string;
  subject?: string;
  direction?: string;
  duration?: number;
}

const TYPE_STYLES: Record<string, { bg: string; icon: React.ElementType }> = {
  email: { bg: "border-l-blue-500", icon: Mail },
  sms: { bg: "border-l-green-500", icon: MessageSquare },
  call: { bg: "border-l-yellow-500", icon: Phone },
  note: { bg: "border-l-gray-400", icon: StickyNote },
};

export default function LeadTimeline({ leadId }: { leadId: string }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [open, setOpen] = useState(false);
  const [commType, setCommType] = useState<"email" | "sms">("email");
  const [direction, setDirection] = useState("outbound");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchTimeline();
  }, [leadId]);

  const fetchTimeline = async () => {
    const [notesRes, commsRes, callsRes] = await Promise.all([
      supabase.from("lead_notes").select("*").eq("lead_id", leadId),
      supabase.from("communications").select("*").eq("lead_id", leadId),
      supabase.from("call_logs").select("*").eq("lead_id", leadId),
    ]);

    const timeline: TimelineItem[] = [];

    (notesRes.data || []).forEach((n) =>
      timeline.push({ id: n.id, type: "note", date: n.created_at, content: n.note })
    );
    (commsRes.data || []).forEach((c) =>
      timeline.push({ id: c.id, type: c.type as "email" | "sms", date: c.sent_at, content: c.message, subject: c.subject ?? undefined, direction: c.direction })
    );
    (callsRes.data || []).forEach((c) =>
      timeline.push({ id: c.id, type: "call", date: c.created_at, content: `${c.direction} call — ${c.duration}s`, direction: c.direction, duration: c.duration })
    );

    timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setItems(timeline);
  };

  const logComm = async () => {
    if (!message.trim() || !user) return;
    setIsSaving(true);
    const { error } = await supabase.from("communications").insert({
      lead_id: leadId,
      type: commType,
      direction,
      subject: commType === "email" ? subject.trim() || null : null,
      message: message.trim(),
      sent_by: user.id,
    });
    if (error) {
      toast({ title: "Error", description: "Failed to log communication.", variant: "destructive" });
    } else {
      setOpen(false);
      setSubject("");
      setMessage("");
      fetchTimeline();
    }
    setIsSaving(false);
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="w-5 h-5" /> Activity Timeline
        </CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={() => { setCommType("email"); setOpen(true); }}>
                <Mail className="w-4 h-4 mr-1" /> Log Email
              </Button>
              <Button size="sm" variant="outline" onClick={() => { setCommType("sms"); setOpen(true); }}>
                <MessageSquare className="w-4 h-4 mr-1" /> Log SMS
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Log {commType === "email" ? "Email" : "SMS"}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Direction</label>
                <Select value={direction} onValueChange={setDirection}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inbound">Inbound</SelectItem>
                    <SelectItem value="outbound">Outbound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {commType === "email" && (
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
                </div>
              )}
              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-[100px]" />
              </div>
              <Button onClick={logComm} disabled={isSaving || !message.trim()} className="w-full">Log {commType === "email" ? "Email" : "SMS"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {items.length === 0 && <p className="text-sm text-muted-foreground">No activity yet.</p>}
        <div className="space-y-3">
          {items.map((item) => {
            const style = TYPE_STYLES[item.type] || TYPE_STYLES.note;
            const Icon = style.icon;
            return (
              <div key={item.id} className={`border-l-4 ${style.bg} rounded-r-lg p-3 space-y-1`}>
                <div className="flex items-center gap-2 text-sm">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium capitalize">{item.type}</span>
                  {item.direction && <span className="text-xs text-muted-foreground">({item.direction})</span>}
                  <span className="text-xs text-muted-foreground ml-auto">{formatDate(item.date)}</span>
                </div>
                {item.subject && <p className="text-sm font-medium">{item.subject}</p>}
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{item.content}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
