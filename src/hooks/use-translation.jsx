import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function useTranslation() {
    const router = useRouter();
    const pathname = usePathname();
    const [locale, setLocale] = useState('en');
    const [translations, setTranslations] = useState({});

    useEffect(() => {
        // زبان را از URL استخراج کنید
        const lang = pathname.split('/')[1] || 'en';
        setLocale(lang);

        // فایل ترجمه را بارگذاری کنید
        fetch(`/locales/${lang}.json`)
            .then((res) => res.json())
            .then((data) => setTranslations(data));
    }, [pathname]);

    const t = (key, defaultValue = key) => {
        return key.split('.').reduce((acc, part) => acc?.[part], translations) || defaultValue;
    };


    const changeLanguage = (lang) => {
        const newPath = `/${lang}${pathname.replace(/^\/(en|de|fa)/, '')}`;
        router.push(newPath);
    };

    return { t, locale, changeLanguage };
}
