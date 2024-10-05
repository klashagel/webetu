// MarkdownWithScrollAndGraphs.js
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Plot from 'react-plotly.js';

const MarkdownWithScrollAndGraphs = ({ onContentChange }) => {
  const [content, setContent] = useState('');
  const contentRef = useRef(null);

  // Function to add new text or graph to the content
  const addContent = (newContent) => {
    setContent(prevContent => `${prevContent}\n${newContent}`);
  };

  // Scroll to the bottom when content changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [content]);

  // Call parent function to notify of content changes
  useEffect(() => {
    if (onContentChange) {
      onContentChange(addContent);
    }
  }, [onContentChange]);

  // Custom render for code blocks
  const renderers = {
    code: ({ node, inline, className, children, ...props }) => {
      if (className.includes('graph')) {
        // Render Plotly graph
        return (
          <div style={{ marginBottom: '10px' }}>
            <Plot
              data={[
                {
                  x: [1, 2, 3, 4],
                  y: [10, 15, 13, 17],
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: 'red' },
                },
              ]}
              layout={{ width: 320, height: 240, title: 'Dynamic Graph' }}
            />
          </div>
        );
      }
      return <pre className={className} {...props}>{children}</pre>;
    },
  };

  return (
    <div style={{ height: '100vh', overflowY: 'auto', padding: '10px' }} ref={contentRef}>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        components={renderers}
      />
    </div>
  );
};

export default MarkdownWithScrollAndGraphs;
