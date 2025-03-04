import { parseMarkdownTable } from '../utils/markdownTableParser';

export function usePromptTransform() {
  const transformResponse = useCallback((response: string) => {
    // Recherche un tableau markdown dans la réponse
    const tableMatch = response.match(/\|.*\|[\s\S]*?\n(?!\|)/);
    
    if (!tableMatch) {
      return response;
    }

    const tableData = parseMarkdownTable(tableMatch[0]);
    if (!tableData) {
      return response;
    }

    // Remplace le tableau markdown par le composant React
    const beforeTable = response.slice(0, tableMatch.index);
    const afterTable = response.slice(tableMatch.index + tableMatch[0].length);

    return {
      beforeText: beforeTable,
      tableData,
      afterText: afterTable
    };
  }, []);

  return { transformResponse };
} 