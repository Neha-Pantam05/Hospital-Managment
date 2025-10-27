import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { authAPI } from "@/lib/apis/auth/api";
import { saveAuthData } from "@/lib/helpers/auth";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.login({
        email: loginEmail,
        password: loginPassword,
      });

      saveAuthData(response.token, response.email, response.name);
      router.push("/dashboard");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="border-gray-200 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login-email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="login-email"
              type="email"
              required
              placeholder="you@example.com"
              className="pl-10"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-10 pr-10"
              value={loginPassword}
              required
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
          onClick={handleLogin}
          disabled={loading}
        >
         {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
