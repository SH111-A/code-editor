import React, { useState, useEffect, useRef } from 'react';

// Main App component for the multi-language code editor
const App = () => {
  // State for HTML, CSS, and JavaScript code inputs
  // Initialize with default content so something is visible in the preview
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
</head>
<body>
    <h1>Hello from HTML!</h1>
    <p id="dynamic-text">This text will change.</p>
    <button id="myButton">Click me!</button>
</body>
</html>`);
  const [cssCode, setCssCode] = useState(`body {
    font-family: 'Inter', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f0f0f0;
    color: #333;
    padding: 20px;
}
h1 {
    color: #4a90e2;
    margin-bottom: 20px;
}
p {
    font-size: 1.1em;
    color: #555;
}
button {
    background-color: #4CAF50; /* Green */
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    margin-top: 20px;
    transition: background-color 0.3s ease;
}
button:hover {
    background-color: #45a049;
}`);
  const [jsCode, setJsCode] = useState(`document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('myButton');
    const dynamicText = document.getElementById('dynamic-text');
    let clickCount = 0;

    if (button && dynamicText) {
        button.addEventListener('click', () => {
            clickCount++;
            dynamicText.textContent = \`You clicked the button \${clickCount} time(s)!\`;
            console.log(\`Button clicked \${clickCount} times.\`);
        });
    } else {
        console.error("Elements with IDs 'myButton' or 'dynamic-text' not found.");
    }
});`);
  // State to manage which tab (editor) is currently active
  const [activeTab, setActiveTab] = useState('html'); // 'html', 'css', or 'js'
  // Ref for the output iframe
  const iframeRef = useRef(null);

  // Function to run the combined HTML, CSS, and JavaScript code
  const runCode = () => {
    // Get the iframe's content document
    const iframe = iframeRef.current;
    if (!iframe) return; // Exit if iframe is not available

    const doc = iframe.contentDocument || iframe.contentWindow.document;

    // Construct the full HTML content including HTML, CSS, and JavaScript
    // The CSS is wrapped in <style> tags and JavaScript in <script> tags.
    const fullCode = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Code Output</title>
          <style>
              body { margin: 0; padding: 0; font-family: sans-serif; }
              ${cssCode}
          </style>
      </head>
      <body>
          ${htmlCode}
          <script>
              // Catch console.log messages from the iframe and display them
              // in the iframe itself or handle them for debugging.
              // For simplicity, we'll just execute the code here.
              try {
                  ${jsCode}
              } catch (error) {
                  console.error('Error in JavaScript:', error);
                  // Optionally, display the error in the iframe for the user
                  const errorDiv = document.createElement('div');
                  errorDiv.style.color = 'red';
                  errorDiv.textContent = 'JavaScript Error: ' + error.message;
                  document.body.appendChild(errorDiv);
              }
          </script>
      </body>
      </html>
    `;

    // Write the constructed code to the iframe's document
    doc.open();
    doc.write(fullCode);
    doc.close();
  };

  // Run code initially and whenever code changes
  // This ensures the preview updates live as you type
  useEffect(() => {
    runCode();
  }, [htmlCode, cssCode, jsCode]); // Dependencies for useEffect to re-run

  // Helper function to get the correct setCode function based on active tab
  const getSetCodeFunction = () => {
    switch (activeTab) {
      case 'html':
        return setHtmlCode;
      case 'css':
        return setCssCode;
      case 'js':
        return setJsCode;
      default:
        return setHtmlCode; // Fallback
    }
  };

  // Helper function to get the current code based on active tab
  const getCurrentCode = () => {
    switch (activeTab) {
      case 'html':
        return htmlCode;
      case 'css':
        return cssCode;
      case 'js':
        return jsCode;
      default:
        return htmlCode; // Fallback
    }
  };

  // Helper function to get the placeholder text based on active tab
  // (These are now redundant as we have initial state, but kept for consistency if needed)
  const getPlaceholder = () => {
    switch (activeTab) {
      case 'html':
        return "<!-- Write your HTML here -->\n\n<h1>Hello!</h1>\n<p>This is a live preview.</p>";
      case 'css':
        return "/* Write your CSS here */\n\nh1 {\n  color: #38bdf8;\n}\np {\n  font-size: 1.1em;\n}";
      case 'js':
        return "// Write your JavaScript here\n\nconsole.log('Hello from JS!');\ndocument.body.style.backgroundColor = 'rgba(0,0,0,0.1)';";
      default:
        return "";
    }
  };


  // Tailwind CSS classes for styling
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col lg:flex-row items-stretch p-4 font-inter">
      {/* Code Input Section */}
      <div className="flex-1 flex flex-col lg:mr-4 mb-4 lg:mb-0">
        <h1 className="text-4xl font-extrabold mb-6 text-indigo-400 text-center lg:text-left">Tabbed Code Editor</h1>

        {/* Tab Buttons */}
        <div className="flex justify-center lg:justify-start mb-4 space-x-2">
          <button
            className={`py-2 px-6 rounded-md font-semibold transition-colors duration-200 ${
              activeTab === 'html' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('html')}
          >
            HTML
          </button>
          <button
            className={`py-2 px-6 rounded-md font-semibold transition-colors duration-200 ${
              activeTab === 'css' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('css')}
          >
            CSS
          </button>
          <button
            className={`py-2 px-6 rounded-md font-semibold transition-colors duration-200 ${
              activeTab === 'js' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('js')}
          >
            JavaScript
          </button>
        </div>

        {/* Code Input Area (conditionally rendered) */}
        <div className="w-full bg-gray-800 rounded-lg shadow-xl p-4 flex-grow flex flex-col">
          <label htmlFor={`${activeTab}-input`} className="block text-lg font-semibold mb-2 text-gray-300 capitalize">
            {activeTab} Code:
          </label>
          <textarea
            id={`${activeTab}-input`}
            className="w-full flex-grow p-3 rounded-md bg-gray-900 text-green-300 border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y custom-scrollbar"
            value={getCurrentCode()}
            onChange={(e) => getSetCodeFunction()(e.target.value)}
            placeholder={getPlaceholder()}
            style={{ fontFamily: 'monospace', tabSize: 2, whiteSpace: 'pre' }}
          ></textarea>
        </div>
      </div>

      {/* Output Preview Section */}
      <div className="flex-1 bg-gray-800 rounded-lg shadow-xl p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-gray-300">Output Preview</h2>
        {/* The iframe is used to safely render the combined HTML, CSS, and JS */}
        <iframe
          ref={iframeRef}
          title="code-output-preview"
          className="w-full flex-grow bg-white rounded-md border border-gray-700"
          sandbox="allow-scripts allow-same-origin" // Security sandbox for the iframe
        ></iframe>
      </div>

      {/* Custom Scrollbar Styling */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151; /* gray-700 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6366f1; /* indigo-500 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4f46e5; /* indigo-600 */
        }
      `}</style>
    </div>
  );
};

export default App;
