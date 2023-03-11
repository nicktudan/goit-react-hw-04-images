import { useState, useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';
import * as Scroll from 'react-scroll';

import { fetchImages } from '..//services/API';
import Searchbar from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Button } from './Button/Button';

import { GlobalStyle } from "./GlobalStyle";
import { Layout } from "./Layout";


const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  EMPTY: 'empty',
};


export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [image, setImage] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const scroll = useRef(() => Scroll.animateScroll.scrollMore(600));

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus(Status.PENDING);

    async function getImages(query, page) {
      try {
        const { hits, totalHits } = await fetchImages(query, page);

        if (hits.length === 0) {
          setStatus(Status.EMPTY);
        }

        setImage(prevState => [...prevState, ...hits]);
        setShowLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setStatus(Status.REJECTED);
      } finally {
        setStatus(Status.RESOLVED);
      }
    }
    getImages(query, page);
  }, [query, page]);


  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImage([]);
  };

  const handleOnClick = () => {
    setPage(prevState => (prevState + 1));
    scroll.current();
  };


  return (
    <Layout>
      <GlobalStyle />
      <Searchbar onSubmit={handleFormSubmit} />
      {status === Status.IDLE && (
        <p>Please enter your query in the search field.</p>
      )}

      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED &&
        toast.error('Sorry, something went wrong. Please, try again')}

      <ImageGallery image={image} />

      {showLoadMore && <Button onClick={handleOnClick} />}
      <ToastContainer
        autoClose={2000}
        style={{ width: '400px', fontSize: '16px' }}
      />
    </Layout>
  );
};