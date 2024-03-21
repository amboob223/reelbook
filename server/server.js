const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());
// app.use('/help', cors(corsOptions));
// const corsOptions = {
//   origin: ['https://econsensus.app', 'https://econsensus.onrender.com'],
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

// app.get("/", (req, res) => {
//   res.send("hello");
// }); // we need this for render to work 

// POST route to handle form submissions
//to fo stripe got to make the store object
    const storeItems = new Map([
        [1,{priceInCents:10000,name:"Videography"}],
        
    ])

    // then make the post route
app.post("/create-stripe-checkout", async (req, res) => {
    try {
        const { items } = req.body;
        const stripe = require('stripe')("sk_test_51OwkXGIcg6QDPFRwXUknC66YsCQ8Bv2GJozLqLRLUIrj9ITC93fX6ICP1VExeUq3VQuMo5sMAYHIIYeIk44oV28600Y1bdfKs6");

        const lineItems = items.map(item => {
            const storeItem = storeItems.get(item.id);
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: storeItem.name
                    },
                    unit_amount: storeItem.priceInCents,
                },
                quantity: item.quantity,
            };
        }); // Closing bracket for map function

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "https://localhost:5000/success.html",
            cancel_url: "https://localhost:5000/cancel.html",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).send("Internal Server Error");
    }
});



app.post("/reelbook", async (req, res) => {
    try {
        const { name, email, phone, description, date } = req.body; // Use req.body for form data
        const data = await pool.query(
            "INSERT INTO clients(name, email, phone, description, date) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [name, email, phone, description, date]
        );
        const result = data.rows[0];
        res.json(result); // Send the result back as JSON
        console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});





const PORT = process.env.PORT || 5000; // Define the port correctly
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
