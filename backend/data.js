import bcrypt from 'bcryptjs'
const data = {
    users:[
          {
            "name": "John Doe",
            "email": "admin@example.com",
            "password": bcrypt.hashSync('123456'),
            "isAdmin": true,
            "role":"admin"
          },
          {
            "name": "Jane Doe",
            "email": "janedoe@example.com",
            "password": bcrypt.hashSync('123456'),
            "isAdmin": false
          }
    
    ],
    products: [
        {
            "name": "Smart Security Camera",
            "slug": "Smart-Home-Security-Camera",
            "brand": "Zara",
            "category": "Shirt",
            "price": 109.99,
            "images": ["/img/products/f1.jpg", "/img/products/f2.jpg", "/img/products/f3.jpg", "/img/products/f4.jpg"],
            "description": "Experience high-quality sound with noise cancellation and up to 20 hours of battery life.",
            "countInStock": 15,
            "rating": 2,
            "numReviews": 120,
            "size": "M",
            "isFeatured":true
        },
        {
            "name": "Smart Home Security Camera",
            "slug": "Smart-Home-Security-Camera-2",
            "brand": "Zara",
            "category": "Shirt",
            "price": 109.99,
            "images": ["/img/products/f2.jpg", "/img/products/n1.jpg", "/img/products/n2.jpg", "/img/products/n3.jpg"],
            "description": "Experience high-quality sound with noise cancellation and up to 20 hours of battery life.",
            "countInStock": 0,
            "rating": 2.5,
            "numReviews": 120,
            "size": "L",
            "isFeatured":true
        },
        {
            "name": "Smart Home Security",
            "slug": "Smart-Home-Security-Camera-3",
            "brand": "Zara",
            "category": "Shirt",
            "price": 109.99,
            "images": ["/img/products/f3.jpg", "/img/products/n4.jpg", "/img/products/n5.jpg", "/img/products/n6.jpg"],
            "description": "Experience high-quality sound with noise cancellation and up to 20 hours of battery life.",
            "countInStock": 15,
            "rating": 4,
            "numReviews": 120,
            "size": "SM",
            "isFeatured":true
        },
        {
            "name": "Smart Home Security Watch",
            "slug": "Smart-Home-Security-Camera-4",
            "brand": "Zara",
            "category": "Shirt",
            "price": 109.99,
            "images": ["/img/products/f4.jpg", "/img/products/n7.jpg", "/img/products/n8.jpg", "/img/products/n1.jpg"],
            "description": "Experience high-quality sound with noise cancellation and up to 20 hours of battery life.",
            "countInStock": 15,
            "rating": 4.5,
            "numReviews": 120,
            "size": "XL",
            "isFeatured":true
        },
        {
            "name": "Smart Home Security Pants",
            "slug": "Smart-Home-Security-Camera-5",
            "brand": "Zara",
            "category": "Shirt",
            "price": 109.99,
            "images": ["/img/products/f5.jpg", "/img/products/n2.jpg", "/img/products/n4.jpg", "/img/products/n8.jpg"],
            "description": "Experience high-quality sound with noise cancellation and up to 20 hours of battery life.",
            "countInStock": 15,
            "rating": 5,
            "numReviews": 120,
            "size": "XXL",
            "isFeatured":true
        },
        {
            "name": "Smart Home Security Trousers",
            "slug": "Smart-Home-Security-Camera-6",
            "brand": "Zara",
            "category": "Shirt",
            "price": 109.99,
            "images": ["/img/products/f6.jpg", "/img/products/f4.jpg", "/img/products/n1.jpg", "/img/products/n3.jpg"],
            "description": "Experience high-quality sound with noise cancellation and up to 20 hours of battery life.",
            "countInStock": 15,
            "rating": 1,
            "numReviews": 120,
            "size": "XS",
            "isFeatured":true
        },
        {
            "name": "Smart Home Security Shoes",
            "slug": "Smart-Home-Security-Camera-7",
            "brand": "Zara",
            "category": "Shirt",
            "price": 109.99,
            "images": ["/img/products/f7.jpg", "/img/products/n3.jpg", "/img/products/n5.jpg", "/img/products/n6.jpg"],
            "description": "Experience high-quality sound with noise cancellation and up to 20 hours of battery life.",
            "countInStock": 15,
            "rating": 1.5,
            "numReviews": 120,
            "size": "XXXL",
            "isFeatured":true
        },
        {
            "name": "Smart Home Security Jewelry",
            "slug": "Smart-Home-Security-Camera-8",
            "brand": "Zara",
            "category": "Shirt",
            "price": 9.99,
            "images": ["/img/products/f8.jpg", "/img/products/f5.jpg", "/img/products/n2.jpg", "/img/products/n7.jpg"],
            "description": "Experience high-quality sound with noise cancellation and up to 20 hours of battery life.",
            "countInStock": 15,
            "rating": 3,
            "numReviews": 120,
            "size": "L",
            "isFeatured":true
        }
    ],
    arrivals: [
        {
            id: 1,
            name: 'Wireless Bluetooth Headphones',
            slug: 'wireless-bluetooth-headphones',
            price: 49.99,
            image: '/img/products/n1.jpg',
            description: 'Experience high-quality sound with noise cancellation and up to 20 hours of battery life.',
            countInStock: 15,
            rating: 4.7,
            numReviews: 120
        },
        {
            id: 2,
            name: 'Smartwatch Pro 2024',
            slug: 'smartwatch-pro-2024',
            price: 199.99,
            image: '/img/products/n2.jpg',
            description: 'Stay connected and track your fitness with this feature-packed smartwatch.',
            countInStock: 25,
            rating: 4.6,
            numReviews: 85
        },
        {
            id: 3,
            name: '4K Ultra HD Smart TV',
            slug: '4k-ultra-hd-smart-tv',
            price: 499.99,
            image: '/img/products/n3.jpg',
            description: 'Enjoy stunning 4K resolution with built-in streaming apps and voice control.',
            countInStock: 10,
            rating: 4.8,
            numReviews: 200
        },
        {
            id: 4,
            name: 'Gaming Laptop Xtreme',
            slug: 'gaming-laptop-xtreme',
            price: 1299.99,
            image: '/img/products/n4.jpg',
            description: 'Powerful gaming laptop with a high-refresh display and next-gen graphics.',
            countInStock: 5,
            rating: 4.9,
            numReviews: 60
        },
        {
            id: 5,
            name: 'Wireless Charging Dock',
            slug: 'wireless-charging-dock',
            price: 49.99,
            image: '/img/products/n5.jpg',
            description: 'Fast wireless charging for your phone, smartwatch, and earbuds.',
            countInStock: 30,
            rating: 4.5,
            numReviews: 75
        },
        {
            id: 6,
            name: 'Ergonomic Office Chair',
            slug: 'ergonomic-office-chair',
            price: 229.99,
            image: '/img/products/n6.jpg',
            description: 'Stay comfortable and productive with this adjustable ergonomic chair.',
            countInStock: 12,
            rating: 4.7,
            numReviews: 95
        },
        {
            id: 7,
            name: 'Portable Espresso Machine',
            slug: 'portable-espresso-machine',
            price: 89.99,
            image: '/img/products/n7.jpg',
            description: 'Brew delicious espresso anywhere with this compact and easy-to-use machine.',
            countInStock: 18,
            rating: 4.6,
            numReviews: 50
        },
        {
            id: 8,
            name: 'Smart Home Security Camera',
            slug: 'smart-home-security-camera',
            price: 129.99,
            image: '/img/products/n8.jpg',
            description: 'Keep your home secure with 1080p live streaming and motion detection alerts.',
            countInStock: 20,
            rating: 4.7,
            numReviews: 110
        }
    ]
};

export default data;