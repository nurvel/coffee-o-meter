import React, { FunctionComponent } from "react";
import {
  Button,
  Text,
  Container,
  Title,
  Progress,
  Blockquote,
  createStyles,
} from "@mantine/core";

import { useCreateBrew, useLatestBrew } from "./hooks/brewHooks";

const useStyles = createStyles(() => {
  return {
    title: {
      margin: "5px",
    },
    ingress: {
      margin: "20px",
    },
    progressBar: {
      margin: "30px 20px 10px 20px",
    },
    button: {
      margin: "20px 20px 10px 20px",
    },
  };
});

export const CoffeeContent: FunctionComponent = () => {
  const myStyles = useStyles().classes;

  const mutation = useCreateBrew();
  const [isThrottle, lastBrew, throttlePercentage] = useLatestBrew();

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <Container>
      {isThrottle ? (
        <>
          <Title className={myStyles.title}>Coffee is on the way!</Title>
          <Progress
            value={Number.parseInt(throttlePercentage)}
            label={`${throttlePercentage} %`}
            size="xl"
            radius="xl"
            animate
            color="orange"
            className={myStyles.progressBar}
          />
          <br />
          <Blockquote color="orange" cite="– Random Fact API">
            {lastBrew.fact}
          </Blockquote>
        </>
      ) : (
        <>
          <Title className={myStyles.title}>Did you make coffee?</Title>
          <Text className={myStyles.ingress}>
            Brilliant! Let your colleagues know about it in Slack channel{" "}
            <b>#coffee-o-meter</b>. Just press the button below.
          </Text>
          <Button
            className={myStyles.button}
            mx={20}
            size="xl"
            color="orange"
            radius="md"
            onClick={() => {
              handleClick();
            }}
            loading={mutation.isLoading}
          >
            Yes, I made coffee
          </Button>
        </>
      )}
    </Container>
  );
};
