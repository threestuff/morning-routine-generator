// Example YouTube video URLs (Replace with real ones)
const videoUrls = [
    'https://www.youtube.com/watch?v=dJhlMn2otxA', 
    'https://www.youtube.com/watch?v=CCicH-iz1oU&t=195s', 
    'https://www.youtube.com/watch?v=lBJ171P6WkM'
  ];
  
  // Extract just the video IDs from the URLs
  const videoIds = videoUrls.map(url => url.split('v=')[1].split('&')[0]);
  
  // YouTube Data API key (replace with your own key)
  const apiKey = 'AIzaSyC75n_1DwBOMmjR9W6SId8fZF6YDf2TL4w';
  
  // Function to fetch video details (including duration) for multiple videos
  async function getVideoDetails(videoIds) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoIds.join(',')}&part=contentDetails&key=${apiKey}`);
    const data = await response.json();
    return data.items.map(item => item.contentDetails.duration);
  }
  
  // Function to convert ISO 8601 duration to minutes
  function convertDurationToMinutes(duration) {
    const regex = /PT(\d+H)?(\d+M)?(\d+S)?/;
    const matches = duration.match(regex);
  
    const hours = matches[1] ? parseInt(matches[1].replace('H', '')) : 0;
    const minutes = matches[2] ? parseInt(matches[2].replace('M', '')) : 0;
    const seconds = matches[3] ? parseInt(matches[3].replace('S', '')) : 0;
  
    return hours * 60 + minutes + Math.round(seconds / 60);
  }
  
  // Main function to generate activities and calculate total duration
  async function generateActivities() {
    // Fetch durations for all videos in one API call
    const durations = await getVideoDetails(videoIds);
    let totalDuration = 0;
  
    // Loop over each video, convert duration and update the DOM
    durations.forEach((duration, index) => {
      const durationInMinutes = convertDurationToMinutes(duration);
      totalDuration += durationInMinutes;
  
      // Embed the YouTube video into the video box and show duration
      document.getElementById(`video${index + 1}`).innerHTML = `<iframe width="320" height="180" src="https://www.youtube.com/embed/${videoIds[index]}" frameborder="0" allowfullscreen></iframe><p>Duration: ${durationInMinutes} min</p>`;
    });
  
    // Update total duration on the page
    document.getElementById('total-duration').textContent = totalDuration;
  }
  
  // Event listener for the "Generate Activities" button
  document.getElementById('generate-btn').addEventListener('click', generateActivities);
  