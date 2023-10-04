import Libs from "./components/Libs";
import Elements from "./components/Elements";

export interface AppProps {
  isOfficeInitialized: boolean;
}

export default function App({ isOfficeInitialized }: AppProps) {
  if (!isOfficeInitialized) {
    return <div>Please sideload your addin to see app body.</div>;
  }

  return (
    <div className="ms-welcome">
      <section className="ms-welcome__header ms-bgColor-neutralLighter ms-u-fadeIn500">
        <h1 className="ms-fontSize-su ms-fontWeight-light ms-fontColor-neutralPrimary">Hero Word !</h1>
      </section>

      <main className="ms-welcome__main">
        <Libs />
        <Elements />
      </main>
    </div>
  );
}
