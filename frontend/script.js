const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const fileUrlContainer = document.getElementById('file-url-container');
const fileUrl = document.getElementById('file-url');

// Trigger file input on button click
document.querySelector('.browse-btn').addEventListener('click', () => {
  fileInput.click();
});

// Trigger file input on drag-and-drop
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.style.backgroundColor = '#f1f1f1';
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.style.backgroundColor = 'white';
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.style.backgroundColor = 'white';
  const file = e.dataTransfer.files[0];
  if (file) {
    handleFileUpload(file);
  }
});

// Handle file upload when selected through input or drag-and-drop
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    handleFileUpload(file);
  }
});

// File upload function
function handleFileUpload(file) {
  progressContainer.style.display = 'block';
  const formData = new FormData();
  formData.append('file', file);

  axios.post('/file', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      progressBar.style.width = percent + '%';
      progressText.textContent = percent + '%';
    }
  })
  .then((response) => {
    const fileLink = response.data.url;
    fileUrlContainer.style.display = 'block';
    fileUrl.textContent = fileLink;
    fileUrl.href = fileLink;
  })
  .catch((error) => {
    alert('File upload failed! Please try again.');
    console.error(error);
  });
}
