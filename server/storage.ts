import { 
  users, 
  parents, 
  loginAttempts, 
  type User, 
  type InsertUser, 
  type Parent, 
  type InsertParent, 
  type LoginAttempt, 
  type InsertLoginAttempt 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Parent methods
  getParentById(id: string): Promise<Parent | undefined>;
  getParentByEmail(email: string): Promise<Parent | undefined>;
  createParent(parent: InsertParent): Promise<Parent>;
  getAllParents(): Promise<Parent[]>;
  
  // Login attempt methods
  createLoginAttempt(loginAttempt: InsertLoginAttempt): Promise<LoginAttempt>;
  getUnprocessedLoginAttempts(): Promise<LoginAttempt[]>;
  markLoginAttemptAsProcessed(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Parent methods
  async getParentById(id: string): Promise<Parent | undefined> {
    const [parent] = await db.select().from(parents).where(eq(parents.id, id));
    return parent;
  }
  
  async getParentByEmail(email: string): Promise<Parent | undefined> {
    const [parent] = await db.select().from(parents).where(eq(parents.email, email));
    return parent;
  }
  
  async createParent(insertParent: InsertParent): Promise<Parent> {
    const [parent] = await db.insert(parents).values(insertParent).returning();
    return parent;
  }
  
  async getAllParents(): Promise<Parent[]> {
    return await db.select().from(parents);
  }
  
  // Login attempt methods
  async createLoginAttempt(insertLoginAttempt: InsertLoginAttempt): Promise<LoginAttempt> {
    const [loginAttempt] = await db.insert(loginAttempts).values(insertLoginAttempt).returning();
    return loginAttempt;
  }
  
  async getUnprocessedLoginAttempts(): Promise<LoginAttempt[]> {
    return await db.select().from(loginAttempts).where(eq(loginAttempts.processed, 0));
  }
  
  async markLoginAttemptAsProcessed(id: string): Promise<void> {
    await db.update(loginAttempts)
      .set({ processed: 1 })
      .where(eq(loginAttempts.id, id));
  }
}

export const storage = new DatabaseStorage();
