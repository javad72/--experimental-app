"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {APP_URL_HOST} from "@/lib/const";
import Link from "next/link"; // فرض بر این است که Input از shadcn/ui موجود است

const Page = () => {
    const [forms, setForms] = useState([]); // برای ذخیره لیست کامل فرم‌ها
    const [searchTerm, setSearchTerm] = useState(""); // برای ذخیره عبارت جستجو
    const [filteredForms, setFilteredForms] = useState([]); // برای ذخیره فرم‌های فیلتر شده

    // تابع برای دریافت داده‌ها از json-server
    const fetchForms = async () => {
        try {
            const response = await fetch(`${APP_URL_HOST}/forms`);
            if (response.ok) {
                const data = await response.json();
                setForms(data);
                setFilteredForms(data); // در ابتدا همه فرم‌ها نمایش داده می‌شوند
            } else {
                console.error("خطا در دریافت داده‌ها");
            }
        } catch (error) {
            console.error("خطا در ارسال درخواست:", error);
        }
    };

    // دریافت داده‌ها هنگام بارگذاری صفحه
    useEffect(() => {
        fetchForms();
    }, []);

    // فیلتر کردن فرم‌ها بر اساس عبارت جستجو
    useEffect(() => {
        const filtered = forms.filter((form) =>
            form.formName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredForms(filtered);
    }, [searchTerm, forms]);

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">لیست فرم‌ها</h1>

                {/* فیلد جستجو */}
                <Input
                    type="text"
                    placeholder="جستجو بر اساس نام فرم"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4"
                />

                {/* نمایش کارت‌ها */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredForms.map((form) => (
                        <Card className='' key={form.id}>
                            <CardHeader>
                                <CardTitle>{form.formName}</CardTitle>
                                <CardDescription>شناسه: {form.id}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>تعداد کامپوننت‌ها: {form.components?.length || 0}</p>
                            </CardContent>
                            <CardFooter>
                                <Button  className='rounded' color='202 80.3% 23.9%' >
                                    <Link href={`/panel/forms/form-creator?id=${form.id}`}>ویرایش فرم</Link>
                                </Button>
                                <Button className='rounded mr-3'  variant="outline">
                                    <Link href={`/panel/forms/show?id=${form.id}`}>مشاهده فرم</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Page;