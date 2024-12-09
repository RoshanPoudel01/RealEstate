import {
  Box,
  Button,
  Container,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { imageAssets } from "@realState/assets/images";
import { TextInput } from "@realState/components/Form";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@realState/components/ui/accordion";
import { useForm } from "react-hook-form";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import * as yup from "yup";
const defaultValue = {
  name: "",
  email: "",
  phone: "",
  message: "",
};
const PropertyPage = () => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const contactSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^\d{10}$/, "Please enter a 10 digit valid phone number"),
    message: yup.string().required("Message is required"),
  });
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValue,
    resolver: yupResolver(contactSchema),
  });
  const items = [
    { value: "a", title: "First Item", text: "Some value 1..." },
    { value: "b", title: "Second Item", text: "Some value 2..." },
    { value: "c", title: "Third Item", text: "Some value 3..." },
  ];
  const submitContactForm = (data: any) => {
    console.log(data);
  };
  return (
    <Container display="flex" flexDirection={"column"} gap={10}>
      <Heading textAlign={"center"}>Property Name</Heading>
      <SimpleGrid columns={3} gap={10}>
        <GridItem display={"flex"} flexDir={"column"} gap={10} colSpan={2}>
          <Stack>
            <Image src={imageAssets.Logo} alt="Property Image" />
          </Stack>
          <Box width={"50vw"}>
            <Slider {...settings}>
              <div>
                <Image
                  src="https://via.placeholder.com/200"
                  alt="Property Image"
                />
              </div>
              <div>
                <Image
                  src="https://via.placeholder.com/200"
                  alt="Property Image"
                />
              </div>
              <div>
                <Image
                  src="https://via.placeholder.com/200"
                  alt="Property Image"
                />
              </div>
              <div>
                <Image
                  src="https://via.placeholder.com/200"
                  alt="Property Image"
                />
              </div>
              <div>
                <Image
                  src="https://via.placeholder.com/200"
                  alt="Property Image"
                />
              </div>
            </Slider>
          </Box>
          {/* <Stack color="#141B2D" background={"#F3F3FA"} padding={"22px"} w={"70%"}>
        <Text fontWeight={400} fontSize={"17px"}>
          {" "}
          Price :
        </Text>
        <Text fontWeight={700} fontSize={"22px"}>
          Rs. 1000000
        </Text>
      </Stack> */}
          <Text
            w={"70%"}
            textAlign={"start"}
            color="#141B2D"
            fontWeight={400}
            fontSize={"17px"}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor enim
            obcaecati cumque, eum quibusdam, iure laudantium nulla quod eligendi
            incidunt ducimus vel? Pariatur facilis ipsam similique. Doloribus
            sed placeat atque? Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Corrupti temporibus sit deleniti est nulla libero
            iste architecto fuga, excepturi suscipit accusantium, itaque placeat
            debitis illum quasi sed explicabo sint mollitia? Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Dolor enim obcaecati cumque,
            eum quibusdam, iure laudantium nulla quod eligendi incidunt ducimus
            vel? Pariatur facilis ipsam similique. Doloribus sed placeat atque?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti
            temporibus sit deleniti est nulla libero iste architecto fuga,
            excepturi suscipit accusantium, itaque placeat debitis illum quasi
            sed explicabo sint mollitia? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dolor enim obcaecati cumque, eum quibusdam, iure
            laudantium nulla quod eligendi incidunt ducimus vel? Pariatur
            facilis ipsam similique. Doloribus sed placeat atque? Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Corrupti temporibus
            sit deleniti est nulla libero iste architecto fuga, excepturi
            suscipit accusantium, itaque placeat debitis illum quasi sed
            explicabo sint mollitia? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dolor enim obcaecati cumque, eum quibusdam, iure
            laudantium nulla quod eligendi incidunt ducimus vel? Pariatur
            facilis ipsam similique. Doloribus sed placeat atque? Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Corrupti temporibus
            sit deleniti est nulla libero iste architecto fuga, excepturi
            suscipit accusantium, itaque placeat debitis illum quasi sed
            explicabo sint mollitia?
          </Text>
          <Stack w={"70%"}>
            <Heading>FAQ</Heading>
            <AccordionRoot multiple defaultValue={["a"]} variant={"subtle"}>
              {items.map((item, index) => (
                <AccordionItem key={index} value={item.value}>
                  <AccordionItemTrigger>{item.title}</AccordionItemTrigger>
                  <AccordionItemContent>{item.text}</AccordionItemContent>
                </AccordionItem>
              ))}
            </AccordionRoot>
          </Stack>
        </GridItem>
        <GridItem
          colSpan={1}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          gap={10}
          w={"full"}
        >
          <Heading>Inquire Property</Heading>
          <Stack
            as={"form"}
            onSubmit={handleSubmit(submitContactForm)}
            w={"80%"}
            align={"flex-end"}
          >
            <TextInput
              placeholder={"Name"}
              type="text"
              name="name"
              control={control}
              size={"lg"}
            />
            <TextInput
              type="text"
              placeholder={"Email"}
              name="email"
              control={control}
              size={"lg"}
            />
            <TextInput
              type="number"
              placeholder={"Phone"}
              name="phone"
              control={control}
              size={"lg"}
            />
            <TextInput
              type="textarea"
              placeholder={"Message"}
              name="message"
              control={control}
              size={"lg"}
            />
            <Button type="submit" size={"lg"}>
              Submit
            </Button>
          </Stack>
        </GridItem>
      </SimpleGrid>

      <Stack w={"full"} alignItems={"center"}></Stack>
    </Container>
  );
};

export default PropertyPage;
