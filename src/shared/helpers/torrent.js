export function getTorrentId(torrentSummary) {
  return torrentSummary.magnetURI || torrentSummary.infoHash;
}

export function getTorrentSummary(state, key) {
  return state.torrent.torrents[key];
}
