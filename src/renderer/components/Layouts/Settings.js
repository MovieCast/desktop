import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import LanguageIcon from '@material-ui/icons/Language';
import PaletteIcon from '@material-ui/icons/Palette';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import FormatSizeIcon  from '@material-ui/icons/FormatSize';
import FolderOpenIcon  from '@material-ui/icons/FolderOpen';

// import { Typography } from '@material-ui/core';
import SettingsCategoryList from './SettingsCategoryList';
import SettingsCategoryListItem from  './SettingsCategoryListItem';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';

const styles = theme => ({
  root: {
    top: 0,
    zIndex: 1,
    position: 'absolute',
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '100%'
  },
  title: {
    marginLeft: 30
  }
});

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

    // this.context.setAppBarConfig({
    //   title: 'settings',
    //   shadow: true,
    //   back: true
    // });
  }

  handleDownloadLocation = () => {
    const { settings, changeSettings } = this.props;

    const directory = remote.dialog.showOpenDialog({
      title: 'Select download folder',
      defaultPath: settings.downloadLocation,
      properties: ['openDirectory'] })[0];

    if (directory) {
      changeSettings({ downloadLocation: directory });
    }
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
    const { t, classes, settings, changeSettings, open } = this.props;

    return (
      <div className={classes.root}>
        <Collapse direction="down" in={open} unmountOnExit>
          <SettingsCategoryList header="User Interface">
            <SettingsCategoryListItem
              icon={<LanguageIcon />}
              text="User Interface"
              // value={settings.ui.language}
              value="English"
              options={["Dutch", "English", "German", "Spanish"]}
              values={["Dutch", "English", "German", "Spanish"]}
              // onOptionsClick={(event, index, value) => {
              //   changeSettings({ ui: { language: value } });
              //   this.props.i18n.changeLanguage(value);
              // }}
            />
            <SettingsCategoryListItem
              icon={<PaletteIcon />}
              text={"Theme"}
              value={"dark"}
              options={['Dark', 'Light']}
              values={['dark', 'light']}
              // onOptionsClick={(event, index, value) => changeSettings({ ui: { palette: value.toLowerCase() } })}
            />
            <SettingsCategoryListItem
              icon={<ViewCompactIcon />}
              text={"Start screen"}
              value="movies"
              options={["Movies", "Shows"]}
              values={['movies', 'shows']}
              // onOptionsClick={(event, index, value) => changeSettings({ ui: { startScreen: value } })}
            />
          </SettingsCategoryList>
          <Divider />
          <SettingsCategoryList header="Default subtitles">
            <SettingsCategoryListItem
              icon={<SubtitlesIcon />}
              text="Default subtitles"
              // value={settings.subtitles.language}
              value="en"
              options={["English"]}
              values={['en']}
              // onOptionsClick={(event, index, value) => changeSettings({ subtitles: { language: value } })}
            />
            <SettingsCategoryListItem
              icon={<FormatSizeIcon />}
              text={"Size"}
              value="24px"
              options={['24px', '32px']}
              // onOptionsClick={(event, index, value) => changeSettings({ subtitles: { size: value } })}
            />
          </SettingsCategoryList>
          <Divider />
          <SettingsCategoryList header="Download location">
            <SettingsCategoryListItem
              icon={<FolderOpenIcon />}
              text={"Download location"}
              action={
                <TextField
                  // value={settings.downloadLocation}
                  value="This should be a path!!!"
                  onClick={this.handleDownloadLocation}
                  disabled
                  className={classes.textField}
                />
              }
            />
          </SettingsCategoryList>
        </Collapse>
      </div>
    );
  }

}

export default withStyles(styles, { withTheme: true })(Settings);