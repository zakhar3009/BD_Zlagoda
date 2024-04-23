import useAuth from "@/hooks/auth/useAuth.js";

export default function WelcomePage() {
    const {auth} = useAuth();
    const role = auth?.user?.role;

    return (
        <div className="w-full h-screen bg-gradient-to-r from-violet-200 to-pink-200">
            <div className="mr-auto f ml-auto pt-44 text-center w-1/2">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    {`Welcome to ${role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()} page`}
                </h1>
            </div>
        </div>
    )
}