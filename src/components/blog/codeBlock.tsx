"use client";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  MdCopyAll,
  MdOutlineZoomInMap,
  MdOutlineZoomOutMap,
} from "react-icons/md";

export interface CodeBlockProps {
  code: string;
}

export default function CodeBlock(props: CodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // useEffect(() => {
  //   setValue(props.code);
  // }, [props.code]);

  const onCopy = () => {
    try {
    } catch (error) {}
  };

  return (
    <div className={`code-container mb-2 ${isExpanded ? "expanded" : ""}`}>
      <div className="code-buttons">
        <button
          className="btn rounded-none text-stone-200 bg-stone-950 hover:bg-stone-950 hover:border-stone-500 border border-stone-950"
          title="Copy Code"
          onClick={onCopy}
        >
          <MdCopyAll />
        </button>
        <button
          title={isExpanded ? "Shrink Code" : "Expand Code"}
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn rounded-none text-stone-200 bg-stone-950 hover:bg-stone-950 hover:border-stone-500 border border-stone-950"
        >
          {isExpanded ? <MdOutlineZoomInMap /> : <MdOutlineZoomOutMap />}
        </button>
      </div>
      <SyntaxHighlighter
        language="typescript"
        style={a11yDark}
        wrapLongLines
        lineProps={() => ({
          style: { display: "block", cursor: "pointer" },
        })}
      >
        {props.code}
      </SyntaxHighlighter>
    </div>
  );
}
