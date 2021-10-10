import React, { useState, useEffect }from 'react';
import cookies from 'js-cookie';
import { useCookies } from 'react-cookie';
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import { FaRegTimesCircle } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import '../index.css';
import Footer from './Footer';

const CuratedList = () => {
    const [coinData, setCoinData] = useState([]);
    const [userCoins, setUserCoins] = useState([]);
    const [loading, setLoading] = useState('');
    const [amount, setAmount] = useState('')
    const [saveIcon, setSaveIcon] = useState(null)
    const [coinId, setCoinId] = useState('');
    const [cookie] = useCookies(['token']);
    
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

 

    let body = JSON.stringify({
      onPageLoad: true,
      token: cookie.token
    })
    //console.log('this is the body ', body)
    
    useEffect(() => {
      fetch('http://localhost:9000/curatedList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      })
      .then(res => res.json())
      .then(data => {
        //console.log('data is =====> ', data)
        setUserCoins(data);
      })
      .catch(error => console.log(error))
    }, [body])
    
    //console.log('THIS IS USERCOINS', userCoins)


  const iconAppear = (e) => {
    setAmount(e.target.value);
    setCoinId(e.target.id);
  }

  useEffect(() => {
    if(amount.length > 0) {
      setSaveIcon(true)
    } else {
      setSaveIcon(false)
    }
  }, [amount])

  // console.log('this is the save amount ', amount)


  const saveAmt = (e) => {

    console.log('coinId is', e.target.id)

    let body = {
      id: e.target.id,
      amount: amount,
      saveAmount: true,
      token: cookies.get('token')
    }

    axios.post('http://localhost:9000/curatedList', body)
    .then(res => console.log('THIS IS THE SAVE RESPONSE', res))

    window.location.reload()
  }
  
  let displayArray = [];

  userCoins.forEach(userCoin => {
    for(let coinName in userCoin) {
        coinData.forEach(coin => {
            if(coinName === coin.id) {
                displayArray.push(coin)
            }
        }) 
    }
  })

  //console.log('this is the userCoins ', userCoins);

  
  
  const deleteFunc = (e) => {
    
    console.log('inside the delete func')
    
    
    let deleteBody = JSON.stringify({
      coinId: e.target.id,
      delete: 'true',
      token: cookie.token
    });
    
    
    fetch('http://localhost:9000/curatedList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: deleteBody
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('data is ====> ', data)
      setUserCoins(data.result);
      alert(data.msg)
    })
    .catch(error => console.log(error));
  };
  
  if (loading) {
    return <p>Data is loading...</p>;
  }

    
  let displayAmount;
  let grandTotal;

  function coinAmount(coinName) {
    userCoins.forEach(coin => {
      for(let key in coin){
        if(key === coinName) {
          displayAmount = coin[coinName]; 
          //   *************  COIN AMOUNT SAVED TO DISPLAY  *************
          //console.log('this ought to be the amount populating the input field ', displayAmount)
          return(displayAmount);         
        }
      }
    })
  }
 
  // RETURNING THE SAME VALUE AS ABOVE * COIN.CURRENT_PRICE = $ TOTAL

    function coinTotal(coinName) {
            
      let currentPrice;
      let amountSaved = displayAmount;
      //console.log('this is the displyAmount from the coinAmount func ', amountSaved);
      
      let displayAmount2;
      grandTotal = 0;

      displayArray.forEach(coin => {
        for(let key in coin){
          //console.log('key is ', key, 'and coinName is ', coinName);
          if(key === 'current_price') {
            currentPrice = +coin.current_price;
            // console.log('this is currentPrice ', currentPrice)
            // console.log('this is amountSaved ', amountSaved)
            displayAmount2 = currentPrice * +amountSaved;
            grandTotal += +displayAmount2
            //   *************  COIN TOTAL TO DISPLAY  *************
            //console.log('coinTotal result is ', +displayAmount2.toFixed(2))
            return(+displayAmount2.toFixed(2))
          }
        }
      }) 
      //   *************  GRAND TOTAL TO DISPLAY  *************
      console.log('this is the portfolio grandTotal ', grandTotal.toFixed(2));
    }
    

  return ( 
    <div>
      <div className='container'>
        <h1>CuratedList Page</h1>
        { grandTotal && <h2>`${grandTotal}`</h2>}
      </div>

      <div>
      <Table striped bordered hover variant="dark">
        <tbody>
          <tr style={{color: 'Purple'}}>
            {/* <td></td> */}
            <th>ID</th>
            <th>    </th>
            <th>Amount</th>
            <th>    </th>   
            <th>Name</th>
            <th>    </th>
            <th>Total</th>
            <th>    </th>
            <th>Symbol</th>
            <th>    </th>
            <th>Price</th>
            <th>    </th>
            <th>24H %Change</th>
            <th>    </th>
          </tr>
          {displayArray.map( coin => (
            
            <tr className='data' key={coin.id}>
              <td>{coin.id}</td>
              <td>    </td>
              <td><input 
                    id={coin.id} 
                    className='input' 
                    onChange={iconAppear}
                    value={coinAmount(coin.id)} />
                    {saveIcon && coinId === coin.id &&
                      <td><FaRegSave 
                            id={coin.id} 
                            onClick={saveAmt} 
                            className='saveAmount' /></td> }
              </td>
              <td>    </td>
              <td><img 
                    src={coin.image} 
                    alt='' 
                    className='logo' />{coin.name}</td>
              <td>    </td>
              <td>{coinTotal(coin.id)}</td>
              <td>    </td>
              <td>{coin.symbol}</td>
              <td>  $  </td>
              <td>{coin.current_price.toFixed(2)}</td>
              <td>    </td>
              <td>{coin.price_change_percentage_24h.toFixed(2)}%</td>
              <td className='delCoin' onClick={deleteFunc} id={coin.id} style={{textAlign: 'center'}}><FaRegTimesCircle style={{ color: 'red'}}/></td>
            </tr>
          ))}
        </tbody>
      </Table>            
      </div>
      <Footer />
    </div>
   );                 
}
 
export default CuratedList;       