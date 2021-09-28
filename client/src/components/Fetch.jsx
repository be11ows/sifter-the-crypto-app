import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {

  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    axios.get(url)
    .then((res) => {
      setFetchData(res.data)
      // console.log('res.data is ', res.data)
    })
  }, [url]);

  // useEffect(() => {
  //   fetch(url)
  //   .then(res => res.json())
  //   .then((data) => {
  //     console.log('This is coin data in fetch', data);
  //     return setFetchData(data)
  //   })
  // }, [url]);

  // console.log('this is get data', fetchData)

  return( 
    fetchData
  )
};

export default useFetch;