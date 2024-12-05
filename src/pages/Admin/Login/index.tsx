import { Card, Center, Link as CLink, Text } from "@chakra-ui/react";
import { Lock, User } from "@phosphor-icons/react";
import { TextInput } from "@realState/components/Form";
import { Button } from "@realState/components/ui/button";
import { useLogin } from "@realState/services/service-auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const defaultValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const { mutateAsync: login, isPending } = useLogin();
  const { control, handleSubmit } = useForm({ defaultValues });

  const onSubmit = async (data: any) => {
    const response = await login(data);
    if (response.data.status) {
      navigate("/");
    }
  };

  return (
    <Center h={"100dvh"} w={"100dvw"} px={4}>
      <Card.Root maxW={"600px"} w={"full"} asChild>
        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
          <Card.Header textAlign={"center"} gap={4}>
            <Card.Title fontSize={"30px"}>Login</Card.Title>
            <Card.Description fontSize={"20px"}>
              Please enter your credentials to login.
            </Card.Description>
          </Card.Header>
          <Card.Body gap={6}>
            <TextInput
              startElement={<User />}
              control={control}
              required
              name="email"
              type="email"
              label="Email"
            />
            <TextInput
              startElement={<Lock />}
              control={control}
              required
              name="password"
              type="password"
              label="Password"
            />
          </Card.Body>
          <Card.Footer display={"flex"} flexDir={"column"} gap={4}>
            <Button
              type="submit"
              form="login-form"
              w={"full"}
              colorPalette={"primary"}
              color={"white"}
              loading={isPending}
            >
              Login
            </Button>
            <Text alignSelf={"center"} fontSize={"sm"}>
              Are you a new student? &nbsp;
              <CLink
                colorPalette={"primary"}
                variant={"underline"}
                alignSelf={"center"}
                asChild
              >
                <Link to="/register"> Register here.</Link>
              </CLink>
            </Text>
          </Card.Footer>
        </form>
      </Card.Root>
    </Center>
  );
};

export default Login;
