"use client"; // چون از هوک‌ها و state استفاده می‌کنیم، باید client-side باشد

import React, {useEffect, useLayoutEffect, useState} from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import ComponentList from "@/components/ComponentList";
import FormBuilder from "@/components/FormBuilder";
import {Preview} from "@/components/Preview";
import {DndProvider} from "react-dnd";
import {APP_URL_HOST} from "@/lib/const";
import {useSearchParams} from "next/navigation";


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
        <DndProvider backend={HTML5Backend} >
            <div  className='flex h-full pb-5'>
                {/* ستون اول: لیست کامپوننت‌ها */}
                <div
                    style={{
                        width: "20%",
                        borderRight: "1px solid #ccc",
                        padding: "20px",
                        backgroundColor: "#f9fafb",
                    }}
                >
                    <h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>
                        اجزا فرم
                    </h2>
                    <ComponentList />
                </div>

                {/* ستون دوم: فرم‌ساز و تنظیمات */}
                <div
                    style={{
                        width: "40%",
                        borderRight: "1px solid #ccc",
                        padding: "20px",
                        backgroundColor: "#ffffff",
                    }}
                >
                    <h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>
                        فرم‌ساز
                    </h2>
                    <div className='flex flex-row items-center mb-2'>
                        <h3 className='ml-3'>نام فرم</h3>
                        <input type='text' className='p-2 outline-0 rounded bg-gray-50' value={formName} onChange={componentsNameHandle} />
                    </div>
                    <FormBuilder components={components} setComponents={setComponents} />
                    <div style={{ marginTop: "20px" }}>
                        <button
                            onClick={saveForm}
                            className='bg-indigo-700 text-white rounded border-2 border-indigo-700 p-2 mx-3'
                        >
                            ذخیره فرم
                        </button>
                        <button onClick={resetForm} className='bg-transparent border-2 border-indigo-700 text-indigo-700 rounded p-2 mx-3'>
                            ریست
                        </button>
                    </div>
                </div>

                {/* ستون سوم: پیشنمایش */}
                <div style={{ width: "40%", padding: "20px", backgroundColor: "#f9fafb" }}>
                    <h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>
                        پیشنمایش
                    </h2>
                    <Preview components={components} />

                </div>
            </div>
        </DndProvider>
    );
};

export default Page;