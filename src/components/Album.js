import React, {useState, useEffect} from 'react'
import '../App.css'
import ReactPaginate from "react-paginate"
import {
  BrowserRouter as Router,
  Link, useParams
} from "react-router-dom"

export default function Album () {
  const id = useParams().id
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [album, setAlbum] = useState([]);
  const PER_PAGE = 16;
  const offset = currentPage * PER_PAGE;
  const currentPageData = data.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(data.length / PER_PAGE);

  useEffect(() => {
    fetchData();
  }, []);
  function fetchData() {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (imageData) {
      setData(imageData)
      return fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
    })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (albumData) {
      setAlbum(albumData)
    })
    .catch(function (error) {
      console.warn(error);
    });
  }

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0,0);
  }

  return (
    <div className="galleryWrapper">
      <Link to={'/'}>
        <button className="btn">Back to album listing</button>
      </Link>
      <h1>Image Album</h1>
      <h2 style={{ marginTop: 0, textAlign: 'center' }}>Title: {album.title}</h2>
      <p className="black-text" style={{ textAlign: 'center' }}>{data.length} images in total</p>
      <div className="cardWrapper">
        {currentPageData.map((image)=>(
          <div key={image.id} className="imageCard">
            <div className="imageCardBg" style={{ backgroundImage: `url(${image.thumbnailUrl})`}}></div>
            <Link to={`/image/${image.id}`}><h3>{image.title}</h3></Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </div>
    </div>
  );
}