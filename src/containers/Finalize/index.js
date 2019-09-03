/**
 *
 * Finalize
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
import MenuAppBar from "../../components/Appbar";
import { Grid } from "@material-ui/core";
import { finalizeChildStyles } from "./styles";
import FinalizeChild from "../../components/FinalizeChild";

export function Finalize() {
  const classes = finalizeChildStyles();

  return (
    <Grid container justify="center" className={classes.main}>
      <Grid item xs={10} md={11}>
        <MenuAppBar />
        <FinalizeChild />
      </Grid>
    </Grid>
  );
}

Finalize.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default Finalize;
