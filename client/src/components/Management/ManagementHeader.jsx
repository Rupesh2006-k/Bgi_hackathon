const ManagementHeader = () => {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
          Administrative View
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
          Complaint Management
        </h1>
      </div>
    </div>
  );
};

export default ManagementHeader;
