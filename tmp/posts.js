export default {
  
  'test-2': () => import(/* webpackChunkName: 'posts/test-2' */ '@/posts/test-2.md'),

  
  'test-3': () => import(/* webpackChunkName: 'posts/test-3' */ '@/posts/test-3.md'),

  
  'test': () => import(/* webpackChunkName: 'posts/test' */ '@/posts/test.md'),

    
};