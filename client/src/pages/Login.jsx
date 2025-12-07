import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "@/store/slice/authSlice";
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
import { Mail, Lock, AlertCircle, LogIn } from "lucide-react";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const result = await dispatch(
            loginUser({
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
                                <LogIn className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                        <CardTitle className="text-center text-3xl sm:text-4xl font-bold">
                            Welcome Back
                        </CardTitle>
                        <CardDescription className="text-center text-base sm:text-lg">
                            Sign in to your account to continue
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

                            <div className="space-y-3">
                                <Label
                                    htmlFor="email"
                                    className="text-foreground text-sm sm:text-base font-medium"
                                >
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className="pl-10 text-base focus-visible:ring-primary focus-visible:border-primary"
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label
                                    htmlFor="password"
                                    className="text-foreground text-sm sm:text-base font-medium"
                                >
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className="pl-10 text-base focus-visible:ring-primary focus-visible:border-primary"
                                        autoComplete="current-password"
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
                                        Signing in...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <LogIn className="w-4 h-4" />
                                        Sign In
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
                                Don't have an account?{" "}
                                <Link
                                    to="/auth/signup"
                                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </CardContent>
                </Card>

                <p className="text-center text-muted-foreground text-xs sm:text-sm mt-6">
                    By signing in, you agree to our Terms of Service
                </p>
            </div>
        </div>
    );
};

export default Login;
