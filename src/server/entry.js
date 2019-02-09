import { createApp } from './app';

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp(context);

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      return resolve(app);
    }, reject);
  });
}
