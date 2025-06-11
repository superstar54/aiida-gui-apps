import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function PluginRedirect() {
  const { pluginName } = useParams<{ pluginName: string }>();

  useEffect(() => {
    // full reload into the plugin’s own SPA
    window.location.href = `/plugins/apps/${pluginName}/`;
  }, [pluginName]);

  return null;
}
