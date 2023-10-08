export class LibElement {
  private _id: string;
  private _name: string;
  private _content: string;
  private _html: string;
  private _ooxml: string;

  constructor(id: string, name: string, content: string, html: string, ooxml: string) {
    this._id = id;
    this._name = name;
    this._content = content;
    this._html = html;
    this._ooxml = ooxml;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get html(): string {
    return this._html;
  }

  get ooxml(): string {
    return this._ooxml;
  }

  get content(): string {
    return this._content;
  }
}

export class Lib {
  private _id: string;
  private _desc: string;
  private _path: string;
  private _name: string;
  private _elements: LibElement[];
  private doc: Word.DocumentCreated;

  constructor(id: string, name: string, desc: string, path: string, elements: LibElement[], doc: Word.DocumentCreated) {
    this._id = id;
    this._desc = desc;
    this._path = path;
    this._name = name;
    this._elements = elements;
    this.doc = doc;
  }

  get id(): string {
    return this._id;
  }

  get desc(): string {
    return this._desc;
  }

  get path(): string {
    return this._path;
  }

  get name(): string {
    return this._name;
  }

  get elements(): LibElement[] {
    return this._elements;
  }
}
