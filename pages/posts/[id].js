import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import kaminari from "../../public/images/kaminari.png";
import { TwitterShareButton } from "react-share";

const SiteUrl = "https://next-js-tutorial-azure.vercel.app/";
const ImgSrc = `${SiteUrl}${kaminari.src}`;
const hashtags = ["心の戦闘力診断"];
console.log(kaminari.src);

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.contentHtml} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content={ImgSrc} />
        <meta name="twitter:image" content={ImgSrc} />
        <meta property="og:url" content={SiteUrl} />
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <TwitterShareButton
        title={postData.title}
        url={SiteUrl}
        hashtags={hashtags}
        style={{
          background: "#359BF0",
          borderRadius: 5,
          padding: "3px",
        }}
      >
        <span
          style={{
            color: "white",
            fontFamily: "sans-serif",
          }}
        >
          ツイート
        </span>
      </TwitterShareButton>
    </Layout>
  );
}

//next.jsが用意している特別なメソッド。サーバーサイドで動いている
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
