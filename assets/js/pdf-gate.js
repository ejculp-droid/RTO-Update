// PDF Gate Modal Handler
function initPdfGateModal() {
  const modal = document.getElementById('pdfGateModal');
  const form = document.getElementById('pdfGateForm');
  const readerTypeSelect = document.getElementById('readerType');
  const otherReaderInput = document.getElementById('otherReaderInput');
  const downloadButtons = document.querySelectorAll('[data-pdf-gate]');
  const closeBtn = modal.querySelector('.pdf-gate-modal__close');

  // Show/hide "Other" input based on selection
  if (readerTypeSelect) {
    readerTypeSelect.addEventListener('change', (e) => {
      if (e.target.value === 'Other') {
        otherReaderInput.style.display = 'block';
        otherReaderInput.querySelector('input').required = true;
      } else {
        otherReaderInput.style.display = 'none';
        otherReaderInput.querySelector('input').required = false;
      }
    });
  }

  // Open modal when download button clicked
  downloadButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Handle form submission
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        const formData = new FormData(form);
        const data = {
          first_name: formData.get('first_name'),
          last_name: formData.get('last_name'),
          email: formData.get('email'),
          company: formData.get('company'),
          reader_type: formData.get('reader_type'),
          reader_type_other: formData.get('reader_type_other') || null
        };

        const response = await fetch('/.netlify/functions/send-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          form.reset();
          const message = form.querySelector('.pdf-gate-message');
          message.textContent = 'White paper sent! Check your email.';
          message.className = 'pdf-gate-message pdf-gate-message--success';
          message.style.display = 'block';

          setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            message.style.display = 'none';
          }, 2500);
        } else {
          throw new Error('Failed to send');
        }
      } catch (error) {
        const message = form.querySelector('.pdf-gate-message');
        message.textContent = 'Error sending white paper. Please try again.';
        message.className = 'pdf-gate-message pdf-gate-message--error';
        message.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPdfGateModal);
} else {
  initPdfGateModal();
}
