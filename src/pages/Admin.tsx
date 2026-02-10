import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  LogOut, 
  Search, 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle,
  RefreshCw,
  Filter,
  Phone,
  Mail as MailIcon,
  AlertCircle,
  Trash2
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  created_at: string;
}

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'qualified', label: 'Qualified', color: 'bg-green-100 text-green-800' },
  { value: 'converted', label: 'Converted', color: 'bg-emerald-100 text-emerald-800' },
  { value: 'lost', label: 'Lost', color: 'bg-red-100 text-red-800' },
];

export default function Admin() {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  // Request notification permission
  useEffect(() => {
    if (user && isAdmin && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [user, isAdmin]);

  useEffect(() => {
    if (user && isAdmin) {
      const playNotificationSound = () => {
        try {
          const ctx = new AudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(830, ctx.currentTime);
          osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.1);
          osc.frequency.setValueAtTime(830, ctx.currentTime + 0.2);
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.4);
        } catch (e) { /* silent fallback */ }
      };

      fetchLeads();

      // Real-time subscription
      const channel = supabase
        .channel('leads-realtime')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'leads' },
          (payload) => {
            const newLead = payload.new as Lead;
            setLeads(prev => [newLead, ...prev]);
            playNotificationSound();
            toast({ title: "New Lead!", description: `${newLead.name} just submitted a request.` });
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('New Lead Received', { body: `${newLead.name} — ${newLead.phone}`, icon: '/favicon.ico' });
            }
          }
        )
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'leads' },
          (payload) => {
            const updated = payload.new as Lead;
            setLeads(prev => prev.map(l => l.id === updated.id ? updated : l));
          }
        )
        .on(
          'postgres_changes',
          { event: 'DELETE', schema: 'public', table: 'leads' },
          (payload) => {
            const deleted = payload.old as Lead;
            setLeads(prev => prev.filter(l => l.id !== deleted.id));
          }
        )
        .subscribe();

      return () => { supabase.removeChannel(channel); };
    }
  }, [user, isAdmin]);

  useEffect(() => {
    filterLeads();
  }, [leads, searchQuery, statusFilter]);

  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error);
        toast({
          title: "Error",
          description: "Failed to fetch leads. Please try again.",
          variant: "destructive",
        });
      } else {
        setLeads(data || []);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const filterLeads = () => {
    let filtered = [...leads];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        lead =>
          lead.name.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.phone.includes(query)
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }
    
    setFilteredLeads(filtered);
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    setUpdatingId(leadId);
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId);

      if (error) {
        console.error('Error updating lead:', error);
        toast({
          title: "Error",
          description: "Failed to update lead status.",
          variant: "destructive",
        });
      } else {
        setLeads(prevLeads =>
          prevLeads.map(lead =>
            lead.id === leadId ? { ...lead, status: newStatus } : lead
          )
        );
        toast({
          title: "Status Updated",
          description: `Lead status changed to ${newStatus}.`,
        });
      }
    } catch (err) {
      console.error('Error updating lead:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteLead = async (leadId: string) => {
    setDeletingId(leadId);
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);

      if (error) {
        console.error('Error deleting lead:', error);
        toast({
          title: "Error",
          description: "Failed to delete lead.",
          variant: "destructive",
        });
      } else {
        setLeads(prevLeads => prevLeads.filter(lead => lead.id !== leadId));
        toast({
          title: "Lead Deleted",
          description: "The lead has been permanently deleted.",
        });
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  const getStatusBadge = (status: string) => {
    const option = STATUS_OPTIONS.find(opt => opt.value === status);
    return (
      <Badge className={option?.color || 'bg-gray-100 text-gray-800'}>
        {option?.label || status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStats = () => {
    const total = leads.length;
    const newLeads = leads.filter(l => l.status === 'new').length;
    const converted = leads.filter(l => l.status === 'converted').length;
    const lost = leads.filter(l => l.status === 'lost').length;
    
    return { total, newLeads, converted, lost };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access this page. Please contact an administrator.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2 justify-center">
            <Button variant="outline" onClick={() => navigate('/')}>
              Go Home
            </Button>
            <Button variant="destructive" onClick={handleSignOut}>
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.newLeads}</p>
                  <p className="text-sm text-muted-foreground">New Leads</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.converted}</p>
                  <p className="text-sm text-muted-foreground">Converted</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.lost}</p>
                  <p className="text-sm text-muted-foreground">Lost</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Leads</CardTitle>
                <CardDescription>
                  Manage and track your leads
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={fetchLeads}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {STATUS_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingLeads ? (
              <div className="py-12 text-center text-muted-foreground">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                Loading leads...
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No leads found</p>
                <p className="text-sm">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Try adjusting your filters' 
                    : 'Leads will appear here when submitted'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-sm">
                              <MailIcon className="w-3.5 h-3.5 text-muted-foreground" />
                              <a 
                                href={`mailto:${lead.email}`}
                                className="text-primary hover:underline"
                              >
                                {lead.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm">
                              <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                              <a 
                                href={`tel:${lead.phone}`}
                                className="text-primary hover:underline"
                              >
                                {lead.phone}
                              </a>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(lead.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(lead.created_at)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Select 
                              value={lead.status} 
                              onValueChange={(value) => updateLeadStatus(lead.id, value)}
                              disabled={updatingId === lead.id}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {STATUS_OPTIONS.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="text-muted-foreground hover:text-destructive"
                                  disabled={deletingId === lead.id}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Lead</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete the lead for <strong>{lead.name}</strong>? 
                                    This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => deleteLead(lead.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
