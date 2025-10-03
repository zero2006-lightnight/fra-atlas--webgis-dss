import { NextResponse } from 'next/server';

// Mock ML-powered change detection API
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { coordinates, startDate, endDate } = body;

    // Simulate ML processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock change detection results
    const changes = [
      {
        id: 'CD-001',
        location: coordinates,
        changeType: 'Deforestation',
        severity: 'High',
        area: 2.5,
        confidence: 0.92,
        detectedDate: new Date().toISOString(),
        beforeImage: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800',
        afterImage: 'https://images.unsplash.com/photo-1518197039629-6e9d2023f3b4?w=800',
      },
      {
        id: 'CD-002',
        location: [coordinates[0] + 0.1, coordinates[1] + 0.1],
        changeType: 'Encroachment',
        severity: 'Medium',
        area: 1.2,
        confidence: 0.85,
        detectedDate: new Date().toISOString(),
        beforeImage: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800',
        afterImage: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800',
      },
    ];

    return NextResponse.json({
      success: true,
      data: {
        changes,
        summary: {
          totalChanges: changes.length,
          highSeverity: changes.filter(c => c.severity === 'High').length,
          mediumSeverity: changes.filter(c => c.severity === 'Medium').length,
          lowSeverity: changes.filter(c => c.severity === 'Low').length,
          totalAreaAffected: changes.reduce((sum, c) => sum + c.area, 0),
        },
        dateRange: { startDate, endDate },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process change detection' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return recent change detections
  const recentChanges = [
    {
      id: 'CD-MP-001',
      state: 'Madhya Pradesh',
      district: 'Balaghat',
      changeType: 'Deforestation',
      severity: 'High',
      area: 3.2,
      confidence: 0.94,
      detectedDate: '2024-01-28',
      coordinates: [21.8047, 80.1897],
    },
    {
      id: 'CD-OD-002',
      state: 'Odisha',
      district: 'Mayurbhanj',
      changeType: 'Land Use Change',
      severity: 'Medium',
      area: 1.8,
      confidence: 0.88,
      detectedDate: '2024-01-27',
      coordinates: [21.9347, 86.7337],
    },
    {
      id: 'CD-TG-003',
      state: 'Telangana',
      district: 'Adilabad',
      changeType: 'Encroachment',
      severity: 'High',
      area: 2.1,
      confidence: 0.91,
      detectedDate: '2024-01-26',
      coordinates: [19.6692, 78.3951],
    },
  ];

  return NextResponse.json({
    success: true,
    data: recentChanges,
  });
}