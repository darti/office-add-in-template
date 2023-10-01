/* global Word */
import { v4 as uuidv4 } from "uuid";

import { fetch } from "cross-fetch";

export async function generateTemplate() {
  await Word.run(async (context) => {
    const range = context.document.getSelection();

    // context.application.toJSON();

    const idLabel = range.insertText("Id", Word.InsertLocation.before);
    idLabel.styleBuiltIn = Word.BuiltInStyleName.heading2;

    idLabel.insertBreak(Word.BreakType.line, "After");

    const idControl = range.insertContentControl();
    idControl.styleBuiltIn = Word.BuiltInStyleName.normal;

    idControl.title = "ID";
    idControl.tag = "ID";
    idControl.appearance = Word.ContentControlAppearance.boundingBox;

    idControl.insertText(uuidv4(), Word.InsertLocation.replace);

    idControl.cannotEdit = true;
    idControl.cannotDelete = false;
    idControl.font.bold = false;

    context.application.openDocument("/Users/matthieudartiguenave/Projects/office/hello-word/templates/Simple.docx");

    await context.sync();
  });
}

export async function importDocument() {
  await Word.run(async (context) => {
    fetch("https://localhost:8080/templates/Simple.docx", {
      mode: "cors",
    });
    // const reader = new FileReader();

    // reader.onload = () => {np
    //   // Remove the metadata before the Base64-encoded string.
    //   //   const startIndex = reader.result.toString().indexOf("base64,");
    //   //   const externalDocument = reader.result.toString().substr(startIndex + 7);
    // };

    // reader.readAsDataURL("/Users/matthieudartiguenave/Projects/office/hello-word/templates/Simple.docx");

    await context.sync();
  });
}
