import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export const STATUS_CONFIG = {
  Pending: {
    icon: Clock,
    color: 'text-amber-500',
    getBadgeVariant: (priority: 'High' | 'Medium' | 'Low'): BadgeVariant => 'secondary',
  },
  Approved: {
    icon: CheckCircle,
    color: 'text-green-500',
    getBadgeVariant: (): BadgeVariant => 'default',
  },
  Rejected: {
    icon: XCircle,
    color: 'text-red-500',
    getBadgeVariant: (): BadgeVariant => 'destructive',
  },
  'Under Review': {
    icon: AlertCircle,
    color: 'text-blue-500',
    getBadgeVariant: (): BadgeVariant => 'outline',
  },
};