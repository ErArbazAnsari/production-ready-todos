import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Zap, Shield, Rocket } from "lucide-react";

const Home = () => {
    const navigate = useNavigate();
    const [previewTodos, setPreviewTodos] = useState([
        { id: 1, title: "Complete project design", completed: true },
        { id: 2, title: "Review team feedback", completed: false },
        { id: 3, title: "Deploy new features", completed: false },
    ]);

    const toggleTodo = (id) => {
        setPreviewTodos((todos) =>
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 sm:pt-32 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8">
                {/* Animated background gradient */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-8 animate-fadeIn">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 w-fit">
                                <Zap size={16} className="text-primary" />
                                <span className="text-sm font-medium text-primary">
                                    Manage todos with ease
                                </span>
                            </div>

                            {/* Main Headline */}
                            <div className="space-y-4">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                                    Stay Organized, Stay{" "}
                                    <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                                        Productive
                                    </span>
                                </h1>
                                <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
                                    Your all-in-one task management platform.
                                    Create, organize, and track your todos with
                                    a beautiful and intuitive interface.
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    onClick={() => navigate("/todos")}
                                    className="group px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    Get Started
                                    <ArrowRight
                                        size={18}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                </button>
                                <button
                                    onClick={() => {
                                        document
                                            .getElementById("features")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    }}
                                    className="px-8 py-4 border-2 border-primary/30 text-foreground rounded-lg font-semibold hover:bg-primary/5 transition-all duration-300"
                                >
                                    Learn More
                                </button>
                            </div>

                            {/* Trust Section */}
                            <div className="pt-8 space-y-3">
                                <p className="text-sm text-muted-foreground font-medium">
                                    Why choose us?
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2
                                            size={20}
                                            className="text-green-500 shrink-0"
                                        />
                                        <span>Real-time synchronization</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2
                                            size={20}
                                            className="text-green-500 shrink-0"
                                        />
                                        <span>Secure cloud storage</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2
                                            size={20}
                                            className="text-green-500 shrink-0"
                                        />
                                        <span>Beautiful, intuitive design</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Visual */}
                        <div className="relative hidden lg:block">
                            <div className="relative z-10">
                                {/* Card Container */}
                                <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
                                    {/* Decorative elements */}
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>

                                    {/* Todo list preview */}
                                    <div className="space-y-4 mt-6">
                                        <h3 className="text-lg font-semibold">
                                            Your Tasks
                                        </h3>

                                        {previewTodos.map((todo) => (
                                            <div
                                                key={todo.id}
                                                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group cursor-pointer"
                                            >
                                                <button
                                                    onClick={() =>
                                                        toggleTodo(todo.id)
                                                    }
                                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                                                        todo.completed
                                                            ? "bg-green-500 border-green-500 shadow-md shadow-green-500/30 animate-pulse"
                                                            : "border-muted-foreground/40 hover:border-muted-foreground bg-background hover:bg-muted/50"
                                                    }`}
                                                >
                                                    {todo.completed && (
                                                        <CheckCircle2
                                                            size={16}
                                                            className="text-white drop-shadow-sm animate-in zoom-in-50 duration-300"
                                                        />
                                                    )}
                                                </button>
                                                <span
                                                    className={`flex-1 transition-all duration-300 ${
                                                        todo.completed
                                                            ? "line-through text-muted-foreground"
                                                            : ""
                                                    }`}
                                                >
                                                    {todo.title}
                                                </span>
                                            </div>
                                        ))}

                                        <button className="w-full mt-6 px-4 py-2 bg-primary/20 text-primary rounded-lg font-medium hover:bg-primary/30 transition-all duration-300 transform hover:scale-105 active:scale-95">
                                            + Add new task
                                        </button>
                                    </div>
                                </div>

                                {/* Floating stats cards */}
                                <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg p-4 shadow-lg animate-bounce">
                                    <div className="flex items-center gap-2">
                                        <Rocket
                                            size={20}
                                            className="text-primary"
                                        />
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Tasks Done
                                            </p>
                                            <p className="text-xl font-bold">
                                                1,234+
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -top-6 -right-6 bg-card border border-border rounded-lg p-4 shadow-lg animate-bounce delay-200">
                                    <div className="flex items-center gap-2">
                                        <Shield
                                            size={20}
                                            className="text-green-500"
                                        />
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Secured
                                            </p>
                                            <p className="text-xl font-bold">
                                                100%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section
                id="features"
                className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Powerful Features
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Everything you need to manage your tasks effectively
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Zap,
                                title: "Lightning Fast",
                                description:
                                    "Instant updates and real-time synchronization",
                            },
                            {
                                icon: Shield,
                                title: "Secure",
                                description:
                                    "Your data is encrypted and safely stored",
                            },
                            {
                                icon: Rocket,
                                title: "Scalable",
                                description:
                                    "Manage thousands of tasks effortlessly",
                            },
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                            >
                                <feature.icon
                                    size={32}
                                    className="text-primary mb-4"
                                />
                                <h3 className="text-xl font-semibold mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center space-y-8 bg-linear-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-12 border border-primary/20">
                    <h2 className="text-3xl sm:text-4xl font-bold">
                        Ready to get started?
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Join thousands of users managing their tasks smarter and
                        faster.
                    </p>
                    <button
                        onClick={() => navigate("/todos")}
                        className="group px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
                    >
                        Start Managing Your Tasks
                        <ArrowRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;
