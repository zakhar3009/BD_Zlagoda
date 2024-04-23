import useAuth from "@/hooks/auth/useAuth.js";
import {NavLink} from "react-router-dom";
import logo from "./../../images/Conceito_abstrato_da_sociedade_de_consumo___Vetor_Grátis-removebg-preview.png"
export default function WelcomePage(){
    const {auth} = useAuth();

    return (
        <>
            <div className="w-full h-screen bg-gradient-to-r from-violet-200 to-pink-200">
                <div className="mr-auto f ml-auto pt-44 text-center w-1/2 ">
                    <h1 className="text-2xl text-gray-800 text-opacity-70 font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Welcome to cashier page!
                    </h1>
                    <div className="flex justify-center">
                    <img src={logo} alt={"The image is not available :("}/>
                    </div>
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