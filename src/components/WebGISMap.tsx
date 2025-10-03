'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, Circle } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { sampleClaims, FRAClaim } from '@/lib/data/fra-claims';
import { useTranslation } from 'react-i18next';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const statusColors = {
  'Approved': '#22c55e',
  'Pending': '#f59e0b',
  'Rejected': '#ef4444',
  'Under Review': '#3b82f6',
};

export default function WebGISMap() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [layers, setLayers] = useState({
    forestCover: true,
    fraClaims: true,
    satelliteImagery: false,
    changeDetection: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLayer = (layer: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  if (!mounted) {
    return (
      <div className="w-full h-[600px] bg-muted animate-pulse rounded-lg" />
    );
  }

  const getStatusColor = (status: FRAClaim['status']) => {
    return statusColors[status] || '#gray';
  };

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{t('map.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Layer Controls */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="forestCover"
                  checked={layers.forestCover}
                  onCheckedChange={() => toggleLayer('forestCover')}
                />
                <label htmlFor="forestCover" className="text-sm font-medium cursor-pointer">
                  {t('map.forestCover')}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="fraClaims"
                  checked={layers.fraClaims}
                  onCheckedChange={() => toggleLayer('fraClaims')}
                />
                <label htmlFor="fraClaims" className="text-sm font-medium cursor-pointer">
                  {t('map.fraClaims')}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="satelliteImagery"
                  checked={layers.satelliteImagery}
                  onCheckedChange={() => toggleLayer('satelliteImagery')}
                />
                <label htmlFor="satelliteImagery" className="text-sm font-medium cursor-pointer">
                  {t('map.satelliteImagery')}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="changeDetection"
                  checked={layers.changeDetection}
                  onCheckedChange={() => toggleLayer('changeDetection')}
                />
                <label htmlFor="changeDetection" className="text-sm font-medium cursor-pointer">
                  {t('map.changeDetection')}
                </label>
              </div>
            </div>

            {/* Map */}
            <div className="h-[500px] rounded-lg overflow-hidden border">
              <MapContainer
                center={[21.0, 82.0]}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url={layers.satelliteImagery 
                    ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  }
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {/* Forest Cover Layer (simulated with circles) */}
                {layers.forestCover && (
                  <>
                    <Circle center={[23.4734, 77.9472]} radius={50000} pathOptions={{ color: '#22c55e', fillOpacity: 0.2 }} />
                    <Circle center={[23.9408, 91.9882]} radius={30000} pathOptions={{ color: '#22c55e', fillOpacity: 0.2 }} />
                    <Circle center={[20.9517, 85.0985]} radius={45000} pathOptions={{ color: '#22c55e', fillOpacity: 0.2 }} />
                    <Circle center={[18.1124, 79.0193]} radius={40000} pathOptions={{ color: '#22c55e', fillOpacity: 0.2 }} />
                  </>
                )}

                {/* FRA Claims Markers */}
                {layers.fraClaims && sampleClaims.map((claim) => (
                  <Circle
                    key={claim.id}
                    center={claim.coordinates}
                    radius={5000}
                    pathOptions={{
                      color: getStatusColor(claim.status),
                      fillColor: getStatusColor(claim.status),
                      fillOpacity: 0.6,
                    }}
                  >
                    <Popup>
                      <div className="min-w-[200px]">
                        <h3 className="font-semibold text-lg mb-2">{claim.claimant}</h3>
                        <div className="space-y-1 text-sm">
                          <p><strong>ID:</strong> {claim.id}</p>
                          <p><strong>State:</strong> {claim.state}</p>
                          <p><strong>District:</strong> {claim.district}</p>
                          <p><strong>Village:</strong> {claim.village}</p>
                          <p><strong>Type:</strong> {claim.claimType}</p>
                          <p><strong>Area:</strong> {claim.landArea} ha</p>
                          <p><strong>Status:</strong> <Badge variant="outline">{claim.status}</Badge></p>
                          <p><strong>Priority:</strong> {claim.priority}</p>
                        </div>
                      </div>
                    </Popup>
                  </Circle>
                ))}

                {/* Change Detection Layer (simulated) */}
                {layers.changeDetection && (
                  <>
                    <Circle center={[21.8047, 80.1897]} radius={3000} pathOptions={{ color: '#ef4444', fillOpacity: 0.4 }} />
                    <Circle center={[22.2604, 84.8536]} radius={3500} pathOptions={{ color: '#ef4444', fillOpacity: 0.4 }} />
                  </>
                )}
              </MapContainer>
            </div>

            {/* Legend */}
            <Card className="bg-muted">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-3">{t('map.legend')}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                    <span className="text-sm">{t('map.approved')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-amber-500" />
                    <span className="text-sm">{t('map.pending')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500" />
                    <span className="text-sm">{t('map.rejected')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500" />
                    <span className="text-sm">{t('map.underReview')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}