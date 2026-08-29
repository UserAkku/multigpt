export function FormattedText({ text }: { text: string }) {
  if (!text) return null;
  const lines = text.split("\n");
  
  return (
    <>
      {lines.map((line, i) => {
        if (!line.trim()) return <br key={i} />;
        
        // Handle list items
        const isList = line.trim().startsWith("- ");
        const content = isList ? line.trim().substring(2) : line;
        
        // Parse bold and code
        const parts = content.split(/(\*\*.*?\*\*|`.*?`)/g);
        
        const formattedParts = parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j}>{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith("`") && part.endsWith("`")) {
            return <code style={{background: 'rgba(0,0,0,0.05)', padding: '2px 4px', borderRadius: '4px'}} key={j}>{part.slice(1, -1)}</code>;
          }
          return part;
        });

        if (isList) {
          return <li key={i} style={{ marginLeft: "20px", marginBottom: "4px" }}>{formattedParts}</li>;
        }
        
        return <p key={i} style={{ margin: "0 0 8px 0" }}>{formattedParts}</p>;
      })}
    </>
  );
}
