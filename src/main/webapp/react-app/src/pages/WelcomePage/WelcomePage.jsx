import useAuth from "@/hooks/auth/useAuth.js";
import {NavLink} from "react-router-dom";

export default function WelcomePage(){
    const {auth} = useAuth();

    return (
        <>
            <div className="w-full h-screen bg-gradient-to-r from-violet-200 to-pink-200">
                <div className="mr-auto f ml-auto pt-44 text-center w-1/2">
                    <h1 className="text-4xl text-gray-800 font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Welcome to cashier page!
                    </h1>
                    {/*{auth.user.role === "MANAGER"  &&*/}
                    {/*    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">*/}
                    {/*        Welcome to manager page!*/}
                    {/*    </h1>}*/}
                    {/*{auth.user.role === "CASHIER"  &&*/}
                    {/*    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">*/}
                    {/*        Welcome to cashier page!*/}
                    {/*    </h1>}*/}
                </div>
            </div>

        </>
    )
}