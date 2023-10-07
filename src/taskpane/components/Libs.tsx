import { Button } from "@fluentui/react-components";
import { NewRegular, AddSquareRegular } from "@fluentui/react-icons";
import { addElement, initLib } from "../../libs";

export default function Libs() {
  return (
    <div className="h-full w-full flex flex-col prose">
      <div className="flex-none">
        <h2>Libraries</h2>
        Manage components libraries
      </div>

      <div className="flex-none flex gap-x-2">
        <Button icon={<NewRegular fontSize={16} />} onClick={initLib}>
          New library
        </Button>
        <Button icon={<AddSquareRegular fontSize={16} />} onClick={addElement}>
          Add element
        </Button>
      </div>
    </div>
  );
}
