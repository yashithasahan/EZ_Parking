
'use client';

import { cn } from '@/lib/utils';
import { MapPin, Car, CreditCard, CheckCircle } from 'lucide-react';

interface BookingStepperProps {
  currentStep: number;
  steps: { name: string; icon: React.ReactNode }[];
}

export function BookingStepper({ currentStep, steps }: BookingStepperProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-6 p-2 sm:p-4 bg-card shadow-sm rounded-lg mb-6 md:mb-8">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={cn("flex-1 min-w-0", stepIdx !== steps.length -1 ? "pr-2 sm:pr-4 md:pr-6" : "")}>
            <div className="flex flex-col items-center text-center group">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                  stepIdx < currentStep ? "bg-primary border-primary text-primary-foreground" : 
                  stepIdx === currentStep ? "border-primary text-primary animate-pulse" : 
                  "border-border text-muted-foreground group-hover:border-muted-foreground"
                )}
              >
                {step.icon}
              </div>
              <p
                className={cn(
                  "mt-2 text-xs sm:text-sm font-medium transition-colors truncate",
                  stepIdx <= currentStep ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
              >
                {step.name}
              </p>
            </div>
             {stepIdx < steps.length - 1 ? (
                <div className="hidden sm:block absolute top-1/2 left-full w-full h-0.5 -translate-y-1/2 translate-x-4">
                  <div
                    className={cn(
                      "h-full w-full transition-colors",
                      stepIdx < currentStep ? "bg-primary" : "bg-border group-hover:bg-muted-foreground"
                    )}
                    aria-hidden="true"
                  />
                </div>
              ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export const bookingStepsConfig = [
  { name: 'Select Slot', icon: <MapPin className="h-5 w-5" /> },
  { name: 'Vehicle Info', icon: <Car className="h-5 w-5" /> },
  { name: 'Payment', icon: <CreditCard className="h-5 w-5" /> },
  { name: 'Confirmation', icon: <CheckCircle className="h-5 w-5" /> },
];
