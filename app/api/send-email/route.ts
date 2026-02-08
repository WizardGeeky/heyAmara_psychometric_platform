import { NextRequest, NextResponse } from 'next/server';
import { sendResultEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const { email, scores } = await request.json();

        if (!email || !scores) {
            return NextResponse.json(
                { error: 'Email and scores are required' },
                { status: 400 }
            );
        }

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const resultUrl = `${baseUrl}/results?u=${encodeURIComponent(email)}`;

        const result = await sendResultEmail(email, resultUrl, scores);

        if (result.success) {
            return NextResponse.json({ success: true, message: 'Email sent successfully' });
        } else {
            return NextResponse.json(
                { error: 'Failed to send email', details: result.error },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Email API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
