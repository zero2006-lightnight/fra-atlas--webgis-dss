import { NextResponse } from 'next/server';

// Mock satellite imagery time series API
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get('state') || 'Madhya Pradesh';
  const coordinates = searchParams.get('coordinates')?.split(',').map(Number) || [21.8047, 80.1897];

  // Mock satellite imagery data for different time periods
  const imageryData = [
    {
      date: '2024-01-01',
      timestamp: new Date('2024-01-01').getTime(),
      satellite: 'Sentinel-2',
      cloudCover: 5,
      resolution: 10,
      imageUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1200',
      ndvi: 0.72,
      forestCover: 82.5,
    },
    {
      date: '2023-12-01',
      timestamp: new Date('2023-12-01').getTime(),
      satellite: 'Sentinel-2',
      cloudCover: 8,
      resolution: 10,
      imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1200',
      ndvi: 0.75,
      forestCover: 84.2,
    },
    {
      date: '2023-11-01',
      timestamp: new Date('2023-11-01').getTime(),
      satellite: 'Sentinel-2',
      cloudCover: 12,
      resolution: 10,
      imageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200',
      ndvi: 0.78,
      forestCover: 85.1,
    },
    {
      date: '2023-10-01',
      timestamp: new Date('2023-10-01').getTime(),
      satellite: 'Sentinel-2',
      cloudCover: 6,
      resolution: 10,
      imageUrl: 'https://images.unsplash.com/photo-1518197039629-6e9d2023f3b4?w=1200',
      ndvi: 0.80,
      forestCover: 85.8,
    },
    {
      date: '2023-09-01',
      timestamp: new Date('2023-09-01').getTime(),
      satellite: 'Sentinel-2',
      cloudCover: 10,
      resolution: 10,
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200',
      ndvi: 0.82,
      forestCover: 86.5,
    },
  ];

  return NextResponse.json({
    success: true,
    data: {
      location: { state, coordinates },
      imagery: imageryData,
      analysis: {
        forestCoverChange: -4.0,
        ndviChange: -0.10,
        trend: 'Declining',
      },
    },
  });
}