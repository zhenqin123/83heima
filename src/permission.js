import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach(function (to, from, next) {
//   debugger
  nprogress.start()
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('use-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  nprogress.done()
})
export default router
