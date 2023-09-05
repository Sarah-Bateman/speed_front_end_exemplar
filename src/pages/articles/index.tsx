import { GetServerSideProps } from 'next';
import SortableTable from "../../components/table/SortableTable";
import data from "../../utils/dummydata";

interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  claim: string;
  evidence: string;
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubyear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
  ];

  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <p>Page containing a table of articles:</p>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};

const getTopics = async() => {
  try {
      const res = await fetch('http://mern-back-end.vercel.app/api/books', {
          cache: 'no-store',
      });

      if(!res.ok) {
          throw new Error("Failed to fetch topics")
      }

      return res.json();
  }
  catch (error) {
      console.log("Error loading topics: ", error);
  }
}

export const getServerSideProps: GetServerSideProps<ArticlesProps> = async (_) => {

  const { topics } = await getTopics();
  console.log(topics, "Testing String");

  // Map the data to ensure all articles have consistent property names
  const articles = topics.map((article: { 
    id: any; _id: any; title: any; authors: any; source: any; pubyear: any; doi: any; claim: any; evidence: any; }) => ({
    id: article.id ?? article._id,
    title: article.title,
    authors: article.authors,
    source: article.source,
    pubyear: article.pubyear,
    doi: article.doi,
    claim: article.claim,
    evidence: article.evidence,
  }));


  return {
    props: {
      articles,
    },
  };
};

export default Articles;
