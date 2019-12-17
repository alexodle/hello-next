import Header from './Header';
import { Alert } from './Alert';
import { FunctionComponent, Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    width: '60em',
    margin: 'auto',
  }
})

const Layout: FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()
  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.container}>
        <Header />
        <Alert>
          {children}
        </Alert>
      </div>
    </Fragment>
  )
}

export default Layout;
