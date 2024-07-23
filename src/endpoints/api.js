const BACKEND_URL = 'https://your-flask-backend-url.com'; // Replace with your actual backend URL

/**
 * Analyzes emotions in a video file.
 * @param {File} videoFile - The video file to be processed.
 * @returns {Promise<Object[]>} - A promise that resolves to the emotions detected in the video.
 */
export const processVideo = async (videoFile) => {
  const formData = new FormData();
  formData.append('video', videoFile);

  const response = await fetch(`${BACKEND_URL}/process_video`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
};
