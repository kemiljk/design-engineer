import { MousePointer } from "./mouse-pointer";

export default function PageTitle() {
  return (
    <h1 className="flex flex-col items-center justify-center gap-2 text-foreground md:flex-row md:gap-4">
      <div className="relative border-2 border-foreground p-2 md:border-4 md:p-4">
        <span className="font-serif text-4xl font-bold italic tracking-tight md:text-5xl lg:text-7xl">
          design
        </span>
        <MousePointer />
      </div>
      <span className="hidden text-5xl md:block lg:text-7xl">&times;</span>
      <div className="flex items-center">
        <span className="font-mono text-4xl font-semibold tracking-tighter md:text-5xl lg:text-7xl">
          {`<`}
        </span>
        <span className="text-swiss-red font-mono text-4xl font-semibold tracking-tighter md:text-5xl lg:text-7xl">
          Engineer
        </span>
        <span className="font-mono text-4xl font-semibold tracking-tighter md:text-5xl lg:text-7xl">
          {` />`}
        </span>
      </div>
    </h1>
  );
}
