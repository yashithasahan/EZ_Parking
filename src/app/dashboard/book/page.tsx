
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { ParkingLot } from '@/app/dashboard/components/ParkingLot';
import { mockParkingSlots } from '@/lib/placeholder-data';
import type { ParkingSlotStatus } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { addHours, format, setHours, setMinutes, startOfDay, isBefore, parse } from 'date-fns';
import { ArrowRight } from 'lucide-react';

const generateTimeSlots = (date: Date | undefined): string[] => {
  if (!date) return [];
  const slots: string[] = [];
  const now = new Date();
  const selectedDateStartOfDay = startOfDay(date);

  // Determine start hour: if selected date is today, start from next full hour or half hour, else start from 00:00
  let startHour = 0;
  let startMinute = 0;

  if (format(selectedDateStartOfDay, 'yyyy-MM-dd') === format(startOfDay(now), 'yyyy-MM-dd')) {
    startHour = now.getHours();
    if (now.getMinutes() >= 30) {
      startHour += 1;
      startMinute = 0;
    } else {
      startMinute = 30;
    }
  }
  
  if (startHour >= 24) return []; // No slots if calculated start time is next day

  for (let h = startHour; h < 24; h++) {
    for (let m = (h === startHour ? startMinute : 0) ; m < 60; m += 30) {
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return slots;
};

export default function BookSlotPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
    const dateParam = searchParams.get('date');
    return dateParam ? parse(dateParam, 'yyyy-MM-dd', new Date()) : new Date();
  });
  const [startTime, setStartTime] = useState<string | undefined>(searchParams.get('startTime') || undefined);
  const [endTime, setEndTime] = useState<string | undefined>(searchParams.get('endTime') || undefined);
  const [selectedSlotId, setSelectedSlotId] = useState<string | undefined>(searchParams.get('slotId') || undefined);

  const timeSlots = useMemo(() => generateTimeSlots(selectedDate), [selectedDate]);
  
  const availableEndTimes = useMemo(() => {
    if (!startTime || !selectedDate) return [];
    const [startH, startM] = startTime.split(':').map(Number);
    const startDateWithTime = setMinutes(setHours(selectedDate, startH), startM);
    
    return timeSlots.filter(ts => {
      const [endH, endM] = ts.split(':').map(Number);
      const endDateWithTime = setMinutes(setHours(selectedDate, endH), endM);
      return endDateWithTime > startDateWithTime && endDateWithTime <= addHours(startDateWithTime, 4); // Max 4 hours booking
    });
  }, [startTime, timeSlots, selectedDate]);

  useEffect(() => {
    // Reset times if date changes
    setStartTime(undefined);
    setEndTime(undefined);
    setSelectedSlotId(undefined); // Also reset slot if date changes
  }, [selectedDate]);

  useEffect(() => {
    // Reset end time if start time changes or becomes invalid
    if (startTime && !timeSlots.includes(startTime)) {
        setStartTime(undefined);
    }
    setEndTime(undefined);
  }, [startTime, timeSlots]);

  const handleSlotSelect = (slotId: string, status: ParkingSlotStatus) => {
    if (status === 'available') {
      setSelectedSlotId(slotId);
    } else {
      toast({
        title: 'Slot Not Available',
        description: `Slot ${slotId.split('-')[1]} is currently ${status}. Please choose another.`,
        variant: 'destructive',
      });
      setSelectedSlotId(undefined);
    }
  };
  
  const isNextDisabled = !selectedDate || !startTime || !endTime || !selectedSlotId;

  const handleNext = () => {
    if (isNextDisabled) return;
    const query = new URLSearchParams({
      slotId: selectedSlotId!,
      date: format(selectedDate!, 'yyyy-MM-dd'),
      startTime: startTime!,
      endTime: endTime!,
    });
    router.push(`/dashboard/book/vehicle-info?${query.toString()}`);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Book a Parking Slot</CardTitle>
        <CardDescription>Select your preferred date, time, and parking slot.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <Label htmlFor="booking-date">Date</Label>
            <DatePicker 
              date={selectedDate} 
              setDate={setSelectedDate}
              disabled={(date) => isBefore(date, startOfDay(new Date()))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="start-time">Start Time</Label>
            <Select value={startTime} onValueChange={setStartTime} disabled={!selectedDate || timeSlots.length === 0}>
              <SelectTrigger id="start-time" className="mt-1">
                <SelectValue placeholder="Select start time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
             {timeSlots.length === 0 && selectedDate && <p className="text-xs text-muted-foreground mt-1">No available start times for selected date.</p>}
          </div>
          <div>
            <Label htmlFor="end-time">End Time</Label>
            <Select value={endTime} onValueChange={setEndTime} disabled={!startTime || availableEndTimes.length === 0}>
              <SelectTrigger id="end-time" className="mt-1">
                <SelectValue placeholder="Select end time" />
              </SelectTrigger>
              <SelectContent>
                {availableEndTimes.map((time) => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {availableEndTimes.length === 0 && startTime && <p className="text-xs text-muted-foreground mt-1">No available end times.</p>}
          </div>
        </div>
        
        <div>
          <Label>Select a Slot</Label>
          <p className="text-sm text-muted-foreground mb-2">Click on an available slot (green) to select it.</p>
          <ParkingLot 
            slots={mockParkingSlots} 
            selectedSlotId={selectedSlotId}
            onSlotClick={handleSlotSelect}
            interactive={true}
          />
        </div>

        <Button onClick={handleNext} disabled={isNextDisabled} className="w-full md:w-auto text-base py-3">
          Next: Enter Vehicle Details <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  );
}
