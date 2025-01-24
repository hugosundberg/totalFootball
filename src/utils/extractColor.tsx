import Vibrant from "node-vibrant";

export const extractColor = async (
  imageUrl: string
): Promise<string | null> => {
  try {
    const palette = await Vibrant.from(imageUrl).getPalette();
    const dominantColor = palette.Vibrant?.hex;
    return dominantColor || null;
  } catch (error) {
    console.error("Error extracting color:", error);
    return null;
  }
};
