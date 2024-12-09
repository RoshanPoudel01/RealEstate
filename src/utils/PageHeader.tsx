import { useStoreHeaderData } from "@realState/store";
import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface IPageHeaderProps {
  heading: string;
  description?: string;
}

const PageHeader: FC<IPageHeaderProps> = ({ heading, description }) => {
  const location = useLocation();
  const { setHeaderData } = useStoreHeaderData();

  useEffect(() => {
    setHeaderData({
      heading,
      description,
    });
  }, [location, setHeaderData, heading, description]);

  return null;
};

export default PageHeader;
