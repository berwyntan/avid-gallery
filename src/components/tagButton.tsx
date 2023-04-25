import { api } from "~/utils/api";

const TagButton = (props: { tag: string }) => {
  if (props.tag === "All") {
    // call something else
  }

  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20">
        <div className="font-semibold">{props.tag}</div>
      </div>
    </>
  );
};

export default TagButton;
