
import { NextResponse } from 'next/server';
import { getUserByEmail, saveUser, UserData } from '@/lib/storage';
import { calculateScores } from '@/lib/psychometric-engine';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');
        if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

        const user = await getUserByEmail(email);
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        if (user.isCompleted && !user.scores) {
            user.scores = calculateScores(user.responses);
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return NextResponse.json({
                status: existingUser.isCompleted ? 'completed' : 'in-progress',
                userData: existingUser
            });
        }

        const newUser: UserData = {
            email,
            responses: {},
            isCompleted: false,
            timestamp: new Date().toISOString()
        };
        await saveUser(newUser);

        return NextResponse.json({ status: 'new', userData: newUser });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { email, responses, isCompleted } = await req.json();
        if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

        const existingUser = await getUserByEmail(email);

        const updatedUser: UserData = {
            email,
            responses: responses || existingUser?.responses || {},
            isCompleted: isCompleted ?? existingUser?.isCompleted ?? false,
            timestamp: new Date().toISOString(),
            scores: isCompleted ? calculateScores(responses) : existingUser?.scores
        };

        await saveUser(updatedUser);
        return NextResponse.json({ success: true, userData: updatedUser });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
