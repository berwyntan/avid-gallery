import type { GetStaticProps, NextPage } from "next";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";
import { api } from "~/utils/api";

const SinglePost: NextPage<{ id: string }> = ({ id }) => {
  const { data, isLoading } = api.image.findById.useQuery({ text: id });
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Something went wrong.</div>;
  console.log(data)

  return (
    <div className="flex">
      <div className="">
        <img src={data.imgurl} alt={data.insta} />
      </div>
      <div className="flex flex-col w-4/6">
        <div>Prompt:</div>
        <span>{data.prompt}</span>
        <div>Created with:</div>
        <span>{data.prog}</span>
        <div className="flex">
          Tags:
          <div className="flex">{data.tag.map((t, idx)=>{
            return (
                <span key={idx}>{t}</span>
            )
          })}</div>
        </div>
        <div className="">IG</div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = generateSSGHelper();

  await helpers.tag.getAll.prefetch();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no tag selected");

  await helpers.image.findById.prefetch({ text: id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
    revalidate: 36000,
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: true };
};

export default SinglePost;
