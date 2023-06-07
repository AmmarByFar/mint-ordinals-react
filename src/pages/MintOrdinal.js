import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MintOrdinalPage() {
  const [buttonText, setButtonText] = useState('Connect');
  const [walletConnected, setWalletConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [feeRate, setFeeRate] = useState('');
  const [ordinalsCount, setOrdinalsCount] = useState('');

  useEffect(() => {
    if (feeRate && ordinalsCount) {
      const expectedAmount = (5600 / 4) * feeRate * ordinalsCount;
      console.log('Expected Amount:', expectedAmount);
    }
  }, [feeRate, ordinalsCount]);

  const connectWallet = async () => {
    try {
      let accounts = await window.unisat.requestAccounts();
      setAccounts(accounts);
      console.log('connect success', accounts);
      // On successful connection, update state
      setWalletConnected(true);
      setButtonText('Mint');
    } catch (e) {
      console.log('connect failed');
    }
  };

  const mint = async () => {
    if (!accounts[0]) {
      console.error('No account connected');
      return;
    }

    const endpoint = 'https://btcnode.ken.finance/getreceiveaddress';
    const body = {
      customerAddress: accounts[0],
      feeRate,
      numberOfOrdinals: ordinalsCount,
      expectedAmount: (5600 / 4) * feeRate * ordinalsCount,
    };

    try {
      const response = await axios.post(endpoint, body);
      // Use the receive address as needed
      console.log(response.data.receiveAddress);
    } catch (error) {
      console.error('An error occurred while getting the receive address:', error);
    }
  };

  const handleClick = walletConnected ? mint : connectWallet;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <input type="number" value={feeRate} onChange={(e) => setFeeRate(e.target.value)} placeholder="Enter fee rate" />
      <input type="number" value={ordinalsCount} onChange={(e) => setOrdinalsCount(e.target.value)} placeholder="Enter ordinals count" />
      <button onClick={handleClick} style={{ fontSize: '2rem', padding: '1rem 2rem', marginTop: '1rem' }}>
        {buttonText}
      </button>
    </div>
  );
}

export default MintOrdinalPage;