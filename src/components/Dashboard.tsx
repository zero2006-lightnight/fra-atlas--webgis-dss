'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  getClaimStats,
  getAverageProcessingTime,
  getStateDistribution,
  getRecentClaims,
  FRAClaim,
} from '@/lib/data/fra-claims';
import { STATUS_CONFIG } from '@/lib/claim-status';
import { useTranslation } from 'react-i18next';
import { BarChart, Clock, TrendingUp, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const StatCard = ({ title, value, icon: Icon, footer, color }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 ${color || 'text-muted-foreground'}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {footer && <p className="text-xs text-muted-foreground mt-1">{footer}</p>}
    </CardContent>
  </Card>
);

const ProgressBar = ({ value, total, colorClass }) => (
  <div className="w-32 bg-muted rounded-full h-2">
    <div
      className={`${colorClass} h-2 rounded-full`}
      style={{ width: `${(value / total) * 100}%` }}
    />
  </div>
);

export default function Dashboard() {
  const { t } = useTranslation();
  const stats = getClaimStats();
  const avgProcessingTime = getAverageProcessingTime();
  const stateDistribution = getStateDistribution();
  const recentClaims = getRecentClaims();

  const statusEntries = Object.entries(STATUS_CONFIG) as [
    keyof typeof stats,
    (typeof STATUS_CONFIG)[keyof typeof STATUS_CONFIG]
  ][];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground mt-2">{t('dashboard.subtitle')}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('dashboard.totalClaims')}
          value={stats.total}
          icon={BarChart}
          footer={
            <>
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last month
            </>
          }
        />
        <StatCard
          title={t('dashboard.pendingClaims')}
          value={stats.pending}
          icon={STATUS_CONFIG['Pending'].icon}
          color={STATUS_CONFIG['Pending'].color}
          footer="Requires immediate attention"
        />
        <StatCard
          title={t('dashboard.approvedClaims')}
          value={stats.approved}
          icon={STATUS_CONFIG['Approved'].icon}
          color={STATUS_CONFIG['Approved'].color}
          footer="Successfully processed"
        />
        <StatCard
          title={t('dashboard.avgProcessingTime')}
          value={avgProcessingTime}
          icon={Clock}
          footer={t('dashboard.days')}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Claims by Status */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.claimStatus')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusEntries.map(([status, config]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <config.icon className={`h-4 w-4 ${config.color}`} />
                    <span className="text-sm">{status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ProgressBar
                      value={stats[status.toLowerCase().replace(' ', '')]}
                      total={stats.total}
                      colorClass={config.color.replace('text-', 'bg-')}
                    />
                    <span className="text-sm font-semibold w-8">
                      {stats[status.toLowerCase().replace(' ', '')]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* State Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.stateDistribution')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stateDistribution).map(([state, count]) => (
                <div key={state} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{state}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ProgressBar value={count} total={stats.total} colorClass="bg-primary" />
                    <span className="text-sm font-semibold w-8">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentClaims.map((claim: FRAClaim) => (
              <div key={claim.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div className="space-y-1">
                  <p className="font-medium">{claim.claimant}</p>
                  <p className="text-sm text-muted-foreground">
                    {claim.village}, {claim.district}, {claim.state}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(claim.submittedDate), 'MMM dd, yyyy')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={STATUS_CONFIG[claim.status].getBadgeVariant(claim.priority)}
                  >
                    {claim.status}
                  </Badge>
                  <Badge variant="outline">{claim.priority}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}