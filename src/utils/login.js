export default async function login() {
  return new Promise(((resolve, reject) => {
      if (chayns.env.user.isAuthenticated) {
          resolve();
      } else {
          chayns.setAccessTokenChange(true, (() => {
              // replace the callback with an empty one
              chayns.setAccessTokenChange(false, () => undefined);
              if (chayns.env.user.isAuthenticated) resolve(); else reject();
          }));
      }
  }));
}
