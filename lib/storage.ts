import { MongoClient, Db, Collection } from 'mongodb';

export interface UserData {
    email: string;
    responses: Record<string, number>;
    isCompleted: boolean;
    timestamp: string;
    scores?: any;
}

// MongoDB client singleton
let client: MongoClient | null = null;
let db: Db | null = null;

async function getDatabase(): Promise<Db> {
    if (db) return db;

    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error('MONGODB_URI environment variable is not set');
    }

    try {
        client = new MongoClient(mongoUri);
        await client.connect();
        db = client.db('psychometric_platform');

        console.log('✅ MongoDB connected successfully');

        // Create index on email for faster lookups
        const collection = db.collection<UserData>('users');
        await collection.createIndex({ email: 1 }, { unique: true });

        return db;
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        throw error;
    }
}

async function getUsersCollection(): Promise<Collection<UserData>> {
    const database = await getDatabase();
    return database.collection<UserData>('users');
}

/**
 * Get user data by email from MongoDB
 */
export async function getUserByEmail(email: string): Promise<UserData | null> {
    try {
        const collection = await getUsersCollection();
        const user = await collection.findOne({ email: email.toLowerCase() });
        return user;
    } catch (error) {
        console.error('Error fetching user from MongoDB:', error);
        return null;
    }
}

/**
 * Save or update user data in MongoDB
 */
export async function saveUser(userData: UserData): Promise<void> {
    try {
        const collection = await getUsersCollection();
        const email = userData.email.toLowerCase();

        // Upsert: update if exists, insert if not
        await collection.updateOne(
            { email },
            {
                $set: {
                    ...userData,
                    email,
                    updatedAt: new Date().toISOString()
                }
            },
            { upsert: true }
        );

        console.log(`✅ User data saved successfully for: ${userData.email}`);
    } catch (error) {
        console.error('❌ Error saving user to MongoDB:', error);
        throw new Error('Failed to save user data');
    }
}

/**
 * Get all users (optional - for admin purposes)
 */
export async function getAllUsers(): Promise<UserData[]> {
    try {
        const collection = await getUsersCollection();
        const users = await collection.find({}).toArray();
        return users;
    } catch (error) {
        console.error('Error fetching all users:', error);
        return [];
    }
}

/**
 * Delete user data (optional - for GDPR compliance)
 */
export async function deleteUser(email: string): Promise<boolean> {
    try {
        const collection = await getUsersCollection();
        const result = await collection.deleteOne({ email: email.toLowerCase() });
        return result.deletedCount > 0;
    } catch (error) {
        console.error('Error deleting user:', error);
        return false;
    }
}

/**
 * Close MongoDB connection (for cleanup)
 */
export async function closeMongoDB(): Promise<void> {
    if (client) {
        await client.close();
        client = null;
        db = null;
        console.log('MongoDB connection closed');
    }
}
