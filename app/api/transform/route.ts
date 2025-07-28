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
    
    // Define model configurations for each style
    const styleConfigs = {
      'studio-ghibli': {
        model: 'fal-ai/image-editing/style-transfer',
        params: {
          image_url: image,
          style_image_url: 'https://example.com/ghibli-style.jpg', // You may want to provide actual style reference images
          prompt: 'Studio Ghibli anime art style',
          strength: 0.8
        }
      },
      'van-gogh': {
        model: 'fal-ai/image-editing/style-transfer',
        params: {
          image_url: image,
          prompt: 'Van Gogh Starry Night painting style with swirling brushstrokes',
          strength: 0.8
        }
      },
      'professional': {
        model: 'fal-ai/image-editing/professional-photo',
        params: {
          image_url: image,
          enhance_lighting: true,
          enhance_details: true,
          remove_noise: true
        }
      },
      'cartoon': {
        model: 'fal-ai/image-editing/cartoonify',
        params: {
          image_url: image,
          cartoon_style: 'modern',
          edge_enhancement: 0.7
        }
      },
      'plushie': {
        model: 'fal-ai/image-editing/plushie-style',
        params: {
          image_url: image,
          softness: 0.8,
          texture: 'fabric'
        }
      },
      'old-version': {
        model: 'fal-ai/image-editing/age-progression',
        params: {
          image_url: image,
          target_age: 70,
          progression_strength: 0.7
        }
      },
      'baby-version': {
        model: 'fal-ai/image-editing/baby-version',
        params: {
          image_url: image,
          baby_features: 0.8,
          softness: 0.9
        }
      },
      'realism': {
        model: 'fal-ai/image-editing/realism',
        params: {
          image_url: image,
          realism_strength: 0.8,
          detail_enhancement: true
        }
      },
      'pixel-studio': {
        model: 'fal-ai/image-editing/style-transfer',
        params: {
          image_url: image,
          prompt: 'pixel art, 8-bit retro game style',
          strength: 0.9
        }
      },
      '3d-animated': {
        model: 'fal-ai/hidream-e1-1',
        params: {
          image_url: image,
          edit_instruction: 'Convert the image into a 3D animated style.',
          negative_prompt: 'low resolution, blur, distorted face',
          num_inference_steps: 50,
          guidance_scale: 3.5,
          enable_safety_checker: true,
          output_format: 'jpeg'
        }
      }
    };

    const config = styleConfigs[style as keyof typeof styleConfigs];
    
    if (!config) {
      return NextResponse.json(
        { error: `Unsupported style: ${style}` },
        { status: 400 }
      );
    }

    // Use the appropriate model and parameters
    const result = await fal.subscribe(config.model, {
      input: config.params,
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
