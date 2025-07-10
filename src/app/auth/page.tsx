// 'use client';

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useRouter } from "next/navigation";
// import { useToast } from "@/hooks/use-toast";
// import carParkImage from "@public/images/car_park.jpg";
// import { login, register } from "@/service/auth_service";

// export default function AuthPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();
//   const { toast } = useToast();

//   const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const data = await login(userName, password);
//     console.log(data);
//     // If there's no error, check if you have a user and a session
//     if (data.user && data.session) {
//       console.log("Login successful:", data);
//       // This is the point where you should redirect.
//       // Make sure you have an instance of the router.
//       router.push("/dashboard");
//     } else {
//       console.log("Login unsuccessful, no user data returned.");
//     }
//   };

//   const handleRegisterAction = async () => {
//     setIsLoading(true);

//     const data = await register(userName, password);
//     console.log(data);
//     setIsLoading(false);
//     // toast({
//     //   title: "name" + { userName.toString() },
//     //   description:
//     //     "The registration process would be initiated here. This feature is currently under development.",
//     // });
//     // Example: router.push('/register'); // If you have a separate registration page
//   };

//   const handleSetUserName = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     console.log(event.target.value);
//     setUserName(event.target.value);
//   };
//   const handleSetPassword = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     console.log(event.target.value);
//     setPassword(event.target.value);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
//       <h1 className="text-4xl font-bold font-headline mb-8 text-primary text-center">
//         Welcome to EZPark
//       </h1>
//       <Card className="w-full max-w-4xl lg:max-w-5xl flex flex-col md:flex-row shadow-2xl rounded-xl overflow-hidden">
//         {/* Left Pane: Image */}
//         <div className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-slate-100 ">
//           <Image
//             src={carParkImage}
//             alt="A car parked in a toll booth parking lot"
//             data-ai-hint="toll booth parking lot"
//             width={500}
//             height={700}
//             className="object-cover h-full max-h-[500px] w-auto rounded-lg"
//           />
//         </div>

//         {/* Right Pane: Form */}
//         <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-card">
//           <h2 className="text-2xl font-semibold font-headline mb-2 text-center">
//             Login
//           </h2>
//           <p className="text-muted-foreground mb-8 text-center">
//             Access your EZPark account.
//           </p>

//           <form onSubmit={handleLoginSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="login-email">Email</Label>
//               <Input
//                 id="login-email"
//                 type="email"
//                 placeholder="you@example.com"
//                 required
//                 onChange={(e) => handleSetUserName(e)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="login-password">Password</Label>
//               <Input
//                 id="login-password"
//                 type="password"
//                 placeholder="••••••••"
//                 required
//                 onChange={(e) => handleSetPassword(e)}
//               />
//             </div>
//             <div className="text-right mt-2 mb-4">
//               <Link href="#" className="text-sm text-primary hover:underline">
//                 Forgot Password?
//               </Link>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4 pt-2">
//               <Button
//                 type="submit"
//                 className="flex-1 bg-primary hover:bg-primary/90 py-3 text-base"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Logging in..." : "Login"}
//               </Button>
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="flex-1 py-3 text-base border-primary text-primary hover:bg-primary/5 hover:text-primary"
//                 onClick={handleRegisterAction}
//                 disabled={isLoading}
//               >
//                 Register
//               </Button>
//             </div>
//           </form>
//         </div>
//       </Card>
//     </div>
//   );
// }
// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useRouter } from "next/navigation";
// import { useToast } from "@/hooks/use-toast";
// import carParkImage from "@public/images/car_park.jpg";
// import { login, register } from "@/service/auth_service";

// export default function AuthPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   // Renamed for clarity, as it's holding an email
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();
//   const { toast } = useToast();

//   const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setIsLoading(true);

//     try {
//       const data = await login(email, password);

