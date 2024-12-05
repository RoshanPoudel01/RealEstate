import { Container, Flex } from "@chakra-ui/react";

import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";

import Loader from "@realState/utils/Loader";
import ErrorBoundary from "../ErrorBoundry";
import Header from "./Header";
import Sidebar from "./Sidebar";

const sidebarAnimate = "all .25s ease";
// const largeSidebarWidth = 290;
// const smallSidebarWidth = 64;

const AdminWrapper: React.FC = () => {
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

  const sidebarWidth = "250px";
  const [open, setOpen] = useState(true);
  return (
    <ErrorBoundary>
      <Flex>
        <Sidebar
          // width={isHovered ? largeSidebarWidth : sidebarWidth}
          // isCollapsed={!open}
          // animate={sidebarAnimate}
          // onEnterSidebar={onEnterSidebar}
          // onExitSidebar={onExitSidebar}
          // isHovered={isHovered}
          maxW={sidebarWidth}
          w={sidebarWidth}
          hideBelow={"md"}
        />
        <Container
          flexGrow={1}
          px={{ base: 2, md: 4 }}
          ml={{ md: sidebarWidth }}
          transition={sidebarAnimate}
          backgroundColor={"#FFFFFF"}
          zIndex={0}
          overflowX="hidden"
        >
          {/* <AppBar zIndex={1} flex={1} position="sticky" mb={0}>
              <Header
                width={open ? largeSidebarWidth : sidebarWidth}
                handleDrawerToggle={handleDrawerToggle}
                isDrawerOpen={open}
              />
            </AppBar> */}
          <Suspense fallback={<Loader />}>
            <Flex
              flexDir={"column"}
              gap={4}
              minHeight={"80vh"}
              px={{ base: 2, md: 8 }}
              py={8}
              borderRadius={"30px"}
            >
              <Header />
              <Outlet />
            </Flex>
          </Suspense>
        </Container>
      </Flex>
    </ErrorBoundary>
  );
};

export default AdminWrapper;
