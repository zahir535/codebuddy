import * as vscode from "vscode";
import { EventGenerator } from "./event-generator";

export class RefactorCode extends EventGenerator {
  constructor(action: string) {
    super(action);
  }

  generatePrompt() {
    const PROMPT = `
        As an AI-powered code refactoring assistant, your task is to enhance the quality and maintainability of the provided code snippet. Analyze the code and suggest improvements by applying best practices, design patterns, and principles of clean code. Focus on the following aspects:
        1. Readability: Improve code readability by using meaningful names, consistent formatting, and clear code structure. Suggest changes to make the code easier to understand and follow.
        2. Modularity: Identify opportunities to break down the code into smaller, reusable functions or components. Aim to reduce code duplication and improve code organization.
        3. Simplicity: Simplify complex logic, remove unnecessary complexity, and streamline the code. Suggest ways to make the code more concise and easier to maintain.
        4. Maintainability: Enhance the overall maintainability of the code by improving code documentation, error handling, and adherence to coding standards and best practices.
        Please provide the refactored code along with explanations for each significant change made. Justify how the refactoring improves the code's quality and maintainability.
`;
    return PROMPT;
  }

  formatResponse(comment: string): string | undefined {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      console.debug("Abandon: no open text editor.");
      return;
    }
    let trimmed = "";
    let padding = "";
    const commentPrefix = " * ";
    const commentStart = "/**\n";
    const commentEnd = " */\n";
    const selectedCode = this.getSelectedWindowArea();
    if (selectedCode) {
      trimmed = selectedCode.trimStart();
      padding = selectedCode.substring(0, selectedCode.length - trimmed.length);
    }

    // Split the comment into lines and add the padding and comment prefix to each line.
    let comments: string = comment
      .split("\n")
      .map((line: string) => `${padding}${commentPrefix}${line}`)
      .join("\n");

    // Add the comment start and end markers.
    comments = `${padding}${commentStart}${comments}\n${padding}${commentEnd}`;
    return comments;
  }

  createPrompt(selectedCode: string): string {
    const prompt = this.generatePrompt();
    const fullPrompt = `${prompt} \n ${selectedCode}`;
    return fullPrompt;
  }
}
