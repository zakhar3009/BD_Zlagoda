import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      //   setIsLoading(true);
      //   console.log("fetching");
      //   const respone = await fetch("http://localhost:8080/controller");
      //   const data = await respone.json();
      //   setData(data);
      //   setIsLoading(false);
      //   console.log(data);
      const params = new URLSearchParams([
        ["command_name", "GET_ALL_EMPLOYEES"],
      ]);
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8080/controller", {
          params,
        });
        setData(response);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-r from-violet-200 to-pink-200">
      {isLoading && <div>Is Loading </div>}
      {!isLoading && (
        <>
          <h1>Fetched</h1>
          <div>{JSON.stringify(data)}</div>
        </>
      )}
      <div className="mr-auto ml-auto pt-44 text-center w-1/2">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to annonyms page.
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <NavLink
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login In
          </NavLink>
        </div>
      </div>
    </div>
  );
}
