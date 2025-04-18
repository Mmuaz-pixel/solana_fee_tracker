const Decimal = require('decimal.js')

const API_KEY = process.env.API_KEY

const Know_wallets = [
  "MaestroUL88UBnZr3wfoN7hqmNWFi3ZYCGqZoJJHE36", "CebN5WGQ4jvEPvsVU4EoHEpgzq1VV7AbicfhtW4xC9iM", "7ks326H4LbMVaUC8nW5FpC5EoAf5eK5pf4Dsx4HDQLpq", "FWsW1xNtWscwNmKv6wVsU1iTzRN6wmmk3MjxRP5tT7hz", "G5UZAVbAf46s7cKWoyKu8kYTip9DGTpbLZ2qa9Aq69dP", "X5QPJcpph4mBAJDzc4hRziFftSbcygV59kRb2Fu6Je1", "9rPYyANsfQZw3DnDmKE3YCQF5E8oD89UXoHn9JFEhJUz", "7VtfL8fvgNfhz17qKRMjzQEXgbdpnHHHQRh54R9jP2RJ", "FGptqdxjahafaCzpZ1T6EDtCzYMv7Dyn5MgBLyB3VUFW", "94qWNrtmfn42h3ZjUZwWvK1MEo9uVmmrBPd2hpNjYDjb", "JCRGumoE9Qi5BBgULTgdgTLjSgkCMSbF62ZZfGs84JeU", "96gYZGLnJYVFmbjzopPSU6QiEV5fGqZNyN9nmNhvrZU5", "HFqU5x63VTqvQss8hp11i4wVV8bD44PvwucfZ2bU7gRe", "Cw8CFyM9FkoMi7K7Crf6HNQqf4uEMzpKw6QNghXLvLkY", "ADaUMid9yfUytqMBgopwjb2DTLSokTSzL1zt6iGPaS49", "DfXygSm4jCyNCybVYYK6DwvWqjKee8pbDmJGcLWNDXjh", "ADuUkR4vqLUMWXxW9gh6D6L8pMSawimctcNZ5pGwDcEt", "DttWaMuVvTiduZRnguLF7jNxTgiMBZ1hyAumKUiL2KRL", "3AVi9Tg9Uo68tJfuvoKvqKNWKkC5wPdSSdeBnizKZ6jT", "9RYJ3qr5eU5xAooqVcbmdeusjcViL5Nkiq7Gske3tiKq",
  "7LCZckF6XXGQ1hDY6HFXBKWAtiUgL9QY5vj1C4Bn1Qjj", "4V65jvcDG9DSQioUVqVPiUcUY9v6sb6HKtMnsxSKEz5S", "BB5dnY55FXS1e1NXqZDwCzgdYJdMCj3B92PU6Q5Fb6DT", "HWEoBxYs7ssKuudEjzjmpfJVX7Dvi7wescFsVx2L5yoY", "TEMPaMeCRFAS9EKF53Jd6KpHxgL47uWLcpFArU1Fanq", "J3Hpt5Drr5zirqhP1z4qhqpRMCffB4EVNCqcLGkL51ZH", "FGptqdxjahafaCzpZ1T6EDtCzYMv7Dyn5MgBLyB3VUFW", "CSWAP5SpPcVjvpsA1H2n2HjNjMsRaPnZuX8H8bVJN5wy", "9yMwSPk9mrXSN7yDHUuZurAh1sjbJsfpUqjZ7SvVtdco", "CeA3sPZfWWToFEBmw5n1Y93tnV66Vmp8LacLzsVprgxZ", "6Wzuv7vLc6Vq8HJcHwwSCE9SKcdJiuoJmJm3EMFkWERN", "ZG98FUCjb8mJ824Gbs6RsgVmr1FhXb2oNiJHa2dwmPd", "HVbzPxiet4ZgAP6CySVouY8RC3MNxgS35MgE3pWvUVC8", "9yj3zvLS3fDMqi1F8zhkaWfq8TZpZWHe6cz1Sgt7djXf", "AaG6of1gbj1pbDumvbSiTuJhRCRkkUNaWVxijSbWvTJW", "NexTbLoCkWykbLuB1NkjXgFWkX9oAtcoagQegygXXA2", "nextBLoCkPMgmG8ZgJtABeScP35qLa2AMCNKntAP7Xc", "NextbLoCkVtMGcV47JzewQdvBpLqT9TxQFozQkN98pE", "NEXTbLoCkB51HpLBLojQfpyVAMorm3zzKg7w9NFdqid", "NeXTBLoCKs9F1y5PJS9CKrFNNLU1keHW71rfh7KgA1X", "neXtBLock1LeC67jYd1QdAa32kbVeubsfPNTJC1V5At", "nEXTBLockYgngeRmRrjDV31mGSekVPqZoMGhQEZtPVG", "AVUCZyuT35YSuj4RH7fwiyPu82Djn2Hfg7y2ND2XcnZH", "62qc2CNXwrYqQScmEdiZFFAnJR262PxWEuNQtxfafNgV", "7xQYoUjUJF1Kg6WVczoTAkaNhn5syQYcbvjmFrhjWpx", "28KqHiudrpzfVkVWQ1jztQ2Aarf4W3CvTitjWEqTCkpA", "7hTckgnGnLQR6sdH7YkqFTAA7VwTfYFaZ6EhEsU3saCX",
  "noVaE91mUL5jTb8e9Vf6dqJdNPzJpEQ3uAdnQ8h4nVz",
  "7HeD6sLLqAnKVRuSfc1Ko3BSPMNKWgGTiWLKXJF31vKM",
  "EbGwQh1uANqJAqgGrdhWuypKR1fjA4HUi1hp93ZyneYY",
  "CDYfDS39fMyHSCAyEAosnCLojzYh37NDZffAwJGTPwtp",
  "CMWjoq2Jg78zTqyV44cs9yhChZ95MwFHCkEpYvS2GG6J",
  "HFqp6ErWHY6Uzhj8rFyjYuDya2mXUpYEk8VW75K9PSiY", 
  "MaestroUL88UBnZr3wfoN7hqmNWFi3ZYCGqZoJJHE36",
  "CebN5WGQ4jvEPvsVU4EoHEpgzq1VV7AbicfhtW4xC9iM",
  "7ks326H4LbMVaUC8nW5FpC5EoAf5eK5pf4Dsx4HDQLpq",
  "FWsW1xNtWscwNmKv6wVsU1iTzRN6wmmk3MjxRP5tT7hz",
  "G5UZAVbAf46s7cKWoyKu8kYTip9DGTpbLZ2qa9Aq69dP",
  "X5QPJcpph4mBAJDzc4hRziFftSbcygV59kRb2Fu6Je1",
  "9rPYyANsfQZw3DnDmKE3YCQF5E8oD89UXoHn9JFEhJUz",
  "7VtfL8fvgNfhz17qKRMjzQEXgbdpnHHHQRh54R9jP2RJ",
  "FGptqdxjahafaCzpZ1T6EDtCzYMv7Dyn5MgBLyB3VUFW",
  "94qWNrtmfn42h3ZjUZwWvK1MEo9uVmmrBPd2hpNjYDjb",
  "JCRGumoE9Qi5BBgULTgdgTLjSgkCMSbF62ZZfGs84JeU",
  "96gYZGLnJYVFmbjzopPSU6QiEV5fGqZNyN9nmNhvrZU5",
  "HFqU5x63VTqvQss8hp11i4wVV8bD44PvwucfZ2bU7gRe",
  "Cw8CFyM9FkoMi7K7Crf6HNQqf4uEMzpKw6QNghXLvLkY",
  "ADaUMid9yfUytqMBgopwjb2DTLSokTSzL1zt6iGPaS49",
  "DfXygSm4jCyNCybVYYK6DwvWqjKee8pbDmJGcLWNDXjh",
  "ADuUkR4vqLUMWXxW9gh6D6L8pMSawimctcNZ5pGwDcEt",
  "DttWaMuVvTiduZRnguLF7jNxTgiMBZ1hyAumKUiL2KRL",
  "3AVi9Tg9Uo68tJfuvoKvqKNWKkC5wPdSSdeBnizKZ6jT",
  "9RYJ3qr5eU5xAooqVcbmdeusjcViL5Nkiq7Gske3tiKq",
  "7LCZckF6XXGQ1hDY6HFXBKWAtiUgL9QY5vj1C4Bn1Qjj",
  "4V65jvcDG9DSQioUVqVPiUcUY9v6sb6HKtMnsxSKEz5S",
  "BB5dnY55FXS1e1NXqZDwCzgdYJdMCj3B92PU6Q5Fb6DT",
  "HWEoBxYs7ssKuudEjzjmpfJVX7Dvi7wescFsVx2L5yoY",
  "TEMPaMeCRFAS9EKF53Jd6KpHxgL47uWLcpFArU1Fanq",
  "J3Hpt5Drr5zirqhP1z4qhqpRMCffB4EVNCqcLGkL51ZH",
  "FGptqdxjahafaCzpZ1T6EDtCzYMv7Dyn5MgBLyB3VUFW",
  "CSWAP5SpPcVjvpsA1H2n2HjNjMsRaPnZuX8H8bVJN5wy",
  "9yMwSPk9mrXSN7yDHUuZurAh1sjbJsfpUqjZ7SvVtdco",
  "CeA3sPZfWWToFEBmw5n1Y93tnV66Vmp8LacLzsVprgxZ",
  "6Wzuv7vLc6Vq8HJcHwwSCE9SKcdJiuoJmJm3EMFkWERN",
  "ZG98FUCjb8mJ824Gbs6RsgVmr1FhXb2oNiJHa2dwmPd",
  "HVbzPxiet4ZgAP6CySVouY8RC3MNxgS35MgE3pWvUVC8",
  "9yj3zvLS3fDMqi1F8zhkaWfq8TZpZWHe6cz1Sgt7djXf",
  "AaG6of1gbj1pbDumvbSiTuJhRCRkkUNaWVxijSbWvTJW",
  "NexTbLoCkWykbLuB1NkjXgFWkX9oAtcoagQegygXXA2",
  "nextBLoCkPMgmG8ZgJtABeScP35qLa2AMCNKntAP7Xc",
  "NextbLoCkVtMGcV47JzewQdvBpLqT9TxQFozQkN98pE",
  "NEXTbLoCkB51HpLBLojQfpyVAMorm3zzKg7w9NFdqid",
  "NeXTBLoCKs9F1y5PJS9CKrFNNLU1keHW71rfh7KgA1X",
  "neXtBLock1LeC67jYd1QdAa32kbVeubsfPNTJC1V5At",
  "nEXTBLockYgngeRmRrjDV31mGSekVPqZoMGhQEZtPVG",
  "AVUCZyuT35YSuj4RH7fwiyPu82Djn2Hfg7y2ND2XcnZH",
  "noVaE91mUL5jTb8e9Vf6dqJdNPzJpEQ3uAdnQ8h4nVz",
  "62qc2CNXwrYqQScmEdiZFFAnJR262PxWEuNQtxfafNgV",
  "7HeD6sLLqAnKVRuSfc1Ko3BSPMNKWgGTiWLKXJF31vKM",
  "EbGwQh1uANqJAqgGrdhWuypKR1fjA4HUi1hp93ZyneYY",
  "CDYfDS39fMyHSCAyEAosnCLojzYh37NDZffAwJGTPwtp",
  "CMWjoq2Jg78zTqyV44cs9yhChZ95MwFHCkEpYvS2GG6J",
  "HFqp6ErWHY6Uzhj8rFyjYuDya2mXUpYEk8VW75K9PSiY",
  "AVahywMVNRYzdgWrufSWrtdGXAeNEvfpJFxhVFK516mT",
  "5K5RtTWzzLp4P8Npi84ocf7F1vBsAu29N1irG4iiUnzt",
  "HYseAPq3ZPYzA35hLsEgmdsKCZQ3P7FBCcCPPytRtyTz",
  "DeZFbKqMsC9i4Z9vgxaTXVFEz2zNsFRBqZp8dmQQeyFd",
  "45ruCyfdRkWpRNGEqWzjCiXRHkZs8WXCLQ67Pnpye7Hp",
  "GV8unppAUobvPfjrR5kDHpcYG8T19KLLLkXAS3sWzgGn",
  "Bvtgim23rfocUzxVX9j9QFxTbBnH8JZxnaGLCEkXvjKS",
  "45ruCyfdRkWpRNGEqWzjCiXRHkZs8WXCLQ67Pnpye7Hp",
  "25mYnjJ2MXHZH6NvTTdA63JvjgRVcuiaj6MRiEQNs1Dq",
  "GV8unppAUobvPfjrR5kDHpcYG8T19KLLLkXAS3sWzgGn",
  "Bvtgim23rfocUzxVX9j9QFxTbBnH8JZxnaGLCEkXvjKS",
  "G9PhF9C9H83mAjjkdJz4MDqkufiTPMJkx7TnKE1kFyCp",
  "BWXT6RUhit9FfJQM3pBmqeFLPYmuxgmyhMGC5sGr8RbA",
  "BtYvTw4vp517yJnsA4H3FG1fKezANhz95pxdCXa3BYSK",
  "7GFUN3bWzJMKMRZ34JLsvcqdssDbXnp589SiE33KVwcC",
  "BzXdDUvNnitfoAEXefvUUc7ZjqXv7Yv3H5aNeGwYjZMS",
  "79gUQP8xFnrvZxxnnKRKaVWgKNPtG7mKoThxxznKLxJ2",
  "3GyfBtcgtuhnwTHviyoe5mhugAx7NNxzW2NFTbwp9Nmi",
  "HviSb86wUarNoFryWegVMVG115TMbpeTVYLfjhRHQjnh",
  "GhaCLDbcaB3qXphhQjXPxS9MNubkAs4bcqf4degHgrv4",
  "9ujUdfWLsTY2bohj18p9u3neSQ537dY6LCZR7VzbgkWt",
  "AhZEEmAMVoSyvEoSrL99izp2t5yqFaGkrbZab68aGC8i",
  "CPvLKPPmb23MSUnzHZeB1dX47oQFdUwxo9yncAndFri4",
  "C4MtffotdnDV47arXo9fQxY4Q2pUBmHgYiw6gfRkgffK",
  "GF74UsMG7iYeGqKJyAsMiwcrfh8y58tH1W8MNBsRLLab",
  "EDN6SYHMg5qnUrD7ytq6MDY7Bjcqcb8XNknsgcCMuS2R",
  "EnVppANi2qXbDdWKKXkBTXBx4h2bTAgJko2bYhmfPvKE",
  "DeZFbKqMsC9i4Z9vgxaTXVFEz2zNsFRBqZp8dmQQeyFd",
  "45ruCyfdRkWpRNGEqWzjCiXRHkZs8WXCLQ67Pnpye7Hp",
  


]

