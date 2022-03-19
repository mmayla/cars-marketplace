import errorHandler from 'errorhandler'
import app from './app.js'

/**
 * Error Handler. Provides full error stack traces and internal details of any object passed to this module
 */
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler())
}

const server = app.listen(app.get('PORT'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('PORT'),
    app.get('env'),
  )
  console.log('  Press CTRL-C to stop\n')
})

export default server
