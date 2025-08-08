/*: @plugindesc  OMORI parallax backgrounds handler.
 * @param Special Parallax
 * @desc Some maps have an assigned parallax for them specifically ! If they're in this list, they'll be used instead the default ones.
 * @default 127,325,489,336,436,466,496
 * 
 * @param Space Parallax
 * @desc MapIds for space parallax background.
 * @default 105,88,92,99,100,103,105,327,106,122,113,332,334,117,119,120,121,124,126,123,143,145,147,429,165,172,173,176,175,177,178,179,180,181,186,198,490,127,325,489,336,436,466,496
 *
 * @param Underwater Parallax
 * @desc MapIds for underwater (parallax_dw_1) parallax background.
 * @default 211,191,203,430,204,194,192,193,195,196,197,453

@help
 ***********************************************************************************************************************************************************************************************
 *                                             **************************************************************************************************                                              *
 *                                                 THIS PLUGIN IS MADE AS A COMPANION TO A MODIFIED VERSION OF THE GALV_LAYERGRAPHICS PLUGIN.                                                  *
 *                                                IT ASSIGNS PRE-MADE PARALLAXES TO MAPS SELECTED BY THE USER (VIA THEIR MAPID).                                                               *
 *                                                                      THIS PLUGIN WOULD NOT WORK WITHOUT THE OTHER ONE                                                                       *
 *                                                      OMORI PARALLAX CONFIG SHOULD BE PLACED ABOVE GALV_LAYERGRAPHICS FOR IT TO WORK !!                                                      *
 *                                             **************************************************************************************************                                              *
 *                                                               this script assigns parallax configurations to designated maps.                                                               *
 ***********************************************************************************************************************************************************************************************
 *                              The modified GALV_LAYERGRAPHICS is configured to work with the parallaxes applied. It also includes a modified version of the 'LAYER' command - 'LAYER_BG'     *
 *                                                            (documentation on it is in the modified galv_layergraphics.js plugin.)                                                           *
 *           it's difference from the normal 'LAYER' command is only that it lets the user choose a position and dimensions for the canvas on which the layer will be drawned upon.            *
 * this is useful for scenes in omori where effects such as shaking the screen is used: the edges of canvas may appear in the corners and by setting the layer beyond the edge we cover it up. *
 *                                                                                                                                                                                             *
 ***********************************************************************************************************************************************************************************************/

var parallaxMaps = {};

parallaxMaps['special_parallax'] = PluginManager.parameters('Omori Parallax Config')['Special Parallax'].split(',') || [];
parallaxMaps['space_parallax'] = PluginManager.parameters('Omori Parallax Config')['Space Parallax'].split(',') || [];
parallaxMaps['underwater_parallax'] = PluginManager.parameters('Omori Parallax Config')['Underwater Parallax'].split(',') || [];

(function () {
    const Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function (mapId) {
        Game_Map_setup.call(this, mapId);

        //  Parallax maps with an effect especially for them 
        if (parallaxMaps['special_parallax'].contains(String(mapId))) {
            switch (mapId) {
                case 127:  // SOLAR SYSTEM
                    $dataMap.note = `${$dataMap.note}\nLAYER 1 space_parallax_1 0.2 0 255 0 10 0 0\nLAYER 2 space_parallax_2 0.3 0 255 0 15 0 0\nLAYER 3 space_parallax_3 0.3 0 255 0 25 0 0`
                    break;
                case 325:  // OTHERWORLD LADDER II
                    $dataMap.note = `${$dataMap.note}\nLAYER 1 space_parallax_1 0.2 0 255 0 0 10 0\nLAYER 2 space_parallax_2 0.3 0 255 0 3 20 0\nLAYER 3 space_parallax_3 0.4 0 255 0 5 30 0`
                    break;
                case 489: // PLUTO'S RIDE
                    $dataMap.note = `${$dataMap.note}\nLAYER 1 space_parallax_1 0 -4 255 0 0 10 0 1 1\nLAYER 2 space_parallax_2 0 -6 255 0 3 20 0\nLAYER 3 space_parallax_3 0 -10 255 0 5 30 0\nLAYER 4 space_parallax_fast 0 -22 255 0 5 30 0`
                    break;
                case 336: // PYREFLY TO SWEETHEART
                case 436: // BALCONY (in sweethearts' castle)
                    $dataMap.note = `${$dataMap.note}\nLAYER 1 space_parallax_1 0.2 0 255 0 0 2 0\nLAYER 2 space_parallax_2 0.3 0 255 0 3 15 0\nLAYER 3 space_parallax_3 0.4 0 255 0 5 20 0`
                    break;
                case 466: // NEIGHBOR'S BEDROOM 
                    $dataMap.note = `${$dataMap.note}\nLAYER 1 space_parallax_1 0.1 -0.2 255 0 0 -10 0\nLAYER 2 space_parallax_2 -0.3 0 255 0 3 -15 0\nLAYER 3 space_parallax_3 0.3 0 255 5 5 8 0`
                    break;
                case 496: // NEIGHBOR'S PATH
                    if ($gameVariables.value(1075) >= 16) { // The only section of the map where the parallax is supposed to be
                        $dataMap.note = `${$dataMap.note}\nLAYER 1 space_parallax_1 0.2 0 255 0 0 2 0\nLAYER 2 space_parallax_2 0.3 0 255 0 3 15 0\nLAYER 3 space_parallax_3 0.4 0 255 0 5 20 0`
                    }
                    break;
            }
            // Clear the default parallax set by the game as it's not necessary anymore.
            this.clearParallax()
            return;
        }

        // Commonly used parallaxes
        // Normal Headspace space parallax
        if (parallaxMaps['space_parallax'].contains(String(mapId))) {
            // NEIGHBOR'S PATH's logic is a bit different. 
            // This will make sure the parallax will not appear when it's not supposed to.
            if (mapId === 496 && $gameVariables.value(1075) < 16) {
                return;
            }
            $dataMap.note = `${$dataMap.note}\nLAYER 1 space_parallax_1 0.2 0 255 0 0 0 0\nLAYER 2 space_parallax_2 0.3 0 255 0 3 0 0\nLAYER 3 space_parallax_3 0.4 0 255 0 5 0 0`
            // Clear the default parallax set by the game as it's not necessary anymore.
            this.clearParallax()
            return;
        }
        
        // Deep Well's parallax
        if (parallaxMaps['underwater_parallax'].contains(String(mapId))) {
            $dataMap.note = `${$dataMap.note}\nLAYER 1 underwater_parallax_1 0.15 0 255 0 0 0 0\nLAYER 2 underwater_parallax_2 -0.2 0.1 255 0 3 0 0\nLAYER 3 underwater_parallax_3 0.1 0.4 255 0 6 0 0\nLAYER 4 underwater_parallax_4 0.1 0.1 255 0 4 1 3`
            // Clear the default parallax set by the game as it's not necessary anymore.
            this.clearParallax();
            return;
        }
    }

    Game_Map.prototype.clearParallax = function () {
        this._parallaxName = '';
        this._parallaxNameSx = 0;
        this._parallaxNameSy = 0;
        this._scrollType = 0;
    }
}
)()
 