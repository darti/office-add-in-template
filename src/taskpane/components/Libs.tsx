import { Button } from "@fluentui/react-components";
import { NewRegular, AddSquareRegular } from "@fluentui/react-icons";
import { addElement, initLib } from "../../libs";

export default function Libs() {
  return (
    <div className="h-full w-full">
      <b>Libraries</b>
      Manage components libraries
      <Button icon={<NewRegular fontSize={16} />} onClick={initLib}>
        New library
      </Button>
      <Button icon={<AddSquareRegular fontSize={16} />} onClick={addElement}>
        Add element
      </Button>
    </div>
  );
}
