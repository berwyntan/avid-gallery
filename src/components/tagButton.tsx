import Link from "next/link";

const TagButton = () => {
  return (
    <>
      <Link
        className="flex flex-col gap-4 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
        href="https://create.t3.gg/en/usage/first-steps"
        target="_blank"
      >
        <div className="font-semibold">All</div>
      </Link>
    </>
  );
};

export default TagButton;
