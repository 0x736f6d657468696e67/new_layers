/*: @plugindesc  OMORI parallax backgrounds handler.
 * @param Special Parallax
 * @desc Some maps have a special parallax for them specifically ! If they're in this list, they'll be used.
 * @default 127,325,489,336,436,466,496
 * 
 * @param Space Parallax
 * @desc MapIds for space parallax background.
 * @default 105,88,92,99,100,103,105,327,106,122,113,332,334,117,119,120,121,124,126,123,143,145,147,429,165,172,173,176,175,177,178,179,180,181,186,198,490,127,325,489,336,436,466,496
 *
 * @param Underwater Parallax
 * @desc MapIds for underwater (parallax_dw_1) parallax background.
 * @default 211,191,203,430,204,194,192,193,195,196,197,453
*/

/**************************************************************************************************
 *   THIS PLUGIN IS MADE AS A COMPANION TO A MODIFIED VERSION OF THE GALV_LAYERGRAPHICS PLUGIN.   *
 *              THE PLUGIN WOULD NOT WORK WITHOUT THE MODIFIED PLUGIN                             *
 * It assigns a tailored-for-parallax background to maps selected by the user (via their Mapid).  *
 **************************************************************************************************/

var parallaxMaps = {};

parallaxMaps['special_parallax'] = PluginManager.parameters('parallax_noteinator')['Special Parallax'].split(',') || [];
parallaxMaps['space_parallax'] = PluginManager.parameters('parallax_noteinator')['Space Parallax'].split(',') || [];
parallaxMaps['underwater_parallax'] = PluginManager.parameters('parallax_noteinator')['Underwater Parallax'].split(',') || [];

(function () {
    const Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function (mapId) {
        Game_Map_setup.call(this, mapId);

        //  Parallax maps with an effect especially for them 
        if (parallaxMaps['special_parallax'].contains(String(mapId))) {
            switch (mapId) {
                case 127:  // SOLAR SYSTEM
                    $dataMap.note = `${$dataMap.note}\nLAYER_BG 1 space_background_parallax 0 0 -1 -1 0.2 0 255 0 10 0 0 1 1\nLAYER_BG 2 small_stars_parallax 0 0 -1 -1 0.3 0 255 0 15 0 0 1 1\nLAYER_BG 3 big_stars_parallax 0 0 -1 -1 0.3 0 255 0 25 0 0 1 1`
                    $dataMap.parallaxName = '';
                    $dataMap.parallaxNameSx = 0;
                    $dataMap.parallaxNameSy = 0;
                    $dataMap.scrollType = 0;
                    return;
                case 325:  // OTHERWORLD LADDER II
                case 489:
                    $dataMap.note = `${$dataMap.note}\nLAYER_BG 1 space_background_parallax 0 0 -1 -1 0.2 0 255 0 0 10 0 1 1\nLAYER_BG 2 small_stars_parallax 0 0 -1 -1 0.3 0 255 0 3 20 0 1 1\nLAYER_BG 3 big_stars_parallax 0 0 -1 -1 0.4 0 255 0 5 30 0 1 1`
                    $dataMap.parallaxName = '';
                    $dataMap.parallaxNameSx = 0;
                    $dataMap.parallaxNameSy = 0;
                    $dataMap.scrollType = 0;
                    return;
                case 336: // PYREFLY TO SWEETHEART
                case 436: // BALCONY (in sweethearts' castle)
                    $dataMap.note = `${$dataMap.note}\nLAYER_BG 1 space_background_parallax 0 0 -1 -1 0.2 0 255 0 0 2 0 1 1\nLAYER_BG 2 small_stars_parallax 0 0 -1 -1 0.3 0 255 0 3 15 0 1 1\nLAYER_BG 3 big_stars_parallax 0 0 -1 -1 0.4 0 255 0 5 20 0 1 1`
                    $dataMap.parallaxName = '';
                    $dataMap.parallaxNameSx = 0;
                    $dataMap.parallaxNameSy = 0;
                    $dataMap.scrollType = 0;
                    return;
                case 466: // NEIGHBOR'S BEDROOM 
                    $dataMap.note = `${$dataMap.note}\nLAYER_BG 1 space_background_parallax 0 0 -1 -1 0.1 -0.2 255 0 0 -10 0 1 1\nLAYER_BG 2 small_stars_parallax 0 0 -1 -1 -0.3 0 255 0 3 -15 0 1 1\nLAYER_BG 3 big_stars_parallax 0 0 -1 -1 0.3 0 255 5 5 8 0 1 1`
                    $dataMap.parallaxName = '';
                    $dataMap.parallaxNameSx = 0;
                    $dataMap.parallaxNameSy = 0;
                    $dataMap.scrollType = 0;
                    return;
                case 496: // NEIGHBOR'S PATH
                    if ($gameVariables.value(1075) >= 16) { // only the section of the map where the parallax is supposed to be
                        $dataMap.note = `${$dataMap.note}\nLAYER_BG 1 space_background_parallax 0 0 -1 -1 0.2 0 255 0 0 2 0 1 1\nLAYER_BG 2 small_stars_parallax 0 0 -1 -1 0.3 0 255 0 3 15 0 1 1\nLAYER_BG 3 big_stars_parallax 0 0 -1 -1 0.4 0 255 0 5 20 0 1 1`
                        $dataMap.parallaxName = '';
                        $dataMap.parallaxNameSx = 0;
                        $dataMap.parallaxNameSy = 0;
                        $dataMap.scrollType = 0;
                    }
                    return;
            }
            return;
        }

        // Commonly used parallaxes
        if (parallaxMaps['space_parallax'].contains(String(mapId))) {
            // NEIGHBOR'S PATH's logic is a bit different. 
            // This will make sure the parallax will not appear when it's not supposed to.
            if( mapId === 496 && $gameVariables.value(1075) < 16 ) {
                return;
            }
            $dataMap.note = `${$dataMap.note}\nLAYER_BG 1 space_background_parallax 0 0 -1 -1 0.2 0 255 0 0 0 0 1 1\nLAYER_BG 2 small_stars_parallax 0 0 -1 -1 0.3 0 255 0 3 0 0 1 1\nLAYER_BG 3 big_stars_parallax 0 0 -1 -1 0.4 0 255 0 5 0 0 1 1`
            $dataMap.parallaxName = '';
            $dataMap.parallaxNameSx = 0;
            $dataMap.parallaxNameSy = 0;
            $dataMap.scrollType = 0;
            return;
        }
        if (parallaxMaps['underwater_parallax'].contains(String(mapId))) {
            alert('first one ')
            $dataMap.note = `${$dataMap.note}\nLAYER_BG 1 underwater_parallax_1 100 100 -1 -1 0.15 0 255 0 0 0 0 1 1\nLAYER_BG 2 underwater_parallax_2 0 0 -1 -1 -0.2 0.1 255 0 3 0 0 1 1\nLAYER_BG 3 underwater_parallax_3 0 0 -1 -1 0.1 0.4 255 0 6 0 0 1 1\nLAYER_BG 4 underwater_parallax_4 0 0 -1 -1 0.1 0.1 255 0 4 1 3 1 1`
            $dataMap.parallaxName = '';
            $dataMap.parallaxNameSx = 0;
            $dataMap.parallaxNameSy = 0;
            $dataMap.scrollType = 0;
            return;
        }
    }
}
)()
