//=============================================================================
// main.js
//=============================================================================

PluginManager.setup($plugins);

window.onload = function() {
    SceneManager.run(Scene_Boot);
};

window.navigator.plugins.namedItem = function() {
    return null;
}