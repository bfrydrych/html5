// requirejs.config({
// 	//Remember: only use shim config for non-AMD scripts,
// 	//scripts that do not already call define(). The shim
// 	//config will not work correctly if used on AMD scripts,
// 	//in particular, the exports and init config will not
// 	//be triggered, and the deps config will be confusing
// 	//for those cases.
// 	shim: {
// 		'multiplayer/serialization/compiled': {
// 			//These script dependencies should be loaded before loading
// 			//backbone.js
// 			deps: ['node_modules/protobufjs/minimal']
// 		},
// 		'multiplayer/commands': {
// 			deps: ['multiplayer/serialization/compiled']
// 		},
// 		'multiplayer/gameengine': {
// 			deps: ['multiplayer/commands']
// 		},
// 		'multiplayer/multiplayergame': {
// 			deps: ['multiplayer/gameengine']
// 		}
// 	}
// });
//
// require(["node_modules/protobufjs/minimal",
// 		"multiplayer/serialization/compiled",
// 		"multiplayer/commands",
// 		"multiplayer/gameengine",
// 		"multiplayer/multiplayergame"
// 		],
// 	function(){
// 		console.log("modules loaded");
// 	}
// );
new Game().start();