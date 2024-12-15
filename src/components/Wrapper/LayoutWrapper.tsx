import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Flex, Stack } from "@chakra-ui/react";
import Loader from "@realState/utils/Loader";
import ErrorBoundary from "../ErrorBoundry";
import Footer from "../Footer";
import Navbar from "./Navbar";

const sidebarAnimate = "all .25s ease";
// const largeSidebarWidth = 290;
// const smallSidebarWidth = 64;

const LayoutWrapper: React.FC = () => {
  // const { width } = useWindowSize();

  // const [open, setOpen] = useState(true);
  //   const [isHovered, setIsHovered] = useState(false);

  // const sidebarWidth = useMemo(
  //   () => (open ? largeSidebarWidth : smallSidebarWidth),
  //   [open]
  // );

  //   const handleDrawerToggle = () => {
  //     setOpen((oldState) => !oldState);
  //     setIsHovered(false);
  //   };

  //   const onEnterSidebar = () => {
  //     if (!open) {
  //       setIsHovered(true);
  //     }
  //   };
  //   const onExitSidebar = () => {
  //     if (isHovered) {
  //       setIsHovered(false);
  //     }
  //   };

  // useEffect(() => {
  //   if (width < 850) {
  //     setOpen(false);
  //   } else {
  //     setOpen(true);
  //   }
  //   // setIsHovered(false);
  // }, [width]);

  return (
    <ErrorBoundary>
      <Flex>
        <Stack
          flexGrow={1}
          gap={0}
          transition={sidebarAnimate}
          backgroundColor={"#FFFFFF"}
          zIndex={0}
          overflowX="hidden"
        >
          <Navbar />

          <Suspense fallback={<Loader />}>
            <Flex
              flexDir={"column"}
              gap={4}
              minHeight={"80vh"}
              pb={8}
              borderRadius={"30px"}
            >
              <Outlet />
            </Flex>
          </Suspense>
          <Footer />
        </Stack>
      </Flex>
    </ErrorBoundary>
  );
};

export default LayoutWrapper;
