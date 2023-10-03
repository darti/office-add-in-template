import {
  Button,
  Link,
  Toast,
  ToastBody,
  ToastFooter,
  ToastTitle,
  Toaster,
  Tree,
  TreeItem,
  TreeItemLayout,
  useId,
  useToastController,
} from "@fluentui/react-components";
import { ArrowClockwiseRegular } from "@fluentui/react-icons";
import React, { useState } from "react";
import { listLibraries } from "../../io";
import { importDocument } from "../template";

// import { Body1, Button, Caption1, Card, CardFooter, CardHeader } from "@fluentui/react-components";
// import { NewRegular, AddSquareRegular } from "@fluentui/react-icons";
// import { addElement, initLib } from "../../libs";

export default function Elements() {
  const [libs, setLibs] = useState([]);
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const loadLibs = async () => {
    await Word.run(async (context) => {
      const paths = await listLibraries(
        process.env.TEMPLATLES_LIB_BASE_URL,
        process.env.TEMPLATES_LIB_PROJECT_ID,
        process.env.TEMPLATES_LIB_ACCESS_TOKEN,
      );

      dispatchToast(
        <Toast>
          <ToastTitle action={<Link>Undo</Link>}>Email sent</ToastTitle>
          <ToastBody subtitle="Subtitle">{paths}</ToastBody>
          <ToastFooter>
            <Link>Action</Link>
            <Link>Action</Link>
          </ToastFooter>
        </Toast>,
        { intent: "success" },
      );
      await context.sync();
    });

    // setLibs([paths]);
  };

  const template = () => {};

  return (
    <div>
      <Toaster toasterId={toasterId} />
      <Tree aria-label="Default">
        {libs.map((lib) => (
          <TreeItem itemType="branch" key={lib}>
            <TreeItemLayout>level 1, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 2, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        ))}
      </Tree>

      <Button icon={<ArrowClockwiseRegular fontSize={16} />} onClick={loadLibs}>
        Load libraries
      </Button>

      <Button icon={<ArrowClockwiseRegular fontSize={16} />} onClick={importDocument}>
        Load libraries
      </Button>
    </div>
  );
}
