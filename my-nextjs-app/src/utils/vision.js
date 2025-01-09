import { ImageAnnotatorClient } from '@google-cloud/vision';
import fs from 'fs';
import path from 'path';

/**
 * Initializes the Google Vision client
 */
const visionClient = new ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Path to your Google Vision API key
});

/**
 * Detects text from an image file.
 * @param {string} imagePath - Path to the image file.
 * @returns {Promise<string>} - Detected text as a string.
 */
export const detectTextFromImage = async (imagePath) => {
  try {
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image not found at path: ${imagePath}`);
    }

    const [result] = await visionClient.textDetection(imagePath);
    const detectedText = result.fullTextAnnotation?.text || '';

    return detectedText;
  } catch (error) {
    console.error('Error detecting text from image:', error);
    throw new Error('Error processing the image.');
  }
};

/**
 * Processes a question image for LaTeX rendering.
 * @param {string} imagePath - Path to the image file.
 * @returns {Promise<{ latex: string, hint: string }>} - Processed LaTeX and hint.
 */
export const processQuestionImage = async (imagePath) => {
  try {
    const detectedText = await detectTextFromImage(imagePath);

    // Example preprocessing for LaTeX
    const latexQuestion = detectedText.replace(/_/g, '\\_');

    return {
      latex: latexQuestion,
      hint: 'Start by analyzing the main components of the problem.',
    };
  } catch (error) {
    console.error('Error processing question image:', error);
    throw new Error('Error generating LaTeX from the image.');
  }
};
