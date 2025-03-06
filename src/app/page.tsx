
const Page = async () => {
    try {
        const res = await fetch('http://localhost:4000/languages', {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);

        return (
            <div>

            </div>
        );
    } catch (error) {
        console.error('Error fetching data:', error);
        return <div>Failed to load data</div>;
    }
};


export default Page ;

 // export async function getServerSideProps() {
 //     const res = await fetch('http://localhost:3001/navMain'); // آدرس API
 //     const data1 = await res.json(); // دریافت داده‌ها
 //     return {
 //         props: {
 //             menu: data1, // ارسال داده‌ها به عنوان prop
 //         },
 //     };
 // }