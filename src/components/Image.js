import React, {useState, useEffect} from 'react'
import '../App.css'
import { Link, useParams } from "react-router-dom"

export default function Image ( ) {
  const id = useParams().id
  const [image, setImage] = useState([])
  const [user, setUser] = useState([])
  const [album, setAlbum] = useState([])

  useEffect (() => {
    // Call the API
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (imageData) {
      setImage(imageData)
      return fetch(`https://jsonplaceholder.typicode.com/albums/${imageData.albumId}`);
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
      return fetch(`https://jsonplaceholder.typicode.com/users/${albumData.userId}`);
    })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (userData) {
      setUser(userData)
      return
    })
    .catch(function (error) {
      console.warn(error);
    });
  }, [])

  return (
    <div className="galleryWrapper">
      <Link to={`/album/${image.albumId}`}>
        <button className="btn">Back to album</button>
      </Link>
      <h1>Image</h1>
      
      <div className="imageWrapper">
        <div className="imageDiv">
          <img src={image.url} alt="" />
        </div>
        <div className="imageMeta">
          <h2>{image.title}</h2>
          <p>Album: <Link to={`/album/${image.albumId}`}>{album.title}</Link></p>
          <p>Creator: {user.name}</p>
        </div>
      </div>
    </div>
  );
}