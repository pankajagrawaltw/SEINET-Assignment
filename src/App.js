import './App.css';
import React, {useEffect, useState} from 'react';
import Article from './components/article'
import InfiniteScroll from "react-infinite-scroll-component";
import moment from 'moment';

function App() {

  const [articles, setArticles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [currentDate, setDate] = useState(moment('2020-09-01').format('YYYY-MM-DD'));
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchBooks(currentDate);
  }, [])

  const fetchBooks = (date) => {
    fetch(`https://api.nytimes.com/svc/books/v3/lists/${date}/hardcover-fiction.json?api-key=r59ysrSMgCFM13hOGEGQ0xPYu733e9tO`)
      .then(res => res.json())
      .then(
        (result) => {
          if(result.status === "OK") {
            setIsLoaded(true);
            setArticles([...articles,...result.results.books]);
          } else if(result.status === "ERROR") {
            setIsLoaded(true);
            setError(result.errors[0]);
          } else {
            setIsLoaded(true);
            setError("Something went wrong, please try again later");
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  const fetchMoreData = () => {
    let newDate = moment(currentDate).add(7,'days').format('YYYY-MM-DD');
    if(newDate > moment().format('YYYY-MM-DD')) {
      setHasMore(false)
      return;
    }
    setDate(newDate)
    fetchBooks(newDate);
  };

  return (
    <div className="App">
      <section className="card-box my-4 ">
        <h1>Best sellers list</h1>
        <div className="container mt-4">
          {error ? <div>{error}</div> : 
            isLoaded ?
            <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<p>Fetching more data...</p>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <div className="row m-0">
                {articles.map((article,index) => {
                  return <Article 
                            key={index}
                            title={article.title}
                            rank={article.rank}
                            publisher={article.publisher}
                            imgUrl={article.book_image}
                            buyLink={article.amazon_product_url} 
                            author={article.author}
                            rank_last_week={article.rank_last_week}
                          />
                })}
              </div>
            </InfiniteScroll>
          : "Loading"}
        </div>
      </section>
    </div>
  );
}

export default App;
