import { Lib as LibModel, LibElement as LibElementModel } from "../../state";

import { useMemo } from "react";
import DOMPurify from "dompurify";
import { Body1, Button, Card, CardFooter, CardHeader, CardPreview } from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";

export interface LibsProps {
  libs: LibModel[];
}

export default function Libs({ libs }: LibsProps) {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-none">
        <h2>Libraries</h2>
        Manage components libraries
      </div>

      {libs.map((l) => (
        <Lib key={l.id} lib={l} />
      ))}
    </div>
  );
}

interface LibProps {
  lib: LibModel;
}

function Lib({ lib }: LibProps) {
  return (
    <div className="flex-grow flex flex-col">
      <h3 className="flex-none">{lib.name}</h3>
      <p className="flex-none">{lib.desc}</p>

      <div className="flex flex-col gap-y-5 overflow-y-auto">
        {lib.elements.map((e) => (
          <LibElement key={e.id} element={e} />
        ))}
      </div>
    </div>
  );
}

interface LibElementProps {
  element: LibElementModel;
}

function LibElement({ element }: LibElementProps) {
  const html_content = useMemo(() => ({ __html: DOMPurify.sanitize(element.html) }), [element.html]);

  const insert = async () => {
    await Word.run(async (context) => {
      const range = context.document.getSelection();
      // range.insertHtml(element.html, Word.InsertLocation.replace);
      range.insertOoxml(element.ooxml, Word.InsertLocation.replace);
      await context.sync();
    });
  };

  return (
    <Card className="flex-none" appearance="outline">
      <CardHeader
        header={
          <Body1>
            <b>{element.name}</b>
          </Body1>
        }
      />
      <CardPreview>
        <div className="bg-neutral-50 p-5 prose" dangerouslySetInnerHTML={html_content}></div>
      </CardPreview>
      <CardFooter>
        <Button icon={<AddRegular fontSize={16} />} onClick={insert}>
          Insert
        </Button>
      </CardFooter>
    </Card>
  );
}
