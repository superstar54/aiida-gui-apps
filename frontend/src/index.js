import AppGallery from './AppGallery';
import PluginRedirect from './PluginRedirect';


import { faThLarge } from '@fortawesome/free-solid-svg-icons';


const plugin = {
  id: 'apps',
  title: 'Apps',
  version: '0.0.1',
  description: 'AiiDA GUI apps plugin',
  sideBarItems: {
    "apps": {"label": "Apps",
      "path": "/apps",
      "icon": faThLarge},
  },
  homeItems: {
    "apps": {"label": "Apps", "path": "/apps"},
  },
  routes: {
          "/apps": AppGallery,
          "/plugins/apps/:pluginName/*": PluginRedirect,
        },
  dataView: {},
};

export default plugin;
