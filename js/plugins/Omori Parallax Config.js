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
/***************************************************************************************************************************************************************************************************
 * *********************************************************************************************************************************************************************************************** *
 *                                               **************************************************************************************************                                                *
 *                                                   THIS PLUGIN IS MADE AS A COMPANION TO A MODIFIED VERSION OF THE GALV_LAYERGRAPHICS PLUGIN.                                                    *
 *                                                         IT ASSIGNS PRE-MADE PARALLAXES TO MAPS SELECTED BY THE USER (VIA THEIR MAPID).                                                          *
 *                                                                        THIS PLUGIN WOULD NOT WORK WITHOUT THE OTHER ONE                                                                         *
 *                                                        OMORI PARALLAX CONFIG SHOULD BE PLACED ABOVE GALV_LAYERGRAPHICS FOR IT TO WORK !!                                                        *
 *                                               **************************************************************************************************                                                *
 *                                                                 THIS SCRIPT ASSIGNS PARALLAX CONFIGURATIONS TO DESIGNATED MAPS.                                                                 *
 * *********************************************************************************************************************************************************************************************** *
 *                   THE MODIFIED GALV_LAYERGRAPHICS IS CONFIGURED TO WORK WITH THE PARALLAXES APPLIED. IT ALSO INCLUDES A MODIFIED VERSION OF THE 'LAYER' COMMAND - 'LAYER_BG'                    *
 *                                                             (DOCUMENTATION ON IT IS IN THE MODIFIED GALV_LAYERGRAPHICS.JS PLUGIN.)                                                              *
 *             IT'S DIFFERENCE FROM THE NORMAL 'LAYER' COMMAND IS ONLY THAT IT LETS THE USER CHOOSE A POSITION AND DIMENSIONS FOR THE CANVAS ON WHICH THE LAYER WILL BE DRAWNED UPON.              *
 *   THIS IS USEFUL FOR SCENES IN OMORI WHERE EFFECTS SUCH AS SHAKING THE SCREEN IS USED: THE EDGES OF CANVAS MAY APPEAR IN THE CORNERS AND BY SETTING THE LAYER BEYOND THE EDGE WE COVER IT UP.   *
 * *********************************************************************************************************************************************************************************************** *
 *                                                                                   *   PLUGIN COMMANDS (QUICK)                                                                                   *
 * *********************************************************************************************************************************************************************************************** *
 *  LAYER_BG MAPID ID GRAPHIC X Y WIDTH HEIGHT XSPEED YSPEED OPACITY Z XSHIFT YSHIFT BLEND XCAMERA YCAMERA                                                                                         *
 *  LAYER_BG REMOVE MAPID ID                                                                                                                                                                       *
 *                                                                                                                                                                                                 *
 *  LAYER_BG REFRESH                                                                                                                                                                               *
 *                                                                                                                                                                                                 *
 * *********************************************************************************************************************************************************************************************** *
 *                                                                                 *   PLUGIN COMMANDS (DETAILED)                                                                                  *
 * *********************************************************************************************************************************************************************************************** *
 * WHEN CREATING A BACKGROUND LAYER YOU CAN USE:                                                                                                                                                   *  
 *                                                                                                                                                                                                 *
 *  LAYER_BG MAPID ID GRAPHIC CANVASX CANVASY WIDTH HEIGHT XSPEED YSPEED OPACITY Z XSHIFT YSHIFT BLEND                                                                                             *
 *                                                                                                                                                                                                 *
 *EACH PROPERTY IS SEPARATED BY A SPACE AND YOU WILL EXCHANGE THE PROPERTY NAMES ABOVE WITH VALUES.                                                                                                *
 *                                                                                                                                                                                                 *
 *                                                                                                                                                                                                 *
 *  EXPLANATION OF PROPERTIES:                                                                                                                                                                     *
 *  LAYER_BG        - DO NOT CHANGE THIS, IT IS THE KEYWORD FOR THE PLUGIN.                                                                                                                        *
 *  MAPID        - THE ID OF THE MAP YOU ARE CREATING THE LAYER FOR                                                                                                                                *
 *  ID           - THE ID OF THE LAYER ITSELF. IF YOU WANT TO CHANGE OR REMOVE                                                                                                                     *
 *             - AN EXISTING LAYER, YOU REFER TO IT BY IT'S ID.                                                                                                                                    *
 *  GRAPHIC      - THE FILENAME OF THE IMAGE FOUND IN /IMG/LAYERS/                                                                                                                                 *
 *  CANVASX            - THE X POSITION OF THE CANVAS OF THE LAYER ON THE MAP.                                                                                                                     *
 *  CANVASY            - THE Y POSITION OF THE CANVAS OF THE LAYER ON THE MAP.                                                                                                                     *
 *  WIDTH        - THE WIDTH OF THE STATIC LAYER IMAGE ON THE MAP. ( CAN TAKE A CALCULATION IN THE FIELD. GRAPHICS.WIDTH FOR SCREEN WIDTH. NO SPACE IN THE FIELD )                                 *
 *  HEIGHT        - THE HEIGHT OF THE STATIC LAYER IMAGE ON THE MAP. ( CAN TAKE A CALCULATION IN THE FIELD. GRAPHICS.HEIGHT FOR SCREEN HEIGHT. NO SPACE IN THE FIELD )                             *
 *  XSPEED       - THE SPEED OF THE HORIZONTAL MOVEMENT. NEGATIVES TO GO LEFT                                                                                                                      *
 *  YSPEED       - THE SPEED OF THE VERTICAL MOVEMENT. NEGATIVES TO GO UP                                                                                                                          *
 *  OPACITY      - TRANSPARENCY OF THE IMAGE (0 - 255)                                                                                                                                             *
 *  Z            - WHAT PRIORITY THE IMAGE HAS. 0 = GROUND, 5 = ABOVE ALL CHARS                                                                                                                    *
 *  XSHIFT       - HORIZONAL MOVEMENT SHIFT THAT DIFFERS FROM PLAYER MOVEMENT                                                                                                                      *
 *  YSHIFT       - VERTICAL MOVEMENT SHIFT THAT DIFFERS FROM PLAYER MOVEMENT                                                                                                                       *
 *             - MAKE XSHIFT AND YSHIFT = 0 TO MOVE WITH MAP                                                                                                                                       *
 *  BLEND        - BLEND MODE (0 = NORMAL, 1 = ADD, 2 = MULTIPLY, 3 = SCREEN)                                                                                                                      *
 *             - *NOTE RPG MAKER MV VERSION 1.1 MULTIPLY ISN'T SUPPORTED                                                                                                                           *
 *                                                                                                                                                                                                 *
 *                                                                                                                                                                                                 *
 * EXAMPLE:                                                                                                                                                                                        *
 * LAYER_BG 8 1 SPACE_PARALLAX 100 0 GRAPHICS.WIDTH+100 250 0.2 0 255 0 0 0 3                                                                                                                      *
 * THIS COMMAND WILL MAKE A BACKGROUND LAYER FROM THE PNG "SPACE_PARALLAX.PNG" IN THE IMG/LAYERS DIRECTORY                                                                                         *
 * PUT IT 100PX HORIZONTAL TO THE LEFT EDGE OF THE SCREEN AND CONNECTED TO THE TOP EDGE OF THE SCREEN.                                                                                             *
 * IT'S WIDTH WOULD BE 100PX LARGER THAN THE WIDTHOF THE SCREEN AND THE LAYER IS COMPLETELY OPAQUE AND IN BLENDING MODE SCREEN                                                                     *
 *                                                                                                                                                                                                 *
 * USING VARIABLES                                                                                                                                                                                 *
 * IF YOU PUT A "V" BEFORE THE PROPERTY. THE NUMBER AFTER WILL BE VARIABLE ID.                                                                                                                     *
 * (USAGE OF GRAPHICS.WIDTH AND GRAPHIC.HEIGHT IS INTENDED ONLY FOR THE WIDTH AND HEIGHT PROPERTIES TO HELP MAKE USEFUL LENGTH CALCULATIONS IN REGARDS TO THE LAYER SIZE)                          *
 * *********************************************************************************************************************************************************************************************** *
 *                                                                                                                                                                                                 *
 *   LAYER_BG REMOVE MAPID ID  - REMOVE A LAYER FROM A MAP                                                                                                                                         *
 *                                                                                                                                                                                                 *
 * EXAMPLE:                                                                                                                                                                                        *
 * LAYER_BG REMOVE 12 1       - REMOVES LAYER 1 FROM MAP 12                                                                                                                                        *
 *                                                                                                                                                                                                 *
 * *********************************************************************************************************************************************************************************************** *
 *                                                                                                                                                                                                 *
 *                                                                                                                                                                                                 *
 *   LAYER_BG REFRESH          - FOR CREATING NEW LAYERS ON THE SAME MAP AS THE                                                                                                                    *
 *                          - PLUGIN COMMAND. DO THIS COMMAND IF CREATING                                                                                                                          *
 *                          - NEW LAYERS ON THE MAP. IT IS NOT REQUIRED FOR                                                                                                                        *
 *                          - CHANGING EXISTING LAYERS                                                                                                                                             *
 *                                                                                                                                                                                                 *
 * *********************************************************************************************************************************************************************************************** *
 *                                                                                          *   MAP NOTES                                                                                          *
 * *********************************************************************************************************************************************************************************************** *
 * IN ADDITION TO USING THE PLUGIN CALLS, YOU CAN SETUP LAYERS ON EACH MAP IN                                                                                                                      *
 * THE NOTE SECTION OF THE MAP SETTINGS. DO THIS IN THE SAME WAY AS THE PLUGIN                                                                                                                     *
 * CALL EXCEPT DO NOT ADD THE MAP ID.                                                                                                                                                              *
 *                                                                                                                                                                                                 * 
 *   LAYER_BG ID GRAPHIC X Y WIDTH HEIGHT XSPEED YSPEED OPACITY Z XSHIFT YSHIFT BLEND                                                                                                              *
 *                                                                                                                                                                                                 *
 * THESE LAYERS CAN BE CHANGED AS NORMAL WITH PLUGIN COMMANDS.                                                                                                                                     *
 * *********************************************************************************************************************************************************************************************** *
 *                                                                                        *   SCRIPT STUFF                                                                                         *
 * *********************************************************************************************************************************************************************************************** *
 * FOR ADVANCED USERS ONLY. LAYER PROPERTIES CAN BE ACCESSED VIA SCRIPT:                                                                                                                           *
 * $GAMEMAP.OLAYERSETTINGS[MAPID][LAYERID].PROPERTY                                                                                                                                                *
 * "PROPERTY" BEING THE ABOVE PROPERITES IN LOWERCASE.                                                                                                                                             *
 ***************************************************************************************************************************************************************************************************/


