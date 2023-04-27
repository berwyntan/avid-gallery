import { Images } from "@prisma/client";

const Images = (props: { getAll: Images[] }) => {
  return (
    <>
      {props.getAll.map((p) => {
        return (
          <div className="w-4/12 md:w-3/12 lg:w-1/5" key={p.seq}>
            <img src={p.imgurl} className="aspect-[3/4] object-cover p-1" />
          </div>
        );
      })}
    </>
  );
};

export default Images;
