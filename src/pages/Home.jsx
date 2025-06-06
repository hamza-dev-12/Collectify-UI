import { use, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Overview from "../components/Home/Overview";
import Group from "./Group";

const backendResponse = {
  status: 200,
  result: [
    {
      groupId: 1,
      groupName: "Vanilla Building",
      members: [
        {
          memberId: 1,
          status: "pending",
          date: "",
        },
        {
          memberId: 2,
          status: "paid",
          date: "4-June-2025",
        },
      ],
      baseAmount: 2000,
    },
    {
      groupId: 2,
      groupName: "Garrison Building",
      members: [
        {
          memberId: 4,
          status: "paid",
          date: "2025-06-03",
        },
        {
          memberId: 5,
          status: "pending",
          date: "",
        },
        {
          memberId: 6,
          status: "paid",
          date: "2025-06-02",
        },
      ],
      baseAmount: 1000,
    },
  ],
};

const Home = ({ setGroupData }) => {
  const [data, setData] = useState([]);
  const [showGroup, setShowGroup] = useState(null);
  const name = "Hamza";
  console.log(data);

  useEffect(() => {
    try {
      setData(backendResponse.result);
    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log(showGroup);
  return (
    <section
      className={`min-h-screen  w-h-screen ${
        !showGroup && "bg-background px-4 py-6"
      }`}
    >
      {!showGroup && (
        <Overview
          data={data}
          name={"hamza"}
          setShowGroup={setShowGroup}
          setGroupData={setGroupData}
          setData={setData}
        ></Overview>
      )}
      {/* {showGroup === -1 ? (
        <Overview
          data={data}
          name={"hamza"}
          setShowGroup={setShowGroup}
        ></Overview>
      ) : (
        <Group
          groupData={data.find((d) => d.groupId === showGroup)}
          setData={setData}
        />
      )} */}
    </section>
  );
};

export default Home;
