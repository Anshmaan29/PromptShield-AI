# PromptShield AI

PromptShield is a browser-based workbench for preparing authorized prompt-injection tests and reviewing chatbot responses. It runs locally with no API keys. It constructs prompts; the user must paste them into an AI model and run the generated tests against an authorized target manually. It does not call an AI model, automatically execute attacks, calculate a security score, or guarantee safety.

## Run

Open `index.html` in a current browser or serve this directory with `python3 -m http.server 8000` and open http://localhost:8000. Enter fictional chatbot instructions or load the example, then create and copy the prompt to a model. After running a test against a target, paste the test and actual response into the review form and create a second prompt. Do not use actual secrets or personal data.

## Team ZeroDay

Anshmaan Singh (S24CSEU0637), Anjali Singh (S24CSEU0359), Krishnand Yadav (S24CSEU0645), Satyam Kumar (S24CSEU0480).

## Verification

Run `node test-data/test.js`. The tests exercise the prompt construction functions and input validation. They do not measure any model or target chatbot's security.
