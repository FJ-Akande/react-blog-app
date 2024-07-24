import { useParams } from "react-router-dom";
import userdp from "../../assets/userdp.png";
import { FaGithub } from "react-icons/fa";
import ColorFulDiv from "../../components/colorful-div/colorful-div.component";

const DetailPage = () => {
  const { id } = useParams();

  return (
    <div className="bg-secondary text-white min-h-screen p-24">
      <div className="max-w-[92%] mx-auto">
        <h1 className="font-semibold text-2xl">Project Details</h1>
        <div className="bg-primary max-w-[960px] mx-auto my-12 rounded-xl flex overflow-hidden">
          <div className="w-[70%] p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-medium">Dean DeaconCo</h2>
              <p className="mt-5 mb-10 text-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus dolore quidem consequatur excepturi officiis distinctio
                vitae necessitatibus, ab voluptates natus incidunt dolorum
                commodi a cupiditate molestias ipsum quos eos hic.
              </p>
              <div className="flex items-center gap-2">
                <ColorFulDiv>Frontend</ColorFulDiv>
                <ColorFulDiv>Backend</ColorFulDiv>
                <ColorFulDiv>Fullstack</ColorFulDiv>
              </div>
              <h3 className="text-lg font-medium mt-8">Skills and Expertise</h3>
              <p className="text-sm text-text">
                Level Required - Beginner - 3 months ago
              </p>
            </div>
            <p className="text-xs text-text">Posted on Apr 14, 2024</p>
          </div>
          <div className="bg-[#1B232E] w-[30%] py-8 flex flex-col items-center px-10">
            <img
              src={userdp}
              alt="userdp"
              className="bg-black rounded-full object-cover w-[10rem] h-[10rem]"
            />
            <div className="flex flex-col items-center text-center py-6 border-b border-gray-700">
              <h3 className="font-semibold text-xl">Dean DeaconCo</h3>
              <p className="text-sm text-text py-5">
                I have not written anything about myself yet
              </p>
              <FaGithub className="text-2xl my-14" />
            </div>
            <p className="text-xs text-text pt-4">Member since Apr 14, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
