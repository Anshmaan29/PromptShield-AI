# Prompt iteration log

These observations are checks of the prompt text, not measurements of language-model performance. No output from an external model has yet been recorded.

- v1: Milestone 1 baseline; hard-coded university helpdesk; requests 5 tests and 3 columns. No observed model output supplied.
- v2: Introduced an instructions variable, benign control, tested-rule column, and a warning against asserting a vulnerability without a response. Inspection confirms those four additions; model behavior not measured.
- v3: Delimited target instructions as untrusted data and specified five categories. The actual generator returns the v3 text. Inspection confirms delimiters and five named categories; model behavior not measured. This is the final test-generation prompt.

P2 is a new response-review prompt and is not a version of P1.
