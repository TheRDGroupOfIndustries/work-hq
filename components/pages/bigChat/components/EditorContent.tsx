'use client';
import React, { useState, useRef, useEffect } from 'react';

interface EditorContentProps {
  onTextChange: (text: string) => void;
  onFormatCheck: () => void;
  placeholder?: string;
  initialText?: string;
}

export function EditorContent({ 
  onTextChange, 
  onFormatCheck, 
  placeholder = 'Start typing...',
  initialText = ''
}: EditorContentProps) {
  const [isEmpty, setIsEmpty] = useState(!initialText);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && initialText) {
      editorRef.current.innerHTML = initialText;
      checkEmpty();
    }
  }, [initialText]);

  const checkEmpty = () => {
    if (editorRef.current) {
      const content = editorRef.current.textContent || '';
      setIsEmpty(content.trim() === '');
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.textContent || '';
    onTextChange(content);
    checkEmpty();
  };

  return (
    <div className="relative">
      {isEmpty && (
        <div className="absolute top-0 left-0 text-gray-400 pointer-events-none">
          {placeholder}
        </div>
      )}
      <div
        ref={editorRef}
        className="focus:outline-none prose prose-sm max-w-none"
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