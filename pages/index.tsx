import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData, Post } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

interface Props {
  allPostsData: Post[]
}

const Home: React.FC<Props> = ({ allPostsData }: Props) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>ハロー コニチハ!</p>
        <p>
          このページは
          <a href='https://nextjs.org/learn'>Next.jsチュートリアル</a>
          に沿って作ったプロフィールページです
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

// このページにはいくつかのデータ依存関係があります。
// したがって、ビルド時にこのページを事前レンダリングするときは、必ず最初にそれらを解決してください！
export async function getStaticProps() {
  const allPostsData: Post[] = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

export default Home
