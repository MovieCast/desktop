/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
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

import { translate } from 'react-i18next';

import { withView, View } from '../View';

import SettingsCategoryList from './SettingsCategoryList';
import SettingsCategoryListItem from './SettingsCategoryListItem';

const styleSheet = {
  root: {
    width: '100%',
  },
};

class Settings extends Component {
  state = {
    menu: {
      anchorEl: null,
      open: false
    }
  };

  componentWillMount() {
    // this.context.setBarTitle('Settings');
    // this.context.setBarShadow(true);
    // this.context.setBarBack(true);

    this.context.setAppBarConfig({
      title: 'settings',
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
    const { t, classes, settings, changeSettings } = this.props;

    return (
      <div className={classes.root}>
        <SettingsCategoryList header={t('views:settings.categories.ui')}>
          <SettingsCategoryListItem
            icon={<LanguageIcon />}
            text={t('views:settings.language')}
            value={settings.ui.language}
            options={Object.keys(this.props.i18n.store.data).map(language => t(`languages.${language}`))}
            values={Object.keys(this.props.i18n.store.data)}
            onOptionsClick={(event, index, value) => {
              changeSettings({ ui: { language: value } });
              this.props.i18n.changeLanguage(value);
            }}
          />
          <SettingsCategoryListItem
            icon={<PaletteIcon />}
            text={t('views:settings.palette')}
            value={settings.ui.palette}
            options={['Dark', 'Light']}
            values={['dark', 'light']}
            onOptionsClick={(event, index, value) => changeSettings({ ui: { palette: value.toLowerCase() } })}
          />
          <SettingsCategoryListItem
            icon={<StartScreenIcon />}
            text={t('views:settings.startScreen')}
            value={settings.ui.startScreen}
            options={[t('movies'), t('shows')]}
            values={['movies', 'shows']}
            onOptionsClick={(event, index, value) => changeSettings({ ui: { startScreen: value } })}
          />
        </SettingsCategoryList>
        <Divider />
        <SettingsCategoryList header={t('views:settings.categories.subtitles')}>
          <SettingsCategoryListItem
            icon={<SubtitlesIcon />}
            text={t('views:settings.language')}
            value={settings.subtitles.language}
            options={[t('languages.en')]}
            values={['en']}
            onOptionsClick={(event, index, value) => changeSettings({ subtitles: { language: value } })}
          />
          <SettingsCategoryListItem
            icon={<FormatSizeIcon />}
            text={t('views:settings.size')}
            value={settings.subtitles.size}
            options={['24px', '32px']}
            onOptionsClick={(event, index, value) => changeSettings({ subtitles: { size: value } })}
          />
        </SettingsCategoryList>
        <Divider />
        <SettingsCategoryList header={t('views:settings.categories.quality')}>
          <SettingsCategoryListItem
            icon={<HighQualityIcon />}
            text={t('views:settings.showQuality')}
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
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  changeSettings: PropTypes.func.isRequired,
  // resetSettings: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

Settings.contextTypes = {
  ...View.childContextTypes
};

export default translate()(withView(withStyles(styleSheet)(Settings)));
