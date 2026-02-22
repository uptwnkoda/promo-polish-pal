import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, Mail, User, Clock } from "lucide-react";
import LeadNotes from "@/components/admin/LeadNotes";
import LeadEstimates from "@/components/admin/LeadEstimates";
import LeadTasks from "@/components/admin/LeadTasks";
import LeadTimeline from "@/components/admin/LeadTimeline";
import LeadFiles from "@/components/admin/LeadFiles";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  source: string | null;
  created_at: string;
  landing_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  qualified: "bg-green-100 text-green-800",
  converted: "bg-emerald-100 text-emerald-800",
  lost: "bg-red-100 text-red-800",
};

export default function LeadDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchLead = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        setError("Failed to load lead.");
        console.error(error);
      } else if (!data) {
        setError("Lead not found.");
      } else {
        setLead(data);
      }
      setIsLoading(false);
    };

    fetchLead();
  }, [id]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading lead...</div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle>{error || "Lead not found"}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button variant="outline" onClick={() => navigate("/admin")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <h1 className="text-xl font-bold text-foreground">Lead Detail</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {lead.name}
            </CardTitle>
            <Badge className={STATUS_COLORS[lead.status] || "bg-gray-100 text-gray-800"}>
              {lead.status}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a href={`mailto:${lead.email}`} className="hover:text-accent transition-colors">{lead.email}</a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <a href={`tel:${lead.phone}`} className="hover:text-accent transition-colors">{lead.phone}</a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{formatDate(lead.created_at)}</span>
              </div>
              {lead.source && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Source:</span> {lead.source}
                </div>
              )}
            </div>
            {(lead.utm_source || lead.utm_medium || lead.utm_campaign) && (
              <div className="pt-4 border-t">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">UTM Data</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                  {lead.utm_source && <div><span className="text-muted-foreground">Source:</span> {lead.utm_source}</div>}
                  {lead.utm_medium && <div><span className="text-muted-foreground">Medium:</span> {lead.utm_medium}</div>}
                  {lead.utm_campaign && <div><span className="text-muted-foreground">Campaign:</span> {lead.utm_campaign}</div>}
                </div>
              </div>
            )}
            {lead.landing_page && (
              <div className="pt-4 border-t">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Landing Page</h3>
                <p className="text-sm break-all">{lead.landing_page}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <LeadNotes leadId={lead.id} />
        <LeadEstimates leadId={lead.id} />
        <LeadTasks leadId={lead.id} />
        <LeadTimeline leadId={lead.id} />
        <LeadFiles leadId={lead.id} />
      </main>
    </div>
  );
}