//       // Supabase returns user and session data on successful login
//       if (data.user && data.session) {
//         toast({
//           title: "Login Successful! 🎉",
//           description: "You're now being redirected to your dashboard.",
//         });
//         router.push("/dashboard");
//       } else {
//         // This case might occur if the auth service resolves without error but without user data
//         toast({
//           title: "Login Failed",
//           description: "Could not log you in. Please try again.",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       // The error thrown from your auth_service will be caught here
//       toast({
//         title: "Error Logging In",
//         description:
//           error instanceof Error ? error.message : "An unknown error occurred.",
//         variant: "destructive",
//       });
//     } finally {
//       // Ensure loading state is reset even if an error occurs
//       setIsLoading(false);
//     }
//   };

//   const handleRegisterAction = async () => {
//     setIsLoading(true);

//     try {
//       const data = await register(email, password);

//       // On successful sign-up, Supabase might require email confirmation
//       if (data.user) {
//         toast({
//           title: "Registration Successful! ✅",
//           description: "Please check your email to confirm your account.",
//         });
//       }
//     } catch (error) {
//       // The error thrown from your auth_service will be caught here
//       toast({
//         title: "Registration Failed",
//         description:
//           error instanceof Error ? error.message : "An unknown error occurred.",
//         variant: "destructive",
//       });
//     } finally {
//       // Ensure loading state is reset even if an error occurs
//       setIsLoading(false);
//     }
//   };

//   // No need for these handlers to be async
//   const handleSetEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(event.target.value);
//   };

//   const handleSetPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(event.target.value);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
//       <h1 className="text-4xl font-bold font-headline mb-8 text-primary text-center">
//         Welcome to EZPark
//       </h1>
//       <Card className="w-full max-w-4xl lg:max-w-5xl flex flex-col md:flex-row shadow-2xl rounded-xl overflow-hidden">
//         {/* Left Pane: Image */}
//         <div className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-slate-100 ">
//           <Image
//             src={carParkImage}
//             alt="A car parked in a toll booth parking lot"
//             width={500}
//             height={700}
//             className="object-cover h-full max-h-[500px] w-auto rounded-lg"
//           />
//         </div>

//         {/* Right Pane: Form */}
//         <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-card">
//           <h2 className="text-2xl font-semibold font-headline mb-2 text-center">
//             Login
//           </h2>
//           <p className="text-muted-foreground mb-8 text-center">
//             Access your EZPark account.
//           </p>

//           <form onSubmit={handleLoginSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="login-email">Email</Label>
//               <Input
//                 id="login-email"
//                 type="email"
//                 placeholder="you@example.com"
//                 required
//                 value={email}
//                 onChange={handleSetEmail}
//                 disabled={isLoading}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="login-password">Password</Label>
//               <Input
//                 id="login-password"
//                 type="password"
//                 placeholder="••••••••"
//                 required
//                 value={password}
//                 onChange={handleSetPassword}
//                 disabled={isLoading}
//               />
//             </div>
//             <div className="text-right mt-2 mb-4">
//               <Link href="#" className="text-sm text-primary hover:underline">
//                 Forgot Password?
//               </Link>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4 pt-2">
//               <Button
//                 type="submit"
//                 className="flex-1 bg-primary hover:bg-primary/90 py-3 text-base"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Logging in..." : "Login"}
//               </Button>
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="flex-1 py-3 text-base border-primary text-primary hover:bg-primary/5 hover:text-primary"
//                 onClick={handleRegisterAction}
//                 disabled={isLoading || !email || !password}
//               >
//                 {isLoading ? "Processing..." : "Register"}
//               </Button>
//             </div>
//           </form>
//         </div>
//       </Card>
//     </div>
//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import carParkImage from "@public/images/car_park.jpg";
import {
  login,
  register,
  sendPasswordResetEmail,
  updateUserPassword,
} from "@/service/auth_service";
import { supabase } from "@/lib/supabase"; // Import supabase client

