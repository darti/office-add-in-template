import { Button, Toaster, Tree, TreeItem, TreeItemLayout, useId } from "@fluentui/react-components";
import { ArrowClockwiseRegular } from "@fluentui/react-icons";
import { useState } from "react";
import { loadLibs } from "../../io";
import { importDocument } from "../template";
import { Lib } from "../../state";

// import { Body1, Button, Caption1, Card, CardFooter, CardHeader } from "@fluentui/react-components";
// import { NewRegular, AddSquareRegular } from "@fluentui/react-icons";
// import { addElement, initLib } from "../../libs";

export default function Elements() {
  const [libs, setLibs] = useState<Array<Lib>>([]);
  const toasterId = useId("toaster");

  const load = async () => {
    await Word.run(async (context) => {
      const paths = await loadLibs();

      setLibs(paths);

      await context.sync();
    });
  };

  return (
    <div className="h-full w-full flex flex-col prose">
      <h2>Elements</h2>
      <em>Add elements</em>

      <Toaster toasterId={toasterId} />
      <Tree aria-label="Default">
        {libs.map((lib) => (
          <TreeItem itemType="branch" key={lib.path}>
            <TreeItemLayout>{lib.name}</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 2, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        ))}
      </Tree>

      <div className="flex-none  flex gap-x-2">
        <Button icon={<ArrowClockwiseRegular fontSize={16} />} onClick={load}>
          Load libraries
        </Button>
        <Button icon={<ArrowClockwiseRegular fontSize={16} />} onClick={importDocument}>
          Import doc
        </Button>
      </div>
    </div>
  );
}
