import React, {useState, useEffect} from 'react'
import '../App.css'
import ReactPaginate from "react-paginate"
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom"

export default function Gallery () {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const PER_PAGE = 16;
  const offset = currentPage * PER_PAGE;
  const currentPageData = data.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(data.length / PER_PAGE);

  useEffect(() => {
    fetchData();
  }, []);
  function fetchData() {
    fetch('https://jsonplaceholder.typicode.com/albums/')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0,0);
  }

  return (
    <div className="galleryWrapper">
      <h1>All Image Albums</h1>
      <p className="black-text" style={{ textAlign: 'center' }}>{data.length} albums in total</p>
      <div className="cardWrapper">
        {currentPageData.map((album)=>(
          <div key={album.id} className="imageCard">
            <h3 style={{ textAlign: 'center'}}><Link to={`/album/${album.id}`}>{album.title}</Link></h3>
          </div>
        ))}
      </div>
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
  );
}