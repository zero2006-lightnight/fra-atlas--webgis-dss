'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { Upload, Wifi, WifiOff, Save, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function DataCollectionForm() {
  const { t } = useTranslation();
  const [offlineMode, setOfflineMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    village: '',
    state: '',
    district: '',
    claimType: '',
    landArea: '',
    latitude: '',
    longitude: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (isDraft: boolean) => {
    if (isDraft) {
      toast(t('common.success'), {
        description: 'Draft saved successfully',
      });
    } else {
      toast(t('common.success'), {
        description: 'Claim submitted successfully',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">{t('dataCollection.title')}</h1>
          <p className="text-muted-foreground mt-2">{t('dataCollection.subtitle')}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={offlineMode}
              onCheckedChange={setOfflineMode}
            />
            <Label className="flex items-center gap-2">
              {offlineMode ? <WifiOff className="h-4 w-4" /> : <Wifi className="h-4 w-4" />}
              {t('dataCollection.offlineMode')}
            </Label>
          </div>
        </div>
      </div>

      {/* Offline Status Banner */}
      {offlineMode && (
        <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <WifiOff className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="font-semibold text-amber-900 dark:text-amber-100">
                  {t('dataCollection.offlineEnabled')}
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  {t('dataCollection.dataSynced')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dataCollection.claimantInfo')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">{t('dataCollection.fullName')}</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber">{t('dataCollection.contactNumber')}</Label>
              <Input
                id="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                placeholder="+91-XXXXXXXXXX"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="village">{t('dataCollection.villageGramPanchayat')}</Label>
              <Input
                id="village"
                value={formData.village}
                onChange={(e) => handleInputChange('village', e.target.value)}
                placeholder="Enter village"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">{t('dataCollection.state')}</Label>
              <Select value={formData.state} onValueChange={(v) => handleInputChange('state', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="madhya-pradesh">Madhya Pradesh</SelectItem>
                  <SelectItem value="tripura">Tripura</SelectItem>
                  <SelectItem value="odisha">Odisha</SelectItem>
                  <SelectItem value="telangana">Telangana</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">{t('dataCollection.district')}</Label>
              <Input
                id="district"
                value={formData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
                placeholder="Enter district"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Claim Details */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dataCollection.claimDetails')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="claimType">{t('dataCollection.claimType')}</Label>
              <Select value={formData.claimType} onValueChange={(v) => handleInputChange('claimType', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select claim type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ifr">{t('dataCollection.individualForestRights')}</SelectItem>
                  <SelectItem value="cfr">{t('dataCollection.communityForestRights')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="landArea">{t('dataCollection.landArea')}</Label>
              <Input
                id="landArea"
                type="number"
                step="0.1"
                value={formData.landArea}
                onChange={(e) => handleInputChange('landArea', e.target.value)}
                placeholder="0.0"
              />
            </div>
          </div>

          <div>
            <Label className="mb-2 block">{t('dataCollection.gpsCoordinates')}</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">{t('dataCollection.latitude')}</Label>
                <Input
                  id="latitude"
                  value={formData.latitude}
                  onChange={(e) => handleInputChange('latitude', e.target.value)}
                  placeholder="22.0000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">{t('dataCollection.longitude')}</Label>
                <Input
                  id="longitude"
                  value={formData.longitude}
                  onChange={(e) => handleInputChange('longitude', e.target.value)}
                  placeholder="78.0000"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t('dataCollection.supportingDocuments')}</Label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-1">
                {t('dataCollection.uploadFiles')}
              </p>
              <p className="text-xs text-muted-foreground">
                Click to browse or drag and drop
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" size="lg" onClick={() => handleSubmit(true)}>
          <Save className="h-4 w-4 mr-2" />
          {t('dataCollection.save')}
        </Button>
        <Button size="lg" onClick={() => handleSubmit(false)}>
          <Send className="h-4 w-4 mr-2" />
          {t('dataCollection.submit')}
        </Button>
      </div>
    </div>
  );
}