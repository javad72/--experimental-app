"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/user-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useUser();
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === "1234") {

             login(username);
            router.push("/panel/dashboard");
        } else {
            setError("رمز عبور اشتباه است. لطفاً 1234 را وارد کنید.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>ورود به سیستم</CardTitle>
                    <CardDescription>نام کاربری و رمز عبور خود را وارد کنید</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div>
                            <Input
                                type="text"
                                placeholder="هر نام کاربری"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                placeholder="رمز عبور 1234 است"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            ورود
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;