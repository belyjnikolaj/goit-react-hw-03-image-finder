import React, { Component } from 'react';
import { animateScroll } from 'react-scroll';
import Notiflix from 'notiflix';
import fetchImages from "services/fetchImages.js";
import Loader from 'components/loader';
import Button from "components/button";
import ImageGalleryItem from "components/imageGalleryItem";
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    data: [],
    isLoading: false,
    error: null,
    page: 1,
    searchText: ''
  };

  componentDidMount() {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      this.setState({ page: parseInt(savedPage) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchText !== this.props.searchText) {
      const { searchText } = this.props;
      this.setState({ searchText, isLoading: true, error: null, page: 1 }, () => {
        this.fetchImages(searchText, 1);
      });
    }

    if (prevState.page !== this.state.page) {
      localStorage.setItem("currentPage", this.state.page);
    }
  }

  componentWillUnmount() {
    localStorage.removeItem("currentPage");
  }

  fetchImages = async (searchText, page) => {
    try {
      const data = await fetchImages(searchText, page);

      if (!data.hits || data.hits.length === 0) {
        throw new Error('No results found.');
      }

      this.setState(prevState => ({
        data: prevState.page === 1 ? data.hits : [...prevState.data, ...data.hits],
        isLoading: false
      }));

      animateScroll.scrollToBottom({
        duration: 500,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure(
        'An error occurred while fetching images. Please try again later.'
      );
      this.setState({ error: 'An error occurred while fetching images.', isLoading: false });
    }
  };

  handlePageChange = () => {
    const { searchText, page } = this.state;
    const nextPage = page + 1;

    this.setState({ isLoading: true }, () => {
      this.fetchImages(searchText, nextPage);
      this.setState({ page: nextPage });
    });
  };

  render() {
    const { data, isLoading } = this.state;

    return (
      <>
        <ul className={css.gallery}>
          {data.map(el => (
            <ImageGalleryItem
              key={el.id}
              imageUrl={el.webformatURL}
              alt={el.tags}
              largeImageURL={el.largeImageURL}
            />
          ))}
        </ul>
        <div className={css['container-center']}>
          {isLoading && <Loader />}
          {data.length > 0 && <Button handlePageChange={this.handlePageChange} />}
        </div>
      </>
    );
  }
}

export default ImageGallery;
