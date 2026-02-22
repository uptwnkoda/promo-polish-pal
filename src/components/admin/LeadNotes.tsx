import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StickyNote, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Note {
  id: string;
  note: string;
  created_at: string;
  created_by: string;
}

export default function LeadNotes({ leadId }: { leadId: string }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, [leadId]);

  const fetchNotes = async () => {
    const { data } = await supabase
      .from("lead_notes")
      .select("*")
      .eq("lead_id", leadId)
      .order("created_at", { ascending: false });
    if (data) setNotes(data);
  };

  const addNote = async () => {
    if (!newNote.trim() || !user) return;
    setIsAdding(true);
    const { error } = await supabase.from("lead_notes").insert({
      lead_id: leadId,
      note: newNote.trim(),
      created_by: user.id,
    });
    if (error) {
      toast({ title: "Error", description: "Failed to add note.", variant: "destructive" });
    } else {
      setNewNote("");
      fetchNotes();
    }
    setIsAdding(false);
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <StickyNote className="w-5 h-5" /> Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Textarea
            placeholder="Add a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[80px]"
          />
        </div>
        <Button onClick={addNote} disabled={isAdding || !newNote.trim()} size="sm">
          <Plus className="w-4 h-4 mr-1" /> Add Note
        </Button>
        <div className="space-y-3 pt-2">
          {notes.length === 0 && <p className="text-sm text-muted-foreground">No notes yet.</p>}
          {notes.map((n) => (
            <div key={n.id} className="border rounded-lg p-3 space-y-1">
              <p className="text-sm whitespace-pre-wrap">{n.note}</p>
              <p className="text-xs text-muted-foreground">{formatDate(n.created_at)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
