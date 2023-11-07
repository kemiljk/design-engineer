import { MousePointer } from "./mouse-pointer";

export default function PageTitle() {
  return (
    <h1 className="flex items-center justify-center gap-4 text-slate-700 dark:text-slate-300">
      <div className="relative rounded border-2 border-dashed border-slate-400 p-2 dark:border-slate-600 lg:border-4 lg:p-4">
        <span className="bg-gradient-to-b from-slate-400 to-slate-950 bg-clip-text font-serif text-3xl font-bold italic tracking-tight text-transparent dark:from-white dark:to-slate-500 md:text-5xl lg:text-7xl">
          design
        </span>
        <MousePointer />
      </div>
      <span className="text-lg md:text-5xl lg:text-7xl">&times;</span>
      <div>
        <span className="font-mono text-3xl font-semibold tracking-tighter md:text-5xl lg:text-7xl">
          {`<`}
        </span>
        <span className="font-mono text-3xl font-semibold tracking-tighter text-lime-600 dark:text-lime-500 md:text-5xl lg:text-7xl">
          Engineer
        </span>
        <span className="font-mono text-3xl font-semibold tracking-tighter md:text-5xl lg:text-7xl">
          {` />`}
        </span>
      </div>
    </h1>
  );
}
