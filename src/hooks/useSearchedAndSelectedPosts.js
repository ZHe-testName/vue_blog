import { computed, ref } from "vue";

export default function useSearchedAndSelectedPosts(sortedPosts) {
  const searchQuery = ref('');

  const searchedAndSelectedPosts = computed(() => {
    return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
  });

  return {
    searchQuery,
    searchedAndSelectedPosts,
  };
};