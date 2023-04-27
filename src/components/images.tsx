import { Images } from "@prisma/client";
import Link from "next/link";

const Images = (props: { getAll: Images[] }) => {
  if (props.getAll.length === 0) {
    return (
      <>
        <h3 className="text-white">No images found.</h3>
      </>
    );
  }

  return (
    <>
      {props.getAll.map((p) => {
        return (
          <>
            <div
              className="w-4/12 cursor-pointer hover:bg-[hsl(194,62%,58%)] hover:bg-opacity-50 md:w-3/12 lg:w-1/5"
              key={p.seq}
            >
              <Link href={`/post/${p.id}`}>
                <img
                  src={p.imgurl}
                  className="aspect-[3/4] object-cover p-1"
                  alt={p.insta}
                />
              </Link>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Images;
