import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import Table from 'react-bootstrap/Table';
import '../index.css';
import Cookies from 'js-cookie';

function List() {

  const [coinData, setCoinData] = useState([]);
  const [cookie] = useCookies(['token', 'loggedIn']);
  const [loading, setLoading] = useState(''); 

  useEffect(() => {
    setLoading(true);
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true")
      .then( res => res.json())
      .then( data => {
        setCoinData(data);
      })
      .catch(error =>  console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //console.log('this is the set and fetched coinData ', coinData)

  if (loading) {
    return <p>Data is loading...</p>;
  }

  const saveFunc = (e) => {
    
    let coinInfo = JSON.stringify({
      id: e.target.id,
      user: cookie.token
    });

    console.log('target is ', e.target.id)
    console.log('cookie.token is ', cookie.token)
    console.log('coinInfo is ', coinInfo)

    fetch('http://localhost:9000/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: coinInfo
    })
    .then((res) => res.json())
    .then(data => {
      console.log(data)
      alert(data.msg)
    })
    .catch(error => console.log(error));

  };
  
  return (
    <div>
      <Table striped bordered hover variant="dark">
        <tbody>
          <tr style={{color: 'Purple'}}>
            { cookie.loggedIn && <th>    </th> }
            <th>Rank</th>
            <th>    </th>
            <th>ID</th>
            <th>    </th>
            <th>Name</th>
            <th>    </th>
            <th>Symbol</th>
            <th>    </th>
            <th>Price</th>
            <th>    </th>
            <th>24H %Change</th>
          </tr>
          {coinData.map( coin => (
            <tr className='data' key={coin.id}>
              { cookie.loggedIn && 
                <td 
                className='addCoin' 
                id={coin.id} 
                onClick={saveFunc} 
                style={{textAlign: 'center'}}>
                  <FontAwesomeIcon icon={faPlusSquare} style={{ color: 'LimeGreen'}}/>
              </td>}
              <td>{coin.market_cap_rank}</td>
              <td>    </td>
              <td>{coin.id}</td>
              <td>    </td>
              <td>{coin.name}</td>
              <td>    </td>
              <td>{coin.symbol}</td>
              <td>  $  </td>
              <td>{coin.current_price.toFixed(2)}</td>
              <td>    </td>
              <td>{coin.price_change_percentage_24h.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default List;

  // const columns = [
  //   {title: 'market_cap_rank', field: 'Rank'},
  //   {title: 'id', field: 'ID'},
  //   {title: 'name', field: 'Name'},
  //   {title: 'symbol', field: 'Symbol'},
  //   {title: 'current_price', field: 'Current Price'},
  //   {title: 'image', field: 'Image'},
  //   {title: 'sparkline_in_7d', field: '7 Day Sparkline'},
  //   {title: 'price_change_24h', field: 'Price Change'},
  // ]

// useEffect(() => {
//   setLoading(true);
//   fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true')
//     .then((res) => res.json())
//     .then((data) => {
//       setData(data);
//       console.log('this is the set and fetched data ', data)
//     })
//     .catch((err) => {
//       setError(err);
//     })
//     .finally(() => {
//       setLoading(false);
//     });
// }, []);

// function List() {

//   let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true';
  
//   const [coins, setCoins] = useState([]);



//   useEffect(() => {
//     fetch(url)
//     .then((response) => response.json())
//     .then((json) => setCoins(json))
//   }, [url])
  

//   console.log('this is fetched and set data', coins);



//   return (
//       <MaterialTable
//         title='Coin List'
//         keyField='id' 
//         data={ coins }
//         columns={ columns }
//       />
//   )
// }

// export default List;


// {/* <table>
//         <tbody>
//           <tr>
//             <th>COIN</th>
//             <th>    </th>
//             <th>PRICE</th>
//             <th>    </th>
//             <th>24H %CHANGE</th>
//           </tr>
//           {coinData.map ( coin => (
//             <tr key={coin.id}>
//               <td>{coin.name}</td>
//               <td>    </td>
//               <td>{coin.current_price}</td>
//               <td>    </td>
//               <td>{coin.market_cap_change_percentage_24h}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table> */}



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
  
 