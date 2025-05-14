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
    ];

    const cleanedProducts = allProducts.map((product) => ({
      ...product,
      price: parseFloat(product.price.replace("₹", "").trim()),
      vendor: dummyVendorId,
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