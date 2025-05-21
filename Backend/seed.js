import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const dummyVendorId = new mongoose.Types.ObjectId();

const attachVendorAndFixPrice = (products) =>
  products.map((p) => ({
    ...p,
    price: parseFloat(p.price.replace("₹", "").trim()), // convert ₹string to number
    vendor: dummyVendorId,
  }));

// Vegetables
const sampleProducts = [
  {
    name: "Mango Alphonso (Hapus)",
    category: "Mangoes & Melons",
    image: "/uploads/products/Alphonso.webp",
    price: "₹350",
    weight: "2 pcs (350-400 g)",
    discount: 38,
    deliveryTime: "6 Mins",
  },
  {
    name: "Muskmelon",
    category: "Fresh Fruits",
    image: "/uploads/products/Muskmelon.webp",
    price: "₹100",
    weight: "600-900 g",
    discount: 67,
    deliveryTime: "6 Mins",
  },
  {
    name: "Watermelon",
    category: "Fresh Fruits",
    image: "/uploads/products/Organic-Watermelon.webp",
    price: "₹120",
    weight: "1 pc (2-3 kg)",
    discount: 50,
    deliveryTime: "7 Mins",
  },
  {
    name: "Banana Yelakki",
    category: "Fresh Fruits",
    image: "/uploads/products/banana.webp",
    price: "₹60",
    weight: "6 pcs (300-350 g)",
    discount: 35,
    deliveryTime: "5 Mins",
  },
  {
    name: "Apple Fuji",
    category: "Fresh Fruits",
    image: "/uploads/products/Apple.webp",
    price: "₹220",
    weight: "4 pcs (700-800 g)",
    discount: 25,
    deliveryTime: "8 Mins",
  },
  {
    name: "Tomato Hybrid",
    category: "Fresh Vegetables",
    image: "/uploads/products/Tomato-Local.webp",
    price: "₹25",
    weight: "500 g",
    discount: 45,
    deliveryTime: "5 Mins",
  },
  {
    name: "Potato New",
    category: "Fresh Vegetables",
    image: "/uploads/products/Potato New.webp",
    price: "₹40",
    weight: "1 kg",
    discount: 20,
    deliveryTime: "6 Mins",
  },
  {
    name: "Onion",
    category: "Fruits & Vegetables",
    image: "/uploads/products/Onion.webp",
    price: "₹35",
    weight: "1 kg",
    discount: 28,
    deliveryTime: "5 Mins",
  },
  {
    name: "Carrot Ooty",
    category: "Fruits & Vegetables",
    image: "/uploads/products/Carrot.webp",
    price: "₹50",
    weight: "500 g",
    discount: 30,
    deliveryTime: "6 Mins",
  },
  {
    name: "Cucumber",
    category: "Fruits & Vegetables",
    image: "/uploads/products/Cucumber.webp",
    price: "₹40",
    weight: "500 g",
    discount: 22,
    deliveryTime: "5 Mins",
  },
  {
    name: "Spinach (Palak)",
    category: "Fruits & Vegetables",
    image: "/uploads/products/Spinach.webp",
    price: "₹20",
    weight: "250 g",
    discount: 40,
    deliveryTime: "4 Mins",
  },
  {
    name: "Chilli Green Spicy",
    category: "Fruits & Vegetables",
    image: "/uploads/products/Chilli-Green-Spicy.webp",
    price: "₹180",
    weight: "250 g",
    discount: 15,
    deliveryTime: "9 Mins",
  },
  {
    name: "Coconut",
    category: "Fruits & Vegetables",
    image: "/uploads/products/Coconut.webp",
    price: "₹45",
    weight: "1 pc",
    discount: 12,
    deliveryTime: "6 Mins",
  },
  {
    name: "Sweet Corn (Peeled)",
    category: "Fruits & Vegetables",
    image: "/uploads/products/Sweet-Corn-Peeled.webp",
    price: "₹55",
    weight: "2 pcs (400-450 g)",
    discount: 33,
    deliveryTime: "5 Mins",
  },
];

// Flowers
const flowersProducts = [
  {
    name: "Rose Bouquet",
    category: "Flowers & Leaves",
    image: "/uploads/products/Pooja-Flower-Mix.webp",
    price: "₹250",
    weight: "1 Bouquet (10 stems)",
    discount: 20,
    deliveryTime: "10 Mins",
  },
  {
    name: "Jasmine Garland",
    category: "Flowers & Leaves",
    image: "/uploads/products/Jasmin.jpg",
    price: "₹150",
    weight: "1 Garland (80 cm)",
    discount: 15,
    deliveryTime: "8 Mins",
  },
  {
    name: "Lotus Flowers",
    category: "Flowers & Leaves",
    image: "/uploads/products/Lotius.webp",
    price: "₹80",
    weight: "4 pcs",
    discount: 25,
    deliveryTime: "7 Mins",
  },
  {
    name: "Marigold Bunch",
    category: "Flowers & Leaves",
    image: "/uploads/products/Marigold.jpeg",
    price: "₹60",
    weight: "1 Bunch (10 stems)",
    discount: 30,
    deliveryTime: "6 Mins",
  },
  {
    name: "Tulsi Leaves",
    category: "Flowers & Leaves",
    image: "/uploads/products/Tulsi-Leaves.webp",
    price: "₹20",
    weight: "50 g",
    discount: 10,
    deliveryTime: "5 Mins",
  },
];

