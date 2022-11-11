import axios from 'axios';
import { ref, onMounted } from 'vue';

export default function usePosts(limit) {
  const posts = ref([]),
        isPostsLoading = ref(true),
        totalPageCount = ref(0);

  const fetching = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: 1,
          _limit: limit,
        },
      });
  
      totalPageCount.value = Math.ceil(response.headers['x-total-count'] / limit);
  
      posts.value = response.data;
    } catch (error) {
      console.error('[Axios Error]: ', error);
    } finally {
      isPostsLoading.value = false;
    };
  };

  onMounted(fetching);

  return {
    posts,
    isPostsLoading,
    totalPageCount,
  };
};