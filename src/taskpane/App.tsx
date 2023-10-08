import Libs from "./components/Libs";

import { Button, Divider } from "@fluentui/react-components";

import { loadLibs } from "../io";
import { AddSquareRegular, ArrowClockwiseRegular, NewRegular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import { Lib, LibElement } from "../state";
import { addElement, initLib } from "../libs";

export interface AppProps {
  isOfficeInitialized: boolean;
}

export default function App({ isOfficeInitialized }: AppProps) {
  if (!isOfficeInitialized) {
    return <div>Please sideload your addin to see app body.</div>;
  }

  const [libs, setLibs] = useState<Array<Lib>>([]);

  const load = async () => {
    initializeLibs().then((ls) => {
      setLibs(ls);
    });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="flex flex-col m-5">
      <div className="flex-none prose">
        <h1>Welcome</h1>
        <em>Getting started</em>
        <Button icon={<ArrowClockwiseRegular fontSize={16} />} onClick={load}>
          Load libraries
        </Button>

        <Button icon={<NewRegular fontSize={16} />} onClick={initLib}>
          New library
        </Button>
        <Button icon={<AddSquareRegular fontSize={16} />} onClick={addElement}>
          Add element
        </Button>
      </div>
      <div className="flex-none my-5">
        <Divider inset></Divider>
      </div>

      <div className="flex-grow">
        <Libs libs={libs} />{" "}
      </div>
    </div>
  );
}

async function initializeLibs(): Promise<Lib[]> {
  const libs: Lib[] = [];

  await Word.run(async (context) => {
    const ls = await loadLibs();

    for (const l of ls) {
      console.log(l.path);

      const doc = context.application.createDocument(l.data);
      await context.sync();

      console.info(`Lib ${l.path}: doc loaded`);

      const contentControls = doc.contentControls;
      contentControls.load("items");
      await context.sync();

      console.info(`Lib ${l.path} controls loaded`);

      const title = contentControls.getByTag("lib_name").getFirstOrNullObject();
      const id = contentControls.getByTag("lib_id").getFirstOrNullObject();
      const desc = contentControls.getByTag("lib_desc").getFirstOrNullObject();

      title.load("text");
      id.load("text");
      desc.load("text");

      const elts = contentControls.getByTag("element");
      elts.load("items");
      elts.load("length");

      await context.sync();

      const elements = [];

      for (const elt of elts.items) {
        // elt.contentControls.load("items");

        const content = elt.contentControls.getByTag("elt_content").getFirstOrNullObject();
        const e = {
          name: elt.contentControls.getByTag("elt_name").getFirstOrNullObject(),
          id: elt.contentControls.getByTag("elt_id").getFirstOrNullObject(),
          content: content,
          html: content.getHtml(),
          ooxml: content.getOoxml(),
        };

        elements.push(e);

        e.name.load();
        e.id.load();
        e.content.load();

        await context.sync();
      }

      await context.sync();

      const libElements: LibElement[] = [];

      for (const elt of elements) {
        try {
          libElements.push(
            new LibElement(elt.id.text, elt.name.text, elt.content.text, elt.html.value, elt.ooxml.value),
          );
        } catch (e) {
          console.warn(e);
        }
      }

      libs.push(new Lib(id.text, title.text, desc.text, l.path, libElements, doc));

      console.info(`Loaded lib ${title.text} (${id.text}) with ${elts.items.length} elements}`);
    }
  });

  return libs;
}
