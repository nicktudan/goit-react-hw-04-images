import { Component } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import * as Scroll from 'react-scroll';

import { fetchImages } from '..//services/API';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Button } from './Button/Button';

import { GlobalStyle } from "./GlobalStyle";
import { Layout } from "./Layout";

const scroll = Scroll.animateScroll;

export class App extends Component {
  state={
    query: '',
    page: 1,
    image: [],
    status: 'idle',
    showLoadMore: false,
  }

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = prevState;
    const nextQuery = this.state.query;
    const nextPage = this.state.page;


    if(query !== nextQuery || page !== nextPage) {

        this.setState({status: 'pending'});

        try {
            const { hits, totalHits } = await fetchImages(nextQuery, nextPage);

            if(hits.length === 0) {
              this.setState({ status: 'idel' });
            }

            this.setState(prevState=>({ image: [...prevState.image, ...hits],
            showLoadMore: this.state.page < Math.ceil(totalHits / 12)
            })) 
        } catch (error) {
            this.setState({ status: 'rejected' });
        } finally {
          this.setState({ status: 'resolved' });
        }
    }
}

  handleFormSubmit = query =>{
    this.setState({ query: query,
    page: 1,
    image: [], });
  };

  handleOnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1, }));
    scroll.scrollMore(300);
  }


  render(){
    const {status, image, showLoadMore} = this.state;

    return (
      <Layout>
        <GlobalStyle />

        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === 'idel' && toast.error('No results were found for your request')}
        
        {status === 'pending' && <Loader />}

        {status === 'rejected' && toast.error('Sorry, something went wrong. Please, try again')}
        
        {/* {status === 'resolved' && <ImageGallery image={image} />} */}
        <ImageGallery image={image} />
        
        {showLoadMore && <Button onClick={this.handleOnClick} />}

        <ToastContainer autoClose={2000} style = { { width : "400px", fontSize: "16px" } } />
        
      </Layout>
    );
  }
};
