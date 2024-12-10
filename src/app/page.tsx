
 const Page=()=> {

    return (
      <div>dd</div>
    )
}
export default Page ;

 export async function getServerSideProps() {
     const res = await fetch('http://localhost:3001/navMain'); // آدرس API
     const data1 = await res.json(); // دریافت داده‌ها
     return {
         props: {
             menu: data1, // ارسال داده‌ها به عنوان prop
         },
     };
 }