/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/700.css"

// You can delete this file if you're not using it
export const onRouteUpdate = ({ location }) => {

}
export const onPreRouteUpdate = async ({ location, prevLocation }) => {


  // const controller = new AbortController();
  // const timeout = setTimeout(() => {
  //   controller.abort();
  // }, 150);
  // try {
  //   await fetch('//localhost:8000/__refresh', {
  //     method: 'post',
  //     signal: controller.signal
  //   })
  // } catch (error) {
  //   console.log('request was aborted');
//
  // } finally {
  //   clearTimeout(timeout);
  // }
}
