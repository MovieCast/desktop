import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const Maximize = props =>
  (<SvgIcon {...props}>
    <line x1="0" y1="0" x2="10" y2="0" stroke="white" />
  </SvgIcon>);

Maximize.muiName = 'SvgIcon';

export default pure(Maximize);
