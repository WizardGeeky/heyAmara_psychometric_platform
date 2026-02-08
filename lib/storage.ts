
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'results.jsonl');

export interface UserData {
    email: string;
    responses: Record<string, number>;
    isCompleted: boolean;
    timestamp: string;
    scores?: any;
}

async function ensureDir() {
    const dir = path.join(process.cwd(), 'data');
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir);
    }
}

async function readAllUsers(): Promise<UserData[]> {
    try {
        const content = await fs.readFile(DATA_FILE, 'utf-8');
        return content
            .split('\n')
            .filter(line => line.trim())
            .map(line => JSON.parse(line));
    } catch (e) {
        return [];
    }
}

export async function getUserByEmail(email: string): Promise<UserData | null> {
    const users = await readAllUsers();
    return users.reverse().find(u => u.email === email) || null;
}

export async function saveUser(userData: UserData) {
    await ensureDir();
    const line = JSON.stringify(userData) + '\n';
    await fs.appendFile(DATA_FILE, line);
}
