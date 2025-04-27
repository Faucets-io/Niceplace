import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Serve the main index.html file at the root
  app.get('/', (req, res) => {
    res.sendFile('index.html', { root: '.' });
  });

  // Also serve it at /index.html path explicitly
  app.get('/index.html', (req, res) => {
    res.sendFile('index.html', { root: '.' });
  });

  const httpServer = createServer(app);

  return httpServer;
}
