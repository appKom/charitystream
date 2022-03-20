import useSWR from "swr";
import StretchGoals from "../components/StretchGoals";
import SilentAuctionSlider from "../components/SilentAuctionSlider";
import PagesButtons from "../components/PagesButtons";
import Vipps from "../components/Vipps";
import styles from "../frontpage.module.css";
import Stream from "../components/Stream";
import Chat from "../components/Chat";
import ProgressBar from "../components/ProgressBar";
import Reaact, { useEffect } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const { data, error } = useSWR("/api/state", fetcher, {
    refreshInterval: 5000,
  });

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className={"flex h-screen flex-wrap justify-evenly"}>
        <div className={"w-screen"}>
          <ProgressBar
            stretchGoals={data.stretchGoals}
            totalAmount={data.totalAmount}
          />
        </div>

        <div className="flex max-w-full flex-grow justify-center flex-wrap">
          <div className={"text-lg"}>
            <Stream link={data.streamLink} />
          </div>
          <div className={"flex-grow max-w-lg"}>
            <Chat link={data.streamLink} />
          </div>
        </div>

        <div className="flex max-w-full flex-grow justify-evenly flex-wrap mt-10">
          <div className={""}>
            <StretchGoals
              stretchGoals={data.stretchGoals}
              totalAmount={data.totalAmount}
            />
          </div>
          <div className={"flex-grow max-w-lg bg-teal-500 rounded-md p-5"}>
            <Vipps items={data.vipps} topDonor={data.topDonor} />
          </div>
        </div>

        <div className={"flex w-screen justify-evenly"}>
          <PagesButtons />
        </div>

        <div className={"w-screen"}>
          <SilentAuctionSlider items={data.auctions} />
        </div>
        <div className={"m-10"}>footer</div>
      </div>
    </>
  );
}
