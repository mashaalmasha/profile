import { NextResponse } from 'next/server';
import * as fal from '@fal-ai/serverless-client';

fal.config({
  credentials: process.env.FAL_KEY,
});

export async function POST(request: Request) {
  const { image, style } = await request.json();

  if (!image || !style) {
    return NextResponse.json(
      { error: 'Missing image or style' },
      { status: 400 }
    );
  }

  if (!process.env.FAL_KEY) {
    return NextResponse.json(
      { error: 'FAL_KEY environment variable not set' },
      { status: 500 }
    );
  }

  try {
    console.log('Starting Fal.ai request with style:', style);
    console.log('Image data length:', image.length);
    
    // Create simple, natural language instructions for HiDream-E1-1
    const styleInstructions = {
      ghibli: `Convert this image into Studio Ghibli animation style`,
      mosaic: `Transform this image into mosaic art style`
    };

    const selectedInstruction = styleInstructions[style.toLowerCase() as keyof typeof styleInstructions] || 
      `Convert this image into ${style.toLowerCase()} style`;

    // Use HiDream-E1-1 with direct base64 input
    const result = await fal.subscribe('fal-ai/hidream-e1-1', {
      input: {
        image_url: image, // Direct base64 data URI
        edit_instruction: selectedInstruction,
        negative_prompt: "low resolution, blur, distorted face",
        num_inference_steps: 50,
        guidance_scale: 3.5,
        enable_safety_checker: true,
        output_format: "jpeg",
      },
    });

    console.log('Fal.ai response:', JSON.stringify(result, null, 2));

    if (result.images && result.images.length > 0) {
      return NextResponse.json({ 
        transformedImage: result.images[0].url 
      });
    } else {
      console.error('No images in response:', result);
      return NextResponse.json(
        { error: 'No image generated', details: result },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Fal.ai error details:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { error: 'Failed to transform image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
