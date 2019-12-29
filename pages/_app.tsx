import React from 'react'
import App from 'next/app'
import Layout from '../components/Layout'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MuiPickersUtilsProvider>
    )
  }
}
