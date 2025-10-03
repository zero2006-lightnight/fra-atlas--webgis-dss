'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { sampleClaims, FRAClaim } from '@/lib/data/fra-claims';
import { useTranslation } from 'react-i18next';
import { Search, Download, Eye, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminPanel() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredClaims = sampleClaims.filter((claim) => {
    const matchesSearch = 
      claim.claimant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.village.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = filterState === 'all' || claim.state === filterState;
    const matchesStatus = filterStatus === 'all' || claim.status === filterStatus;

    return matchesSearch && matchesState && matchesStatus;
  });

  const priorityClaims = sampleClaims
    .filter((c) => c.priority === 'High' && c.status === 'Pending')
    .slice(0, 5);

  const exportData = () => {
    const csvContent = [
      ['Claim ID', 'Claimant', 'State', 'District', 'Village', 'Status', 'Priority', 'Submitted Date'].join(','),
      ...filteredClaims.map((c) => 
        [c.id, c.claimant, c.state, c.district, c.village, c.status, c.priority, c.submittedDate].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fra-claims-export.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">{t('admin.title')}</h1>
        <p className="text-muted-foreground mt-2">Manage FRA claims and priority queue</p>
      </div>

      {/* Priority Queue */}
      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            {t('admin.priorityQueue')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {priorityClaims.map((claim) => (
              <div key={claim.id} className="flex items-center justify-between p-3 border rounded-lg bg-amber-50 dark:bg-amber-950">
                <div>
                  <p className="font-semibold">{claim.claimant}</p>
                  <p className="text-sm text-muted-foreground">
                    {claim.id} • {claim.village}, {claim.state}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">High Priority</Badge>
                  <Button size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    {t('admin.view')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Claim Management */}
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.claimManagement')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('admin.searchClaims')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterState} onValueChange={setFilterState}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('admin.allStates')}</SelectItem>
                  <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                  <SelectItem value="Tripura">Tripura</SelectItem>
                  <SelectItem value="Odisha">Odisha</SelectItem>
                  <SelectItem value="Telangana">Telangana</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('admin.allStatuses')}</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={exportData}>
                <Download className="h-4 w-4 mr-2" />
                {t('admin.export')}
              </Button>
            </div>

            {/* Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('admin.claimId')}</TableHead>
                    <TableHead>{t('admin.claimant')}</TableHead>
                    <TableHead>{t('admin.location')}</TableHead>
                    <TableHead>{t('admin.status')}</TableHead>
                    <TableHead>{t('admin.priority')}</TableHead>
                    <TableHead>{t('admin.submittedDate')}</TableHead>
                    <TableHead>{t('admin.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClaims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-mono text-sm">{claim.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{claim.claimant}</p>
                          <p className="text-xs text-muted-foreground">{claim.contactNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{claim.village}</p>
                          <p className="text-muted-foreground">{claim.district}, {claim.state}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          claim.status === 'Approved' ? 'default' :
                          claim.status === 'Pending' ? 'secondary' :
                          claim.status === 'Rejected' ? 'destructive' : 'outline'
                        }>
                          {claim.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          claim.priority === 'High' ? 'destructive' :
                          claim.priority === 'Medium' ? 'default' : 'secondary'
                        }>
                          {claim.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(new Date(claim.submittedDate), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}