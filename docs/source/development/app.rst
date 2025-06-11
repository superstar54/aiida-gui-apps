Developing an AiiDA-GUI app
==============================

A app for AiiDA-GUI consists of two halves:

1.  **Python “backend”** that registers routers and static assets.
2.  **JavaScript “frontend”** that exports metadata (routes, menu items, components).

Below is a minimal example based on the **aiida-qe-app** plugin.

1. Declare your plugin in ``pyproject.toml``
--------------------------------------------

Let AiiDA discover your plugin via an entry point under the
``aiida_gui_apps.plugins`` group:

.. code-block:: toml

  [project.entry-points."aiida_gui_apps.plugins"]
  qeapp = "aiida-qe-app:qeapp"

Here, **qeapp** is the app’s name, and
``aiida_qe_app:plugin`` must export a dict describing your
app.

2. Backend: register routers & serve your built frontend
--------------------------------------------------------

In your Python package (e.g. ``aiida_qe_app``):

.. code-block:: python

  # aiida_qe_app/__init__.py
  
  from .backend.app.api import app

  __version__ = "0.1.0"

  qeapp = {
      "app": app,
      "version": __version__,
      "title": "AiiDA Quantum ESPRESSO App",
      "description": "AiiDA Quantum ESPRESSO App is a web application for managing and submitting Quantum ESPRESSO calculations using AiiDA.",
      "logo": "logo.png",
  }


3. Frontend build: bundle your React code to ESM
------------------------------------------------

In your plugin’s ``package.json``:

.. code-block:: json

  {
    "name": "aiida-qe-app",
    "version": "0.1.0",
    "private": true,
    "scripts": {
      "build": "CI=false && react-scripts build && mkdir -p ../aiida_qe_app/static && rm -rf ../aiida_qe_app/static/* && cp -r build/* ../aiida_qe_app/static/",
    },
  }

After ``PUBLIC_URL=/plugins/apps/qeapp npm run build``, you’ll get:

``aiida_qe_app/static/*``

5. Putting it all together
--------------------------

1.  **Install the Python package**:

    .. code-block:: bash

       pip install -e .

2.  **Build the front end**:

    .. code-block:: bash

       cd frontend
       npm install
       npm run build


