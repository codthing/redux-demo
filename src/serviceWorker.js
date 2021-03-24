// 此可选代码用于注册服务工作者。 默认情况下不调用register（）。 
// 这使应用程序在生产中的后续访问中加载速度更快，并具有脱机功能。 
// 但是，这也意味着在关闭页面上所有打开的现有选项卡之后，开发人员（和用户）在后续访问页面时只会看到已部署的更新，因为先前缓存的资源是在后台更新的。 
// 要了解有关此模型的好处以及有关如何选择加入的说明的更多信息，请阅读https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // URL构造函数在所有支持SW的浏览器中都可用。
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      //如果PUBLIC_URL的来源与我们的网页所服务的来源不同，则我们的服务人员将无法工作。 
      // 如果使用CDN来服务资产，则可能会发生这种情况； 参见https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        //这在localhost上运行。 让我们检查服务工作者是否仍然存在。
        checkValidServiceWorker(swUrl, config);

        //向本地主机添加一些其他日志，使开发人员指向服务工作者/ PWA文档。
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        //不是localhost。 只需注册服务人员
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              //至此，已获取更新的预缓存内容，但是以前的服务工作程序仍将提供较旧的内容，直到关闭所有客户端选项卡为止。
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              //执行回调
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              //至此，所有内容均已预缓存。 现在是显示“内容已缓存供脱机使用”的最佳时机。 信息。
              console.log('Content is cached for offline use.');

              //执行回调
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  //检查是否可以找到服务人员。 如果无法重新加载页面。
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then(response => {
      //确保服务工作者存在，并且我们确实在获取JS文件。
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        //没有找到服务人员。 可能是一个不同的应用程序。 重新加载页面。
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        //找到服务人员。 照常进行。
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
