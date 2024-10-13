import express from 'express'
import bodyParser from 'body-parser'
import 'pug'
const app = express()
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/assets', express.static('./assets'))

const items = [
  'item-a',
  'item-b'
]

export default config => {
  app.get('/', (req, res) => {
    res.status(200)

    if (req.query.partial) {
      return res.render('item-list', { items })
    }

    return res.render('index', { items })
  })


  app.post('/', (req, res) => {
    console.log(req.body);
    const { name } = req.body

    items.push(name)

    // const redirectPath = req.headers['is-fetch-request'] ? '/?partial=true'  : '/'
    // return res.redirect(redirectPath)

    if (!req.headers['is-fetch-request']) {
      return res.redirect('/')
    } else {
      res.status(201)
      return res.render('item', { name })
    }

  })

  return app
}
