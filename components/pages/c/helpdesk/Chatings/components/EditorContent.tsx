'use client';
import React, { useState, useRef, useEffect } from 'react';

interface EditorContentProps {
  onTextChange: (text: string) => void;
  onFormatCheck: () => void;
  placeholder?: string;
}

export function EditorContent({ 
  onTextChange, 
  onFormatCheck, 
  placeholder = 'Start typing...' 
}: EditorContentProps) {
  const [isEmpty, setIsEmpty] = useState(true);
  const editorRef = useRef<HTMLDivElement>(null);

  const checkEmpty = () => {
    if (editorRef.current) {
      const content = editorRef.current.textContent || '';
      setIsEmpty(content.trim() === '');
    }
  };

  useEffect(() => {
    checkEmpty();
  }, []);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.textContent || '';
    onTextChange(content);
    checkEmpty();
  };

  return (
    <div className="relative">
      {isEmpty && (
        <div className="absolute top-0 left-0  text-gray-400 pointer-events-none">
          {placeholder}
        </div>
      )}
      <div
        ref={editorRef}
        className=" focus:outline-none prose prose-sm max-w-none"
        contentEditable
        onInput={handleInput}
        onKeyUp={onFormatCheck}
        onMouseUp={onFormatCheck}
        role="textbox"
        aria-multiline="true"
        aria-placeholder={placeholder}
      />
    </div>
  );
}