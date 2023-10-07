import { Lib } from "../../state";

export interface LibsProps {
  libs: Lib[];
}

export default function Libs({ libs }: LibsProps) {
  return (
    <div className="h-full w-full flex flex-col prose">
      <div className="flex-none">
        <h2>Libraries</h2>
        Manage components libraries
      </div>

      {libs.map((l) => (
        <div key={l.id} className="flex-none">
          <h3>{l.name}</h3>
          <p>{l.desc}</p>
        </div>
      ))}
    </div>
  );
}