const leafyProducts = [
  {
    name: "Palak (Spinach)",
    category: "Leafy, Herbs & Seasonings",
    image: "/uploads/products/Spinach.webp",
    price: "₹25",
    weight: "250 g",
    discount: 20,
    deliveryTime: "5 Mins",
  },
  {
    name: "Methi (Fenugreek Leaves)",
    category: "Leafy, Herbs & Seasonings",
    image: "/uploads/products/Methi.webp",
    price: "₹20",
    weight: "200 g",
    discount: 15,
    deliveryTime: "5 Mins",
  },
  {
    name: "Coriander Leaves (Dhaniya)",
    category: "Leafy, Herbs & Seasonings",
    image: "/uploads/products/Coriander-leaves-with-roots.webp",
    price: "₹15",
    weight: "100 g",
    discount: 10,
    deliveryTime: "4 Mins",
  },
  {
    name: "Mint Leaves (Pudina)",
    category: "Leafy, Herbs & Seasonings",
    image: "/uploads/products/Mint.webp",
    price: "₹30",
    weight: "100 g",
    discount: 25,
    deliveryTime: "6 Mins",
  },
  {
    name: "Amaranthus Red (Laal Bhaji)",
    category: "Leafy, Herbs & Seasonings",
    image: "/uploads/products/amaranthus-red.jpg",
    price: "₹35",
    weight: "250 g",
    discount: 18,
    deliveryTime: "5 Mins",
  },
];

const exoticsProducts = [
  {
    name: "Avocado Imported",
    category: "Exotics & Premium",
    image: "/uploads/products/Avacoda.jpg",
    price: "₹400",
    weight: "1 pc (200-250 g)",
    discount: 15,
    deliveryTime: "7 Mins",
  },
  {
    name: "Zucchini Green",
    category: "Exotics & Premium",
    image: "/uploads/products/Zucchini.webp",
    price: "₹120",
    weight: "500 g",
    discount: 20,
    deliveryTime: "6 Mins",
  },
  {
    name: "Broccoli",
    category: "Exotics & Premium",
    image: "/uploads/products/Broccoli-Florets.webp",
    price: "₹150",
    weight: "250 g",
    discount: 18,
    deliveryTime: "5 Mins",
  },

  {
    name: "Kiwi New Zealand",
    category: "Exotics & Premium",
    image: "/uploads/products/Kiwi.webp",
    price: "₹90",
    weight: "1 pc",
    discount: 10,
    deliveryTime: "5 Mins",
  },
];

const organicProducts = [
  {
    name: "Organic Tomato",
    category: "Organics & Hydroponics",
    image: "/uploads/products/Tomato-Local.webp",
    price: "₹70",
    weight: "500 g",
    discount: 20,
    deliveryTime: "6 Mins",
  },
  {
    name: "Organic Cucumber",
    category: "Organics & Hydroponics",
    image: "/uploads/products/Cucumber.webp",
    price: "₹60",
    weight: "500 g",
    discount: 18,
    deliveryTime: "5 Mins",
  },
  {
    name: "Organic Carrot",
    category: "Organics & Hydroponics",
    image: "/uploads/products/Carrot.webp",
    price: "₹80",
    weight: "500 g",
    discount: 15,
    deliveryTime: "6 Mins",
  },
  {
    name: "Hydroponic Lettuce",
    category: "Organics & Hydroponics",
    image: "/uploads/products/Lettuce.webp",
    price: "₹100",
    weight: "1 Pack (200 g)",
    discount: 22,
    deliveryTime: "5 Mins",
  },
  {
    name: "Organic Baby Spinach",
    category: "Organics & Hydroponics",
    image: "/uploads/products/Spinach.webp",
    price: "₹120",
    weight: "200 g",
    discount: 25,
    deliveryTime: "5 Mins",
  },
];

const sproutsProducts = [
  {
    name: "Green Gram Sprouts",
    category: "Sprouts",
    image: "/uploads/products/mung-bean-sprouts.jpg",
    price: "₹35",
    weight: "200 g",
    discount: 20,
    deliveryTime: "4 Mins",
  },
  {
    name: "Mixed Bean Sprouts",
    category: "Sprouts",
    image: "/uploads/products/Mixed-Bean-Sprouts.webp",
    price: "₹40",
    weight: "250 g",
    discount: 18,
    deliveryTime: "5 Mins",
  },
  {
    name: "Chickpea Sprouts",
    category: "Sprouts",
    image: "/uploads/products/Chickpea-Sprout.jpg",
    price: "₹30",
    weight: "200 g",
    discount: 15,
    deliveryTime: "5 Mins",
  },
];

const juicesProducts = [
  {
    name: "Tropicana Orange Juice",
    category: "Juices",
    image: "/uploads/products/OrangeJuice.webp",
    price: "₹110",
    weight: "1 L",
    discount: 10,
    deliveryTime: "4 Mins",
  },
  {
    name: "Real Mixed Fruit Juice",
    category: "Juices",
    image: "/uploads/products/MixedJuice.jpg",
    price: "₹120",
    weight: "1 L",
    discount: 12,
    deliveryTime: "5 Mins",
  },
  {
    name: "Paper Boat Aamras",
    category: "Juices",
    image: "/uploads/products/PaperBoat-Aamras.webp",
    price: "₹90",
    weight: "500 ml",
    discount: 15,
    deliveryTime: "5 Mins",
  },
];

const plantsProducts = [
  {
    name: "Areca Palm Plant",
    category: "Plant",
    image: "/uploads/products/Palm.webp",
    price: "₹350",
    weight: "1 Plant",
    discount: 18,
    deliveryTime: "8 Mins",
  },
  {
    name: "Snake Plant",
    category: "Plant",
    image: "/uploads/products/Snake-Plant.webp",
    price: "₹250",
    weight: "1 Plant",
    discount: 20,
    deliveryTime: "7 Mins",
  },
  {
    name: "Money Plant",
    category: "Plant",
    image: "/uploads/products/Money-Plant.webp",
    price: "₹150",
    weight: "1 Plant",
    discount: 25,
    deliveryTime: "6 Mins",
  },
];

const saladsProducts = [
  {
    name: "Fresh Greek Salad",
    category: "Salads",
    image: "/uploads/products/Fresh-Greek-Salad.jpg",
    price: "₹180",
    weight: "250 g",
    discount: 22,
    deliveryTime: "5 Mins",
  },
  {
    name: "Veg Caesar Salad",
    category: "Salads",
    image: "/uploads/products/salad.webp",
    price: "₹200",
    weight: "300 g",
    discount: 18,
    deliveryTime: "6 Mins",
  },
  {
    name: "Fruit Salad Mix",
    category: "Salads",
    image: "/uploads/products/Greek-Cucumber-Salad-3.webp",
    price: "₹150",
    weight: "250 g",
    discount: 20,
    deliveryTime: "5 Mins",
  },
];

