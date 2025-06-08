'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({ title: "Login Successful", description: "Redirecting to dashboard..." });
    router.push('/dashboard');
  };

  const handleRegisterAction = async () => {
    setIsLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast({ 
      title: "Registration", 
      description: "The registration process would be initiated here. This feature is currently under development." 
    });
    // Example: router.push('/register'); // If you have a separate registration page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h1 className="text-4xl font-bold font-headline mb-8 text-primary text-center">
        Welcome to EZPark
      </h1>
      <Card className="w-full max-w-4xl lg:max-w-5xl flex flex-col md:flex-row shadow-2xl rounded-xl overflow-hidden">
        {/* Left Pane: Image */}
        <div className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-slate-100 p-8">
          <Image
            src="https://placehold.co/600x800.png"
            alt="Automated parking illustration"
            data-ai-hint="toll booth parking lot"
            width={500}
            height={700}
            className="object-contain h-full max-h-[500px] w-auto rounded-lg"
          />
        </div>

        {/* Right Pane: Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-card">
          <h2 className="text-2xl font-semibold font-headline mb-2 text-center">Login</h2>
          <p className="text-muted-foreground mb-8 text-center">Access your EZPark account.</p>
          
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input id="login-password" type="password" placeholder="••••••••" required />
            </div>
            <div className="text-right mt-2 mb-4">
              <Link href="#" className="text-sm text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 py-3 text-base" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 py-3 text-base border-primary text-primary hover:bg-primary/5 hover:text-primary" 
                onClick={handleRegisterAction}
                disabled={isLoading}
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
