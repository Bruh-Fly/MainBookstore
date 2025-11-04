const express=require('express')
const mongoose=require('mongoose')
const path= require('path')
const port = 3019
const Cart = require('./models/Cart');

const app = express()
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))


app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'account.html'))
})

mongoose.connect('mongodb://127.0.0.1:27017/account')
const db = mongoose.connection
db.once('open', ()=>{
  console.log('Mongodb connect successful')
})

const Product = require('./models/productmodels');

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Không có sản phẩm');
    res.json(product);
    } catch (err) {
      res.status(500).send('Lỗi tải sản phẩm lên.');
    }
  });
  
const AccountSchema = new mongoose.Schema({
  emailregister: String,
  passwordregister: String
})

const Account = mongoose.model("data", AccountSchema) 

app.listen(port, ()=>{
  console.log('Server Started')
})

app.post('/register', async (req, res) => {
  const { emailregister, passwordregister } = req.body;

  const existingaccount = await Account.findOne({ emailregister });

  if (existingaccount) {
    return res.redirect('/account.html?error=invalid');
  }

  const account = new Account({ emailregister, passwordregister });
  await account.save();
  console.log(account);

  // Trả về HTML chứa script để lưu email và chuyển trang
  res.send(`
    <script>
      localStorage.setItem('userEmail', '${emailregister}');
      window.location.href = 'http://127.0.0.1:5500/myaccount.html';
    </script>
  `);
});


app.post('/login', async (req, res) => {
  const { emaillogin, passwordlogin } = req.body;

  const account = await Account.findOne({ emailregister: emaillogin });

  if (account && account.passwordregister === passwordlogin) {
    // Lưu email vào localStorage phía trình duyệt
    return res.send(`
      <script>
        localStorage.setItem('userEmail', '${emaillogin}');
        window.location.href = 'http://127.0.0.1:5500/myaccount.html';
      </script>
    `);
  }

  res.send(`
    <script>
      alert("Tài khoản không đúng hoặc chưa được đăng ký.");
      window.location.href = "http://127.0.0.1:5500/account.html";
    </script>
  `);
});

app.post('/add-to-cart', async (req, res) => {
  const { email, productId, name, price, quantity } = req.body;

  let cart = await Cart.findOne({ email });

  if (!cart) {
    cart = new Cart({ email, items: [] });
  }

  const existingItem = cart.items.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, name, price, quantity });
  }

  await cart.save();
  res.send('Đã thêm vào giỏ hàng');
});

app.get('/cart/:email', async (req, res) => {
  const email = req.params.email;
  const cart = await Cart.findOne({ email });

  if (!cart) {
    return res.json({ items: [] });
  }

  res.json(cart.items);
});



