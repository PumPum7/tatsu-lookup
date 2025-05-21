import { NextResponse } from 'next/server';
import nodeHtmlToImage from 'node-html-to-image';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const tatsuKey = process.env.TATSU_KEY;
  if (!tatsuKey) {
    console.error('TATSU_KEY is not set');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.tatsu.gg/v1/users/${userId}/profile`, {
      headers: {
        Authorization: tatsuKey,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      console.error(`Tatsu API error: ${response.status} ${response.statusText}`);
      return NextResponse.json({ error: 'Failed to fetch user data' }, { status: response.status });
    }

    const userData = await response.json();

    const calculatedLevel = Math.floor(Math.sqrt(((userData.xp as number) * 9) / 625));

    const htmlContent = `
      <div style="width: 400px; height: 250px; background-color: #2F3136; color: #FFFFFF; padding: 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; display: flex; flex-direction: column; align-items: center; text-align: center; border-radius: 10px;">
        <img src="${userData.avatar_url}" alt="${userData.username}'s avatar" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 10px; border: 2px solid #FFFFFF;">
        <h1 style="font-size: 24px; margin: 0 0 5px 0; font-weight: bold;">${userData.username}</h1>
        <div style="font-size: 14px; line-height: 1.6;">
          <p style="margin: 2px 0;">Level: ${calculatedLevel}</p>
          <p style="margin: 2px 0;">XP: ${userData.xp.toLocaleString()}</p>
          <p style="margin: 2px 0;">Credits: ${userData.credits.toLocaleString()}</p>
          <p style="margin: 2px 0;">Reputation: ${userData.reputation.toLocaleString()}</p>
        </div>
      </div>
    `;

    try {
      const image = await nodeHtmlToImage({
        html: htmlContent,
        puppeteerArgs: {
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
        type: 'png',
      });

      return new Response(image as Buffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
        },
      });
    } catch (imageError) {
      console.error('Error generating image:', imageError);
      return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error fetching user data or generating image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
