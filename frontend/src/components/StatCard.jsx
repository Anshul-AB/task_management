const StatCard = ({ title, value, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 w-full">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className={`text-2xl font-bold ${color}`}>{value}</h3>
    </div>
  );
};

export default StatCard;
