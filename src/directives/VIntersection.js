export default {
  name: 'intersection',

  mounted(el, bindings) {
    let options = {
      rootMargin: '0px',
      threshold: 1.0
    };

    function callback(entries, observer) {
      if (entries[0].isIntersecting) {
        bindings.value.loadMorePosts();
      };
    }; 

    let observer = new IntersectionObserver(callback.bind(this), options);

    observer.observe(el);
  },
};