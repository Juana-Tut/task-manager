document.getElementById('taskForm').addEventListener('submit', function(event) {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    let isValid = true;

    // Validate title
    if (!title.value) {
        title.setCustomValidity('Task title is required.');
        isValid = false;
    } else if (title.value.length < 3 || title.value.length > 100) {
        title.setCustomValidity('Title must be between 3 and 100 characters.');
        isValid = false;
    } else {
        title.setCustomValidity('');
    }

    // Validate description
    if (description.value.length > 500) {
        description.setCustomValidity('Description cannot exceed 500 characters.');
        isValid = false;
    } else {
        
        description.setCustomValidity('');
    }

    if (!isValid) {
        event.preventDefault();
    }
});
// Clear custom validity messages on input change
document.getElementById('title').addEventListener('input', function() {
    this.setCustomValidity('');
});

document.getElementById('description').addEventListener('input', function() {
    this.setCustomValidity('');
});