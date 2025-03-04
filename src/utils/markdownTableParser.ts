interface TableData {
  headers: string[];
  rows: Record<string, string>[];
}

export function parseMarkdownTable(markdownText: string): TableData | null {
  const lines = markdownText.trim().split('\n');
  if (lines.length < 3) return null;

  // Extract headers
  const headers = lines[0]
    .split('|')
    .filter(cell => cell.trim())
    .map(header => header.trim());

  // Skip separator line
  const rows = lines.slice(2).map(line => {
    const cells = line
      .split('|')
      .filter(cell => cell.trim())
      .map(cell => cell.trim());
    
    return headers.reduce((acc, header, index) => {
      acc[header] = cells[index] || '';
      return acc;
    }, {} as Record<string, string>);
  });

  return { headers, rows };
} 