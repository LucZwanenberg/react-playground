// src/server.ts
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests from any localhost port
    if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Mock data
const mockUser = {
  id: 14,
  email: 'bob.roberston@example.com',
  first_name: 'Bob',
  last_name: 'Robertson'
};

// Define the route for GET /authentication/user
app.get('/authentication/user', (req: Request, res: Response) => {
  res.json(mockUser);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
