import {APP_URL} from "@/lib/const";

const Logo=()=>{

    return(
        <div className='w-auto h-[60px]  flex flex-row justify-center'>
            <img className='h-full' src={`${APP_URL}/assets/img/logo.png`} />
        </div>
    )
}
 export default Logo