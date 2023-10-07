export class Lib {
  private _id: string;
  private _desc: string;
  private _path: string;
  private _name: string;
  private doc: Word.DocumentCreated;

  constructor(id: string, name: string, desc: string, path: string, doc: Word.DocumentCreated) {
    this._id = id;
    this._desc = desc;
    this._path = path;
    this._name = name;
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
}
