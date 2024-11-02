// import React, { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { GEMINI_API_KEY } from "../../utils/constants";

// function Message({ message, currentUserId }) {
//   const [summary, setSummary] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const isSender = message.senderId === currentUserId;

//   // Format time
//   const createdAt = new Date(message.createdAt);
//   const formattedTime = createdAt.toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   // Function to get the summary using Gemini API
//   const handleSummarizeClick = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Construct the summarization prompt
//     const summarizeQuery = `Summarize the following message in 1-2 lines without bold text and new line characters after each point: "${message.message}"`;

//     // Initialize Google Generative AI with Gemini API key
//     const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent(summarizeQuery);

//     // Extract the summary text
//     const summarizedText = result.response.text().trim();
//     setSummary(summarizedText);
//     setIsLoading(false);
//   };

//   return (
//     <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-6`}>
//       <div
//         className={`relative p-4 rounded-lg max-w-xs shadow-lg ${
//           isSender ? "bg-green-800 text-white" : "bg-gray-700 text-white text-gray-900"
//         }`}
//       >
//         {/* Display Message */}
//         <p className="text-sm leading-relaxed">{message.message}</p>
        
//         {/* Timestamp */}
//         <span className="text-xs mt-2 block text-right opacity-75">{formattedTime}</span>
        
//         {/* Summarize Button */}
//         <button
//           onClick={handleSummarizeClick}
//           className={`text-xs mt-2 text-right ${
//             isSender ? "text-blue-300 hover:text-blue-200" : "text-blue-600 hover:text-blue-500"
//           } transition duration-200 ease-in-out underline`}
//           disabled={isLoading}
//         >
//           {isLoading ? "Summarizing..." : "Summarize"}
//         </button>
        
//         {/* Summary Display */}
//         {summary && (
//           <div className="mt-4 p-3 rounded-md bg-yellow-100 text-yellow-900 text-xs shadow-inner leading-relaxed">
//             <p><strong>Summary:</strong> {summary}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Message;
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../../utils/constants";

function Message({ message, currentUserId }) {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isSender = message.senderId === currentUserId;

  // Format time
  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Check if the message has more than 90 words
  const wordCount = message.message.split(" ").length;
  const shouldShowSummarize = wordCount > 90;

  // Function to get the summary using Gemini API
  const handleSummarizeClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Construct the summarization prompt
    const summarizeQuery = `Summarize the following message in 45 words (without bold text)"${message.message}"`;

    // Initialize Google Generative AI with Gemini API key
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(summarizeQuery);

    // Extract the summary text
    const summarizedText = result.response.text().trim();
    setSummary(summarizedText);
    setIsLoading(false);
  };

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-6`}>
      <div
        className={`relative p-4 rounded-lg max-w-xs shadow-lg ${
          isSender ? "bg-green-800 text-white" : "bg-gray-700 text-white"
        }`}
      >
        {/* Display Message */}
        <p className="text-sm leading-relaxed">{message.message}</p>
        
        {/* Timestamp */}
        <span className="text-xs mt-2 block text-right opacity-75">{formattedTime}</span>
        
        {/* Summarize Button - Visible only if message has more than 90 words */}
        {shouldShowSummarize && (
          <button
            onClick={handleSummarizeClick}
            className={`text-xs mt-2 text-right ${
              isSender ? "text-blue-300 hover:text-blue-200" : "text-blue-600 hover:text-blue-500"
            } transition duration-200 ease-in-out underline`}
            disabled={isLoading}
          >
            {isLoading ? "Summarizing..." : "Summarize"}
          </button>
        )}
        
        {/* Summary Display */}
        {summary && (
          <div className="mt-4 p-3 rounded-md bg-yellow-100 text-yellow-900 text-xs shadow-inner leading-relaxed">
            <p><strong>Summary:</strong> <br /> {summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
