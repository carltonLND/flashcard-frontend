import {
  Container,
  AbsoluteCenter,
  VStack,
  Spinner,
  Heading,
} from "@chakra-ui/react";

function Loading() {
  return (
    <Container height={"100vh"}>
      <AbsoluteCenter>
        <VStack gap={10}>
          <Spinner size={"xl"} />
          <Heading userSelect={"none"}>Loading...</Heading>
        </VStack>
      </AbsoluteCenter>
    </Container>
  );
}

export default Loading;
