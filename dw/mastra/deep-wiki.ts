/**
 * How would a deep wiki search work?
 * ## Tasks
 * 1. Confirm research topic : ConfirmResearchTopicTask
 * 2. Chat with user : ChatWithUserTask
 * 3. Conduct wikipedia searches : SearchTask
 * 4. Reflect on the search results : ReflectOnSearchResultsTask
 * 5. Generate report : GenerateReportTask
 *
 * ## Agents
 * 1. ResearchOrchestratorAgent
 * 2. ReflectionAgent
 * 3. SearchAgent
 * 4. ReportAgent
 *
 * ## Tools
 *
 * ### External Tools
 * - Wikipedia search api
 * - Wikipedia page api
 *
 * ### Handoff Tools
 * - ReflectionHandoffTool: Hands off the reflection task to the reflection agent.
 * - SearchHandoffTool: Hands off the search task to the search agent.
 * - ReportHandoffTool: Hands off the report task to the report agent
 *
 * ## Agent-Task Mapping
 * - ResearchOrchestratorAgent:  [ConfirmResearchTopicTask, ChatWithUserTask]
 * - ReflectionAgent: [ReflectOnSearchResultsTask]
 * - SearchAgent: [SearchTask]
 * - ReportAgent: [GenerateReportTask]
 *
 * ## Agent-Tool Mapping
 * - ResearchOrchestratorAgent:  [SearchHandoffTool, ReflectionHandoffTool, ReportHandoffTool]
 * - ReflectionAgent: None
 * - SearchAgent: [WikipediaSearchTool, WikipediaPageSearchTool]
 * - ReportAgent: None
 *
 * ## Task-Tool Mapping
 * - ConfirmResearchTopicTask: None
 * - ChatWithUserTask: None
 * - SearchTask: [WikipediaSearchTool, WikipediaPageSearchTool]
 * - ReflectOnSearchResultsTask: None
 * - GenerateReportTask: None
 *
 */
