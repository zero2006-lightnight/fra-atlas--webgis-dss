'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, SkipBack, SkipForward, Satellite, TrendingDown, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface ImageryData {
  date: string;
  timestamp: number;
  satellite: string;
  cloudCover: number;
  resolution: number;
  imageUrl: string;
  ndvi: number;
  forestCover: number;
}

export default function SatelliteTimeline() {
  const [imagery, setImagery] = useState<ImageryData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImagery();
  }, []);

  useEffect(() => {
    if (isPlaying && currentIndex < imagery.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (isPlaying && currentIndex === imagery.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentIndex, imagery.length]);

  const fetchImagery = async () => {
    try {
      const response = await fetch('/api/ml/satellite-imagery?state=Madhya Pradesh');
      const result = await response.json();
      if (result.success) {
        setImagery(result.data.imagery);
      }
    } catch (error) {
      console.error('Failed to fetch imagery:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentImagery = imagery[currentIndex];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < imagery.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 flex items-center justify-center h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Satellite className="h-5 w-5" />
            Satellite Imagery Time Series
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Image Display */}
          <div className="relative aspect-video rounded-lg overflow-hidden border bg-muted">
            {currentImagery && (
              <>
                <img
                  src={currentImagery.imageUrl}
                  alt={`Satellite imagery from ${currentImagery.date}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary" className="bg-black/70 text-white">
                    {format(new Date(currentImagery.date), 'MMM dd, yyyy')}
                  </Badge>
                  <Badge variant="secondary" className="bg-black/70 text-white">
                    {currentImagery.satellite}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white p-3 rounded-lg space-y-1">
                  <div className="text-xs">
                    <span className="opacity-70">NDVI:</span> <span className="font-semibold">{currentImagery.ndvi}</span>
                  </div>
                  <div className="text-xs">
                    <span className="opacity-70">Forest Cover:</span> <span className="font-semibold">{currentImagery.forestCover}%</span>
                  </div>
                  <div className="text-xs">
                    <span className="opacity-70">Cloud Cover:</span> <span className="font-semibold">{currentImagery.cloudCover}%</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Timeline Slider */}
          <div className="space-y-4">
            <Slider
              value={[currentIndex]}
              onValueChange={(value) => setCurrentIndex(value[0])}
              max={imagery.length - 1}
              step={1}
              className="w-full"
            />
            
            {/* Timeline Labels */}
            <div className="flex justify-between text-xs text-muted-foreground">
              {imagery.map((img, idx) => (
                <div
                  key={img.date}
                  className={`flex flex-col items-center cursor-pointer ${
                    idx === currentIndex ? 'text-primary font-semibold' : ''
                  }`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  <span>{format(new Date(img.date), 'MMM')}</span>
                  <span>{format(new Date(img.date), 'yyyy')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="icon" onClick={handlePrevious} disabled={currentIndex === 0}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="default" size="icon" onClick={handlePlayPause}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex === imagery.length - 1}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Analysis Summary */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-500 flex items-center justify-center gap-1">
                <TrendingDown className="h-5 w-5" />
                -4.0%
              </p>
              <p className="text-xs text-muted-foreground mt-1">Forest Cover Change</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-500">-0.10</p>
              <p className="text-xs text-muted-foreground mt-1">NDVI Change</p>
            </div>
            <div className="text-center">
              <Badge variant="destructive" className="text-sm">Declining</Badge>
              <p className="text-xs text-muted-foreground mt-1">Trend</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}