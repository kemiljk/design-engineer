import { MousePointer } from "./components/mouse-pointer";
import { Form } from "./components/waitlist-form";
import { BlurShape } from "./components/blur-shape"
import { getHome } from "@/lib/cosmic";

export default async function Home() {
  const home = await getHome();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <BlurShape />
      <div className="absolute inset-0 mx-auto w-full p-4 md:p-16 lg:max-w-5xl lg:p-24">
        <div className="grid h-full w-full place-items-center">
          <div className="flex flex-col items-center gap-10">
            <div className="flex justify-center">
              <p className="flex w-max rounded-full border border-lime-500 bg-white/50 px-2 py-1.5 text-xs font-medium leading-none text-lime-700 dark:border-lime-600 dark:bg-slate-950/25 dark:from-inherit dark:text-lime-300 md:px-4 md:py-3 md:text-base">
                {home.metadata.pill}
              </p>
            </div>
            <h1 className="flex items-center justify-center gap-4 text-slate-700 dark:text-slate-300">
              <div className="relative rounded border-2 border-dashed border-slate-400 p-2 dark:border-slate-600 lg:border-4 lg:p-4">
                <span className="font-serif text-3xl font-bold italic tracking-tight md:text-5xl lg:text-7xl">
                  design
                </span>
                <MousePointer />
              </div>
              <span className="font-mono text-3xl font-semibold tracking-tighter md:text-5xl lg:text-7xl">
                {"<Engineer />"}
              </span>
            </h1>
            <p className="mx-auto w-full text-center font-sans text-lg leading-snug tracking-tight text-slate-600 dark:text-slate-400 md:text-2xl lg:max-w-3xl lg:text-3xl">
              {home.metadata.description}
            </p>
            <Form />
          </div>
        </div>
      </div>
    </main>
  );
}
