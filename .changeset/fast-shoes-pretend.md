---
'@sumup/circuit-ui': major
---

Switched to the new JSX transform with automatic runtime. You will need to update your Babel config to use Emotion's JSX runtime. For example, with Next.js and Emotion 10:

```json
{
  "presets": [
    [
      "next/babel",
      {
        "preset-react": {
          "runtime": "automatic",
          "importSource": "@emotion/core"
        }
      }
    ]
  ],
  "plugins": [["babel-plugin-emotion", { "cssPropOptimization": true }]]
}
```
