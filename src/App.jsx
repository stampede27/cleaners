import React, { useState } from 'react';
import cleaners from './cleaners';
import areas from './areas';

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function App() {
  const [output, setOutput] = useState("");

 const generateAssignments = () => {
  const shuffledCleaners = shuffle(cleaners);
  let index = 0;
  let result = "";

  areas.forEach(area => {
    result += `*${area.name.toUpperCase()}*\n`;
    let assignedCount = 0;

    while (assignedCount < area.count && index < shuffledCleaners.length) {
      const cleaner = shuffledCleaners[index];

      // Skip "EMIL" if current area is "TRASHBIN AREA"
      if (area.name === "TRASHBIN AREA" && cleaner === "EMIL") {
        index++;
        continue;
      }

      result += `${cleaner}\n`;
      assignedCount++;
      index++;
    }

    result += `\n`;
  });

  setOutput(result.trim());
};

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output).then(() => {
      alert("Copied to clipboard!");
    });
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>Cleaner List Generator</h2>
      <button onClick={generateAssignments}>Generate</button>
      <button onClick={copyToClipboard} style={{ marginLeft: 10 }}>
        Copy to Clipboard
      </button>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>{output}</pre>
    </div>
  );
}

export default App;