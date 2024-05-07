<template>
  <div class="video-container">
    <div class="title-container">
      <h2 class="video-title">{{ videoTitle }}</h2>
    </div>
    <video loop autoplay ref="videoPlayer" src="../assets/video/video.mp4"></video>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  props: {
    videoSource: {
      type: String,
      required: true,
    },
    videoTitle: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const videoElement = ref(null);

    onMounted(() => {
      initializeVideoPlayer(videoElement.value);
    });

    function initializeVideoPlayer(video) {
      // 初始化视频播放器
      // 添加事件监听或其他自定义逻辑
    }

    return {
      videoElement,
    };
  },
};
</script>

<style scoped>
.video-container {
  position: relative;
  width: 30%; /* 视频和标题容器的宽度 */
  margin: 0 10px;
}
.video-container:hover {
  z-index: 2;
  transform: translate3d(0,-2px,0);
  transition: all 0.2s  linear; /* 添加过渡效果 */
  box-shadow: 0  4px 8px rgba(0, 0, 0, 0.5); /* 阴影效果 */
}

.title-container {
  position: absolute;
  top: 23px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 174, 255, 0.8); /* 半透明黑色背景 */
  padding: 10px;
  border-radius: 0 0 10px 10px;
  text-align: center;
  width: 96%; /* 标题容器宽度占满父容器 */
  z-index: 1; /* 保证标题在视频上方 */
}

.video-title {
  color: white;
  font-size: 18px;
  margin: 0; /* 去除默认的 margin */
}

/* 视频全宽度 */
video {
  width: 100%;
  height: 100%;
}

/* 其他样式可以根据需求自定义 */
</style>