import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex bg-[#090016]">
      <Link href="/">
        <div className="text-md mx-4 cursor-pointer font-extrabold tracking-tight text-white sm:text-[2rem]">
          ai<span className="text-[hsl(194,62%,58%)]">.avid</span> prompts
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
