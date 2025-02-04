import Donations from "@/components/Donations";
import { useAuthContext } from "@/context/authContext";

const Home = () => {
  const { authData } = useAuthContext();

  return (
    <div className="mt-32">
      <Donations />
    </div>
  );
};

export default Home;
