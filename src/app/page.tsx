import CentralPage from "@/components/central-page";
import LeftSidebar from "@/components/left-sidebar";
import RightSidebar from "@/components/right-sidebar";

export const revalidate = 0;

const Home = async () => {

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <div className="h-full min-w-[70vw] flex relative">
        <LeftSidebar />
        <CentralPage />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