var Imported = Imported || {};
Imported.Galv_LayerGraphics = true;

var OLayers = {};        // main object -  oLayers for OMORI layers ¯\_(ツ)_/¯
OLayers.pCmd = {};  // Command manager
OLayers.LG = {};      // methods and such in plugin 

OLayers.LG.parallaxMaps = {};

OLayers.LG.parallaxMaps['special_parallax'] = PluginManager.parameters('Omori Parallax Config')['Special Parallax'].split(',') || [];
OLayers.LG.parallaxMaps['space_parallax'] = PluginManager.parameters('Omori Parallax Config')['Space Parallax'].split(',') || [];
OLayers.LG.parallaxMaps['underwater_parallax'] = PluginManager.parameters('Omori Parallax Config')['Underwater Parallax'].split(',') || [];

(function () {
    /******************************************
     *    // OMORI PARALLAX CONFIGURATION     *
     * * YOU CAN ADD MORE CONFIGURATIONS HERE *
     ******************************************/
    Game_Map.prototype.getPremadeParallax = function (mapId) {

        //  Parallax maps with an effect especially for them 
        if (OLayers.LG.parallaxMaps['special_parallax'].contains(String(mapId))) {
            switch (mapId) {
                case 127:  // SOLAR SYSTEM
                    $dataMap.note = `${$dataMap.note}\nLAYER_BG 1 space_parallax_1 0 0 Graphics.width Graphics.height 0.2 0 255 0 10 0 0\nLAYER_BG 2 space_parallax_2 0 0 Graphics.width Graphics.height 0.3 0 255 0 15 0 0\nLAYER_BG 3 space_parallax_3 0 0 Graphics.width Graphics.height 0.3 0 255 0 25 0 0`
                    break;

                case 325:  // OTHERWORLD LADDER II
                    $dataMap.note = `${$dataMap.note}\nLAYER_BG 1 space_parallax_1 0 0 Graphics.width Graphics.height 0.2 0 255 0 0 10 0\nLAYER_BG 2 space_parallax_2 0 0 Graphics.width Graphics.height 0.3 0 255 0 3 20 0\nLAYER_BG 3 space_parallax_3 0 0 Graphics.width Graphics.height 0.4 0 255 0 5 30 0`
                    break;
                case 489: // PLUTO'S RIDE
                    $dataMap.note = `${$dataMap.note}\nLAYER_BG 1 space_parallax_1 0 0 Graphics.width Graphics.height 0 -4 255 0 0 10 0 1 1\nLAYER_BG 2 space_parallax_2 0 0 Graphics.width Graphics.height 0 -6 255 0 3 20 0\nLAYER_BG 3 space_parallax_3 0 0 Graphics.width Graphics.height 0 -10 255 0 5 30 0\nLAYER_BG 4 space_parallax_fast 0 0 Graphics.width Graphics.height 0 -22 255 0 5 30 0`
                    break;
                case 336: // PYREFLY TO SWEETHEART
                case 436: // BALCONY (in sweethearts' castle)
                    $dataMap.note = `${$dataMap.note}\nLAYER_BG 1 space_parallax_1 0 0 Graphics.width Graphics.height 0.2 0 255 0 0 2 0\nLAYER_BG 2 space_parallax_2 0 0 Graphics.width Graphics.height 0.3 0 255 0 3 15 0\nLAYER_BG 3 space_parallax_3 0 0 Graphics.width Graphics.height 0.4 0 255 0 5 20 0`
                    break;
                case 466: // NEIGHBOR'S BEDROOM 
                    $dataMap.note = `${$dataMap.note}\nLAYER_BG 1 space_parallax_1 0 0 Graphics.width Graphics.height 0.1 -0.2 255 0 0 -10 0\nLAYER_BG 2 space_parallax_2 0 0 Graphics.width Graphics.height -0.3 0 255 0 3 -15 0\nLAYER_BG 3 space_parallax_3 0 0 Graphics.width Graphics.height 0.3 0 255 5 5 8 0`
                    break;
                case 496: // NEIGHBOR'S PATH
                    if ($gameVariables.value(1075) >= 16) { // The only section of the map where the parallax is supposed to be
                        $dataMap.note = `${$dataMap.note}\nLAYER_BG 1 space_parallax_1 0 0 Graphics.width Graphics.height 0.2 0 255 0 0 2 0\nLAYER_BG 2 space_parallax_2 0 0 Graphics.width Graphics.height 0.3 0 255 0 3 15 0\nLAYER_BG 3 space_parallax_3 0 0 Graphics.width Graphics.height 0.4 0 255 0 5 20 0`
                    }
                    break;
            }
            // Clear the default parallax set by the game as it's not necessary anymore.
            this.clearParallax()
            return;
        }

        // Commonly used parallaxes
        // Normal Headspace space parallax
        if (OLayers.LG.parallaxMaps['space_parallax'].contains(String(mapId))) {
            // NEIGHBOR'S PATH's logic is a bit different. 
            // This will make sure the parallax will not appear when it's not supposed to.
            if (mapId === 496 && $gameVariables.value(1075) < 16) {
                return;
            }
            $dataMap.note = `${$dataMap.note}\nLAYER_BG 1 space_parallax_1 0 0 Graphics.width Graphics.height 0.2 0 255 0 0 0 0\nLAYER_BG 2 space_parallax_2 0 0 Graphics.width Graphics.height 0.3 0 255 0 3 0 0\nLAYER_BG 3 space_parallax_3 0 0 Graphics.width Graphics.height 0.4 0 255 0 5 0 0`
            // Clear the default parallax set by the game as it's not necessary anymore.
            this.clearParallax()
            return;
        }

        // Deep Well's parallax
        if (OLayers.LG.parallaxMaps['underwater_parallax'].contains(String(mapId))) {
            $dataMap.note = `${$dataMap.note}\nLAYER_BG 1 underwater_parallax_1 0 0 Graphics.width Graphics.height 0.15 0 255 0 0 0 0\nLAYER_BG 2 underwater_parallax_2 0 0 Graphics.width Graphics.height -0.2 0.1 255 0 3 0 0\nLAYER_BG 3 underwater_parallax_3 0 0 Graphics.width Graphics.height 0.1 0.4 255 0 6 0 0\nLAYER_BG 4 underwater_parallax_4 0 0 Graphics.width Graphics.height 0.1 0.1 255 0 4 1 3`
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

    /***************************************
     * // OMORI PARALLAX CONFIGURATION END *
     ***************************************/

    // PARALLAX PROCESSING - ripped from GALV_LayerGraphics and modified to work specifically for this plugin.
    // LAYER GRAPHIC FOLDER
    //-----------------------------------------------------------------------------
    ImageManager.loadOLayerGraphic = function (filename, hue) {
        return this.loadBitmap('img/layers/', filename, hue, true);
    };

    // PLUGIN MANAGEMENT.  
    var OLayers_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        if (OLayers.pCmd[command]) {
            OLayers.pCmd[command](args);
            return;
        };
        OLayers_Game_Interpreter_pluginCommand.call(this, command, args);
    };

    // Direct to Plugin Object
    OLayers.pCmd.LAYER_BG = function (arguments) {
        OLayers.LG.createBGLayer(arguments);
    }
    // END PLUGIN MANAGEMENT

    // CREATE A BACKGROUND TILING LAYER
    //-----------------------------------------------------------------------------
    OLayers.LG.createBGLayer = function (config) {
        switch (config[0]) {
            case 'REFRESH':
                // Recreate layer graphics
                SceneManager._scene._spriteset.createOLayerGraphics();
                return;
            case 'REMOVE':
                // Remove specified layer object
                var mapid = OLayers.LG.processArg(config[1]);
                var id = OLayers.LG.processArg(config[2]);
                if (id) {
                    if ($gameMap.oLayerSettings[mapid][id]) {
                        $gameMap.oLayerSettings[mapid][id] = {};
                    }
                } else {
                    $gameMap.oLayerSettings[mapid] = {};
                };
                return;
        };

        // get variables
        var mapid = OLayers.LG.processArg(config[0]);
        var id = OLayers.LG.processArg(config[1]);
        $gameMap.oLayerSettings[mapid] = $gameMap.oLayerSettings[mapid] || {};
        $gameMap.oLayerSettings[mapid][id] = $gameMap.oLayerSettings[mapid][id] || {};

        var x_exist = $gameMap.oLayerSettings[mapid][id].currentx || 0;
        var y_exist = $gameMap.oLayerSettings[mapid][id].currenty || 0;

        // create object
        $gameMap.oLayerSettings[mapid][id] = {
            background: true,
            graphic: config[2],                      // filename of the graphic in /img/layers/
            canvasx: OLayers.LG.processArg(config[3]),         // canvas x origin. This value will not change for the layer's lifetime
            canvasy: OLayers.LG.processArg(config[4]),         // canvas y origin. This value will not change for the layer's lifetime
            width: OLayers.LG.processArg(config[5]),           // canvas width. This value will not change for the layer's lifetime
            height: OLayers.LG.processArg(config[6]),          // canvas height. This value will not change for the layer's lifetime
            xspeed: OLayers.LG.processArg(config[7]),          // speed the layer will scroll horizontally
            yspeed: OLayers.LG.processArg(config[8]),          // speed the layer will scroll vertically
            opacity: OLayers.LG.processArg(config[9]),         // the opacity of the layer
            z: OLayers.LG.processArg(config[10]),               // what level the layer is displayed at (ground is 0)
            xshift: OLayers.LG.processArg(config[11]),          // Moves the layer at a different x amount than the map (0 to not move)
            yshift: OLayers.LG.processArg(config[12]),          // Moves the layer at a different y amount than the map (0 to not move)
            blend: OLayers.LG.processArg(config[13]),           // Blend mode  (0 = normal, 1 = add, 2 = multiply, 3 = screen)
            currentx: x_exist,                       // origin x saved. Reset this on map change
            currenty: y_exist,                       // origin y saved. Reset this on map change
        };
    };

    // OTHER
    //-----------------------------------------------------------------------------

    OLayers.LG.processArg = function (txt) {
        if (!isNaN(txt)) {
            return Number(txt);
        } else {
            return txt.replace(/v[\d]{4}/g, (match) => { return OLayers.LG.getGameVariable(match.slice(1)) })
        };
    };

    OLayers.LG.getGameVariable = function (varId) {
        return $gameVariables.value(Number(varId));
    }

    OLayers.LG.isEmpty = function (obj) {
        return Object.keys(obj).length === 0;
    };


    // SPRITESET MAP
    //-----------------------------------------------------------------------------
    OLayers.LG.Spriteset_Map_createlowerlayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function () {
        OLayers.LG.Spriteset_Map_createlowerlayer.call(this);
        this.oLayerGraphics = this.oLayerGraphics || {};
        this.oLayerSettings = this.oLayerSettings || {};
        this.createOLayerGraphics();
    };

    Spriteset_Map.prototype.createOLayerGraphics = function () {
        // Create Active Layers On Map

        var mapGraphics = $gameMap.oLayerConfig(); // get object only for the map

        for (var id in mapGraphics) {
            // if layers sprite doesn't exist, make it.
            if (!this.oLayerGraphics[id] || !this.oLayerGraphics[id].id) {
                // Create Layer Sprite
                if (mapGraphics[id]) {
                    if (mapGraphics[id].background) { // If layer created using LAYER_BG
                        this.oLayerGraphics[id] = new Sprite_LayerGraphic(id);
                        const width = OLayers.LG.processArg(eval(mapGraphics[id].width));
                        const height = OLayers.LG.processArg(eval(mapGraphics[id].height));
                        // Set the canvas properties
                        this.oLayerGraphics[id].move(mapGraphics[id].canvasx, mapGraphics[id].canvasy, width, height);
                    }
                };
            };

            // If settings are empty for the layer
            if (OLayers.LG.isEmpty(mapGraphics[id]) || mapGraphics[id]["graphic"] == "") {
                var ind = this._tilemap.children.indexOf(this.oLayerGraphics[id]);
                this._tilemap.removeChildAt(ind);
                delete this.oLayerGraphics[id];
                delete mapGraphics[id];
            } else {
                this.oLayerGraphics[id] = this._tilemap.addChild(this.oLayerGraphics[id]);
            };
        };
    };


    // GAME MAP - SETUP LAYER SETTINGS
    //-----------------------------------------------------------------------------
    OLayers.LG.Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function () {
        OLayers.LG.Game_Map_initialize.call(this);
        this.oLayerSettings = {};   // Store ALL oLayers here.
    };

    OLayers.LG.Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function (mapId) {
        OLayers.LG.Game_Map_setup.call(this, mapId);

        // Get Parallax Config from above
        this.getPremadeParallax(mapId);

        if (!this.oLayerSettings) {
            this.oLayerSettings = {};
        }
        this.oLayerSettings[mapId] = this.oLayerSettings[mapId] || {}
        //
        // Setup map notetag layers
        this.createNoteOLayers(mapId);

        for (var obj in this.oLayerConfig()) {
            obj.currentx = 0;
            obj.currenty = 0;
        };
    };

    Game_Map.prototype.createNoteOLayers = function (mapId) {
        // CREATE MAP CONFIG HERE
        var txtArray = $dataMap.note.match(/[^\r\n]+/g);
        if (!txtArray) return;

        for (i = 0; i < txtArray.length; i++) {
            if (txtArray[i].indexOf("LAYER_BG ") >= 0) {
                var config = (mapId + txtArray[i].replace('LAYER_BG', '')).split(" ");
                // If layer doesn't already exist, create it:
                if (!this.oLayerSettings[mapId][Number(config[1])]) {
                    OLayers.LG.createBGLayer(config);
                };
            };
        };
    };

    Game_Map.prototype.oLayerConfig = function () {
        // Get object list from oLayerSettings
        if (this.oLayerSettings[this.mapId()]) {
            return this.oLayerSettings[this.mapId()];
        } else {
            this.oLayerSettings[this.mapId()] = {}
            return this.oLayerSettings[this.mapId()];
        };
    };


    // CREATE LAYER TILING SPRITE
    //-----------------------------------------------------------------------------
    function Sprite_LayerGraphic() {
        this.initialize.apply(this, arguments);
    }

    Sprite_LayerGraphic.prototype = Object.create(TilingSprite.prototype);
    Sprite_LayerGraphic.prototype.constructor = Sprite_LayerGraphic;

    Sprite_LayerGraphic.prototype.initialize = function (id) {
        this.id = id;

        TilingSprite.prototype.initialize.call(this);
        this.currentGraphic = "";
        this.createBitmap();
        this.update();
    };

    // TEMP CANVAS FIX FOR WHEN REFRESHING LAYERS ON MAP
    Sprite_LayerGraphic.prototype.generateTilingTexture = function (arg) {
        PIXI.TilingSprite.prototype.generateTilingTexture.call(this, arg);
        // Purge from Pixi's Cache
        if (this.tilingTexture && this.tilingTexture.canvasBuffer)
            PIXI.Texture.removeTextureFromCache(this.tilingTexture.canvasBuffer.canvas._pixiId);
    };
    // - END - TEMP CANVAS FIX FOR WHEN REFRESHING LAYERS ON MAP

    Sprite_LayerGraphic.prototype.createBitmap = function () {
        if (OLayers.LG.isEmpty(this.lValue())) {
            this.bitmap = ImageManager.loadOLayerGraphic("");
        } else {
            this.bitmap = ImageManager.loadOLayerGraphic(this.lValue().graphic);
        };
        this.z = this.lValue().z;
    };


    Sprite_LayerGraphic.prototype.lValue = function () {
        return $gameMap.oLayerConfig()[this.id];
    };


    // Update
    Sprite_LayerGraphic.prototype.update = function () {
        TilingSprite.prototype.update.call(this);

        if (this.currentGraphic !== this.lValue().graphic) {
            this.createBitmap();
            this.currentGraphic = this.lValue().graphic;
        };

        this.updatePosition();
    };

    // Update Position
    Sprite_LayerGraphic.prototype.updatePosition = function () {
        this.z = this.lValue().z || 0;
        this.opacity = this.lValue().opacity || 0;
        this.blendMode = this.lValue().blend || 0;


        this.origin.x = 0 + this.lValue().currentx + this.xOffset();
        this.origin.y = 0 + this.lValue().currenty + this.yOffset();
        this.lValue().currentx += this.lValue().xspeed;
        this.lValue().currenty += this.lValue().yspeed;
    };

    Sprite_LayerGraphic.prototype.xOffset = function () {
        return this.displayX() * this.lValue().xshift;
    };

    Sprite_LayerGraphic.prototype.yOffset = function () {
        return this.displayY() * this.lValue().yshift;
    };

    Sprite_LayerGraphic.prototype.displayX = function () {
        return $gameMap.displayX();
    };
    Sprite_LayerGraphic.prototype.displayY = function () {
        return $gameMap.displayY();
    };

    // YANFLY FIX
    if (Imported.YEP_BattleEngineCore) {
        OLayers.LG.Spriteset_Battle_battleFieldDepthCompare = Spriteset_Battle.prototype.battleFieldDepthCompare;
        Spriteset_Battle.prototype.battleFieldDepthCompare = function (a, b) {
            if (a.tilePosition || b.tilePosition) {
                if (a.z < b.z) return -1;
                if (a.z > b.z) return 1;
                return 0;
            };
            return OLayers.LG.Spriteset_Battle_battleFieldDepthCompare.call(this, a, b);
        };
    };

}
)()
