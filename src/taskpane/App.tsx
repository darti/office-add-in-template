import Libs from "./components/Libs";
import Elements from "./components/Elements";
import { Divider } from "@fluentui/react-components";

export interface AppProps {
  isOfficeInitialized: boolean;
}

export default function App({ isOfficeInitialized }: AppProps) {
  if (!isOfficeInitialized) {
    return <div>Please sideload your addin to see app body.</div>;
  }

  return (
    <div className="flex">
      <div className="flex-none">
        <h1 className="">Hero Word !</h1>
      </div>

      <div className="flex-grow gap-y-5">
        <Libs />
      </div>

      <Divider inset></Divider>

      <div className="flex-grow gap-y-5">
        <Elements />
      </div>
    </div>
  );
}
