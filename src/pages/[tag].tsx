import { GetStaticProps, NextPage } from "next";
import Images from "~/components/images";
import TagButtonsLayout from "~/components/tagButtonsLayout";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";
import { api } from "~/utils/api";

const ImageFilteredByTag: NextPage<{ tag: string }> = ({ tag }) => {
  const { data } = api.image.findByTag.useQuery({ text: tag });

  if (!data) return <div>Something went wrong.</div>;

  const { data: allTags, isLoading: isLoading2 } = api.tag.getAll.useQuery();

  if (isLoading2) return <div>Loading...</div>;
  if (!allTags) return <div>Something went wrong</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#090016] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-6 px-1 py-12 ">
        
        <div className="flex-start flex flex-wrap gap-2 md:gap-4">
          
          <TagButtonsLayout allTags={allTags} />
        </div>
       

        <div className="flex-start mt-8 flex flex-row flex-wrap justify-center">
          <Images getAll={data} />
        </div>
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = generateSSGHelper();

  await helpers.tag.getAll.prefetch();

  const tag = context.params?.tag;

  if (typeof tag !== "string") throw new Error("no tag selected");

  await helpers.image.findByTag.prefetch({ text: tag });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      tag,
    },
    revalidate: 36000,
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ImageFilteredByTag;
