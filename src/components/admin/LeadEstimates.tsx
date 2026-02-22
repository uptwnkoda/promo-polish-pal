import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Receipt, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Estimate {
  id: string;
  estimate_number: string;
  service_type: string;
  amount: number;
  status: string;
  notes: string | null;
  created_at: string;
}

const SERVICE_TYPES = [
  { value: "roof_repair", label: "Roof Repair" },
  { value: "roof_replacement", label: "Roof Replacement" },
  { value: "gutter", label: "Gutter" },
  { value: "siding", label: "Siding" },
  { value: "window", label: "Window" },
  { value: "paint", label: "Paint" },
  { value: "general", label: "General" },
];

const EST_STATUS_COLORS: Record<string, string> = {
  draft: "bg-gray-100 text-gray-800",
  sent: "bg-blue-100 text-blue-800",
  accepted: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
};

export default function LeadEstimates({ leadId }: { leadId: string }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [open, setOpen] = useState(false);
  const [serviceType, setServiceType] = useState("roof_repair");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchEstimates();
  }, [leadId]);

  const fetchEstimates = async () => {
    const { data } = await supabase
      .from("estimates")
      .select("*")
      .eq("lead_id", leadId)
      .order("created_at", { ascending: false });
    if (data) setEstimates(data);
  };

  const createEstimate = async () => {
    if (!amount || !user) return;
    setIsSaving(true);
    const { error } = await supabase.from("estimates").insert({
      lead_id: leadId,
      estimate_number: `3DL-${Date.now()}`,
      service_type: serviceType,
      amount: parseFloat(amount),
      notes: notes.trim() || null,
      status: "draft",
      created_by: user.id,
    });
    if (error) {
      toast({ title: "Error", description: "Failed to create estimate.", variant: "destructive" });
    } else {
      setOpen(false);
      setAmount("");
      setNotes("");
      setServiceType("roof_repair");
      fetchEstimates();
    }
    setIsSaving(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const updateData: Record<string, unknown> = { status: newStatus };
    if (newStatus === "sent") updateData.sent_at = new Date().toISOString();
    if (newStatus === "accepted") updateData.accepted_at = new Date().toISOString();

    const { error } = await supabase.from("estimates").update(updateData).eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to update status.", variant: "destructive" });
    } else {
      fetchEstimates();
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Receipt className="w-5 h-5" /> Estimates
        </CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="w-4 h-4 mr-1" /> New Estimate</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Estimate</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Service Type</label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SERVICE_TYPES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Amount ($)</label>
                <Input type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
              <Button onClick={createEstimate} disabled={isSaving || !amount} className="w-full">Create Estimate</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {estimates.length === 0 && <p className="text-sm text-muted-foreground">No estimates yet.</p>}
        <div className="space-y-3">
          {estimates.map((est) => (
            <div key={est.id} className="border rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-medium">{est.estimate_number}</span>
                  <Badge className={EST_STATUS_COLORS[est.status] || "bg-gray-100 text-gray-800"}>{est.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{SERVICE_TYPES.find(s => s.value === est.service_type)?.label || est.service_type} — ${est.amount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{formatDate(est.created_at)}</p>
              </div>
              <div className="flex gap-1 flex-wrap">
                {est.status === "draft" && <Button size="sm" variant="outline" onClick={() => updateStatus(est.id, "sent")}>Mark Sent</Button>}
                {est.status === "sent" && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => updateStatus(est.id, "accepted")}>Accept</Button>
                    <Button size="sm" variant="outline" onClick={() => updateStatus(est.id, "declined")}>Decline</Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
