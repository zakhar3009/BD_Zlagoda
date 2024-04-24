import {useState} from "react";
import useAuth from "@/hooks/auth/useAuth.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {ClipLoader} from "react-spinners";

export default function LogIn() {
    const {setAuth} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const getUserByCredentials = async () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                command_name: "POST_LOGIN"
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        };
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller",
                requestOptions
            );
            const userData = await response.json();
            if(userData == null) {
                setError(true);
                return;
            }
            setAuth({
                user: userData
            });
            sessionStorage.setItem("user", JSON.stringify(userData))
            navigate("/welcome")
            toast.success("You successfully logged in!")
        } catch (err) {
            setError(err);
        } finally {
            setTimeout(() => setIsLoading(false), 500)
        }
    };

    const hasErrors = () => error && !isLoading

    const handleFormSubmit = (e) => {
        e.preventDefault();
        getUserByCredentials();
    };
    return (
        <div className="w-full h-screen bg-gradient-to-r from-violet-200 to-pink-200">
            <section className=" h-14 bg-gradient-to-r to-pink-500">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <img
                                className="mx-auto h-10 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            />
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            {hasErrors() &&
                                <div className="py-3 px-2 bg-red-200 rounded text-center" >
                                    <label className="text-red-600 text-center font-medium">Not valid credentials!</label>
                                </div>}
                            <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
                                {isLoading ?
                                    <div className="grid place-content-center my-16">
                                        <ClipLoader
                                            color="#8729e6"
                                            loading={isLoading}
                                            size={150}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div>
                                    : (<>
                                        <div>
                                            <label form="email"
                                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Your email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="name@company.com"
                                                required
                                                onChange={(e) => {
                                                    setError(false);
                                                    setEmail(e.target.value)
                                                }
                                            }
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <label form="password"
                                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="••••••••"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required
                                                minLength="8"
                                                title="Password must be at least 8 characters long"
                                                onChange={(e) => {
                                                    setError(false);
                                                    setPassword(e.target.value)
                                                }
                                            }
                                            />
                                        </div>
                                    </>)}

                                <button disabled={isLoading} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}