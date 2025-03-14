"use client";

import React, { useLayoutEffect, useState} from "react";
import {Preview} from "@/components/Preview";
import {APP_URL_HOST} from "@/lib/const";
import {useSearchParams} from "next/navigation";
import {Button} from "@/components/ui/button";


const Page = () => {
    const [components, setComponents] = useState([]);
    const [formName, setFormName] = useState('');
    const params = useSearchParams()


    const saveForm = async () => {
        const formData = { id: Date.now() , formName, components };
        try {
            const response = await fetch(`${APP_URL_HOST}/forms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                console.log('فرم با موفقیت در json-server ذخیره شد');
                setComponents([]);
            } else {
                console.error('خطا در ذخیره فرم');
            }
        } catch (error) {
            console.error('خطا در ارسال درخواست:', error);
        }
    };

    const resetForm=()=>{
        setComponents([]);
    }
    // تابع بارگذاری فرم از فایل JSON
    useLayoutEffect(() => {
        if(params.get('id')){
            getDate(params.get('id'))
        }
    }, [])
    const  getDate = async (id) =>{
        try {
            const response = await fetch(`${APP_URL_HOST}/forms`);
            if (response.ok) {
                const data = await response.json();
                let form = data.filter(item=>{return parseInt(item.id) === parseInt(id)})
                if(form.length > 0){
                    setComponents(form[0].components)
                    setFormName(form[0].formName)
                }
            } else {
                console.error("خطا در دریافت داده‌ها");
            }
        } catch (error) {
            console.error("خطا در ارسال درخواست:", error);
        }

    }

    function componentsNameHandle(e) {
        setFormName(e.target.value);
    }

    return (
        <div className='mx-auto' style={{width: "40%", padding: "20px", backgroundColor: "#f9fafb"}}>
            <h2 style={{marginBottom: "20px", fontSize: "1.5rem"}}>
                {formName}
            </h2>
            <Preview components={components}/>
            <Button className='rounded my-3 '>ذخیره</Button>
        </div>
    );
};

export default Page;