/*

* Free Website Audit
*
* The Apps Script endpoint should accept a POST request.
*
* Expected request body:
* {
* "url": "example.com",
* "email": "[person@example.com](mailto:person@example.com)"
* }
  */

const AUDIT_API_URL = 'https://script.google.com/macros/s/AKfycbxe_-HaMgKcms2R_7cazqrTH9KC6SFfG0bU01UG_PhoQsIXroj7cTsv-OekaYfHU3XdyQ/exec';

const auditForm = document.getElementById('audit-form');
const urlInput = document.getElementById('url');
const emailInput = document.getElementById('email');
const submitButton = document.getElementById('submit-btn');
const statusElement = document.getElementById('status');
const reportElement = document.getElementById('report');

if (auditForm) {
auditForm.addEventListener('submit', async function (event) {
event.preventDefault();


const url = urlInput.value.trim();
const email = emailInput.value.trim();

if (!url) {
  statusElement.textContent = 'Please enter your website address.';
  urlInput.focus();
  return;
}

submitButton.disabled = true;
submitButton.textContent = 'Running audit...';

statusElement.textContent =
  'This usually takes 10–20 seconds.';

reportElement.innerHTML = '';

try {
  const response = await fetch(AUDIT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify({
      name: "audit",
      url: url,
      email: email
    })
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const responseText = await response.text();

  /*
   * Try JSON first.
   *
   * This lets the Apps Script return something like:
   *
   * {
   *   "success": true,
   *   "html": "<div>...</div>"
   * }
   *
   * If the endpoint instead returns raw HTML, the fallback
   * below will display that HTML directly.
   */

  let result;

  try {
    result = JSON.parse(responseText);
  } catch {
    result = null;
  }

  if (result && result.success === false) {
    throw new Error(
      result.message || 'The audit could not be completed.'
    );
  }

  statusElement.textContent = '';

  if (result && result.html) {
    reportElement.innerHTML = result.html;
  } else {
    reportElement.innerHTML = responseText;
  }

  submitButton.textContent = 'Run another audit';

} catch (error) {
  console.error('Audit request failed:', error);

  statusElement.textContent =
    "Couldn't reach the audit service. Double-check the URL and try again.";

  submitButton.textContent = 'Run my free audit';

} finally {
  submitButton.disabled = false;
}

});
}
