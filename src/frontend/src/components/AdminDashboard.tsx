import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BarChart, Users, MessageSquare, AlertTriangle, TrendingUp, Car, Shield } from 'lucide-react';

interface Conversation {
  id: string;
  vehicleNumber: string;
  vehicleType: 'Car' | 'Bike';
  status: 'active' | 'resolved' | 'emergency';
  messages: number;
  startTime: Date;
  lastActivity: Date;
}

export default function AdminDashboard() {
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      vehicleNumber: 'DL-1234',
      vehicleType: 'Car',
      status: 'active',
      messages: 5,
      startTime: new Date(Date.now() - 1000 * 60 * 15),
      lastActivity: new Date(Date.now() - 1000 * 60 * 2),
    },
    {
      id: '2',
      vehicleNumber: 'MH-5678',
      vehicleType: 'Bike',
      status: 'resolved',
      messages: 8,
      startTime: new Date(Date.now() - 1000 * 60 * 45),
      lastActivity: new Date(Date.now() - 1000 * 60 * 10),
    },
    {
      id: '3',
      vehicleNumber: 'KA-9012',
      vehicleType: 'Car',
      status: 'emergency',
      messages: 3,
      startTime: new Date(Date.now() - 1000 * 60 * 5),
      lastActivity: new Date(Date.now() - 1000 * 30),
    },
    {
      id: '4',
      vehicleNumber: 'UP-3456',
      vehicleType: 'Bike',
      status: 'active',
      messages: 2,
      startTime: new Date(Date.now() - 1000 * 60 * 8),
      lastActivity: new Date(Date.now() - 1000 * 60),
    },
  ]);

  const stats = {
    totalConversations: conversations.length,
    activeChats: conversations.filter((c) => c.status === 'active').length,
    emergencies: conversations.filter((c) => c.status === 'emergency').length,
    resolved: conversations.filter((c) => c.status === 'resolved').length,
  };

  const getStatusBadge = (status: Conversation['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'resolved':
        return <Badge variant="secondary">Resolved</Badge>;
      case 'emergency':
        return <Badge variant="destructive">Emergency</Badge>;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    return `${Math.floor(diff / 60)}h ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Admin Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Monitor and manage vehicle conversations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-gradient-to-br from-card to-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Total Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.totalConversations}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-card to-accent/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              Active Chats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.activeChats}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently ongoing</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-card to-destructive/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Emergencies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{stats.emergencies}</div>
            <p className="text-xs text-muted-foreground mt-1">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-card to-secondary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.resolved}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully completed</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            Conversation Management
          </CardTitle>
          <CardDescription>View and manage all vehicle conversations</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({conversations.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({stats.activeChats})</TabsTrigger>
              <TabsTrigger value="emergency">Emergency ({stats.emergencies})</TabsTrigger>
              <TabsTrigger value="resolved">Resolved ({stats.resolved})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle Number</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Messages</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {conversations.map((conv) => (
                      <TableRow key={conv.id}>
                        <TableCell className="font-medium">{conv.vehicleNumber}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{conv.vehicleType}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(conv.status)}</TableCell>
                        <TableCell>{conv.messages}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatTime(conv.lastActivity)}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="active" className="mt-4">
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle Number</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Messages</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {conversations
                      .filter((c) => c.status === 'active')
                      .map((conv) => (
                        <TableRow key={conv.id}>
                          <TableCell className="font-medium">{conv.vehicleNumber}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{conv.vehicleType}</Badge>
                          </TableCell>
                          <TableCell>{conv.messages}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatTime(conv.lastActivity)}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="emergency" className="mt-4">
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle Number</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Messages</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {conversations
                      .filter((c) => c.status === 'emergency')
                      .map((conv) => (
                        <TableRow key={conv.id} className="bg-destructive/5">
                          <TableCell className="font-medium">{conv.vehicleNumber}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{conv.vehicleType}</Badge>
                          </TableCell>
                          <TableCell>{conv.messages}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatTime(conv.lastActivity)}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="resolved" className="mt-4">
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle Number</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Messages</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {conversations
                      .filter((c) => c.status === 'resolved')
                      .map((conv) => (
                        <TableRow key={conv.id}>
                          <TableCell className="font-medium">{conv.vehicleNumber}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{conv.vehicleType}</Badge>
                          </TableCell>
                          <TableCell>{conv.messages}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatTime(conv.lastActivity)}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4" />
            Privacy Notice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            All conversations are encrypted and secure. Phone numbers are never exposed to either party.
            Communication happens through our secure server with end-to-end encryption.
          </p>
          <Separator className="my-3" />
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>End-to-End Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>No Phone Number Exposure</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Data Protection Enabled</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
