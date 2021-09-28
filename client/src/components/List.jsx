import React, { useState, useEffect } from 'react';
import useFetch from './Fetch';

function List() {

  let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true';

  let coinData = useFetch(url);

  console.log('this is fetch data', coinData);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>COIN</th>
            <th>    </th>
            <th>PRICE</th>
            <th>    </th>
            <th>24H %CHANGE</th>
          </tr>
          {coinData.map ( coin => (
            <tr key={coin.id}>
              <td>{coin.name}</td>
              <td>    </td>
              <td>{coin.current_price}</td>
              <td>    </td>
              <td>{coin.market_cap_change_percentage_24h}</td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>
  )
}

export default List;

// const columns = [
//   {field: 'id', headerName: 'ID'},
//   {field: 'sparkline_in_7d', headerName: '7 Day Sparkline'},
//   {field: 'market_cap_rank', headerName: 'Rank'},
//   {field: 'symbol', headerName: 'Symbol'},
//   {field: 'name', headerName: 'Name'},
//   {field: 'image', headerName: 'Image'},
//   {field: 'current_price', headerName: 'Current Price'},
//   {field: 'price_change_24h', headerName: 'Price Change'},
// ]

// const List = () => {
//   console.log('inside react list')

//   fetch('http://localhost:9000/list/')
//   .then(res => {
//     return res.json()
//   })
//   .then(data => {
//     console.log(data)
//     //setCoinData(data)
//   })
//   .catch(error => console.log('error'))

//   return ( 
//     <div>
//       <h3>coin list will go here</h3>
//     </div>
//    );

// }  
// export default List;
  
  
  
  //   // 
  
 