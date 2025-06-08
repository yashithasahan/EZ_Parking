
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { vehicleTypes, type VehicleType } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, ParkingSquare, CalendarDays, Clock } from 'lucide-react';
import { format, parse } from 'date-fns';

function VehicleInfoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [vehiclePlate, setVehiclePlate] = useState('');
  const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleType | undefined>();

  const slotId = searchParams.get('slotId');
  const dateStr = searchParams.get('date');
  const startTime = searchParams.get('startTime');
  const endTime = searchParams.get('endTime');

  useEffect(() => {
    if (!slotId || !dateStr || !startTime || !endTime) {
      toast({
        title: 'Missing Booking Information',
        description: 'Please start the booking process again.',
        variant: 'destructive',
      });
      router.replace('/dashboard/book');
    }
  }, [slotId, dateStr, startTime, endTime, router, toast]);

  const formattedDate = dateStr ? format(parse(dateStr, 'yyyy-MM-dd', new Date()), 'PPP') : 'N/A';

  const handleNext = () => {
    if (!vehiclePlate.trim() || !selectedVehicleType) {
      toast({
        title: 'Missing Information',
        description: 'Please enter vehicle plate and select a type.',
        variant: 'destructive',
      });
      return;
    }

    const query = new URLSearchParams(searchParams.toString());
    query.set('plate', vehiclePlate.trim().toUpperCase());
    query.set('type', selectedVehicleType);
    
    router.push(`/dashboard/book/payment?${query.toString()}`);
  };

  const handleBack = () => {
    const query = new URLSearchParams(searchParams.toString());
    query.delete('plate');
    query.delete('type');
    router.push(`/dashboard/book?${query.toString()}`);
  };
  
  if (!slotId || !dateStr || !startTime || !endTime) {
    return <div className="flex justify-center items-center h-full"><p>Loading booking details or redirecting...</p></div>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Enter Vehicle Details</CardTitle>
        <CardDescription>Provide information about the vehicle you'll be parking.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Card className="bg-muted/50">
          <CardContent className="pt-4 space-y-2 text-sm">
            <p className="flex items-center"><ParkingSquare className="mr-2 h-4 w-4 text-primary" /> Slot: <span className="font-semibold ml-1">{slotId.split('-')[1]}</span></p>
            <p className="flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-primary" /> Date: <span className="font-semibold ml-1">{formattedDate}</span></p>
            <p className="flex items-center"><Clock className="mr-2 h-4 w-4 text-primary" /> Time: <span className="font-semibold ml-1">{startTime} - {endTime}</span></p>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Label htmlFor="vehicle-plate">Vehicle Plate Number</Label>
          <Input 
            id="vehicle-plate" 
            placeholder="e.g., ABC 123" 
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            className="uppercase"
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vehicle-type">Vehicle Type</Label>
          <Select value={selectedVehicleType} onValueChange={(value) => setSelectedVehicleType(value as VehicleType)}>
            <SelectTrigger id="vehicle-type">
              <SelectValue placeholder="Select vehicle type" />
            </SelectTrigger>
            <SelectContent>
              {vehicleTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button onClick={handleBack} variant="outline" className="w-full sm:w-auto text-base py-3">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={!vehiclePlate.trim() || !selectedVehicleType}
            className="w-full sm:flex-1 text-base py-3"
          >
            Next: Proceed to Payment <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


export default function VehicleInfoPage() {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading vehicle information form...</div>}>
      <VehicleInfoForm />
    </Suspense>
  );
}
