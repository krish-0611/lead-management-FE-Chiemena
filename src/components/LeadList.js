import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, Clock, AlertCircle, CheckCircle2, XCircle, Send, UserPlus } from "lucide-react";

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('leads', leads)

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/leads');
        if (response.ok) {
          const data = await response.json();
          setLeads(data.data ?? []);
        } else {
          setError('Failed to fetch leads');
        }
      } catch (error) {
        setError('Error fetching leads');
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const getStatusStyles = (status) => {
    const styles = {
      'New': {
        color: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
        icon: <UserPlus className="w-4 h-4" />
      },
      'Engaged': {
        color: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
        icon: <Users className="w-4 h-4" />
      },
      'Proposal Sent': {
        color: 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20',
        icon: <Send className="w-4 h-4" />
      },
      'Closed-Won': {
        color: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
        icon: <CheckCircle2 className="w-4 h-4" />
      },
      'Closed-Lost': {
        color: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
        icon: <XCircle className="w-4 h-4" />
      }
    };
    return styles[status] || { color: 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20', icon: null };
  };

  const getInitialColor = (name) => {
    const colors = [
      'bg-blue-100 text-blue-700',
      'bg-green-100 text-green-700',
      'bg-purple-100 text-purple-700',
      'bg-yellow-100 text-yellow-700',
      'bg-pink-100 text-pink-700',
      'bg-indigo-100 text-indigo-700',
    ];
    
    const index = name.toLowerCase().charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <Card className="border border-border/50">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="h-6 w-32 bg-muted animate-pulse rounded"></div>
                <div className="h-4 w-48 bg-muted animate-pulse rounded"></div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border border-border/50">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="h-5 w-3/4 bg-muted animate-pulse rounded"></div>
                        <div className="h-4 w-1/2 bg-muted animate-pulse rounded"></div>
                      </div>
                      <div className="h-6 w-24 bg-muted animate-pulse rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-1">
        <Card className="border-destructive/50 bg-destructive/5 shadow-sm">
          <CardContent className="px-8">
            <div className="flex flex-col items-center justify-center space-y-2 text-destructive text-center">
              <AlertCircle className="h-8 w-8" />
              <p className="font-medium">{error}</p>
              <p className="text-sm text-destructive/80">Please try again later or contact support if the problem persists.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card className="shadow-sm hover:shadow-md transition-all duration-300 border border-border/50">
        <CardHeader className="border-b bg-card">
          <div className="flex items-center justify-between">
            <div className="space-y-1 mb-2">
              <CardTitle className="text-xl font-semibold">Lead List</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {leads.length} {leads.length === 1 ? 'lead' : 'leads'} in your pipeline
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 bg-background/50">
          {leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground font-medium">No leads found</p>
              <p className="text-sm text-muted-foreground/80">Add your first lead using the form above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {leads.map((lead) => (
                <Card 
                  key={lead._id}
                  className="group overflow-hidden hover:shadow-md transition-all duration-300 hover:scale-[1.02] border border-border/50 bg-card"
                >
                  <CardContent className="px-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${getInitialColor(lead.name)} flex items-center justify-center font-semibold text-sm`}>
                          {lead.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="space-y-1 min-w-0 flex-1">
                          <h3 className="text-lg font-semibold truncate group-hover:text-primary transition-colors">
                            {lead.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {lead.email}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`${getStatusStyles(lead.status).color} inline-flex items-center gap-1.5 transition-all duration-300 px-2.5 py-0.5 text-xs font-medium rounded-md`}
                      >
                        {getStatusStyles(lead.status).icon}
                        <span>{lead.status}</span>
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadList; 