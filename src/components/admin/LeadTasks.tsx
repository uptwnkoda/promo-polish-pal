import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ListTodo, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  status: string;
  due_at: string | null;
  created_at: string;
}

export default function LeadTasks({ leadId }: { leadId: string }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [leadId]);

  const fetchTasks = async () => {
    const { data } = await supabase
      .from("lead_tasks")
      .select("*")
      .eq("lead_id", leadId)
      .order("created_at", { ascending: false });
    if (data) setTasks(data);
  };

  const createTask = async () => {
    if (!title.trim() || !user) return;
    setIsSaving(true);
    const { error } = await supabase.from("lead_tasks").insert({
      lead_id: leadId,
      title: title.trim(),
      due_at: dueDate ? new Date(dueDate).toISOString() : null,
      created_by: user.id,
      status: "open",
    });
    if (error) {
      toast({ title: "Error", description: "Failed to create task.", variant: "destructive" });
    } else {
      setOpen(false);
      setTitle("");
      setDueDate("");
      fetchTasks();
    }
    setIsSaving(false);
  };

  const toggleTask = async (task: Task) => {
    const newStatus = task.status === "completed" ? "open" : "completed";
    const { error } = await supabase.from("lead_tasks").update({ status: newStatus }).eq("id", task.id);
    if (!error) fetchTasks();
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ListTodo className="w-5 h-5" /> Tasks
        </CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="w-4 h-4 mr-1" /> New Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Task</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Follow up call..." />
              </div>
              <div>
                <label className="text-sm font-medium">Due Date</label>
                <Input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
              <Button onClick={createTask} disabled={isSaving || !title.trim()} className="w-full">Create Task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 && <p className="text-sm text-muted-foreground">No tasks yet.</p>}
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3 border rounded-lg p-3">
              <Checkbox
                checked={task.status === "completed"}
                onCheckedChange={() => toggleTask(task)}
              />
              <div className="flex-1">
                <p className={`text-sm ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>{task.title}</p>
                {task.due_at && (
                  <p className="text-xs text-muted-foreground">Due: {formatDate(task.due_at)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
