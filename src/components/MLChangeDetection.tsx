'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, AlertTriangle, TrendingUp, Loader2, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';

interface ChangeDetection {
  id: string;
  state: string;
  district: string;
  changeType: string;
  severity: string;
  area: number;
  confidence: number;
  detectedDate: string;
  coordinates: [number, number];
}

export default function MLChangeDetection() {
  const [changes, setChanges] = useState<ChangeDetection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChangeDetections();
  }, []);

  const fetchChangeDetections = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ml/change-detection');
      const result = await response.json();
      if (result.success) {
        setChanges(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch change detections:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'default';
      case 'Low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            ML-Powered Change Detection
          </CardTitle>
          <Button variant="outline" size="sm" onClick={fetchChangeDetections} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold">{changes.length}</p>
                <p className="text-xs text-muted-foreground">Total Changes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-500">
                  {changes.filter((c) => c.severity === 'High').length}
                </p>
                <p className="text-xs text-muted-foreground">High Severity</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {changes.reduce((sum, c) => sum + c.area, 0).toFixed(1)} ha
                </p>
                <p className="text-xs text-muted-foreground">Area Affected</p>
              </div>
            </div>

            {/* Change List */}
            <div className="space-y-3">
              {changes.map((change) => (
                <div
                  key={change.id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span className="font-semibold">{change.changeType}</span>
                      <Badge variant={getSeverityColor(change.severity) as any}>
                        {change.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {change.district}, {change.state}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Area: {change.area} ha</span>
                      <span>Confidence: {(change.confidence * 100).toFixed(0)}%</span>
                      <span>Detected: {format(new Date(change.detectedDate), 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              ))}
            </div>

            {/* AI Insights */}
            <div className="p-4 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                    AI Insights
                  </p>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Based on satellite imagery analysis from the past 6 months, the ML model detected {changes.length} significant changes in forest cover. 
                    Priority should be given to high-severity cases in {changes.filter(c => c.severity === 'High')[0]?.state || 'affected areas'} for immediate field verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}