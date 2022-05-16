import React from 'react';
import Head from 'next/head';
import Header from '../../components/header';
import Coin from '../../components/coin/index';

export const getStaticProps = async () => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const Dashboard = ({ data }) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <Header />

      <div className='d-flex flex-row flex-wrap justify-content-center'>
        {data.map((val) => {
          console.log(val);

          return (
            <div className='p-2'>
              <Coin
                key={val.id}
                name={val.name}
                price={val.current_price}
                symbol={val.symbol}
                marketcap={val.market_cap}
                volume={val.total_volume}
                image={val.image}
                priceChange={val.price_change_percentage_24h}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
