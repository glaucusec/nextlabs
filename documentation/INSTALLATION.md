### Running the application locally

- [Application Functionalites](#application-functionalites)
- [A. Frontend](#frontend)
- [B. Backend](#backend)

- Clone the project

```bash
git clone git@gitlab.com:glaucusec/nextlabs.git
```

### Frontend

- Open a terminal and change to the client directory:

```bash
cd client
```

- Install the packages

```bash
npm install
```

- Create a `.env` file and add a key `VITE_SERVER_URL` pointing to `http://localhost:{PORT}`. `PORT`where the port runs

- Run the server - `npm run dev`

### Backend

- Open another terminal and change directory

```bash
cd server
```

- Install the packages

```
bash npm install
```

- Create a `.env` file and add the following entries

```
DATABASE_NAME=''
DATABASE_USERNAME=''
DATABASE_PASSWORD=''
DATABASE_URL=''
SERVER_PORT=''
jwtSecret=''
CLIENT_URL='http://localhost:5173'
```

- MySQL Database connection entries goes to `DATABASE_*`
- `SERVER_PORT` is the port in which the server will run. [eg: 3000]
- `CLIENT_URL` points to url in which frontend runs. In this case; `http://localhost:5173`

---

- Now visit [http://localhost:5173](http://localhost:5173) and voila 🎉
