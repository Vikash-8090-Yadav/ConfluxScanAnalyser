# ConfluxScan Explorer UI

A modern React-based dashboard for exploring Conflux Testnet accounts, transactions, and token transfers. The UI features a sidebar for account info and navigation, and tabbed views for different transaction types.

---

## Features
- **Sidebar**: Shows account address, balance, quick links (Faucet, Explorer), and logout.
- **Tabbed Main Area**: Switch between Normal Transactions, Internal Transactions, and Token Transfers.
- **Responsive Design**: Works on desktop and mobile.
- **Direct Explorer Links**: All transaction "View" actions open the official Conflux Testnet Explorer.

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```
2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```
4. **Open in your browser**
   - Go to [http://localhost:3000](http://localhost:3000)

---

## API Endpoints Used

### 1. **Normal Transactions**
- **Endpoint:**
  ```
  https://evmapi-testnet.confluxscan.net/api?module=account&action=txlist&address={address}&page=1&offset=10&sort=asc
  ```
- **Parameters:**
  - `address`: The account address to query.
  - `page`: Page number (pagination).
  - `offset`: Number of results per page.
  - `sort`: Sort order (`asc` or `desc`).
- **Returns:**
  - List of normal (external) transactions for the address.
  - Each transaction includes: `hash`, `from`, `to`, `value`, `timeStamp`, etc.

### 2. **Internal Transactions**
- **Endpoint:**
  ```
  https://evmapi-testnet.confluxscan.net/api?module=account&action=txlistinternal&address={address}&page=1&offset=10&sort=asc
  ```
- **Parameters:**
  - Same as above.
- **Returns:**
  - List of internal transactions (contract calls, value transfers within contracts).
  - Each transaction includes: `hash`, `from`, `to`, `value`, `timeStamp`, etc.

### 3. **Token Transfers**
- **Endpoint:**
  ```
  https://evmapi-testnet.confluxscan.net/api?module=account&action=tokentx&address={address}&page=1&offset=10&sort=asc
  ```
- **Parameters:**
  - Same as above.
- **Returns:**
  - List of token transfer events (ERC20, etc.).
  - Each transfer includes: `hash`, `from`, `to`, `value`, `tokenSymbol`, etc.

### 4. **Account Balance**
- **Endpoint:**
  ```
  https://evmapi-testnet.confluxscan.net/api?module=account&action=balance&address={address}
  ```
- **Returns:**
  - The account's CFX balance (in Drip, 1 CFX = 1e18 Drip).

### 5. **Faucet**
- **URL:** [https://efaucet.confluxnetwork.org/](https://efaucet.confluxnetwork.org/)
- **Purpose:**
  - Get free testnet CFX for development and testing.

### 6. **Explorer**
- **URL:** [https://evmtestnet.confluxscan.net/](https://evmtestnet.confluxscan.net/)
- **Purpose:**
  - View account, transaction, and token details on the official Conflux Testnet Explorer.

---

## UI Overview
- **Login:** Enter your Conflux address to view your dashboard.
- **Sidebar:**
  - Account identicon, address (with copy button), balance, faucet link, explorer link, and logout.
- **Tabs:**
  - Switch between Normal Transactions, Internal Transactions, and Token Transfers.
- **Tables:**
  - Each tab displays a table of transactions or transfers, with direct links to the explorer for each transaction.

---

## License
MIT