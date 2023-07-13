import { ReactNode, useState } from "react";

interface ITab {
  titles: string[];
  children: ReactNode[];
}

const TabList = ({ titles, children }: ITab) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <div className="lstTab">
        {titles.map((title, i) => (
          <div key={`tab - ${i}`} className={selectedTab === i ? "activeTab   " : ""} onClick={() => setSelectedTab(i)}>
            {title}
          </div>
        ))}
      </div>
      {children[selectedTab]}
    </>
  );
};
export default TabList;
