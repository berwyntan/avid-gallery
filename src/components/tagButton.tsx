import Link from "next/link";

const TagButton = (props: { tag: string }) => {
  if (props.tag === "All") {
    // call something else
  }

  return (
    <>
      <Link href={`/${props.tag}`}>
        <div className="flex cursor-pointer flex-col gap-4 rounded-lg bg-white/10 p-1 text-white hover:bg-white/20 md:p-2">
          <div className="font-bold">{props.tag}</div>
        </div>
      </Link>
    </>
  );
};

export default TagButton;
