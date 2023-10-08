import { Lib as LibModel, LibElement as LibElementModel } from "../../state";

import { useMemo } from "react";
import DOMPurify from "dompurify";

export interface LibsProps {
  libs: LibModel[];
}

export default function Libs({ libs }: LibsProps) {
  return (
    <div className="h-full w-full flex flex-col prose">
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
    <div className="flex-none">
      <h3>{lib.name}</h3>
      <p>{lib.desc}</p>

      <div>
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

  console.log(JSON.stringify(html_content, null, 2));

  return (
    <div className="flex-none prose">
      <h4>{element.name}</h4>
      <p>{element.content}</p>
      <div dangerouslySetInnerHTML={html_content}></div>
    </div>
  );
}
