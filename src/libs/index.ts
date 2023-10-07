import { v4 as uuidv4 } from "uuid";

export async function initLib() {
  await Word.run(async (context) => {
    context.document.changeTrackingMode = Word.ChangeTrackingMode.trackAll;
    await context.sync();

    const body = context.document.body;
    body.clear();

    {
      const header = body.insertText("Library name", Word.InsertLocation.end);
      header.styleBuiltIn = Word.BuiltInStyleName.title;
      // header.font.highlightColor = "yellow";
      const cc = header.insertContentControl();
      cc.title = "Library Name";
      cc.tag = "lib_name";
    }

    {
      const id = body.insertParagraph(uuidv4(), Word.InsertLocation.end);
      id.styleBuiltIn = Word.BuiltInStyleName.normal;
      // id.font.highlightColor = null;
      const cc = id.insertContentControl();
      cc.title = "Library ID";
      cc.tag = "lib_id";
      cc.appearance = "Hidden";
      cc.cannotEdit = true;
    }

    {
      const desc = body.insertParagraph("Description", Word.InsertLocation.end);
      desc.styleBuiltIn = Word.BuiltInStyleName.normal;
      desc.font.highlightColor = "";
      desc.font.italic = true;
      const cc = desc.insertContentControl();
      cc.title = "Library Description";
      cc.tag = "lib_desc";
      cc.appearance = "BoundingBox";
    }

    await context.sync();
  });
}

export async function addElement() {
  await Word.run(async (context) => {
    const range = context.document.getSelection();
    range.insertBreak(Word.BreakType.sectionContinuous, Word.InsertLocation.after);

    const element = range.insertContentControl();
    element.tag = "element";
    element.title = "Element";

    {
      const header = element.insertText("Element name", Word.InsertLocation.end);
      header.styleBuiltIn = Word.BuiltInStyleName.heading1;
      // header.font.highlightColor = "yellow";
      const cc = header.insertContentControl();
      cc.title = "Element Name";
      cc.tag = "elt_name";
    }

    {
      const id = element.insertParagraph(uuidv4(), Word.InsertLocation.end);
      id.styleBuiltIn = Word.BuiltInStyleName.normal;
      // id.font.highlightColor = null;
      const cc = id.insertContentControl();
      cc.title = "Element ID";
      cc.tag = "elt_id";
      cc.cannotEdit = true;
    }

    {
      const content = element.insertParagraph("Content", Word.InsertLocation.end);
      content.styleBuiltIn = Word.BuiltInStyleName.normal;
      // id.font.highlightColor = null;
      const cc = content.insertContentControl();
      cc.title = "Content";
      cc.tag = "elt_content";
    }

    await context.sync();
  });
}