const bloomProducts = [
  {
    name: "Bloom Red Roses",
    category: "Bloom",
    image: "/uploads/products/Bloom-Red-Roses.jpg",
    price: "₹300",
    weight: "12 stems",
    discount: 18,
    deliveryTime: "8 Mins",
  },
  {
    name: "Bloom Gerbera Mix",
    category: "Bloom",
    image: "/uploads/products/Bloom-Gerbera-Mix.webp",
    price: "₹250",
    weight: "10 stems",
    discount: 20,
    deliveryTime: "7 Mins",
  },
  {
    name: "Bloom Lily Bunch",
    category: "Bloom",
    image: "/uploads/products/Bloom-Lily.jpg",
    price: "₹450",
    weight: "8 stems",
    discount: 15,
    deliveryTime: "9 Mins",
  },
];
const driedProducts = [
  {
    name: "Dried Cranberries",
    category: "Dried",
    image: "/uploads/products/Dried-Cranberries.webp",
    price: "₹250",
    weight: "200 g",
    discount: 20,
    deliveryTime: "5 Mins",
  },
  {
    name: "Dried Figs (Anjeer)",
    category: "Dried",
    image: "/uploads/products/Dried-Figs.jpg",
    price: "₹400",
    weight: "250 g",
    discount: 18,
    deliveryTime: "6 Mins",
  },
  {
    name: "Dried Almonds",
    category: "Dried",
    image: "/uploads/products/Almon.jpg",
    price: "₹600",
    weight: "500 g",
    discount: 15,
    deliveryTime: "5 Mins",
  },

  
];

