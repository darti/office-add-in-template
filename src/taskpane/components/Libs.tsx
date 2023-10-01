import React from "react";

import { Body1, Button, Caption1, Card, CardFooter, CardHeader } from "@fluentui/react-components";
import { NewRegular, AddSquareRegular } from "@fluentui/react-icons";
import { addElement, initLib } from "../../libs";

export default function Libs() {
  return (
    <Card>
      <CardHeader
        header={
          <Body1>
            <b>Libraries</b>
          </Body1>
        }
        description={<Caption1>Manage components libraries</Caption1>}
      />

      <CardFooter>
        <Button icon={<NewRegular fontSize={16} />} onClick={initLib}>
          New library
        </Button>
        <Button icon={<AddSquareRegular fontSize={16} />} onClick={addElement}>
          Add element
        </Button>
      </CardFooter>
    </Card>
  );
}
