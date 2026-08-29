/** 
 * Extracts text content from a File object for use in AI context.
 * Supports text-based formats. Returns undefined if unsupported or if reading fails.
 */
export async function extractFileContent(file: File): Promise<string | undefined> {
  const supportedTypes = ["text/plain", "text/markdown", "text/csv", "application/json"];
  const isSupportedExtension = file.name.endsWith(".md") || file.name.endsWith(".txt") || file.name.endsWith(".csv") || file.name.endsWith(".json");
  
  if (!supportedTypes.includes(file.type) && !isSupportedExtension) {
    return undefined; // Not a supported text file
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (!content) {
        resolve(undefined);
        return;
      }
      // Cap at 8,000 characters to prevent blowing out the context window
      resolve(content.slice(0, 8000));
    };
    reader.onerror = () => resolve(undefined);
    reader.readAsText(file);
  });
}
