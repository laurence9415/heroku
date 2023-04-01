# Pre-requisites

- Node Js version 16.17.1 or up

# Setup

- Copy and paste the .env.example or execute this command `cp .env.example .env`
  - .env configruration
  - Insert value for REACT_APP_MUI_PRO_KEY
  - Insert value for REACT_APP_BACKEND_URL
- Install packages by running `npm install` command
- In package.json, change the proxy value to Backend URL

# Backend configuration

- If you setup the client first, go to server's folder and run this command `cp .env.example .env`
- Open .env file and change value of FRONTEND_URL to https://your_local_ip_address:3000 (Frontend's URL)
- Follow the instruction on how to setup the server

# Local Development

- To run the app execute the command `npm run start`
- To access the app, type https://your_local_ip_address
- To login, use this test account. Email: test@example.com, Password: password
