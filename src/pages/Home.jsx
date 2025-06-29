import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Overview from "../components/Home/Overview";

const Home = ({ setGroupData }) => {
  const [data, setData] = useState(null);
  const [showGroup, setShowGroup] = useState(null);
  const [trigger, setTrigger] = useState(0);
  const { token } = useSelector((state) => state.auth);
  const { userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const url = `https://collectify-apis.vercel.app/api/v1/detail/${userId}/?month=${month}&year=${year}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          navigate("/login");
        }

        if (!response.ok) {
          throw new Error("something went wrong");
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [trigger]);

  return (
    <section
      className={`min-h-screen  w-h-screen ${
        !showGroup && "bg-background px-4 py-6"
      }`}
    >
      {data && (
        <Overview
          data={data}
          name={data.username}
          setShowGroup={setShowGroup}
          setGroupData={setGroupData}
          setData={setData}
          setTrigger={setTrigger}
        ></Overview>
      )}
    </section>
  );
};

export default Home;
