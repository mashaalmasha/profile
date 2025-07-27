import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(request: Request) {
  const { image, style } = await request.json();

  if (!image || !style) {
    return NextResponse.json(
      { error: 'Missing image or style' },
      { status: 400 }
    );
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const imageParts = [
    {
      inlineData: {
        data: image.split(',')[1],
        mimeType: image.match(/data:(.*);base64,/)?.[1] || 'image/png',
      },
    },
  ];

  const prompt = `Apply a ${style} style to this image.`

  try {
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ transformedImage: text });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to transform image' },
      { status: 500 }
    );
  }
}
