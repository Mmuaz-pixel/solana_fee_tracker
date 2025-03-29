import requests
import csv
import json  # To save fetched data as JSON
from decimal import Decimal  # Import Decimal for precise calculations

# API key
api_key = "f4bdc7a1-cac9-4461-b5ed-fbc38dbe839a"

# Known external fee wallets


def fetch_transactions(wallet, api_key):
    url = f"https://api.helius.xyz/v0/addresses/{wallet}/transactions?api-key={api_key}"
    transactions = []
    page = 1

    while True:
        response = requests.get(url + f"&page={page}")
        
        if response.status_code == 200:
            data = response.json()
            
            # Filter transactions where feePayer is the wallet
            filtered_data = [tx for tx in data if tx.get('feePayer') == wallet]
            
            transactions.extend(filtered_data)

            with open(f"{wallet}_transactions_page_{page}.json", mode='w') as json_file:
                json.dump(filtered_data, json_file, indent=4)

            if len(data) < 100:
                break  # No more pages left

            page += 1
        else:
            print("Error fetching transactions:", response.status_code)
            break

    return transactions


def process_transaction(wallet, tx):
    platform_fee = Decimal(0)
    external_fees = Decimal(0)
    
    if tx.get('feePayer') != wallet:
        return Decimal(tx.get('fee', 0)) / Decimal(1_000_000_000), external_fees  # Base fee in SOL, external fee
    
    for native_transfer in tx.get('nativeTransfers', []):
        amount = Decimal(native_transfer.get('amount', 0)) / Decimal(1_000_000_000)  # Convert to SOL
        if(native_transfer.get('fromUserAccount') == wallet):
          external_fees += amount
    
    return Decimal(tx.get('fee', 0)) / Decimal(1_000_000_000), external_fees

def main():
    wallet = "CbhyTui9uv656Sxrdkd7n6CCRMbmKQx7CGwV4AoVnSp7"
    transactions = fetch_transactions(wallet, api_key)
    
    with open(f"{wallet}_fees.csv", mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["Signature", "Base Fee (SOL)", "External Wallets Fee (SOL)", "Total Estimated Fee (SOL)", "Slot", "Timestamp"])
        
        total_base_fee = Decimal(0)
        total_external_fees = Decimal(0)
        
        for tx in transactions:
            signature = tx.get("signature", "")
            base_fee, external_fees = process_transaction(wallet, tx)
            total_fee = base_fee + external_fees
            
            total_base_fee += base_fee
            total_external_fees += external_fees
            
            writer.writerow([signature, f"{base_fee:.9f}", f"{external_fees:.9f}", f"{total_fee:.9f}", tx.get("slot", ""), tx.get("timestamp", "")])
        
        print(f"📦 Exported {len(transactions)} fee-paying transactions to {wallet}_fees.csv")
        print(f"💸 Total Base Fees Paid: {total_base_fee:.9f} SOL")
        print(f"💸 Total External Fees Paid: {total_external_fees:.9f} SOL")
        print(f"💸 Total Fees Paid: {(total_base_fee + total_external_fees):.9f} SOL")

if __name__ == "__main__":
    main()
