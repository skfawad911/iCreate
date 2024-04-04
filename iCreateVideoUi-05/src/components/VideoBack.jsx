import React from 'react'

const VideoBack = () => {
    const processAndDownloadVideo = () => {
        // Make a request to the server when the button is clicked
        fetch('http://localhost:9999/', {
          method: 'GET',
        })
          .then((response) => response.blob())
          .then((blob) => {
            // Create a download link and trigger the download
            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'output_with_audio.mp4';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          })
          .catch((error) => console.error('Error:', error));
      };
  return (
    <>
   
    <div>VideoBack</div>
    <button onClick={processAndDownloadVideo}>
    Process and Download Video
  </button>
  </>
  )
}

export default VideoBack