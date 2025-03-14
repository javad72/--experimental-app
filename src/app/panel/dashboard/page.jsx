"use client";

import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {APP_URL_HOST} from "@/lib/const";
import Link from "next/link";
import {Button} from "@/components/ui/button";


const Page = () => {
    const [formCount, setFormCount] = useState(0); // برای ذخیره تعداد فرم‌ها
    const [loading, setLoading] = useState(true); // وضعیت بارگذاری
    const [error, setError] = useState(null); // مدیریت خطاها

    // تابع دریافت تعداد فرم‌ها
    const fetchFormCount = async () => {
        try {
            const response = await fetch(`${APP_URL_HOST}/forms`);
            if (!response.ok) {
                throw new Error("خطا در دریافت داده‌ها");
            }
            const data = await response.json();
            setFormCount(data.length); // تعداد فرم‌ها
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // دریافت داده‌ها هنگام بارگذاری صفحه
    useEffect(() => {
        fetchFormCount();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">داشبورد</h1>
            {loading ? (
                <p>در حال بارگذاری...</p>
            ) : error ? (
                <p className="text-red-500">خطا: {error}</p>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>تعداد فرم‌های ایجاد شده </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-semibold">{formCount}</p>
                        <Button variant='ghost'><Link href='/forms/list'>برو به فرم ها</Link></Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Page;