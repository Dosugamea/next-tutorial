import { GetStaticProps } from 'next'
import Layout from '../../components/layout'
import { Article, getAllPostIds, getPostData } from '../../lib/posts'
import { ParsedUrlQuery } from 'node:querystring'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

interface Props {
  postData: Article
}

const Post = ({ postData }: Props) => (
  <Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
    <article>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  </Layout>
)

// URLパス等を取得する関数
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

interface Params extends ParsedUrlQuery {
  id: string
}

// サーバー側生成関数
export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const postData = await getPostData(params!.id)
  return {
    props: {
      postData,
    },
  }
}

export default Post
