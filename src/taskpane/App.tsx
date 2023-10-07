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
    <div className="flex flex-col m-5">
      <div className="flex-none prose">
        <h1>Welcome</h1>
        <em>Getting started</em>
      </div>
      <div className="flex-none my-5">
        <Divider inset></Divider>
      </div>

      <div className="flex-grow">
        <Libs />
      </div>

      <div className="flex-none my-5">
        <Divider inset></Divider>
      </div>

      <div className="flex-grow">
        <Elements />
      </div>
    </div>
  );
}
