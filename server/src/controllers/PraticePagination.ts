import { Request, Response } from "express";

const paginatedData = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "1234567890",
    address: "123 Main St, Anytown, USA",
    city: "Anytown",
    state: "USA",
    zip: "12345",
    country: "USA",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    phone: "0987654321",
    address: "456 Oak St, Anytown, USA",
    city: "Anytown",
    state: "USA",
    zip: "67890",
    country: "USA",
  },
  {
    id: 3,
    name: "Bob Smith",
    email: "bobsmith@gmail.com",
    phone: "9876543210",
    address: "789 Elm St, Anytown, USA",
    city: "Anytown",
    state: "USA",
    zip: "54321",
    country: "USA",
  },
  {
    id: 4,
    name: "Alice Johnson",
    email: "alicejohnson@gmail.com",
    phone: "8765432109",
    address: "901 Pine St, Anytown, USA",
    city: "Anytown",
    state: "USA",
    zip: "09876",
    country: "USA",
  },
  {
    id: 5,
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "1234567890",
    address: "123 Main St, Anytown, USA",
    city: "Anytown",
    state: "USA",
    zip: "12345",
    country: "USA",
  },
  {
    id: 6,
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    phone: "0987654321",
    address: "456 Oak St, Anytown, USA",
    city: "Anytown",
    state: "USA",
    zip: "67890",
    country: "USA",
  },
  {
    id: 7,
    name: "Bob Smith",
    email: "bobsmith@gmail.com",
    phone: "9876543210",
    address: "789 Elm St, Anytown, USA",
    city: "Anytown",
    state: "USA",
    zip: "54321",
    country: "USA",
  },
  {
    id: 8,
    name: "Alice Johnson",
    email: "alicejohnson@gmail.com",
    phone: "8765432109",
    address: "901 Pine St, Anytown, USA",
    city: "Anytown",
    state: "USA",
    zip: "09876",
  },
];

export const getPaginatedData = (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = paginatedData.slice(startIndex, endIndex);
  const total = paginatedData.length;
  const totalPages = Math.ceil(total / limit);
  res.json({
    page,
    limit,
    total,
    totalPages,
    data: results,
  });
};