// Sub-component for the Forgot Password Modal
const ForgotPasswordModal = ({
  isOpen,
  onClose,
  onPasswordUpdated,
}: {
  isOpen: boolean;
  onClose: () => void;
  onPasswordUpdated: () => void;
}) => {
  const [step, setStep] = useState<
    "enterEmail" | "checkEmail" | "enterPassword"
  >("enterEmail");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Reset state when the modal is closed or reopened
  useEffect(() => {
    if (isOpen) {
      // Check if the auth state change has already moved us to the password step
      const session = supabase.auth.getSession();
      // This check is theoretical as the event listener in the parent handles the step change.
      // We reset to 'enterEmail' by default when opening manually.
      setStep("enterEmail");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [isOpen]);

  // This effect will be triggered from the parent component when the user
  // arrives from the email link.
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setStep("enterPassword");
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSendResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(email);
      setStep("checkEmail");
      toast({
        title: "Check your email",
        description: `A password reset link has been sent to ${email}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await updateUserPassword(password);
      toast({
        title: "Success! ✅",
        description: "Your password has been updated. Please log in.",
      });
      onPasswordUpdated(); // Close modal and reset parent state
    } catch (error) {
      toast({
        title: "Error updating password",
        description:
          error instanceof Error ? error.message : "Could not update password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <Card className="w-full max-w-md p-8 bg-card relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={onClose}
        >
          X
        </Button>
        {step === "enterEmail" && (
          <form onSubmit={handleSendResetLink} className="space-y-4">
            <h3 className="text-xl font-semibold text-center">
              Forgot Password
            </h3>
            <p className="text-muted-foreground text-center text-sm">
              Enter your email to receive a reset link.
            </p>
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        )}
        {step === "checkEmail" && (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Check Your Inbox</h3>
            <p className="text-muted-foreground">
              A password reset link has been sent to <strong>{email}</strong>.
              Click the link to proceed.
            </p>
            <Button className="w-full" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
        {step === "enterPassword" && (
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <h3 className="text-xl font-semibold text-center">
              Create New Password
            </h3>
            <p className="text-muted-foreground text-center text-sm">
              You've been authenticated. Enter your new password below.
            </p>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Password & Login"}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};

// Main Auth Page Component
export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // This effect listens for the user returning from the password reset email link.
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      // When Supabase detects the recovery token in the URL, it fires this event.
      if (event === "PASSWORD_RECOVERY") {
        setIsForgotPasswordModalOpen(true); // Open the modal automatically
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const data = await login(email, password);
      if (data.user && data.session) {
        toast({
          title: "Login Successful! 🎉",
          description: "Redirecting to dashboard...",
        });
        router.push("/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Please check your credentials.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error Logging In",
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterAction = async () => {
    setIsLoading(true);
    try {
      const data = await register(email, password);
      if (data.user) {
        toast({
          title: "Registration Successful! ✅",
          description: "Please check your email to confirm your account.",
        });
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}
        onPasswordUpdated={() => {
          setIsForgotPasswordModalOpen(false);
          // Clear fields so the user can log in with their new password
          setEmail("");
          setPassword("");
        }}
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <h1 className="text-4xl font-bold font-headline mb-8 text-primary text-center">
          Welcome to EZPark
        </h1>
        <Card className="w-full max-w-4xl lg:max-w-5xl flex flex-col md:flex-row shadow-2xl rounded-xl overflow-hidden">
          <div className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-slate-100 ">
            <Image
              src={carParkImage}
              alt="A car parked in a toll booth parking lot"
              width={500}
              height={700}
              className="object-cover h-full max-h-[500px] w-auto rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-card">
            <h2 className="text-2xl font-semibold font-headline mb-2 text-center">
              Login
            </h2>
            <p className="text-muted-foreground mb-8 text-center">
              Access your EZPark account.
            </p>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="text-right mt-2 mb-4">
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordModalOpen(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 py-3 text-base"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 py-3 text-base border-primary text-primary hover:bg-primary/5 hover:text-primary"
                  onClick={handleRegisterAction}
                  disabled={isLoading || !email || !password}
                >
                  {isLoading ? "Processing..." : "Register"}
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
}
