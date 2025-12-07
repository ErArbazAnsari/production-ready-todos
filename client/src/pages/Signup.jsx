import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "@/store/slice/authSlice";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, AlertCircle, UserPlus } from "lucide-react";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [formError, setFormError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate("/todos");
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setFormError("");
    };

    const validateForm = () => {
        if (!formData.name) {
            setFormError("Name is required");
            return false;
        }
        if (formData.name.length < 2) {
            setFormError("Name must be at least 2 characters");
            return false;
        }
        if (!formData.email) {
            setFormError("Email is required");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setFormError("Please enter a valid email");
            return false;
        }
        if (!formData.password) {
            setFormError("Password is required");
            return false;
        }
        if (formData.password.length < 6) {
            setFormError("Password must be at least 6 characters");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setFormError("Passwords do not match");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const result = dispatch(
            signupUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            })
        );

        if (result.payload?.token) {
            navigate("/todos");
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <Card className="shadow-2xl">
                    <CardHeader className="space-y-3">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <UserPlus className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                        <CardTitle className="text-center text-3xl sm:text-4xl font-bold">
                            Create Account
                        </CardTitle>
                        <CardDescription className="text-center text-base sm:text-lg">
                            Join us and get started today
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {(error || formError) && (
                                <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                                    <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                                    <p className="text-sm text-destructive">
                                        {error || formError}
                                    </p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label
                                    htmlFor="name"
                                    className="text-foreground"
                                >
                                    Full Name
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className="pl-10 focus-visible:ring-primary focus-visible:border-primary"
                                        autoComplete="name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-foreground"
                                >
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className="pl-10 focus-visible:ring-primary focus-visible:border-primary"
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-foreground"
                                >
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className="pl-10 focus-visible:ring-primary focus-visible:border-primary"
                                        autoComplete="new-password"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Must be at least 6 characters
                                </p>
                            </div>

                            <div className="space-y-3">
                                <Label
                                    htmlFor="confirmPassword"
                                    className="text-foreground text-sm sm:text-base font-medium"
                                >
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className="pl-10 text-base focus-visible:ring-primary focus-visible:border-primary"
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 h-11 mt-8 text-base sm:text-lg"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                                        Creating account...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <UserPlus className="w-4 h-4" />
                                        Sign Up
                                    </div>
                                )}
                            </Button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-card text-muted-foreground text-sm sm:text-base">
                                        or
                                    </span>
                                </div>
                            </div>

                            <p className="text-center text-muted-foreground text-sm sm:text-base">
                                Already have an account?{" "}
                                <Link
                                    to="/auth/login"
                                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </CardContent>
                </Card>

                <p className="text-center text-muted-foreground text-xs sm:text-sm mt-6">
                    By signing up, you agree to our Terms of Service and Privacy
                    Policy
                </p>
            </div>
        </div>
    );
};

export default Signup;
