require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { CLIENT } = process.env;

const app = express();

const session = require('express-session')
const FileStore = require('session-file-store')(session)
const sessionConfig = {
  name: 'Cookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Секретное слово',
  resave: false, // * если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // * если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 9999999, // * время жизни в мс (ms)
    httpOnly: true,
  }
}

const userRouter = require('./routes/user')
const accountRouter = require('./routes/doctor')
const serviceRouter = require('./routes/service.router')


const PORT = process.env.PORT;

app.use(session(sessionConfig))
app.use(
  cors({
    origin: [CLIENT],
    credentials: true
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public/')));

app.use('/doctorsaccount', accountRouter);
app.use('/api', userRouter)
app.use('/services', serviceRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
