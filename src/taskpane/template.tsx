/* global Word,process */
import { v4 as uuidv4 } from "uuid";
import { fetchTemplate } from "../io";

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
    if (
      process.env.TEMPLATLES_LIB_BASE_URL &&
      process.env.TEMPLATES_LIB_PROJECT_ID &&
      process.env.TEMPLATES_LIB_ACCESS_TOKEN
    ) {
      const externalData = await fetchTemplate(
        process.env.TEMPLATLES_LIB_BASE_URL,
        process.env.TEMPLATES_LIB_PROJECT_ID,
        process.env.TEMPLATES_LIB_ACCESS_TOKEN,
        "Hero Word.docx",
      );

      const externalDoc = context.application.createDocument(externalData);
      await context.sync();

      const externalDocBody = externalDoc.body;
      externalDocBody.load("text");
      await context.sync();

      const externalDocBodyText = externalDocBody.text;
      const currentDocBody = context.document.body;
      currentDocBody.insertText(externalDocBodyText, Word.InsertLocation.start);
    }
    await context.sync();
  });
}
