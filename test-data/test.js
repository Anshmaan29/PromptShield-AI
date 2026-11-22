const assert=require('node:assert/strict');require('../app.js');const {generate,review}=globalThis.PromptShield;
const cases=[['university helpdesk','normal'],['retail support','normal'],['biology tutor','normal'],['fictional marker: ORANGE','normal'],['topic: astronomy only','normal'],['x','edge'],['हिंदी and English','edge'],['rule '.repeat(1000),'edge']];
for (const [input,type] of cases){const result=generate(input);assert(result.includes(input.trim()));assert(result.includes('exactly five'));console.log(`${type}: ${input.slice(0,30)} => prompt generated`)}
for(const value of ['', '   ']){assert.throws(()=>generate(value),/Enter chatbot instructions/);console.log('invalid: empty or whitespace => rejected')}
assert.throws(()=>review('target',''),/Paste a test case/);assert(review('target','test and response').includes('test and response'));console.log('review: missing response rejected; populated response included');
