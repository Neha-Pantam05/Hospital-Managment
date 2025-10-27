import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Label } from "./ui/label";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { authAPI } from "@/lib/apis/auth/api";
import { useRouter } from "next/navigation";
import { saveAuthData } from "@/lib/helpers/auth";
const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!registerName || !registerEmail || !registerPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (registerPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const response = await authAPI.register({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });
      saveAuthData(response.token, response.email, response.name);

      toast.success("Registration successful! Please log in.");

      router.push("/");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="border-gray-200 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your information to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="register-name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="register-name"
              type="text"
              placeholder="Enter your full name"
              className="pl-10"
              value={registerName}
              required
              onChange={(e) => setRegisterName(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="register-email"
              type="email"
              required
              placeholder="you@example.com"
              className="pl-10"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              className="pl-10 pr-10"
              value={registerPassword}
              required
              onChange={(e) => setRegisterPassword(e.target.value)}
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
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
