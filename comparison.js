const initialPolicy = 'You are a university helpdesk assistant. Answer questions about admissions, exams, fees, and campus services.';
const addedRule = 'If a question is unrelated to university services, briefly redirect the student to topics you can help with.';
const demoCases = [
  ['Can you recommend a movie?', 'Redirect to university topics.', 'Try a campus comedy.', 'Needs change', 'I can help with university questions. Would you like information about campus events?', 'Pass'],
  ['Where can I find application deadlines?', 'Direct the student to the admissions calendar.', 'Check the admissions calendar for application deadlines.', 'Pass', 'Check the admissions calendar for application deadlines.', 'Pass'],
  ['Who can help me with a fee payment?', 'Direct the student to the university fees office.', 'Contact the fees office for help with payments.', 'Pass', 'Contact the fees office for help with payments.', 'Pass'],
];

const find = id => document.getElementById(id);
const cases = find('cases');
const original = find('original-policy');
const revised = find('revised-policy');
let sequence = 0;

function updateSummary() {
  const rows = [...cases.rows];
  const count = version => rows.filter(row => row.querySelector(`select[data-version="${version}"]`).value === 'Pass').length;
  find('result-count').textContent = `Passed · Original ${count('original')}/${rows.length} · Revised ${count('revised')}/${rows.length}`;
}

function updateChange() {
  const before = original.value.trim();
  const after = revised.value.trim();
  const note = find('change-note');
  note.replaceChildren();
  if (before && after.startsWith(before + ' ')) {
    const added = document.createElement('mark');
    added.textContent = after.slice(before.length).trimStart();
    note.append('Added rule: ', added);
  } else if (before && after && before === after) {
    note.textContent = 'Both versions have identical instructions.';
  } else if (before && after) {
    note.textContent = 'The instructions differ. Compare both versions above.';
  }
}

function field(container, labelText, id, value, rows) {
  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = labelText;
  const input = document.createElement('textarea');
  input.id = id;
  input.rows = rows;
  input.maxLength = 10000;
  input.value = value;
  container.append(label, input);
  return input;
}

function addCase(values = [], sample = false) {
  const [question = '', expected = '', before = '', beforeState = 'Needs review', after = '', afterState = 'Needs review'] = values;
  const row = cases.insertRow();
  const id = ++sequence;
  const details = row.insertCell();
  field(details, 'Question', `question-${id}`, question, 2);
  field(details, 'Expected behavior', `expected-${id}`, expected, 2);
  const provenance = document.createElement('span');
  provenance.className = 'provenance';
  provenance.textContent = sample ? 'Sample replies' : 'Your entries';
  details.append(provenance);

  const selects = [];
  for (const [version, reply, state] of [['original', before, beforeState], ['revised', after, afterState]]) {
    const cell = row.insertCell();
    const title = version === 'original' ? 'Original' : 'Revised';
    const input = field(cell, title + ' reply', `${version}-reply-${id}`, reply, 4);
    const select = document.createElement('select');
    select.dataset.version = version;
    select.setAttribute('aria-label', `${title} verdict, case ${id}`);
    for (const option of ['Needs review', 'Pass', 'Needs change']) select.add(new Option(option, option));
    select.value = state;
    const refresh = () => {
      select.dataset.verdict = select.value;
      select.disabled = !input.value.trim();
      updateSummary();
    };
    selects.push({ select, refresh });
    cell.append(select);
    input.addEventListener('input', () => {
      select.value = 'Needs review';
      if (sample) provenance.textContent = 'Edited sample case';
      refresh();
    });
    select.addEventListener('change', refresh);
  }

  for (const { refresh } of selects) refresh();
  details.addEventListener('input', () => {
    if (sample) provenance.textContent = 'Edited sample case';
    for (const { select, refresh } of selects) {
      select.value = 'Needs review';
      refresh();
    }
  });
  return details.querySelector('textarea');
}

function loadComparison(isDemo) {
  cases.replaceChildren();
  sequence = 0;
  original.value = isDemo ? initialPolicy : '';
  revised.value = isDemo ? `${initialPolicy} ${addedRule}` : '';
  find('source-note').textContent = isDemo
    ? 'Fictional university helpdesk. Sample replies and verdicts for illustration.'
    : 'Paste replies from two chatbot versions and grade each against your expected behavior.';
  if (isDemo) demoCases.forEach(values => addCase(values, true));
  else addCase();
  updateChange();
  updateSummary();
}

for (const [input, version] of [[original, 'original'], [revised, 'revised']]) {
  input.addEventListener('input', () => {
    updateChange();
    for (const select of cases.querySelectorAll(`select[data-version="${version}"]`)) {
      select.value = 'Needs review';
      select.dispatchEvent(new Event('change'));
    }
    find('source-note').textContent = 'Instructions edited. Replace any previous replies with replies from the new version before grading.';
  });
}

find('load-demo').addEventListener('click', () => loadComparison(true));
find('new-comparison').addEventListener('click', () => {
  loadComparison(false);
  original.focus();
});
find('add-case').addEventListener('click', () => addCase().focus());
loadComparison(true);

function openWorkbenchFromLink() {
  if (location.hash === '#workbench') find('workbench').open = true;
}

window.addEventListener('hashchange', openWorkbenchFromLink);
document.querySelector('nav a[href="#workbench"]').addEventListener('click', () => {
  find('workbench').open = true;
});
openWorkbenchFromLink();
