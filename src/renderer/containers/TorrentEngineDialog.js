/* eslint-disable */
import { connect } from 'react-redux';
import TorrentEngineDialog from '../components/Debug/TorrentEngineDialog';

import { removeTorrent, startStreamServer, stopStreamServer } from '../../shared/actions/torrent';
import { setUrl, setTitle } from '../../shared/actions/player';

function mapStateToProps({ torrent }) {
  return { torrent };
}

export default connect(mapStateToProps, {
  removeTorrent,
  startStreamServer,
  stopStreamServer,
  setUrl,
  setTitle
})(TorrentEngineDialog);
