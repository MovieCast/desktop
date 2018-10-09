import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer"

export async function init() {
  try {
    await installExtension(REACT_DEVELOPER_TOOLS);
  } catch(e) {
    console.log("Unable to install `react-devtools`: \n", e)
  }
}