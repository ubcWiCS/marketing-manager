"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isLoading, setIsLoading] = useState(false);

  const redirectTo = searchParams.get("redirect") || "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        router.push(redirectTo);
      } else {
        router.push("/login?error=1");
      }
    } catch (error) {
      router.push("/login?error=1");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gold-50 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-plum-200/30 rounded-full -rotate-6"></div>
      <div className="absolute bottom-32 right-32 w-24 h-24 bg-gold-300/40 rounded-full rotate-3"></div>
      
      <div className="card-brutal w-full max-w-sm p-8 relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-navy-800 mb-2 uppercase">Welcome!</h1>
          <p className="text-sm text-surface-600 font-medium">Sign in to see your tasks</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-brutal">Username</label>
            <input
              type="text"
              name="username"
              className="input-brutal"
              placeholder="admin"
              required
            />
          </div>
          
          <div>
            <label className="label-brutal">Password</label>
            <input
              type="password"
              name="password"
              className="input-brutal"
              placeholder="password"
              required
            />
          </div>
          
          {error && (
            <p className="text-sm text-red-600 font-bold uppercase">Invalid credentials. Please try again.</p>
          )}
          
          <button 
            type="submit" 
            className="btn-brutal-primary w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-gold-50">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}