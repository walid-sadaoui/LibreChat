import InteractiveTable from '../InteractiveTable';
import { usePromptTransform } from '../../hooks/usePromptTransform';

export default function ChatMessage({ message, onAction }) {
  const { transformResponse } = usePromptTransform();
  
  const content = useMemo(() => {
    const transformed = transformResponse(message.content);
    
    if (typeof transformed === 'string') {
      return <div>{transformed}</div>;
    }

    return (
      <>
        <div>{transformed.beforeText}</div>
        <InteractiveTable
          headers={transformed.tableData.headers}
          rows={transformed.tableData.rows}
          onAction={(row) => {
            // Déclencher un nouveau prompt avec les données de la ligne
            onAction(row);
          }}
        />
        <div>{transformed.afterText}</div>
      </>
    );
  }, [message.content, onAction, transformResponse]);

  return <div className="chat-message">{content}</div>;
} 