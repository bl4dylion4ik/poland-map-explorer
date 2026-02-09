import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Map as MapIcon, ArrowLeft, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <div className="w-full max-w-[400px] space-y-6">
        <div className="flex flex-col items-center gap-2 text-center mb-4">
          <div className="flex items-center gap-2">
            <MapIcon size={32} className="text-primary" />
            <h1 className="text-3xl font-bold tracking-tighter">MarketNav</h1>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>
                  Enter your email address and we'll send you a link to reset your password.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" type="submit">
                  Send Reset Link
                </Button>
                <Link to="/auth" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft size={14} />
                  Back to Sign In
                </Link>
              </CardFooter>
            </Card>
          </form>
        ) : (
          <Card className="animate-in fade-in zoom-in duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full w-fit mb-4">
                <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={24} />
              </div>
              <CardTitle>Check your email</CardTitle>
              <CardDescription>
                We've sent a password reset link to <span className="font-semibold text-foreground">{email}</span>.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" variant="outline" onClick={() => setSubmitted(false)}>
                Try another email
              </Button>
            </CardFooter>
            <div className="px-6 pb-6 text-center">
               <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground">
                  Back to Sign In
                </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
