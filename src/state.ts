export class Lib {
  private _path: string;
  private _name: string;
  private doc: Word.DocumentCreated;

  constructor(name: string, path: string, doc: Word.DocumentCreated) {
    this._path = path;
    this._name = name;
    this.doc = doc;
  }

  get path(): string {
    return this._path;
  }

  get name(): string {
    return this._name;
  }
}
