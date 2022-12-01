const newFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment-content').value.trim();

  if (comment) {
    const response = await fetch(`/api/`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/blog');
    } else {
      alert('Failed to create comment');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/blog');
    } else {
      alert('Failed to delete comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);
