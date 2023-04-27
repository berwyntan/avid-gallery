import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";
import { api } from "~/utils/api";

const SinglePost: NextPage<{ id: string }> = ({ id }) => {
  const { data, isLoading } = api.image.findById.useQuery({ text: id });
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Something went wrong.</div>;
  console.log(data);
  let prompt1 = undefined;
  let prompt2 = undefined;
  let prompt3 = undefined;
  if (data.prog === "Stable Diffusion") {
    prompt1 = data.prompt.split("Negative")[0];
    prompt2 = data.prompt.split("Negative prompt:")[1]?.split("Steps")[0];
    prompt3 = data.prompt.split("Negative")[1]?.split("Steps")[1];
  }
  console.log(prompt2);
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#090016] to-[#15162c]">
      <div className="p-2">
        <img src={data.imgurl} alt={data.insta} />
      </div>
      <div className="flex w-5/6 flex-col p-2 text-white">
        <div className="my-1 font-mono">Prompt</div>
        {data.prog === "Stable Diffusion" ? prompt1 : data.prompt}
        {data.prog === "Stable Diffusion" && (
          <div className="my-1 font-mono">Negative prompt</div>
        )}
        {data.prog === "Stable Diffusion" && prompt2 && (
          <div className="">{`${prompt2}`}</div>
        )}
        {data.prog === "Stable Diffusion" && prompt3 && (
          <div className="my-2">{`Steps${prompt3}`}</div>
        )}

        <div className="flex flex-col items-baseline my-1">
          <div className="my-1 font-mono">Program</div>
          <span className="">{data.prog}</span>
        </div>

        <div className="flex flex-col items-baseline my-1">
          <span className="font-mono">Tags</span>
          <div className="flex">
            {data.tag.map((t, idx) => {
              return <span key={idx} className="mr-1">{t}</span>;
            })}
          </div>
        </div>
        <div className="my-1"><Link href={data.insta} target="_blank">IG Logo</Link></div>
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
