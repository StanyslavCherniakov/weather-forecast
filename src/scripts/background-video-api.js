import axios from 'axios';

async function getVideo(id) {
  const videoReq = await axios.get(`https://pixabay.com/api/videos/?key=30789438-6b548ae820f8dbd510a71ac78&id=47872&id=${id}`);
  return videoReq;
}

export default getVideo;


