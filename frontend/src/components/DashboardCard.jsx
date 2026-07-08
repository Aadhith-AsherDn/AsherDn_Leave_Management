const DashboardCard = ({ title, value }) => {
  return (
    <div className="rounded-xl bg-white shadow-md p-5">
      <h3 className="text-gray-500">{title}</h3>

      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default DashboardCard;