const additionalProducts = [
  {
    name: 'Muskmelon',
    image: '/products/muskmelon.png',
    price: 60,
    description: 'Juicy fresh muskmelon.',
    weight: '600-800g',
    discount: '4%',
    category: 'Fruits & Vegetables'
  },
  {
    name: 'Teddy Bear',
    image: '/products/teddy.png',
    price: 700,
    description: 'Soft and fluffy teddy bear.',
    weight: '-',
    discount: '20%',
    category: 'Toys & Sports'
  },
  { name: "Organic Ginger",
    image: "/products/ginger.png",
    description: 'Organic Ginger',
    price: 200, 
    weight: "200g",
    discount: "18%",
    category: 'Fruits & Vegetables'

 },
 {
    name: "Watermelon",
    image: "/products/Watermelon.webp",
    price: 60,
    weight: "600-800g",
    discount: "4%",
    description: "Fresh Watermelon from the farm.",
    category: "Fruits & Vegetables"
  },
  {
    name: "Mango Raspuri",
    image: "/products/Mango-Raspuri.webp",
    price: 200,
    weight: "200g",
    discount: "18%",
    description: "Sweet and juicy Raspuri Mango.",
    category: "Fruits & Vegetables"
  },
  {
    name: "Mango Totapuri Raw",
    image: "/products/Mango-Totapuri-Raw.webp",
    price: 60,
    weight: "600-800g",
    discount: "4%",
    description: "Tangy raw Totapuri Mango.",
    category: "Fruits & Vegetables"
  },
  {
    name: "Mushroom Button",
    image: "/products/Mushroom-Button.webp",
    price: 200,
    weight: "200g",
    discount: "18%",
    description: "Fresh Button Mushrooms.",
    category: "Fruits & Vegetables"
  },
  {
    name: "Fresh Roses",
    image: "/products/roses.png",
    price: 60,
    weight: "800g",
    discount: "4%",
    description: "Fragrant and colorful fresh roses.",
    category: "Fruits & Vegetables"
  },
  {
    name: "Beetroot",
    image: "/products/Beetroot.webp",
    price: 200,
    weight: "200g",
    discount: "18%",
    description: "Nutritious fresh beetroot.",
    category: "Fruits & Vegetables"
  },
  {
    name: "Banana Robusta",
    image: "/products/Banana-Robusta.webp",
    price: 60,
    weight: "600-800g",
    discount: "4%",
    description: "Robust and ripe bananas.",
    category: "Fruits & Vegetables"
  },
  {
    name: "Coconut Big",
    image: "/products/Coconut-Big.webp",
    price: 200,
    weight: "200g",
    discount: "18%",
    description: "Big fresh coconuts with water and meat.",
    category: "Fruits & Vegetables"
  },
  {
    name: "Toy Car",
    image: "/products/toy.png",
    price: 500,
    description: "Toy Car - Fun and engaging toy for all ages.",
    weight: "-",
    discount: "10%",
    category: "Toys & Sports"
  },
  {
    name: "Teddy Bear",
    image: "/products/teddy.png",
    price: 700,
    description: "Teddy Bear - Fun and engaging toy for all ages.",
    weight: "-",
    discount: "20%",
    category: "Toys & Sports"
  },
  {
    name: "Football",
    image: "/products/football.png",
    price: 999,
    description: "Football - Fun and engaging toy for all ages.",
    weight: "-",
    discount: "15%",
    category: "Toys & Sports"
  },
  {
    name: "Batman Toy",
    image: "/products/Batman.png",
    price: 1500,
    description: "Batman Toy - Fun and engaging toy for all ages.",
    weight: "-",
    discount: "10%",
    category: "Toys & Sports"
  },
  {
    name: "Cold Coffee",
    image: "/products/coffee1.png",
    price: 150,
    description: "Cold Coffee - Refreshing and energizing.",
    weight: "300ml",
    discount: "5%",
    category: "Zepto Cafe"
  },
  {
    name: "Hot Coffee",
    image: "/products/coffee2.png",
    price: 250,
    description: "Hot Coffee - Perfect for a cozy day.",
    weight: "150ml",
    discount: "5%",
    category: "Zepto Cafe"
  },
  {
    name: "Iced Latte",
    image: "/products/coffee3.png",
    price: 750,
    description: "Iced Latte - A cool coffee blend for summer.",
    weight: "300ml",
    discount: "5%",
    category: "Zepto Cafe"
  },
  {
    name: "Cappuccino",
    image: "/products/coffee4.png",
    price: 450,
    description: "Cappuccino - Classic Italian coffee.",
    weight: "200ml",
    discount: "5%",
    category: "Zepto Cafe"
  },
  {
    name: "Mocha",
    image: "/products/coffee1.png",
    price: 350,
    description: "Mocha - A delightful mix of coffee and chocolate.",
    weight: "150ml",
    discount: "5%",
    category: "Zepto Cafe"
  },
  {
    name: "Espresso Shot",
    image: "/products/espresso.png",
    price: 120,
    description: "Espresso Shot - Strong and bold caffeine fix.",
    weight: "60ml",
    discount: "4%",
    category: "Zepto Cafe"
  },
  {
    name: "Choco Frappe",
    image: "/products/choco-frappe.png",
    price: 300,
    description: "Choco Frappe - Cold chocolatey indulgence.",
    weight: "250ml",
    discount: "8%",
    category: "Zepto Cafe"
  },
  {
    name: "Vanilla Milkshake",
    image: "/products/vanilla-milkshake.png",
    price: 280,
    description: "Vanilla Milkshake - Creamy and sweet delight.",
    weight: "300ml",
    discount: "7%",
    category: "Zepto Cafe"
  },
  {
    name: "Cold Brew Coffee",
    image: "/products/cold-brew.png",
    price: 350,
    description: "Cold Brew Coffee - Slow-brewed perfection.",
    weight: "300ml",
    discount: "6%",
    category: "Zepto Cafe"
  },
  {
    name: "Green Tea",
    image: "/products/green-tea.png",
    price: 180,
    description: "Green Tea - Light and healthy beverage.",
    weight: "200ml",
    discount: "5%",
    category: "Zepto Cafe"
  },
  {
    name: "Daily Good Figs (Anjeer)",
    image: "/products/Daily-Good-Figs-Anjeer.webp",
    price: 500,
    description: "Premium quality dried figs (Anjeer).",
    weight: "-",
    discount: "10%",
    category: "Masala & Dry Fruits"
  },
  {
    name: "Catch Jeera Whole",
    image: "/products/Catch-Jeera-Whole.webp",
    price: 700,
    description: "Whole cumin seeds from Catch for rich aroma.",
    weight: "-",
    discount: "20%",
    category: "Masala & Dry Fruits"
  },
  {
    name: "Parrys White Label Sugar",
    image: "/products/Parrys-White-Label-Sugar.webp",
    price: 700,
    description: "Refined white sugar for everyday use.",
    weight: "-",
    discount: "20%",
    category: "Masala & Dry Fruits"
  },
  {
    name: "Aashirvaad Turmeric Powder",
    image: "/products/Aashirvaad-Turmeric-Haldi-Powder.webp",
    price: 500,
    description: "Pure and high-quality turmeric powder.",
    weight: "-",
    discount: "10%",
    category: "Masala & Dry Fruits"
  },
  {
    name: "Daily Good Mustard Seeds",
    image: "/products/Daily-Good-Mustard-Rai-Sarso-Small.webp",
    price: 700,
    description: "Aromatic mustard seeds for tempering and cooking.",
    weight: "-",
    discount: "20%",
    category: "Masala & Dry Fruits"
  },
  {
    name: "Daily Good Apricots",
    image: "/products/Daily-Good-Apricots-Khubani-Jardalu.webp",
    price: 700,
    description: "Dried apricots, rich in fiber and flavor.",
    weight: "-",
    discount: "20%",
    category: "Masala & Dry Fruits"
  },
  {
    name: "Aashirvaad Atta",
    image: "/products/Aashirvaad-Turmeric-Haldi-Powder.webp",
    price: 320,
    description: "Whole wheat flour for soft rotis and daily use.",
    weight: "5kg",
    discount: "8%",
    category: "Atta, Rice, Oil & Dals"
  },
  {
    name: "Kapiva-A2-Cow-Desi-Ghee",
    image: "/products/Kapiva-A2-Cow-Desi-Ghee.png",
    price: 1200,
    description: "Pure A2 cow desi ghee with rich aroma and taste.",
    weight: "5L",
    discount: "10%",
    category: "Atta, Rice, Oil & Dals"
  },
  {
    name: "India Gate Basmati Rice",
    image: "/products/IndiaGate.png",
    price: 800,
    description: "Premium long grain basmati rice, aged and aromatic.",
    weight: "5kg",
    discount: "12%",
    category: "Atta, Rice, Oil & Dals"
  },
  {
    name: "Fortune Chakki Fresh Atta",
    image: "/products/Fortune-Chakki-Atta.png",
    price: 350,
    description: "Chakki fresh atta for fluffy and soft rotis.",
    weight: "5kg",
    discount: "10%",
    category: "Atta, Rice, Oil & Dals"
  },
  {
    name: "Saffola Gold Oil",
    image: "/products/Saffola-Gold-Oil.png",
    price: 1400,
    description: "Heart-healthy cooking oil blend from Saffola.",
    weight: "5L",
    discount: "15%",
    category: "Atta, Rice, Oil & Dals"
  },
  {
    name: "Daawat Biryani Basmati Rice",
    image: "/products/Daawat-Pulav-Basmati-Rice-Long-Grain.png",
    price: 900,
    description: "Long grain rice perfect for delicious biryanis.",
    weight: "5kg",
    discount: "12%",
    category: "Atta, Rice, Oil & Dals"
  },
  {
    name: "Tata Sampann Toor Dal",
    image: "/products/Tata-Toor-Dal.png",
    price: 250,
    description: "Unpolished toor dal rich in protein and taste.",
    weight: "1kg",
    discount: "8%",
    category: "Atta, Rice, Oil & Dals"
  },
  {
    name: "Tata Sampann Moong Dal",
    image: "/products/Tata-Sampann-Unpolished-Moong-Dal.png",
    price: 280,
    description: "Unpolished moong dal for a healthy lifestyle.",
    weight: "1kg",
    discount: "10%",
    category: "Atta, Rice, Oil & Dals"
  },
  {
    name: "24 Mantra Organic Brown Rice",
    image: "/products/24Mantra-BrownRice.png",
    price: 450,
    description: "Organic brown rice, ideal for fitness enthusiasts.",
    weight: "1kg",
    discount: "12%",
    category: "Atta, Rice, Oil & Dals"
  },
  {
    name: "Nature Fresh Sampoorna Chakki Atta",
    image: "/products/Nature-Fresh-Sampoorna-Chakki-Atta.png",
    price: 1500,
    description: "High fiber atta for daily consumption.",
    weight: "5kg",
    discount: "10%",
    category: "Atta, Rice, Oil & Dals"
  },
  { name: "Gold Plated Necklace",
     price: 2500, 
     description: "Elegannt gold",
     weight: "-", 
     discount: "15%",
     image: "/products/Priyaasi-Quintessence-Rose-Gold-Plated-American-Diamond-Studded-Hoop-Earrings.webp",
     category: "Jewellery & Accessories"
     },
     { name: "Cold Coffee", image: "/products/coffee1.png", price: 150, description: "Cold Coffee", weight: "300ml", discount: "5%", category: "Zepto Cafe" },
     { name: "Cold Coffee", image: "/products/coffee1.png", price: 150, description: "Cold Coffee", weight: "300ml", discount: "5%", category: "Zepto Cafe" },
     { name: "Hot Coffee", image: "/products/coffee2.png", price: 250, description: "Hot Coffee", weight: "150ml", discount: "5%", category: "Zepto Cafe" },
     { name: "Iced Latte", image: "/products/coffee3.png", price: 750, description: "Iced Latte", weight: "300ml", discount: "5%", category: "Zepto Cafe" },
     { name: "Cappuccino", image: "/products/coffee4.png", price: 450, description: "Cappuccino", weight: "200ml", discount: "5%", category: "Zepto Cafe" },
     { name: "Mocha", image: "/products/coffee1.png", price: 350, description: "Mocha", weight: "150ml", discount: "5%", category: "Zepto Cafe" },
     { name: "Espresso Shot", image: "/products/espresso.png", price: 120, description: "Espresso", weight: "60ml", discount: "4%", category: "Zepto Cafe" },
     { name: "Choco Frappe", image: "/products/choco-frappe.png", price: 300, description: "Choco Frappe", weight: "250ml", discount: "8%", category: "Zepto Cafe" },
     { name: "Vanilla Milkshake", image: "/products/vanilla-milkshake.png", price: 280, description: "Vanilla Milkshake", weight: "300ml", discount: "7%", category: "Zepto Cafe" },
     { name: "Cold Brew Coffee", image: "/products/cold-brew.png", price: 350, description: "Cold Brew", weight: "300ml", discount: "6%", category: "Zepto Cafe" },
     { name: "Green Tea", image: "/products/green-tea.png", price: 180, description: "Green Tea", weight: "200ml", discount: "5%", category: "Zepto Cafe" },
     {
        name: "MAGGI-Pazzta-Instant-Pasta",
        image: "/products/MAGGI-Pazzta-Instant-Pasta-Cheese-Macaroni.webp",
        price: 500,
        description: "Delicious instant pasta with cheese macaroni flavor.",
        weight: "-",
        discount: "10%",
        category: "Packaged Food"
      },
      {
        name: "MTR-3-min-Poha",
        image: "/products/MTR-3-min-Poha.webp",
        price: 900,
        description: "Instant poha ready in 3 minutes by MTR.",
        weight: "-",
        discount: "20%",
        category: "Packaged Food"
      },
      {
        name: "NestleMilkmaid-Mini-Sweetened",
        image: "/products/NestleMilkmaid-Mini-Sweetened.webp",
        price: 999,
        description: "Mini pack of sweetened condensed milk by Nestle.",
        weight: "-",
        discount: "15%",
        category: "Packaged Food"
      },
      {
        name: "The-Naturik-Co-Ragi-Protein-Cheela",
        image: "/products/The-Naturik-Co-Ragi-Protein-Cheela.webp",
        price: 1500,
        description: "Healthy Ragi protein cheela mix from The Naturik Co.",
        weight: "-",
        discount: "10%",
        category: "Packaged Food"
      },
      {
        name: "Infino Comet Pecan Ice Cream Tub",
        image: "/products/Infino.png",
        price: 500,
        description: "Rich and creamy pecan-flavored ice cream by Infino.",
        weight: "-",
        discount: "10%",
        category: "Ice Creams & More"
      },
      {
        name: "Go-Zero-Belgian-Dark-Chocolate-Low-Calorie-Guilt-Free-Ice-Cream-Tub",
        image: "/products/Go-Zero.png",
        price: 900,
        description: "Low-calorie Belgian dark chocolate ice cream by Go Zero.",
        weight: "-",
        discount: "20%",
        category: "Ice Creams & More"
      },
      {
        name: "NIC Alphonso Mango Ice Cream Tub",
        image: "/products/iceream.png",
        price: 999,
        description: "Delicious Alphonso mango ice cream tub by NIC.",
        weight: "-",
        discount: "15%",
        category: "Ice Creams & More"
      },
      {
        name: "Cream-Pot-Chocolate-Tub",
        image: "/products/Cream-Pot-Chocolate-Tub.png",
        price: 1500,
        description: "Decadent chocolate ice cream in a tub from Cream Pot.",
        weight: "-",
        discount: "10%",
        category: "Ice Creams & More"
      },
      {
        name: "ITC Master Chef Medium Prawns",
        image: "/products/ITCmaster.png",
        price: 500,
        description: "Delicious medium prawns by ITC Master Chef.",
        weight: "-",
        discount: "10%",
        category: "Frozen Food"
      },
      {
        name: "Zorabian Chicken Spicy Sausages",
        image: "/products/Zorabin.png",
        price: 900,
        description: "Spicy and juicy chicken sausages by Zorabian.",
        weight: "-",
        discount: "20%",
        category: "Frozen Food"
      },
      {
        name: "Prasuma Vegetable And Paneer Momos",
        image: "/products/Prasuma-Vegetable-And-Paneer-Momos.png",
        price: 999,
        description: "Tasty veg and paneer momos by Prasuma.",
        weight: "-",
        discount: "15%",
        category: "Frozen Food"
      },
      {
        name: "ITC-Master-Chef-Crunchy-Chicken-Nuggets",
        image: "/products/ITC-Master-Chef-Crunchy-Chicken-Nuggets-Source-of-Protein-No-Added-Preservatives-25-pieces.webp",
        price: 1500,
        description: "Crunchy chicken nuggets by ITC Master Chef, 25 pieces.",
        weight: "-",
        discount: "10%",
        category: "Frozen Food"
      },
       {
        name: "SFP Chicken Burger Patty",
        image: "https://i.postimg.cc/6qGCmzzG/SFP-Chicken-Burger-Patty.jpg",
        price: 399,
        description: "Crispy and delicious, no artificial colors or flavors, made from premium chicken, perfect for burgers",
        weight: "-",
        discount: "15%",
        category: "Frozen Food"
      },
       {
        name: "Hersheys-Kisses",
        image: "https://i.postimg.cc/CxYnYwm1/Hersheys-Kisses.webp",
        price: 399,
        description: "Sugar, Interesterified Vegetable Fat, Refined Wheat Flour (Maida), Milk Solids, Starch, Cocoa Solids (5%), Palmolein, Emulsifiers (442, 322, 476), Iodised Salt, Yeast, Flavours (Natural, Natural Identical and",
        weight: "-",
        discount: "11",
        category: "Sweet Cravings"
      },
       {
        name: "Badam-Coconut-Barfi",
        image: "https://i.postimg.cc/sfJpnV73/Badam-Coconut-Barfi-8-Pcs-Burfi-Sweets-By-GO-DESi.webp",
        price: 300,
        description: "Sugar, Interesterified Vegetable Fat, Refined Wheat Flour (Maida), Milk Solids, Starch, Cocoa Solids (5%), Palmolein, Emulsifiers (442, 322, 476), Iodised Salt, Yeast, Flavours (Natural, Natural Identical and",
        weight: "-",
        discount: "18",
        category: "Sweet Cravings"
      },
       {
        name: "Bansiwala-Kesar-Angoori-Petha",
        image: "https://i.postimg.cc/vHH5kptf/Bansiwala-Kesar-Angoori-Petha.webp",
        price: 599,
        description: "Sugar, Interesterified Vegetable Fat, Refined Wheat Flour (Maida), Milk Solids, Starch, Cocoa Solids (5%), Palmolein, Emulsifiers (442, 322, 476), Iodised Salt, Yeast, Flavours (Natural, Natural Identical and",
        weight: "-",
        discount: "12",
        category: "Sweet Cravings"
      },
      {
        name: "Bansiwala-Nariyal-Barfi",
        image: "https://i.postimg.cc/jdgybZM9/Bansiwala-Nariyal-Barfi.webp",
        price: 599,
        description: "Store in a cool, hygienic, and dry place. Avoid exposure to direct sunlight and keep in air tight container",
        weight: "-",
        discount: "9",
        category: "Sweet Cravings"
      },
      {
        name: "Son Papadi",
        image: "https://i.postimg.cc/fR1X3knf/Charliee-Soan-Papdi-Premium.webp",
        price: 599,
        description: "Store in a cool, hygienic, and dry place. Avoid exposure to direct sunlight and keep in air tight container",
        weight: "-",
        discount: "12",
        category: "Sweet Cravings"
      },
      {
        name: "Dry-Fruit-Barfi-6-Pcs",
        image: "https://i.postimg.cc/y8DcYc5N/Dry-Fruit-Barfi-6-Pcs-No-Added-Refined-Sugar-Single-Packs-Burfi-Sweets-By-GO-DESi.webp ",
        price: 399,
        description: "Store in a cool, hygienic, and dry place. Avoid exposure to direct sunlight and keep in air tight container",
        weight: "-",
        discount: "10",
        category: "Sweet Cravings"
      },
    {
        name: " Laddo",
        image: " https://i.postimg.cc/B6B1wg8m/ea8859bd-3a63-4c2f-a0b3-de580fbb5bfa.webp",
        price: 799,
        description: "Store in a cool, hygienic, and dry place. Avoid exposure to direct sunlight and keep in air tight container",
        weight: "-",
        discount: "20",
        category: "Sweet Cravings"
      },
    {
        name: "Eat-Better-Co-Coffee-Almond-Laddoos",
        image: "https://i.postimg.cc/26DZwJ5q/Eat-Better-Co-Coffee-Almond-Laddoos-No-Added-Sugar-High-Protein-100-Natural.webp",
        price: 799,
        description: "Store in a cool, hygienic, and dry place. Avoid exposure to direct sunlight and keep in air tight container",
        weight: "-",
        discount: "17",
        category: "Sweet Cravings"
      },
    {
        name: "Farmley-Classic-Delight-Date-Bites- ",
        image: "https://i.postimg.cc/c1TnRFGH/Farmley-Classic-Delight-Date-Bites-Dry-Fruit-Burfi-Dates-Almonds-Cashews-Pistachios-Ghee.webp",
        price: 799,
        description: "Store in a cool, hygienic, and dry place. Avoid exposure to direct sunlight and keep in air tight container",
        weight: "-",
        discount: "9",
        category: "Sweet Cravings"
      },
      {
        name: " Haladiram Gulabgam",
        image: " https://i.postimg.cc/fTL0BYMv/Haldiram-s-Gulab-Jamun.webp",
        price: 299,
        description: "Store in a cool, hygienic, and dry place. Avoid exposure to direct sunlight and keep in air tight container",
        weight: "-",
        discount: "8",
        category: "Sweet Cravings"
      },
    {
        name: "Gits Gulab Jamun ",
        image: "https://i.postimg.cc/N01y54xQ/Mini-Gulab-Jamun-Tin.webp ",
        price: 199,
        description: "Store in a cool, hygienic, and dry place. Avoid exposure to direct sunlight and keep in air tight container",
        weight: "-",
        discount: "5",
        category: "Sweet Cravings"
      },
    {
        name: "Namaskaram-Sesame-Till-Chikki ",
        image: " https://i.postimg.cc/W4RFNKg9/Namaskaram-Sesame-Till-Chikki.webp",
        price: 799,
        description: "Store in a cool, hygienic, and dry place. Avoid exposure to direct sunlight and keep in air tight container",
        weight: "-",
        discount: "17",
        category: "Sweet Cravings"
      },
      {
    name: "Fablue-Construction-Vehicles-Trucks-Toy-for-Kids-4-Pcs-Truck-Cars-for-Kids",
    image: " https://i.postimg.cc/0jh4FJyj/Fablue-Construction-Vehicles-Trucks-Toy-for-Kids-4-Pcs-Truck-Cars-for-Kids.webp",
    price: 1500,
    description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
    weight: "-",
    discount: "9%",
    category: "Toys & Sports"
  },
{
    name: " Hungry-Frogs-Tabletop-Game-Toy-For-Kids-2-",
    image: " https://i.postimg.cc/Vsh2d2Ww/Fablue-Hungry-Frogs-Tabletop-Game-Toy-For-Kids-2-Players-Interactive-Indoor-Fun-Game.webp",
    price: 700,
    description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
    weight: "-",
    discount: "5%",
    category: "Toys & Sports"
  },
  {
    name: " Remote-Control-Small-Stunt-Car-For-Kids-360-Degree-Rotating-Car-Toy-Assorted-Colour-Designs",
    image: " https://i.postimg.cc/zGCQ2vZD/Fablue-Remote-Control-Small-Stunt-Car-For-Kids-360-Degree-Rotating-Car-Toy-Assorted-Colour-Designs.webp",
    price: 900,
    description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
    weight: "-",
    discount: "5%",
    category: "Toys & Sports"
  },
  {
    name: "Spider-Web-Shooters-Toy-For-Kids-Hero-Launcher-Wrist-Toy-Set ",
    image: "https://i.postimg.cc/rpgPcHwv/Fablue-Spider-Web-Shooters-Toy-For-Kids-Hero-Launcher-Wrist-Toy-Set.webp ",
    price: 8000,
    description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
    weight: "-",
    discount: "9%",
    category: "Toys & Sports"
  },
  {
    name: " Bharat-Model-Scooty-Toy-Multicolour",
    image: "https://i.postimg.cc/XvnzRW4f/Toy-Bharat-Model-Scooty-Toy-Multicolour.webp ",
    price: 2000,
    description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
    weight: "-",
    discount: "9%",
    category: "Toys & Sports"
  },
  {
    name: "Toyshine-3-Pcs-Suction-Cup-Glass-Sticking-Bath-Toy-Stick-To-Window-Table-Baby-High-Chair ",
    image: "https://i.postimg.cc/yddrNTJW/Toyshine-3-Pcs-Suction-Cup-Glass-Sticking-Bath-Toy-Stick-To-Window-Table-Baby-High-Chair.webp ",
    price: 999,
    description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
    weight: "-",
    discount: "12%",
    category: "Toys & Sports"
  },
  {
    name: "shine-Beautiful-Summer-Magic-Couple-Fashion-Doll-Toy-Set-For-Baby-Kids-Dolls-House-Collection ",
    image: "https://i.postimg.cc/sxG6YD4r/Toyshine-Beautiful-Summer-Magic-Couple-Fashion-Doll-Toy-Set-For-Baby-Kids-Dolls-House-Collection.webp ",
    price: 5000,
    description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
    weight: "-",
    discount: "34%",
    category: "Toys & Sports"
  },
  {
    name: " Toyshine-Music-And-Lights-Guitar-Toy-Big-Red-Colour-May-Vary",
    image: "https://i.postimg.cc/PNG62sS8/Toyshine-Music-And-Lights-Guitar-Toy-Big-Red-Colour-May-Vary.webp ",
    price: 500,
    description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
    weight: "-",
    discount: "11%",
    category: "Toys & Sports"
  },

  {
    name: "yshine-Pull-Back-Realistic-Design-Aircraft-Toy-with-Display-Stand-Kids-Assorted ",
    image: " https://i.postimg.cc/wxtgfXW6/Toyshine-Pull-Back-Realistic-Design-Aircraft-Toy-with-Display-Stand-Kids-Assorted.webp",
    price: 1700,
    description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
    weight: "-",
    discount: "65%",
    category: "Toys & Sports"
  },
  {
    name: " shine-Rabbits-Musical-Piano-Musical-Toy-Multicolor-",
    image: " https://i.postimg.cc/RCj9jW8w/Toyshine-Rabbits-Musical-Piano-Musical-Toy-Multicolor.webp",
    price: 799,
    description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
    weight: "-",
    discount: "33%",
    category: "Toys & Sports"
  },

  {
    name: "Racer-Ramp-Toy-With-4-Cars-4-Ramps-And-Race-Track-For-1-2-3-Toddlers-Boys-Girls ",
    image: "https://i.postimg.cc/PrYhhts9/Toyshine-Racer-Ramp-Toy-With-4-Cars-4-Ramps-And-Race-Track-For-1-2-3-Toddlers-Boys-Girls.webp ",
    price: 899,
    description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
    weight: "-",
    discount: "22%",
    category: "Toys & Sports"
  },
     { 
     name: " Karatcart-Women-s-Jewellery-Set-Gold-11014814",
     image: "https://i.postimg.cc/VLysSzM9/Karatcart-Women-s-Jewellery-Set-Gold-11014814.webp", 
     price: 800,
     discount: "17%",
     description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
     weight: "-", 
     category: "Jewellery & Accessories"
     },
   { 
     name: "Karatcart-Women-s-Jewellery-Set-White-and-Silver-11014938",
     image: "https://i.postimg.cc/gkvz81qC/Karatcart-Women-s-Jewellery-Set-White-and-Silver-11014938.webp", 
     price: 7000,
     discount: "19%",
     description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
     weight: "-", 
     category: "Jewellery & Accessories"
     },
   { 
     name: "Scintillare-By-Sukkhi-Unique-Style-Gold-Plated-Multilayered-Pendant-Necklace-For-Women",
     image: "https://i.postimg.cc/bwpzTLms/Scintillare-By-Sukkhi-Unique-Style-Gold-Plated-Multilayered-Pendant-Necklace-For-Women.webp", 
     price: 5000,
     discount: "15%",
     description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
     weight: "-", 
     category: "Jewellery & Accessories"
     },
   { 
     name: "Sukkhi-Classic-Gold-Plated-Red-Green-Bracelet-Bangle-Set-Jewellery-for-Women-Girls-2-6",
     image: "https://i.postimg.cc/wBB9KM8z/Sukkhi-Classic-Gold-Plated-Red-Green-Bracelet-Bangle-Set-Jewellery-for-Women-Girls-2-6.webp", 
     price: 900,
     discount: "8%",
     description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
     weight: "-", 
     category: "Jewellery & Accessories"
     },
   { 
     name: "Sukkhi-Floral-Gold-Plated-Red-And-Green-Broad-Bracelets-Bangle-Set-Jewellery-for-Women-2-4",
     image: "https://i.postimg.cc/rwjqYWHg/Sukkhi-Floral-Gold-Plated-Red-And-Green-Broad-Bracelets-Bangle-Set-Jewellery-for-Women-2-4.webp", 
     price: 899,
     discount: "5%",
     description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
     weight: "-", 
     category: "Jewellery & Accessories"
     },
   { 
     name: "Sukkhi-Gold-Plated-Red-Green-Color-White-Thin-Bracelet-Bangle-Set-Jewellery-for-Women-2-6",
     image: "https://i.postimg.cc/ZqD4Jm4d/Sukkhi-Gold-Plated-Red-Green-Color-White-Thin-Bracelet-Bangle-Set-Jewellery-for-Women-2-6.webp", 
     price: 600,
     discount: "19%",
     description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
     weight: "-", 
     category: "Jewellery & Accessories"
     },
   { 
     name: "Sukkhi-Gold-Tone-Plated-White-Broad-Bracelet-Bangle-Set-Jewellery-for-Women-2-6",
     image: "https://i.postimg.cc/ZRBZRQ5D/Sukkhi-Gold-Tone-Plated-White-Broad-Bracelet-Bangle-Set-Jewellery-for-Women-2-6.webp", 
     price: 500,
     discount: "11%",
     description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
     weight: "-", 
     category: "Jewellery & Accessories"
     },
   { 
     name: "Sukkhi-Incredible-Gold-Plated-Austrian-Diamond-Bangles-for-Women-2-8",
     image: "https://i.postimg.cc/852GrbFk/Sukkhi-Incredible-Gold-Plated-Austrian-Diamond-Bangles-for-Women-2-8.webp", 
     price: 5500,
     discount: "15%",
     description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
     weight: "-", 
     category: "Jewellery & Accessories"
     },
   { 
     name: "Sukkhi-Multicolor-Gold-Tone-Plated-Hanging-Beadded-Bangle-Set-Jewellery-for-Women-2-6",
     image: "https://i.postimg.cc/D01TQbsr/Sukkhi-Multicolor-Gold-Tone-Plated-Hanging-Beadded-Bangle-Set-Jewellery-for-Women-2-6.webp", 
     price: 900,
     discount: "18%",
     description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
     weight: "-", 
     category: "Jewellery & Accessories"
     },
{ 
     name: "Traditional-Gold-Plated-Red-Green-Bracelet-Bangle-Set-Jewellery-for-Women-2-6",
     image: "https://i.postimg.cc/PrzHPYdh/Sukkhi-Traditional-Gold-Plated-Red-Green-Bracelet-Bangle-Set-Jewellery-for-Women-2-6.webp", 
     price: 900,
     discount: "18%",
     description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
     weight: "-", 
     category: "Jewellery & Accessories"
     },
{ 
     name: "Youbella-Fashion-Jewellery-Golden-Enamel-Crystal-Bracelets-Bangle-For-Women-Ybbn-91502-",
     image: "https://i.postimg.cc/Gh1rLqwq/Youbella-Fashion-Jewellery-Golden-Enamel-Crystal-Bracelets-Bangle-For-Women-Ybbn-91502.webp", 
     price: 500,
     discount: "15%",
     description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
     weight: "-", 
     category: "Jewellery & Accessories"
     },
     { 
     name: "Rhodium-Plated-Pink-American-Diamond-Necklace-Earrings-Jewellery-Set-for-Women-Girls",
     image: "https://i.postimg.cc/Mp6SRHGB/Zeneme-Rhodium-Plated-Pink-American-Diamond-Necklace-Earrings-Jewellery-Set-for-Women-Girls.webp", 
     price: 5000,
     discount: "11%",
     description: "Brigade IRV, 9th & 10th Floors, Nallurhalli, White Field, Bangalore, Banglore, Karnataka, India, 560066 For Support ReachOut : support+drogheria@zeptonow.com",
     weight: "-", 
     category: "Jewellery & Accessories"
     },
      ]



// Remove old and insert new

const runSeeder = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const allProducts = [
      ...sampleProducts,
      ...flowersProducts,
      ...leafyProducts,
      ...exoticsProducts,
      ...organicProducts,
      ...sproutsProducts,
      ...juicesProducts,
      ...plantsProducts,
      ...saladsProducts,
      ...bloomProducts,
      ...driedProducts,
      ...additionalProducts
    ];

   const cleanedProducts = allProducts.map((product) => ({
  ...product,
  price: parseFloat(product.price.replace("₹", "").trim()),
  vendor: dummyVendorId,
  stock: 10,
}));


    await Product.deleteMany({});
    const inserted = await Product.insertMany(cleanedProducts);

    console.log(`✅ Successfully inserted ${inserted.length} products into the database.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error inserting products:", err);
    process.exit(1);
  }
};

runSeeder();