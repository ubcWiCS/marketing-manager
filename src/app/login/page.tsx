import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Portfolio Manager",
  description: "Sign in to access the PM",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-surface-50 p-4">
      <div className="card-hand w-full max-w-sm p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-navy-800 mb-2">Welcome!</h1>
          <p className="text-sm text-surface-500">Sign in to see your tasks</p>
        </div>
        
        <form action="/api/auth/login" method="POST" className="space-y-4">
          <div>
            <label className="label">Username</label>
            <input
              type="text"
              name="username"
              className="input-field"
              placeholder="admin"
              required
            />
          </div>
          
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input-field"
              placeholder="password"
              required
            />
          </div>
          
          {searchParams.error && (
            <p className="text-sm text-red-600">Invalid credentials. Please try again.</p>
          )}
          
          <button type="submit" className="btn-primary w-full">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}