async function fetchTransactions(wallet, apiKey) {
  const transactions = [];
  const addressesUrl = `https://mainnet.helius-rpc.com/?api-key=${apiKey}`;
  const transactionsUrl = `https://api.helius.xyz/v0/transactions?api-key=${apiKey}`;

  try {
    let nextPage = null;

    // Loop to fetch signatures using pagination
    while (true) {
      const response = await fetch(addressesUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "1",
          method: "getSignaturesForAddress",
          params: [wallet, { before: nextPage }] // Use pagination for fetching earlier signatures
        })
      });

      if (!response.ok) {
        console.error("Error fetching signatures:", response.status);
        break;
      }

      const data = await response.json();
      const signatures = data.result.map(tx => tx.signature);

      if (signatures.length === 0) {
        break; // No more signatures to fetch
      }

      console.log(`Fetched ${signatures.length} signatures`);

      // Process in batches of 100
      for (let i = 0; i < signatures.length; i += 100) {
        const batch = signatures.slice(i, i + 100);

        const transactionData = await fetch(transactionsUrl, {
          method: "POST",
          headers: {
            "Authorization": "Basic username:password", // Adjust authorization as needed
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ transactions: batch })
        });

        if (!transactionData.ok) {
          console.error("Error fetching transactions:", transactionData.status);
          continue;
        }

        const transactionResponse = await transactionData.json();

        // Filter transactions where feePayer is the wallet
        const filteredData = transactionResponse.filter(tx => tx.feePayer === wallet);
        transactions.push(...filteredData);

        console.log(`Processed batch ${i / 100 + 1}/${Math.ceil(signatures.length / 100)}`);
      }

      // Set the nextPage to the last signature for pagination
      nextPage = data.result[data.result.length - 1].signature;
    }

  } catch (error) {
    console.error("Fetch error:", error);
  }

  return transactions;
}


function processTransaction(wallet, tx) {
  // Convert to Decimal for precise calculations
  const baseFee = new Decimal(tx.fee).dividedBy(1_000_000_000);

  const externalFeesAccountsData = tx.accountData
    .filter(account => Know_wallets.includes(account.account))
    .reduce((sum, account) =>
      sum.plus(new Decimal(account.nativeBalanceChange).dividedBy(1_000_000_000)),
      new Decimal(0)
    );
  const externalFees = externalFeesAccountsData;

  return {
    signature: tx.signature,
    baseFee: baseFee.toNumber(),
    externalFees: externalFees.toNumber(),
    totalFee: baseFee.plus(externalFees).toNumber(),
    slot: tx.slot,
    timestamp: tx.timestamp
  };
}

module.exports = {
  fetchTransactions,
  processTransaction,
  API_KEY
}
