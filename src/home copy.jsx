import "package:flutter/material.dart";

("Component laster extend Stateless:");

<Container
  padding={{
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
    horizontal: 10,
    vertical: 10,
  }}
  margin={{
    top: 10,
    bottom: 10,
    left: 10,

    right: 10,
  }}
  height={100}
  width={1000}
  decoration={{
    color: Color.black,
    backgroundColor: "#000",
  }}
>
  <Column>
    <Text>Test</Text>
    <Text>Test 2</Text>
    <Container />
    <Column />

    <Container
      padding={{
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        horizontal: 10,
        vertical: 10,
      }}
      margin={{
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      }}
      decoration={{
        color: "#fff",
        backgroundColor: "#000",
      }}
    >
      <Column>
        <Text>hello</Text>
        <Text>testing</Text>
        <Text>testing</Text>
      </Column>
    </Container>
  </Column>
</Container>;
