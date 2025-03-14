"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UserProvider, useUser } from "@/lib/user-context";
import "@/styles/font/iransans/iransans.css";
import "@/styles/globals.css";

const RootContent = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { user , login } = useUser();

    useEffect(() => {
        if (user) {
            if (!pathname.startsWith("/panel")) {
                router.push("/panel/dashboard");
            }
        } else {
            if (pathname !== "/auth/login") {
                router.push("/auth/login");
            }
        }
    }, [user, router, pathname]);

    return <>{children}</>;
};

export default function RootLayout({ children }) {
    return (
        <html lang="fa" dir="rtl">
        <body>
        <UserProvider>
            <RootContent>{children}</RootContent>
        </UserProvider>
        </body>
        </html>
    );
}