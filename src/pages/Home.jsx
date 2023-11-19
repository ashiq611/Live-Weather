
import Lottie from "lottie-react";
import sunny from "../assets/Animation - 1698690303614.json";
import coludy from "../assets/Animation - 1698690333154.json";
import rainny from "../assets/Animation - 1698690582813.json";
import { useState } from "react";

const Home = () => {
  const [search, setSearch] = useState("");

  const [data, setData] = useState(null);

  // const {userWeb} = useContext(weatherContext);

  const searchCity = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=2378c5afba54e6fcb20f5470d2bc5c9f`
    )
      .then((response) => response.json())
      .then((json) => setData(json));
  };

  if (data?.cod == "404") {
    alert(data?.message);
  }

  // localStorage.setItem('user', JSON.stringify(userWeb))
  return (
    <div className="h-screen w-screen flex justify-center items-center ">
      {/* <h1>Hello User {userWeb?.email} </h1> */}
      <div className="mockup-window border bg-base-300 p-5">
        <div className="flex justify-center px-4 py-16 bg-base-200">
          <div>
            <h2 className="text-5xl font-bold text-center py-10">Weather</h2>
            <div className=" flex flex-col gap-5 justify-center items-center">
              <div className="flex gap-5">
                <input
                  className="input input-bordered input-accent w-full max-w-xs"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Your City"
                />

                <button
                  className="btn btn-outline btn-primary"
                  onClick={searchCity}
                >
                  Search
                </button>
              </div>
              {search !== "" ? (
                <div className="mt-5 flex flex-col gap-5 p-10 bg-indigo-800 text-center font-bold rounded-lg shadow-lg shadow-cyan-600">
                  {data?.main?.temp > 20 && (
                    <div className="flex justify-center">
                      <Lottie
                        className="w-40"
                        animationData={sunny}
                        loop={true}
                      />
                    </div>
                  )}
                  {data?.main?.temp > 10 && data?.main?.temp < 20 && (
                    <div className="flex justify-center rounded-full">
                      <Lottie
                        className="w-40"
                        animationData={coludy}
                        loop={true}
                      />
                    </div>
                  )}
                  {data?.main?.temp < 10 && (
                    <div className="flex justify-center">
                      <Lottie
                        className="w-40"
                        animationData={rainny}
                        loop={true}
                      />
                    </div>
                  )}

                  <div>
                    <h2>{data?.main?.temp}°c</h2>
                    <p>
                      {search.toUpperCase()}:{data?.sys?.country}
                    </p>
                    <div className="flex gap-5">
                      <p>Humidity: {data?.main?.humidity}%</p>
                      <p>Wind Speed: {data?.wind?.speed}km/h</p>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
