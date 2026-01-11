import { AddNewProblemSchemaType } from "../validations/problem.validation";

export const useRenderMarkdown = ({
  level,
  name,
  statement,
  testCases,
}: AddNewProblemSchemaType) => {
  return `
# **${name}**

**Difficulty:** ${level}

---

## 📝 Problem Statement

${statement}

---

## 📥 Input

The input format depends on the problem requirements.

---

## 📤 Output

Return the expected output based on the given input.

---

## ✅ Examples

${testCases
  .filter((testCase) => testCase.inputCase.hidden === false)
  .map(
    ({ inputCase, outputCase }, index) => `
### Example ${index + 1}

**Input:**
\`\`\`
${inputCase.testCase}
\`\`\`

**Output:**
\`\`\`
${outputCase}
\`\`\`
`
  )
  .join("\n")}

---

## 🚀 Notes

- Follow the input and output format strictly.
- Optimize your solution for better performance if needed.
- Edge cases matter.

Happy Coding! 🎯
`;
};
