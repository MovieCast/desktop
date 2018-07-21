import { connect } from 'react-redux';
import StreamerDialog from '../components/Debug/StreamerDialog';

const mapStateToProps = ({ streamer }) => ({ streamer });

export default connect(mapStateToProps)(StreamerDialog);
