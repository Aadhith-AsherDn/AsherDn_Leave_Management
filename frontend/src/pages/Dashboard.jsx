import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
  return (
    <div className="flex flex-col ">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {/* Cards */}

      <div className=" grid grid-cols-4 gap-5">

        <DashboardCard
          title="Remaining Leave"
          value="12"
        />

        <DashboardCard
          title="Pending Leave"
          value="2"
        />

        <DashboardCard
          title="Approved"
          value="10"
        />

        <DashboardCard
          title="Rejected"
          value="1"
        />

      </div>

    </div>
  );
};

export default Dashboard;