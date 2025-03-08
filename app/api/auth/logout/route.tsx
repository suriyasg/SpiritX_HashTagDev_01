import { NextResponse,NextRequest } from 'next/server';

export async function POST(req:NextRequest) {
  try {
    // Create a response object
    const response = NextResponse.json({ message: 'Cookie deleted successfully' });

    // Delete the cookie by setting it with an expiration date in the past
    response.cookies.set('username', '', {
      expires: new Date(0), // Set expiration date to the past
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    response.cookies.set('token', '', {
        expires: new Date(0),
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete cookie' }, { status: 500 });
  }
}