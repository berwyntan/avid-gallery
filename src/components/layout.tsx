import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen justify-center">
      <div className="xl:max-w-7xl h-full w-full border-slate-400 lg:max-w-5xl">
        {props.children}
      </div>
    </main>
  );
};
