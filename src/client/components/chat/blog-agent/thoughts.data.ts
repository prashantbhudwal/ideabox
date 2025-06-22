import type { UIMessage } from "ai";

export const dummyMessageParts: UIMessage["parts"] = [
  {
    type: "step-start",
  },
  {
    type: "reasoning",
    reasoning:
      "The user is asking about AI trends. I should search for the latest information to provide accurate and up-to-date details.",
    details: [
      {
        type: "text",
        text: "Analyzing the user's request to determine the appropriate search strategy.",
      },
    ],
  },
  {
    type: "tool-invocation",
    toolInvocation: {
      toolCallId: "call_search_123",
      toolName: "searchTool",
      args: { query: "latest AI trends 2024 machine learning developments" },
      state: "result",
      result: {
        text: "Found 15 articles about AI trends including: Large Language Models (LLMs), Generative AI applications, Multimodal AI systems, AI in healthcare, and autonomous systems development.",
        sources: ["tech-news.com", "ai-research.org", "mit-tech-review.com"],
      },
    },
  },
  {
    type: "step-start",
  },
  {
    type: "reasoning",
    reasoning:
      "Now I have search results, but I should reflect on whether this information is comprehensive enough and if I need to gather more specific details.",
    details: [
      {
        type: "text",
        text: "Evaluating the search results to determine if additional information is needed.",
      },
    ],
  },
  {
    type: "tool-invocation",
    toolInvocation: {
      toolCallId: "call_reflection_456",
      toolName: "reflectionTool",
      args: {
        topicToThinkAbout:
          "Are the search results comprehensive enough to answer the user's question about AI trends?",
        context:
          "User asked about AI trends, I found information about LLMs, generative AI, multimodal systems, healthcare AI, and autonomous systems.",
      },
      state: "result",
      result: {
        message:
          "The search results provide a good overview of current AI trends. However, I should also consider getting information about the user's specific interests to tailor the response better.",
        confidence: 0.85,
        nextAction: "get_profile_info",
      },
    },
  },
  {
    type: "step-start",
  },
  {
    type: "reasoning",
    reasoning:
      "Based on my reflection, I should check the user's profile to understand their background and interests, which will help me provide a more personalized response.",
    details: [
      {
        type: "text",
        text: "Checking user profile to personalize the AI trends information.",
      },
    ],
  },
  {
    type: "tool-invocation",
    toolInvocation: {
      toolCallId: "call_profile_789",
      toolName: "profileTool",
      args: {
        userId: "user_123",
        fields: ["interests", "technical_background", "industry"],
      },
      state: "result",
      result: {
        profile: {
          interests: [
            "machine learning",
            "startup technology",
            "AI applications",
          ],
          technical_background: "software_engineer",
          industry: "technology",
          experience_level: "intermediate",
        },
        recommendations: [
          "Focus on practical applications",
          "Include technical details",
          "Mention startup opportunities",
        ],
      },
    },
  },
  {
    type: "step-start",
  },
  {
    type: "source",
    source: {
      sourceType: "url" as const,
      id: "source_ai_trends_2024",
      url: "https://ai-research.org/trends-2024",
    },
  },
  {
    type: "source",
    source: {
      sourceType: "url" as const,
      id: "source_ml_developments",
      url: "https://mit-tech-review.com/ml-developments",
    },
  },
  {
    type: "reasoning",
    reasoning:
      "Now I have comprehensive information from search results, reflection on completeness, and user profile data. I can provide a well-tailored response about AI trends that matches the user's technical background and interests.",
    details: [
      {
        type: "text",
        text: "Synthesizing all gathered information to create a personalized response.",
      },
    ],
  },
  {
    type: "file",
    mimeType: "image/png",
    data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
  },
  {
    type: "text",
    text: "Based on my research and understanding of your technical background, here are the key AI trends for 2024 that would be most relevant to you as a software engineer interested in startup applications:\n\n1. **Large Language Models (LLMs)** - Continued advancement in reasoning capabilities\n2. **Generative AI Applications** - Practical tools for code generation and automation\n3. **Multimodal AI Systems** - Integration of text, image, and audio processing\n4. **AI in Healthcare** - Diagnostic tools and personalized medicine\n5. **Autonomous Systems** - Self-driving technology and robotics\n\nThese trends offer significant opportunities for startup innovation, especially in the areas of developer tools and enterprise automation.",
  },
];
