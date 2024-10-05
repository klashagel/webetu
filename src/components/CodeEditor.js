import React, { useRef, useCallback } from 'react';
import MonacoEditor from '@monaco-editor/react';

// Memoized version of CodeEditor to avoid unnecessary re-renders
const CodeEditor = React.memo(({ language = 'lua', theme = 'vs-dark', value, onChange }) => {
    const editorRef = useRef(null);

    // Callback for editor mount
    const handleEditorDidMount = useCallback((editor, monaco) => {
        editorRef.current = editor;
    }, []);

    // Callback for editor change
    const handleEditorChange = useCallback((value, event) => {
        if (onChange) {
            onChange(value);
        }
    }, [onChange]);

    return (
        <MonacoEditor
            height="80%"
            language={language}
            theme={theme}
            value={value}
            onChange={handleEditorChange}
            editorDidMount={handleEditorDidMount}
        />
    );
}, (prevProps, nextProps) => {
    // Only re-render if `value` has changed
    return prevProps.value === nextProps.value;
});

export default CodeEditor;
