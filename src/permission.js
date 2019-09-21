import router from './router'
router.beforeEach(function (to, from, next) {
//   debugger
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
export default router
