/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Switch from 'material-ui/Switch';
import Divider from 'material-ui/Divider';

import {
  Language as LanguageIcon,
  Palette as PaletteIcon,
  ViewCompact as StartScreenIcon,
  Subtitles as SubtitlesIcon,
  FormatSize as FormatSizeIcon,
  HighQuality as HighQualityIcon
} from 'material-ui-icons';

import SettingsCategoryList from './SettingsCategoryList';
import SettingsCategoryListItem from './SettingsCategoryListItem';

const styleSheet = createStyleSheet('Settings', theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    background: theme.palette.background.paper,
  },
}));

class Settings extends Component {
  state = {
    menu: {
      anchorEl: null,
      open: false
    }
  };

  componentWillMount() {
    this.props.configureAppBar({
      secondary: 'Settings',
      shadow: true,
      back: true
    });
  }

  handleToggle = (event, category, value) => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });

    this.props.changeSettings({
      [[category][value]]: newChecked
    });
  };

  handleClickListItem = event => {
    this.setState({ menu: { open: true, anchorEl: event.currentTarget } });
  };

  render() {
    const { classes, settings, changeSettings } = this.props;

    return (
      <div className={classes.root}>
        <SettingsCategoryList header="User Interface">
          <SettingsCategoryListItem
            icon={<LanguageIcon />}
            text="Default Language"
            value={settings.ui.language}
            options={['English', 'Dutch', 'Arabic for saif']}
            onOptionsClick={(event, index, value) => changeSettings({ ui: { language: value } })}
          />
          <SettingsCategoryListItem
            icon={<PaletteIcon />}
            text="Palette"
            value={settings.ui.palette}
            options={['Dark', 'Light']}
            onOptionsClick={(event, index, value) => changeSettings({ ui: { palette: value } })}
          />
          <SettingsCategoryListItem
            icon={<StartScreenIcon />}
            text="Start Screen"
            value={settings.ui.startScreen}
            options={['Movies', 'Shows']}
            onOptionsClick={(event, index, value) => changeSettings({ ui: { startScreen: value } })}
          />
        </SettingsCategoryList>
        <Divider />
        <SettingsCategoryList header="Subtitles">
          <SettingsCategoryListItem
            icon={<SubtitlesIcon />}
            text="Default Language"
            value={settings.subtitles.language}
            options={['English']}
            onOptionsClick={(event, index, value) => changeSettings({ subtitles: { language: value } })}
          />
          <SettingsCategoryListItem
            icon={<FormatSizeIcon />}
            text="Size"
            value={settings.subtitles.size}
            options={['24px', '32px']}
            onOptionsClick={(event, index, value) => changeSettings({ subtitles: { size: value } })}
          />
        </SettingsCategoryList>
        <Divider />
        <SettingsCategoryList header="Quality">
          <SettingsCategoryListItem
            icon={<HighQualityIcon />}
            text="Show quality on list"
            action={
              <Switch
                onClick={() => changeSettings({ quality: { showOnList: !settings.quality.showOnList } })}
                checked={settings.quality.showOnList}
              />
            }
          />
        </SettingsCategoryList>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Settings.propTypes = {
  classes: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  configureAppBar: PropTypes.func.isRequired,
  changeSettings: PropTypes.func.isRequired,
  // resetSettings: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styleSheet)(Settings);
