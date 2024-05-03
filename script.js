const inputArea = document.getElementById('input-area');
const outputArea = document.getElementById('output-area');
const formatButton = document.getElementById('format-button');
const clearButton = document.getElementById('clear-button');

formatButton.addEventListener('click', () => {
  const markdownText = inputArea.value;

  const converter = new showdown.Converter();
  let html = converter.makeHtml(markdownText);

  // More robust h3 to h4 conversion
  function replaceH3(htmlString) {
    const h3Regex = /(<h3.*?>)(.*?)(<\/h3>)/g;
    return htmlString.replace(h3Regex, '<h4>$2</h4>');
  }
  html = replaceH3(html);

  // Add <br> after </p>
  html = html.replace(/<\/p>/g, '</p><br>');

  outputArea.innerHTML = html;
});

// Clear button functionality
clearButton.addEventListener('click', () => {
  inputArea.value = '';
  outputArea.innerHTML = '';
});

// Copy to clipboard functionality
const copyButton = document.getElementById('copy-button');
copyButton.addEventListener('click', () => {
  // Create a temporary div to hold the formatted content
  const tempElement = document.createElement('div');
  tempElement.innerHTML = outputArea.innerHTML;
  document.body.appendChild(tempElement);

  // Simulate selection and copy
  const range = document.createRange();
  range.selectNodeContents(tempElement);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand('copy');

  document.body.removeChild(tempElement);
  alert('Copied to clipboard!');
});
