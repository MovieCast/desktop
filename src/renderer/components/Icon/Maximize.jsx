import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const Maximize = props =>
  (<SvgIcon {...props}>
    <rect x="8" y="0" width="9" height="9" stroke="white" fill="none" />
  </SvgIcon>);

Maximize.muiName = 'SvgIcon';

export default pure(Maximize);
