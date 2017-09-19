import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const Close = props =>
  (<SvgIcon {...props}>
    <line x1="0" y1="0" x2="9" y2="9" stroke="white" />
    <line x1="9" y1="0" x2="0" y2="9" stroke="white" />
  </SvgIcon>);

Close.muiName = 'SvgIcon';

export default pure(Close);
