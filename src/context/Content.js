import React, {useState, useEffect} from 'react'
import '../App.css'

export function GetAlbum ( id ) {
  const [album, setAlbum] = useState([])

    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`)
    .then((response) => response.json())
    .then((json) => {
      setAlbum(json)
    });
  return ( {album} )
}

export function GetUsers () {
  const [users, setUsers] = useState([])

    fetch(`https://jsonplaceholder.typicode.com/users/`)
    .then((response) => response.json())
    .then((json) => {
      setUsers(json)
    });
  return ( {users} )
}