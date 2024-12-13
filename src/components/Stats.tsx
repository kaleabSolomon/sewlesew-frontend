import Stat from "./ui/Stat";

const Stats = () => {
  return (
    <div>
      <p className="font-light text-gray-700 text-xs my-4">
        HUMANITARIAN MISSION
      </p>
      <h1 className="text-3xl font-bold leading-12 w-[500px]">
        Help the Affected by <span className="text-customTeal">Disasters</span>,{" "}
        <span className="text-customTeal">Shortages</span> and{" "}
        <span className="text-customTeal">Emergency Relief</span>.
      </h1>
      <div className=" py-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Stat amount="80M+" description="Birr Raised" />
            <Stat amount="100+" description="Campaigns Closed" />
            <Stat amount="50K+" description="Active Users" />
            <Stat amount="20+" description="Countries Reached" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
