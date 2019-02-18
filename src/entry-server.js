import { createApp } from './app';
import moment from 'moment';

export default context => {
  return new Promise((resolve, reject) => {
    const filters = [
      {
        name: 'date',
        fn: function dateFilter(val) {
          return moment(val).format('D MMMM YYYY');
        },
      }
    ];

    const { app, router } = createApp(context, filters);

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
