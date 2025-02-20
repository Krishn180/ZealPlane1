import Amavas from "../assets/Amavas.jpeg";
import Amawas2 from "../assets/Amawas2.jpeg";
import KKPD from "../assets/KKPD.jpeg";
import Chullu1 from "../assets/Chullu1.jpeg";
import gmofdeath from "../assets/gmofdeath.jpg";

const products = [
  {
    id: 1,
    title: "Amawas",
    author: "Unknown", // Replace with actual author name
    price: 170,
    description:
      "A thrilling mystery novel full of suspense and unexpected twists.",
    image: Amavas, // Use imported image
    category: "Thriller",
    stock: 10,
  },
  {
    id: 2,
    title: "Amawas 2",
    author: "Unknown", // Replace with actual author name
    price: 170,
    description:
      "A thrilling mystery novel full of suspense and unexpected twists.",
    image: Amawas2, // Use imported image
    category: "Thriller",
    stock: 10,
  },
  {
    id: 3,
    title: "Khoon Ki Pyasi Doulat",
    author: "Unknown", // Replace with actual author name
    price: 120,
    description:
      "A spine-chilling horror story revolving around greed and bloodlust.",
    image: KKPD, // Use imported image
    category: "Horror",
    stock: 7,
  },
  {
    id: 4,
    title: "Chullu Aur Khadoos Uncle",
    author: "Unknown", // Replace with actual author name
    price: 120,
    description: "A humorous tale featuring Chullu and his grumpy uncle.",
    image: Chullu1, // Use imported image
    category: "Comedy",
    stock: 15,
  },
  {
    id: 5,
    title: "Game of Death",
    author: "Krishna", // Replace with actual author name
    price: 300,
    description:
      "An action-packed thriller filled with danger and high-stakes games.",
    image: gmofdeath, // Use imported image
    category: "Action",
    stock: 5,
  },
];

export default products;
