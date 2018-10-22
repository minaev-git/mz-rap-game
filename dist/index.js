/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "65c18a27065e93704eb4";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/bass_01.mp3":
/*!****************************!*\
  !*** ./assets/bass_01.mp3 ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/bass_01-4ERcW.mp3";

/***/ }),

/***/ "./assets/bass_02.mp3":
/*!****************************!*\
  !*** ./assets/bass_02.mp3 ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/bass_02-16akh.mp3";

/***/ }),

/***/ "./assets/bass_03.mp3":
/*!****************************!*\
  !*** ./assets/bass_03.mp3 ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/bass_03-2SwVS.mp3";

/***/ }),

/***/ "./assets/bass_04.mp3":
/*!****************************!*\
  !*** ./assets/bass_04.mp3 ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/bass_04-1LiDf.mp3";

/***/ }),

/***/ "./assets/beat_01.mp3":
/*!****************************!*\
  !*** ./assets/beat_01.mp3 ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/beat_01-24XjH.mp3";

/***/ }),

/***/ "./assets/beat_02.mp3":
/*!****************************!*\
  !*** ./assets/beat_02.mp3 ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/beat_02-3wenB.mp3";

/***/ }),

/***/ "./assets/beat_03.mp3":
/*!****************************!*\
  !*** ./assets/beat_03.mp3 ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/beat_03-1WsjX.mp3";

/***/ }),

/***/ "./assets/beat_04.mp3":
/*!****************************!*\
  !*** ./assets/beat_04.mp3 ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/beat_04-Np3Gf.mp3";

/***/ }),

/***/ "./assets/hihats_01.mp3":
/*!******************************!*\
  !*** ./assets/hihats_01.mp3 ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/hihats_01-3FU7W.mp3";

/***/ }),

/***/ "./assets/hihats_02.mp3":
/*!******************************!*\
  !*** ./assets/hihats_02.mp3 ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/hihats_02-3TcW6.mp3";

/***/ }),

/***/ "./assets/hihats_03.mp3":
/*!******************************!*\
  !*** ./assets/hihats_03.mp3 ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/hihats_03-1a5Cu.mp3";

/***/ }),

/***/ "./assets/hihats_04.mp3":
/*!******************************!*\
  !*** ./assets/hihats_04.mp3 ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/hihats_04-3m9Ma.mp3";

/***/ }),

/***/ "./assets/tune_01.mp3":
/*!****************************!*\
  !*** ./assets/tune_01.mp3 ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/tune_01-3lBL1.mp3";

/***/ }),

/***/ "./assets/tune_02.mp3":
/*!****************************!*\
  !*** ./assets/tune_02.mp3 ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/tune_02-2MCvy.mp3";

/***/ }),

/***/ "./assets/tune_03.mp3":
/*!****************************!*\
  !*** ./assets/tune_03.mp3 ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/tune_03-1YaYR.mp3";

/***/ }),

/***/ "./assets/tune_04.mp3":
/*!****************************!*\
  !*** ./assets/tune_04.mp3 ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/tune_04-35J_C.mp3";

/***/ }),

/***/ "./src/App.jsx":
/*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Dashboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Dashboard */ "./src/components/Dashboard.jsx");
/* harmony import */ var _components_SoundManager_SoundManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/SoundManager/SoundManager */ "./src/components/SoundManager/SoundManager.jsx");



class App extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_SoundManager_SoundManager__WEBPACK_IMPORTED_MODULE_2__["SoundManager"], null), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Dashboard__WEBPACK_IMPORTED_MODULE_1__["Dashboard"], null));
  }

}

/***/ }),

/***/ "./src/components/Dashboard.css":
/*!**************************************!*\
  !*** ./src/components/Dashboard.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"dashboard":"dashboard--12uZ6","triggers":"triggers--pD_vy","loopsContainer":"loopsContainer--qiYwQ"};

/***/ }),

/***/ "./src/components/Dashboard.jsx":
/*!**************************************!*\
  !*** ./src/components/Dashboard.jsx ***!
  \**************************************/
/*! exports provided: DashboardComponent, Dashboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dashboard", function() { return Dashboard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _ducks_categories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ducks/categories */ "./src/ducks/categories.js");
/* harmony import */ var _LoopsCategory_LoopCategory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LoopsCategory/LoopCategory */ "./src/components/LoopsCategory/LoopCategory.jsx");
/* harmony import */ var _News_NewsContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./News/NewsContainer */ "./src/components/News/NewsContainer.jsx");
/* harmony import */ var _Player_Player__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Player/Player */ "./src/components/Player/Player.jsx");
/* harmony import */ var _ducks_playback__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ducks/playback */ "./src/ducks/playback.js");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../consts */ "./src/consts.js");
/* harmony import */ var _Dashboard_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Dashboard.css */ "./src/components/Dashboard.css");
/* harmony import */ var _Dashboard_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_Dashboard_css__WEBPACK_IMPORTED_MODULE_8__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class DashboardComponent extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "percentUpdateTimer", void 0);

    this.percentUpdateTimer = null;
    this.state = {
      playbackPercent: 0
    };
  }

  render() {
    const {
      categories
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _Dashboard_css__WEBPACK_IMPORTED_MODULE_8__["dashboard"]
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Player_Player__WEBPACK_IMPORTED_MODULE_5__["Player"], null), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _Dashboard_css__WEBPACK_IMPORTED_MODULE_8__["triggers"]
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _Dashboard_css__WEBPACK_IMPORTED_MODULE_8__["loopsContainer"]
    }, categories.map(category => this.renderLoopCategory(category))), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_News_NewsContainer__WEBPACK_IMPORTED_MODULE_4__["NewsContainer"], null)));
  }

  renderLoopCategory(category) {
    const {
      id,
      name,
      color
    } = category;
    const {
      playbackPercent
    } = this.state;
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_LoopsCategory_LoopCategory__WEBPACK_IMPORTED_MODULE_3__["LoopCategory"], {
      key: id,
      id: id,
      title: name,
      color: color,
      playbackPercent: playbackPercent
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.playback.timestamp !== this.props.playback.timestamp) {
      this.setPercent(0);

      if (this.percentUpdateTimer !== null) {
        clearInterval(this.percentUpdateTimer);
      }

      if (this.props.playback.timestamp !== null) {
        this.percentUpdateTimer = setInterval(() => {
          this.setPercent();
        }, 100);
      }
    }
  }

  componentWillUnmount() {
    if (this.percentUpdateTimer !== null) {
      clearInterval(this.percentUpdateTimer);
    }
  }

  setPercent(percent) {
    if (percent !== undefined) {
      this.setState({
        playbackPercent: percent
      });
    } else {
      const playbackPercent = Math.min((Date.now() - (this.props.playback.timestamp !== null ? this.props.playback.timestamp : 0)) / 1000 / _consts__WEBPACK_IMPORTED_MODULE_7__["LOOP_DURATION_SEC"], 1);
      this.setState({
        playbackPercent
      });
    }
  }

}

const mapStateToProps = state => {
  return {
    categories: Object(_ducks_categories__WEBPACK_IMPORTED_MODULE_2__["selectState"])(state),
    playback: Object(_ducks_playback__WEBPACK_IMPORTED_MODULE_6__["selectState"])(state)
  };
};

const Dashboard = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(DashboardComponent);

/***/ }),

/***/ "./src/components/Loop/Loop.css":
/*!**************************************!*\
  !*** ./src/components/Loop/Loop.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"loop":"loop--2DJRX","background":"background--3SZdO","indicator":"indicator--2PWg2","name":"name--2PFDj","loading":"loading--3OSge","nextOn":"nextOn--A0q1J","blinkOn":"blinkOn--3icSU","nextOff":"nextOff--3vO3o","blinkOff":"blinkOff--WxXvt","active":"active--2pwVi"};

/***/ }),

/***/ "./src/components/Loop/Loop.jsx":
/*!**************************************!*\
  !*** ./src/components/Loop/Loop.jsx ***!
  \**************************************/
/*! exports provided: Loop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loop", function() { return Loop; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Progress_ProgressCircle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Progress/ProgressCircle */ "./src/components/Progress/ProgressCircle.jsx");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../consts */ "./src/consts.js");
/* harmony import */ var _Loop_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Loop.css */ "./src/components/Loop/Loop.css");
/* harmony import */ var _Loop_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Loop_css__WEBPACK_IMPORTED_MODULE_4__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class Loop extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onClick", () => {
      this.props.onClick(this.props.id);
    });
  }

  render() {
    const {
      name,
      state,
      playbackPercent
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(_Loop_css__WEBPACK_IMPORTED_MODULE_4__["loop"], {
        [_Loop_css__WEBPACK_IMPORTED_MODULE_4__["loading"]]: state === _consts__WEBPACK_IMPORTED_MODULE_3__["LoopState"].Loading,
        [_Loop_css__WEBPACK_IMPORTED_MODULE_4__["nextOn"]]: state === _consts__WEBPACK_IMPORTED_MODULE_3__["LoopState"].NextOn,
        [_Loop_css__WEBPACK_IMPORTED_MODULE_4__["active"]]: state === _consts__WEBPACK_IMPORTED_MODULE_3__["LoopState"].Active,
        [_Loop_css__WEBPACK_IMPORTED_MODULE_4__["nextOff"]]: state === _consts__WEBPACK_IMPORTED_MODULE_3__["LoopState"].NextOff
      }),
      onClick: this.onClick
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _Loop_css__WEBPACK_IMPORTED_MODULE_4__["background"]
    }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _Loop_css__WEBPACK_IMPORTED_MODULE_4__["indicator"]
    }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Progress_ProgressCircle__WEBPACK_IMPORTED_MODULE_2__["Progress"], {
      radius: 15,
      stroke: 3,
      percent: state !== _consts__WEBPACK_IMPORTED_MODULE_3__["LoopState"].Off ? playbackPercent : 0
    }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _Loop_css__WEBPACK_IMPORTED_MODULE_4__["name"]
    }, name));
  }

}

/***/ }),

/***/ "./src/components/LoopsCategory/LoopCategory.css":
/*!*******************************************************!*\
  !*** ./src/components/LoopsCategory/LoopCategory.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"category":"category--kKB6F","label":"label--5tnx5","list":"list--1wuFM"};

/***/ }),

/***/ "./src/components/LoopsCategory/LoopCategory.jsx":
/*!*******************************************************!*\
  !*** ./src/components/LoopsCategory/LoopCategory.jsx ***!
  \*******************************************************/
/*! exports provided: LoopCategoryComponent, LoopCategory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoopCategoryComponent", function() { return LoopCategoryComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoopCategory", function() { return LoopCategory; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Loop_Loop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Loop/Loop */ "./src/components/Loop/Loop.jsx");
/* harmony import */ var _ducks_loops__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ducks/loops */ "./src/ducks/loops.js");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../consts */ "./src/consts.js");
/* harmony import */ var _LoopCategory_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LoopCategory.css */ "./src/components/LoopsCategory/LoopCategory.css");
/* harmony import */ var _LoopCategory_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_LoopCategory_css__WEBPACK_IMPORTED_MODULE_5__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class LoopCategoryComponent extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onClick", loopId => {
      const loop = this.props.loops.find(({
        id
      }) => id === loopId);

      if (loop === undefined) {
        return;
      }

      const groupId = loop.groupId;
      const currentLoop = this.props.loops.find(loop => loop.groupId === groupId && (loop.state === _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].Active || loop.state === _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].NextOn)); // switch off current loop from the same group

      let switchOffLoop = [];

      if (currentLoop && currentLoop !== loop) {
        let currentLoopNextState;

        if (currentLoop.state === _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].Active) {
          currentLoopNextState = _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].NextOff;
        } else {
          currentLoopNextState = _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].Off;
        }

        switchOffLoop.push({
          id: currentLoop.id,
          state: currentLoopNextState
        });
      }

      let newState = _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].Off;

      if (loop.state === _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].Off) {
        newState = _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].NextOn;
      } else if (loop.state === _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].NextOn) {
        newState = _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].Off;
      } else if (loop.state === _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].NextOff) {
        newState = _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].Active;
      } else if (loop.state === _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].Active) {
        newState = _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].NextOff;
      }

      this.props.setLoopState([...switchOffLoop, {
        id: loopId,
        state: newState
      }]);
    });
  }

  render() {
    const {
      title,
      color,
      loops,
      playbackPercent
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _LoopCategory_css__WEBPACK_IMPORTED_MODULE_5__["category"],
      style: {
        color
      }
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _LoopCategory_css__WEBPACK_IMPORTED_MODULE_5__["list"]
    }, loops.map((loop, index) => react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Loop_Loop__WEBPACK_IMPORTED_MODULE_2__["Loop"], {
      key: loop.id,
      id: loop.id,
      name: `${title} ${index + 1}`,
      state: loop.state,
      playbackPercent: playbackPercent,
      onClick: this.onClick
    }))));
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    loops: Object(_ducks_loops__WEBPACK_IMPORTED_MODULE_3__["selectLoopsByCategory"])(state, ownProps.id)
  };
};

const mapDispatchToProps = {
  setLoopState: _ducks_loops__WEBPACK_IMPORTED_MODULE_3__["setLoopState"]
};
const LoopCategory = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(LoopCategoryComponent);

/***/ }),

/***/ "./src/components/News/News.css":
/*!**************************************!*\
  !*** ./src/components/News/News.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"news":"news--pQJ6h","link":"link--2bJcb","progress":"progress--31uJ0"};

/***/ }),

/***/ "./src/components/News/News.jsx":
/*!**************************************!*\
  !*** ./src/components/News/News.jsx ***!
  \**************************************/
/*! exports provided: News */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "News", function() { return News; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Progress_ProgressBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Progress/ProgressBar */ "./src/components/Progress/ProgressBar.jsx");
/* harmony import */ var _News_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./News.css */ "./src/components/News/News.css");
/* harmony import */ var _News_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_News_css__WEBPACK_IMPORTED_MODULE_2__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class News extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onClick", event => {
      const target = event.target;

      if (!(target instanceof window.HTMLAnchorElement)) {
        this.props.onClick(this.props.id);
      }
    });
  }

  render() {
    const {
      link,
      text,
      progress
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _News_css__WEBPACK_IMPORTED_MODULE_2__["news"],
      onClick: this.onClick
    }, text, "\xA0[", react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
      className: _News_css__WEBPACK_IMPORTED_MODULE_2__["link"],
      href: link,
      target: "_blank"
    }, "\u0441\u0441\u044B\u043B\u043A\u0430"), "]", react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _News_css__WEBPACK_IMPORTED_MODULE_2__["progress"]
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Progress_ProgressBar__WEBPACK_IMPORTED_MODULE_1__["Progress"], {
      percent: progress
    })));
  }

}

/***/ }),

/***/ "./src/components/News/NewsContainer.css":
/*!***********************************************!*\
  !*** ./src/components/News/NewsContainer.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"newsContainer":"newsContainer--2ZRnq"};

/***/ }),

/***/ "./src/components/News/NewsContainer.jsx":
/*!***********************************************!*\
  !*** ./src/components/News/NewsContainer.jsx ***!
  \***********************************************/
/*! exports provided: NewsContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsContainer", function() { return NewsContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _ducks_news__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ducks/news */ "./src/ducks/news.js");
/* harmony import */ var _reader_Reader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../reader/Reader */ "./src/reader/Reader.js");
/* harmony import */ var _News__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./News */ "./src/components/News/News.jsx");
/* harmony import */ var _ducks_record__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ducks/record */ "./src/ducks/record.js");
/* harmony import */ var _NewsContainer_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NewsContainer.css */ "./src/components/News/NewsContainer.css");
/* harmony import */ var _NewsContainer_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_NewsContainer_css__WEBPACK_IMPORTED_MODULE_6__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class NewsContainerComponent extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "readTimeoutsQueue", void 0);

    _defineProperty(this, "newsReader", void 0);

    _defineProperty(this, "onClickNews", id => {
      const {
        news
      } = this.props;
      const selectedNews = news.find(news => news.id === id);

      if (selectedNews) {
        this.newsReader.read(selectedNews.text, selectedNews.id);

        if (this.props.isRecording) {
          const startTimestamp = this.props.startTimestamp !== null ? this.props.startTimestamp : 0;
          this.props.addNewsToRecord({
            id,
            timestamp: Date.now() - startTimestamp
          });
        }
      }
    });

    _defineProperty(this, "onProgress", (id, progress) => {
      this.setState({
        currentNews: {
          id,
          progress
        }
      });
    });

    _defineProperty(this, "onEnd", () => {
      this.setState({
        currentNews: null
      });
    });

    this.readTimeoutsQueue = [];
    this.state = {
      currentNews: null
    };
    this.newsReader = new _reader_Reader__WEBPACK_IMPORTED_MODULE_3__["Reader"]({
      onReady: voices => undefined,
      onProgress: this.onProgress,
      onEnd: this.onEnd
    });
  }

  render() {
    const {
      news
    } = this.props;
    const {
      currentNews
    } = this.state;
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _NewsContainer_css__WEBPACK_IMPORTED_MODULE_6__["newsContainer"]
    }, news.map(({
      id,
      link,
      text
    }) => {
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_News__WEBPACK_IMPORTED_MODULE_4__["News"], {
        key: id,
        id: id,
        link: link,
        text: text,
        progress: currentNews && currentNews.id === id ? currentNews.progress : 0,
        onClick: this.onClickNews
      });
    }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isPlayingRecord !== this.props.isPlayingRecord) {
      if (this.props.isPlayingRecord) {
        this.readTimeoutsQueue = this.props.recordNews.reduce((timeouts, recordNews) => {
          const news = this.props.news.find(({
            id
          }) => recordNews.id === id);

          if (news) {
            timeouts.push(setTimeout(() => {
              this.newsReader.read(news.text, news.id);
            }, recordNews.timestamp));
          }

          return timeouts;
        }, []);
      } else {
        this.newsReader.stop();

        for (const timeout of this.readTimeoutsQueue) {
          clearTimeout(timeout);
        }

        this.readTimeoutsQueue = [];
      }
    }
  }

}

const mapStateToProps = state => {
  return {
    news: Object(_ducks_news__WEBPACK_IMPORTED_MODULE_2__["selectState"])(state),
    isRecording: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_5__["selectIsRecording"])(state),
    isPlayingRecord: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_5__["selectIsPlayingRecord"])(state),
    startTimestamp: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_5__["selectStartTimestamp"])(state),
    recordNews: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_5__["selectRecordNews"])(state)
  };
};

const mapDispatchToProps = {
  addNewsToRecord: _ducks_record__WEBPACK_IMPORTED_MODULE_5__["addNews"]
};
const NewsContainer = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(NewsContainerComponent);

/***/ }),

/***/ "./src/components/Player/Player.css":
/*!******************************************!*\
  !*** ./src/components/Player/Player.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"player":"player--B75zn","button":"button--uYpn-","share":"share--3i9u0","shareLabel":"shareLabel--322f4","active":"active--2PqyO","shareDisabled":"shareDisabled--1U3KU","icon":"icon--fDLiq","blink":"blink--3HMbw","recButton":"recButton--1eX8w","playButton":"playButton--2RIbq","shareButton":"shareButton--3eXo2","shareLink":"shareLink--1PjFd","playTitleAdd":"playTitleAdd--3FFP9"};

/***/ }),

/***/ "./src/components/Player/Player.jsx":
/*!******************************************!*\
  !*** ./src/components/Player/Player.jsx ***!
  \******************************************/
/*! exports provided: PlayerComponent, Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerComponent", function() { return PlayerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ducks_record__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ducks/record */ "./src/ducks/record.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/components/Player/utils.js");
/* harmony import */ var _ducks_loops__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ducks/loops */ "./src/ducks/loops.js");
/* harmony import */ var _ducks_playback__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../ducks/playback */ "./src/ducks/playback.js");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../consts */ "./src/consts.js");
/* harmony import */ var _Player_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Player.css */ "./src/components/Player/Player.css");
/* harmony import */ var _Player_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_Player_css__WEBPACK_IMPORTED_MODULE_8__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class PlayerComponent extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "refLink", void 0);

    _defineProperty(this, "onClickRecord", () => {
      if (this.props.isRecording) {
        this.props.setIsRecording(false);
        this.setState({
          shareLink: this.generateLink()
        });
      } else {
        this.props.setIsRecording(true);
      }
    });

    _defineProperty(this, "onClickPlay", () => {
      this.props.stopAllLoops();

      if (this.props.isPlayingRecord) {
        this.props.setIsPlayingRecord(false);
      } else {
        this.props.setIsPlayingRecord(true);
        this.setNextLoops(0);
      }
    });

    _defineProperty(this, "onClickLink", () => {
      const input = this.refLink.current;

      if (input !== null) {
        input.focus();
        input.select();
      }

      try {
        const successful = document.execCommand("copy");

        if (!successful) {
          throw new Error("");
        }
      } catch (err) {
        console.error("Не скопировалось :(");
      }
    });

    this.state = {
      shareLink: this.generateLink()
    };
    this.refLink = react__WEBPACK_IMPORTED_MODULE_0__["createRef"]();
  }

  shouldComponentUpdate(prevProps) {
    return prevProps.allLoaded !== this.props.allLoaded || prevProps.isRecording !== this.props.isRecording || prevProps.recordLoops !== this.props.recordLoops || prevProps.isPlayingRecord !== this.props.isPlayingRecord || prevProps.playback !== this.props.playback;
  }

  render() {
    const {
      isRecording,
      isPlayingRecord,
      recordLoops,
      allLoaded
    } = this.props;
    const hasRecord = !isRecording && recordLoops.length !== 0 && allLoaded;
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _Player_css__WEBPACK_IMPORTED_MODULE_8__["player"]
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_Player_css__WEBPACK_IMPORTED_MODULE_8__["button"], _Player_css__WEBPACK_IMPORTED_MODULE_8__["recButton"], {
        [_Player_css__WEBPACK_IMPORTED_MODULE_8__["active"]]: isRecording
      }),
      disabled: isPlayingRecord || !allLoaded,
      onClick: this.onClickRecord
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
      className: _Player_css__WEBPACK_IMPORTED_MODULE_8__["icon"]
    }, "\u25CF"), "Rec"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_Player_css__WEBPACK_IMPORTED_MODULE_8__["button"], _Player_css__WEBPACK_IMPORTED_MODULE_8__["playButton"], {
        [_Player_css__WEBPACK_IMPORTED_MODULE_8__["active"]]: isPlayingRecord
      }),
      disabled: !hasRecord,
      onClick: this.onClickPlay
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
      className: _Player_css__WEBPACK_IMPORTED_MODULE_8__["icon"]
    }, "\u25B6"), "\u0418\u0433\u0440\u0430\u0442\u044C", react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
      className: _Player_css__WEBPACK_IMPORTED_MODULE_8__["playTitleAdd"]
    }, "\xA0\u0437\u0430\u043F\u0438\u0441\u044C")), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_Player_css__WEBPACK_IMPORTED_MODULE_8__["button"], _Player_css__WEBPACK_IMPORTED_MODULE_8__["shareButton"]),
      disabled: !hasRecord,
      onClick: this.onClickLink
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
      className: _Player_css__WEBPACK_IMPORTED_MODULE_8__["icon"]
    }, "\u21EB"), "\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_Player_css__WEBPACK_IMPORTED_MODULE_8__["share"], {
        [_Player_css__WEBPACK_IMPORTED_MODULE_8__["shareDisabled"]]: !hasRecord
      }),
      onClick: this.onClickLink,
      title: hasRecord ? "Копировать" : null
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
      className: _Player_css__WEBPACK_IMPORTED_MODULE_8__["shareLabel"]
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
      className: _Player_css__WEBPACK_IMPORTED_MODULE_8__["icon"]
    }, "\u21EB"), "\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F:"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", {
      className: _Player_css__WEBPACK_IMPORTED_MODULE_8__["shareLink"],
      type: "text",
      placeholder: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 Rec, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0441\u0432\u043E\u0439 \u0442\u0440\u0435\u043A",
      readOnly: true,
      value: this.state.shareLink,
      ref: this.refLink
    })));
  }

  componentDidUpdate(prevProps) {
    const {
      allLoaded,
      isPlayingRecord,
      playback,
      recordLoops
    } = this.props; // auto play on load

    if (prevProps.allLoaded !== allLoaded && allLoaded && recordLoops.length !== 0) {
      this.onClickPlay();
    }

    if (isPlayingRecord) {
      if (prevProps.playback.cursor !== playback.cursor && playback.cursor !== null) {
        this.setNextLoops(playback.cursor + 1);
      }
    }
  }

  setNextLoops(cursor) {
    const {
      recordLoops
    } = this.props;
    const newLoopStates = []; // schedule stop

    if (recordLoops[cursor - 1]) {
      for (const prevLoopId of recordLoops[cursor - 1]) {
        if (!recordLoops[cursor] || !recordLoops[cursor].includes(prevLoopId)) {
          newLoopStates.push({
            id: prevLoopId,
            state: _consts__WEBPACK_IMPORTED_MODULE_7__["LoopState"].NextOff
          });
        }
      }
    } // schedule play


    if (recordLoops[cursor]) {
      for (const loopId of recordLoops[cursor]) {
        if (!recordLoops[cursor - 1] || !recordLoops[cursor - 1].includes(loopId)) {
          newLoopStates.push({
            id: loopId,
            state: _consts__WEBPACK_IMPORTED_MODULE_7__["LoopState"].NextOn
          });
        }
      }
    }

    this.props.setLoopState(newLoopStates);
  }

  generateLink() {
    const {
      recordLoops: loops,
      recordNews: news,
      startTimestamp
    } = this.props;

    if (loops.length || news.length) {
      const urlHash = encodeURIComponent(Object(_utils__WEBPACK_IMPORTED_MODULE_4__["generateShareHash"])({
        loops,
        news,
        startTimestamp
      }));
      return `${location.origin}${location.pathname}?r=${urlHash}`;
    } else {
      return "";
    }
  }

}

const mapStateToProps = state => ({
  allLoaded: Object(_ducks_loops__WEBPACK_IMPORTED_MODULE_5__["selectAllLoaded"])(state),
  isRecording: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_3__["selectIsRecording"])(state),
  isPlayingRecord: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_3__["selectIsPlayingRecord"])(state),
  startTimestamp: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_3__["selectStartTimestamp"])(state),
  recordLoops: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_3__["selectRecordLoops"])(state),
  recordNews: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_3__["selectRecordNews"])(state),
  playback: Object(_ducks_playback__WEBPACK_IMPORTED_MODULE_6__["selectState"])(state)
});

const mapDispatchToProps = {
  setIsRecording: _ducks_record__WEBPACK_IMPORTED_MODULE_3__["setIsRecording"],
  setIsPlayingRecord: _ducks_record__WEBPACK_IMPORTED_MODULE_3__["setIsPlayingRecord"],
  stopAllLoops: _ducks_loops__WEBPACK_IMPORTED_MODULE_5__["stopAllLoops"],
  setLoopState: _ducks_loops__WEBPACK_IMPORTED_MODULE_5__["setLoopState"]
};
const Player = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(PlayerComponent);

/***/ }),

/***/ "./src/components/Player/utils.js":
/*!****************************************!*\
  !*** ./src/components/Player/utils.js ***!
  \****************************************/
/*! exports provided: validateLoopId, generateShareHash, generatePlayList, randomInRange, getRecordFromUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateLoopId", function() { return validateLoopId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateShareHash", function() { return generateShareHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generatePlayList", function() { return generatePlayList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomInRange", function() { return randomInRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRecordFromUrl", function() { return getRecordFromUrl; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../consts */ "./src/consts.js");

const loopIdRegExp = /^[a-z]+\d*$/;
const addSeparator = "*";
const removeSeparator = "-";
const loopNamesSeparator = ".";
const chunksSeparator = "_";
const loopsNewsSeparator = "!";
const loopChunkRegExp = /^(\d+)(?:\*([^-]+))?(?:-(.+))?$/;
function validateLoopId(id) {
  if (!loopIdRegExp.test(id)) {
    throw `Invalid loop id ${id}. Loop id should satisfy ${loopIdRegExp.toString()} regular expression.`;
  }
}
function generateShareHash({
  startTimestamp,
  loops,
  news
}) {
  const loopChunks = [];
  let previousLoops = [];

  for (let i = 0; i < loops.length; i++) {
    const addedLoops = [];
    const removedLoops = [];
    let loopChunk = "";

    for (const loopId of loops[i]) {
      if (!previousLoops.includes(loopId)) {
        addedLoops.push(loopId);
      }
    }

    for (const prevLoopId of previousLoops) {
      if (!loops[i].includes(prevLoopId)) {
        removedLoops.push(prevLoopId);
      }
    }

    if (addedLoops.length !== 0 || removedLoops.length !== 0) {
      loopChunk = String(i);

      if (addedLoops.length !== 0) {
        loopChunk += `${addSeparator}${addedLoops.join(loopNamesSeparator)}`;
      }

      if (removedLoops.length !== 0) {
        loopChunk += `${removeSeparator}${removedLoops.join(loopNamesSeparator)}`;
      }
    }

    if (loopChunk) {
      loopChunks.push(loopChunk);
    }

    previousLoops = loops[i];
  }

  const newsChunks = [];

  for (const _ref of news) {
    const {
      timestamp,
      id
    } = _ref;
    newsChunks.push(`${timestamp}${addSeparator}${id}`);
  } // i.e. 0*bt1.h1_1*b1_2-bt1_3-h1.b1!0*0_1000*1


  const hash = `${loopChunks.join(chunksSeparator)}${loopsNewsSeparator}${newsChunks.join(chunksSeparator)}`;
  return btoa(hash);
}
function generatePlayList(hash) {
  try {
    const decodedHash = atob(hash);
    const [loopPart, newsPart] = decodedHash.split(loopsNewsSeparator);
    const loopChunks = loopPart.split(chunksSeparator);
    const loops = [];
    let loopsCursor = 0;

    for (const loopChunk of loopChunks) {
      const match = loopChunk.match(loopChunkRegExp);

      if (!match) {
        continue;
      }

      let [_, turnNumber, addedLoops = "", removedLoops = ""] = match;
      turnNumber = Number(turnNumber); // fill same turns

      for (let i = loopsCursor; i < turnNumber; i++) {
        loops[i] = loops[i - 1];
      } // build new turn


      addedLoops = addedLoops ? addedLoops.split(loopNamesSeparator) : [];
      removedLoops = removedLoops ? removedLoops.split(loopNamesSeparator) : [];
      loops[turnNumber] = (loops[turnNumber - 1] || []).concat(addedLoops).filter(id => !removedLoops.includes(id));
      loopsCursor = turnNumber + 1;

      if (loopsCursor > _consts__WEBPACK_IMPORTED_MODULE_0__["MAXIMUM_RECORD_TURNS"]) {
        break;
      }
    }

    const news = [];
    const newsChunks = newsPart.split(chunksSeparator);

    for (let i = 0; i < newsChunks.length && i < _consts__WEBPACK_IMPORTED_MODULE_0__["MAXIMUM_NEWS_READ"]; i++) {
      let [timestamp, id] = newsChunks[i].split(addSeparator);
      news.push({
        timestamp: Number(timestamp),
        id
      });
    }

    return {
      loops,
      news
    };
  } catch (e) {
    console.error("Wrong record hash format");
    return null;
  }
}
function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}
function getRecordFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("r");
}

/***/ }),

/***/ "./src/components/Progress/Progress.css":
/*!**********************************************!*\
  !*** ./src/components/Progress/Progress.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"circle":"circle--ziIVg","barContainer":"barContainer--3lRfl","bar":"bar--2QdWn","active":"active--3cioK"};

/***/ }),

/***/ "./src/components/Progress/ProgressBar.jsx":
/*!*************************************************!*\
  !*** ./src/components/Progress/ProgressBar.jsx ***!
  \*************************************************/
/*! exports provided: Progress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Progress", function() { return Progress; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Progress_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Progress.css */ "./src/components/Progress/Progress.css");
/* harmony import */ var _Progress_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Progress_css__WEBPACK_IMPORTED_MODULE_2__);



function Progress(props) {
  const {
    percent
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(_Progress_css__WEBPACK_IMPORTED_MODULE_2__["barContainer"], {
      [_Progress_css__WEBPACK_IMPORTED_MODULE_2__["active"]]: percent > 0 && percent < 0.9
    })
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: _Progress_css__WEBPACK_IMPORTED_MODULE_2__["bar"],
    style: {
      width: `${percent * 100}%`
    }
  }));
}

/***/ }),

/***/ "./src/components/Progress/ProgressCircle.jsx":
/*!****************************************************!*\
  !*** ./src/components/Progress/ProgressCircle.jsx ***!
  \****************************************************/
/*! exports provided: Progress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Progress", function() { return Progress; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Progress_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Progress.css */ "./src/components/Progress/Progress.css");
/* harmony import */ var _Progress_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Progress_css__WEBPACK_IMPORTED_MODULE_1__);


function Progress(props) {
  const {
    radius,
    stroke,
    percent
  } = props;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference * (1 - percent);
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", {
    width: radius * 2,
    height: radius * 2
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("circle", {
    stroke: "#000000",
    strokeWidth: stroke,
    fill: "transparent",
    r: radius - stroke / 2,
    cx: radius,
    cy: radius,
    opacity: 0.3
  }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("circle", {
    className: _Progress_css__WEBPACK_IMPORTED_MODULE_1__["circle"],
    stroke: "#ffffff",
    strokeWidth: stroke,
    strokeDasharray: `${circumference} ${circumference}`,
    strokeDashoffset: offset,
    fill: "transparent",
    r: radius - stroke / 2,
    cx: radius,
    cy: radius
  }));
}

/***/ }),

/***/ "./src/components/SoundManager/SoundManager.jsx":
/*!******************************************************!*\
  !*** ./src/components/SoundManager/SoundManager.jsx ***!
  \******************************************************/
/*! exports provided: SoundManagerComponent, SoundManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoundManagerComponent", function() { return SoundManagerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoundManager", function() { return SoundManager; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var howler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! howler */ "./node_modules/howler/dist/howler.js");
/* harmony import */ var howler__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(howler__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ducks_loops__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ducks/loops */ "./src/ducks/loops.js");
/* harmony import */ var _ducks_record__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ducks/record */ "./src/ducks/record.js");
/* harmony import */ var _ducks_playback__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ducks/playback */ "./src/ducks/playback.js");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../consts */ "./src/consts.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const checkLoopEndTimeMs = 40;
const scheduleAheadTimeSec = 0.01;
class SoundManagerComponent extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "ctxCurrentTime", void 0);

    _defineProperty(this, "isPlaying", void 0);

    _defineProperty(this, "howls", void 0);

    _defineProperty(this, "checkInterval", void 0);

    _defineProperty(this, "checkLoopEnd", () => {
      if (this.ctxCurrentTime + _consts__WEBPACK_IMPORTED_MODULE_6__["LOOP_DURATION_SEC"] < howler__WEBPACK_IMPORTED_MODULE_2__["Howler"].ctx.currentTime + scheduleAheadTimeSec) {
        this.playNextLoops();
      }
    });

    this.ctxCurrentTime = null;
    this.isPlaying = false;
    this.howls = {};

    for (const loop of this.props.loops) {
      this.howls[loop.id] = new howler__WEBPACK_IMPORTED_MODULE_2__["Howl"]({
        src: [loop.src],
        preload: true,
        onload: () => {
          this.props.setLoopState([{
            id: loop.id,
            state: _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].Off
          }]);
        }
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.loops !== this.props.loops;
  }

  componentWillUnmount() {
    clearInterval(this.checkInterval);

    for (const loopId of Object.keys(this.howls)) {
      this.howls[loopId].unload();
    }
  }

  render() {
    return null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.loops !== prevProps.loops) {
      if (this.isPlaying) {
        const hasActiveLoops = this.props.loops.some(loop => loop.state === _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].Active || loop.state === _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].NextOn || loop.state === _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].NextOff);

        if (!hasActiveLoops) {
          this.stop();
        }
      } else {
        const hasActiveLoops = this.props.loops.some(loop => loop.state === _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].NextOn);

        if (hasActiveLoops) {
          this.play();
        }
      }
    }
  }

  play() {
    if (this.isPlaying) {
      return;
    }

    this.isPlaying = true;
    this.ctxCurrentTime = howler__WEBPACK_IMPORTED_MODULE_2__["Howler"].ctx.currentTime;
    this.checkInterval = setInterval(this.checkLoopEnd, checkLoopEndTimeMs);
    this.playNextLoops();
  }

  stop() {
    if (!this.isPlaying) {
      return;
    }

    clearInterval(this.checkInterval);

    for (const loopId of Object.keys(this.howls)) {
      this.howls[loopId].stop();
    }

    this.isPlaying = false;
    this.props.setCursor(null);
    this.props.setIsPlayingRecord(false);
  }

  playNextLoops() {
    const {
      loops,
      isRecording,
      playback
    } = this.props;
    const loopsForPlay = [];
    const loopsForRecord = [];
    const newLoopStates = [];

    for (const loop of loops) {
      // loops which must play next
      if (loop.state === _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].Active || loop.state === _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].NextOn) {
        loopsForPlay.push(loop.id);

        if (loop.state === _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].NextOn) {
          newLoopStates.push({
            id: loop.id,
            state: _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].Active
          });
        }

        loopsForRecord.push(loop.id); // loops which must stop now
      } else if (loop.state === _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].NextOff) {
        newLoopStates.push({
          id: loop.id,
          state: _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].Off
        });
      }
    }

    this.ctxCurrentTime = howler__WEBPACK_IMPORTED_MODULE_2__["Howler"].ctx.currentTime;

    for (const loopId of loopsForPlay) {
      this.howls[loopId].play();
    }

    if (isRecording) {
      this.props.addLoopsToRecord(loopsForRecord);
    }

    if (newLoopStates.length) {
      this.props.setLoopState(newLoopStates);
    } // cursor may have already updated because of the previous call to `setLoopState`


    if (this.isPlaying) {
      const newCursor = playback.cursor !== null ? playback.cursor + 1 : 0;

      if (newCursor === Number.MAX_SAFE_INTEGER) {
        this.stop();
      } else {
        this.props.setCursor(newCursor);
      }
    }
  }

}

const mapStateToProps = state => {
  return {
    loops: Object(_ducks_loops__WEBPACK_IMPORTED_MODULE_3__["selectState"])(state),
    isRecording: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_4__["selectIsRecording"])(state),
    playback: Object(_ducks_playback__WEBPACK_IMPORTED_MODULE_5__["selectState"])(state)
  };
};

const mapDispatchToProps = {
  setLoops: _ducks_loops__WEBPACK_IMPORTED_MODULE_3__["setLoops"],
  setLoopState: _ducks_loops__WEBPACK_IMPORTED_MODULE_3__["setLoopState"],
  setCursor: _ducks_playback__WEBPACK_IMPORTED_MODULE_5__["setCursor"],
  addLoopsToRecord: _ducks_record__WEBPACK_IMPORTED_MODULE_4__["addLoops"],
  setIsPlayingRecord: _ducks_record__WEBPACK_IMPORTED_MODULE_4__["setIsPlayingRecord"]
};
const SoundManager = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(SoundManagerComponent);

/***/ }),

/***/ "./src/consts.js":
/*!***********************!*\
  !*** ./src/consts.js ***!
  \***********************/
/*! exports provided: LoopState, MAXIMUM_RECORD_TURNS, MAXIMUM_NEWS_READ, BPM, BEATS_IN_LOOP, LOOP_DURATION_SEC */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoopState", function() { return LoopState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAXIMUM_RECORD_TURNS", function() { return MAXIMUM_RECORD_TURNS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAXIMUM_NEWS_READ", function() { return MAXIMUM_NEWS_READ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BPM", function() { return BPM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BEATS_IN_LOOP", function() { return BEATS_IN_LOOP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOOP_DURATION_SEC", function() { return LOOP_DURATION_SEC; });
const LoopState = {
  Off: "off",
  Loading: "loading",
  NextOn: "nextOn",
  NextOff: "nextOff",
  Active: "active"
};
const MAXIMUM_RECORD_TURNS = 32;
const MAXIMUM_NEWS_READ = 15;
const BPM = 75;
const BEATS_IN_LOOP = 8;
const LOOP_DURATION_SEC = BEATS_IN_LOOP / (BPM / 60);

/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/*! exports provided: categories, loops, news */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "categories", function() { return categories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loops", function() { return loops; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "news", function() { return news; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./src/consts.js");
/* harmony import */ var _assets_beat_01_mp3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/beat_01.mp3 */ "./assets/beat_01.mp3");
/* harmony import */ var _assets_beat_01_mp3__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_beat_01_mp3__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_beat_02_mp3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/beat_02.mp3 */ "./assets/beat_02.mp3");
/* harmony import */ var _assets_beat_02_mp3__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_beat_02_mp3__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_beat_03_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/beat_03.mp3 */ "./assets/beat_03.mp3");
/* harmony import */ var _assets_beat_03_mp3__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_beat_03_mp3__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _assets_beat_04_mp3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/beat_04.mp3 */ "./assets/beat_04.mp3");
/* harmony import */ var _assets_beat_04_mp3__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_beat_04_mp3__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_hihats_01_mp3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/hihats_01.mp3 */ "./assets/hihats_01.mp3");
/* harmony import */ var _assets_hihats_01_mp3__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_hihats_01_mp3__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _assets_hihats_02_mp3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/hihats_02.mp3 */ "./assets/hihats_02.mp3");
/* harmony import */ var _assets_hihats_02_mp3__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_hihats_02_mp3__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _assets_hihats_03_mp3__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/hihats_03.mp3 */ "./assets/hihats_03.mp3");
/* harmony import */ var _assets_hihats_03_mp3__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_hihats_03_mp3__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _assets_hihats_04_mp3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../assets/hihats_04.mp3 */ "./assets/hihats_04.mp3");
/* harmony import */ var _assets_hihats_04_mp3__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_hihats_04_mp3__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _assets_bass_01_mp3__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../assets/bass_01.mp3 */ "./assets/bass_01.mp3");
/* harmony import */ var _assets_bass_01_mp3__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_assets_bass_01_mp3__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _assets_bass_02_mp3__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../assets/bass_02.mp3 */ "./assets/bass_02.mp3");
/* harmony import */ var _assets_bass_02_mp3__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_assets_bass_02_mp3__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _assets_bass_03_mp3__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../assets/bass_03.mp3 */ "./assets/bass_03.mp3");
/* harmony import */ var _assets_bass_03_mp3__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_assets_bass_03_mp3__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _assets_bass_04_mp3__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../assets/bass_04.mp3 */ "./assets/bass_04.mp3");
/* harmony import */ var _assets_bass_04_mp3__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_assets_bass_04_mp3__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _assets_tune_01_mp3__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../assets/tune_01.mp3 */ "./assets/tune_01.mp3");
/* harmony import */ var _assets_tune_01_mp3__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_assets_tune_01_mp3__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _assets_tune_02_mp3__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../assets/tune_02.mp3 */ "./assets/tune_02.mp3");
/* harmony import */ var _assets_tune_02_mp3__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_assets_tune_02_mp3__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _assets_tune_03_mp3__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../assets/tune_03.mp3 */ "./assets/tune_03.mp3");
/* harmony import */ var _assets_tune_03_mp3__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_assets_tune_03_mp3__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _assets_tune_04_mp3__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../assets/tune_04.mp3 */ "./assets/tune_04.mp3");
/* harmony import */ var _assets_tune_04_mp3__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_assets_tune_04_mp3__WEBPACK_IMPORTED_MODULE_16__);

















const categories = [{
  id: "beats",
  name: "Бит",
  color: "#af5c14"
}, {
  id: "hihats",
  name: "Хай-хэт",
  color: "#be8b1a"
}, {
  id: "bass",
  name: "Бас",
  color: "#3462c3"
}, {
  id: "tune",
  name: "Синт",
  color: "#7b45af"
}];
const loops = [{
  id: "bt1",
  categoryId: "beats",
  groupId: "beats",
  src: _assets_beat_01_mp3__WEBPACK_IMPORTED_MODULE_1___default.a,
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "bt2",
  categoryId: "beats",
  groupId: "beats",
  src: _assets_beat_02_mp3__WEBPACK_IMPORTED_MODULE_2___default.a,
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "bt3",
  categoryId: "beats",
  groupId: "beats",
  src: _assets_beat_03_mp3__WEBPACK_IMPORTED_MODULE_3___default.a,
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "bt4",
  categoryId: "beats",
  groupId: "beats",
  src: _assets_beat_04_mp3__WEBPACK_IMPORTED_MODULE_4___default.a,
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "h1",
  categoryId: "hihats",
  groupId: "hihats",
  src: _assets_hihats_01_mp3__WEBPACK_IMPORTED_MODULE_5___default.a,
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "h2",
  categoryId: "hihats",
  groupId: "hihats",
  src: _assets_hihats_02_mp3__WEBPACK_IMPORTED_MODULE_6___default.a,
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "h3",
  categoryId: "hihats",
  groupId: "hihats",
  src: _assets_hihats_03_mp3__WEBPACK_IMPORTED_MODULE_7___default.a,
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "h4",
  categoryId: "hihats",
  groupId: "hihats",
  src: _assets_hihats_04_mp3__WEBPACK_IMPORTED_MODULE_8___default.a,
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "b1",
  categoryId: "bass",
  groupId: "bass",
  src: _assets_bass_01_mp3__WEBPACK_IMPORTED_MODULE_9___default.a,
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "b2",
  categoryId: "bass",
  groupId: "bass",
  src: _assets_bass_02_mp3__WEBPACK_IMPORTED_MODULE_10___default.a,
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "b3",
  categoryId: "bass",
  groupId: "bass",
  src: _assets_bass_03_mp3__WEBPACK_IMPORTED_MODULE_11___default.a,
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "b4",
  categoryId: "bass",
  groupId: "bass",
  src: _assets_bass_04_mp3__WEBPACK_IMPORTED_MODULE_12___default.a,
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "t1",
  categoryId: "tune",
  groupId: "tune",
  src: _assets_tune_01_mp3__WEBPACK_IMPORTED_MODULE_13___default.a,
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "t2",
  categoryId: "tune",
  groupId: "tune",
  src: _assets_tune_02_mp3__WEBPACK_IMPORTED_MODULE_14___default.a,
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "t3",
  categoryId: "tune",
  groupId: "tune",
  src: _assets_tune_03_mp3__WEBPACK_IMPORTED_MODULE_15___default.a,
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "t4",
  categoryId: "tune",
  groupId: "tune",
  src: _assets_tune_04_mp3__WEBPACK_IMPORTED_MODULE_16___default.a,
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}];
const news = [// {
//     id: "0",
//     link: "https://zona.media/news/2018/09/17/urlashov",
//     text: "Путин отказался помиловать экс-мэра Ярославля Урлашова",
// },
// {
//     id: "1",
//     link: "https://zona.media/news/2018/09/17/nenasheva",
//     text: "Художницу Катрин Ненашеву задержали в центре Москвы во время акции против пыток",
// },
// {
//     id: "2",
//     link: "https://zona.media/news/2018/09/17/sagynbaev",
//     text: "Тяжелобольного фигуранта «пензенского дела» поместили в карцер после отказа от признательных показаний и рассказа о пытках",
// }
{
  id: "0",
  link: "https://zona.media/news/2018/10/14/free",
  text: "Навальный вышел на свободу после 50 суток ареста"
}, {
  id: "1",
  link: "https://zona.media/news/2018/10/13/fire",
  text: "В Москве подожгли храм и воскресную школу"
}, {
  id: "2",
  link: "https://zona.media/news/2018/10/08/masha",
  text: "В Красноярском крае пенсионерку обязали выплатить 160 тысяч рублей за продажу односельчанам самодельных «Маши и медведя»"
}, {
  id: "3",
  link: "https://zona.media/news/2018/10/09/school",
  text: "В новосибирской школе девятиклассник напал с ножом на сверстника"
}, {
  id: "4",
  link: "https://zona.media/news/2018/10/05/mailru-jokes",
  text: "Вице-президент Mail.ru предложил создать орган, проверяющий шутки на экстремизм"
}, {
  id: "5",
  link: "https://zona.media/news/2018/10/03/shagdarov",
  text: "В Забайкалье следователя заподозрили в хищении вещдоков по делу о хищении вещдоков"
}, {
  id: "6",
  link: "https://zona.media/news/2018/10/01/policemen",
  text: "В Москве двое полицейских задержаны за стрельбу из травматического пистолета по прохожему"
}, {
  id: "7",
  link: "https://zona.media/news/2018/09/19/karaoke",
  text: "Троих жителей Чебоксар заподозрили в нападении на полицейских после драки в караоке"
}, {
  id: "8",
  link: "https://zona.media/news/2018/09/18/hm",
  text: "В Брянской области пресвитера адвентистов оштрафовали после жалобы православной местной жительницы"
}, {
  id: "9",
  link: "https://zona.media/news/2018/09/11/hutorok",
  text: "В Краснодаре после конфликта лесоруба и местной жительницы, выступающей против вырубки леса, один судья осудил обоих"
}, {
  id: "10",
  link: "https://zona.media/news/2018/09/07/sledovatel-bik",
  text: "Волгоградского следователя, пообещавшего разбить голову пожилой потерпевшей, заподозрили в превышении полномочий"
}, {
  id: "11",
  link: "https://zona.media/news/2018/09/06/90s",
  text: "В Подмосковье пятерых человек арестовали по обвинению в похищении предпринимателей"
}];

/***/ }),

/***/ "./src/ducks/categories.js":
/*!*********************************!*\
  !*** ./src/ducks/categories.js ***!
  \*********************************/
/*! exports provided: SET_CATEGORIES, setCategories, categoriesReducer, selectState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CATEGORIES", function() { return SET_CATEGORIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCategories", function() { return setCategories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "categoriesReducer", function() { return categoriesReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectState", function() { return selectState; });
const SET_CATEGORIES = "categories/SET_CATEGORIES";
const initialState = [];
function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    payload: categories
  };
}
function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      {
        const newState = [...state];

        for (const category of action.payload) {
          if (!newState.some(({
            id
          }) => id === category.id)) {
            newState.push(category);
          }
        }

        return newState;
      }

    default:
      return state;
  }
}
function selectState(rootState) {
  return rootState.categories;
}

/***/ }),

/***/ "./src/ducks/index.js":
/*!****************************!*\
  !*** ./src/ducks/index.js ***!
  \****************************/
/*! exports provided: combinedReducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combinedReducers", function() { return combinedReducers; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _categories__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./categories */ "./src/ducks/categories.js");
/* harmony import */ var _loops__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loops */ "./src/ducks/loops.js");
/* harmony import */ var _record__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./record */ "./src/ducks/record.js");
/* harmony import */ var _news__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./news */ "./src/ducks/news.js");
/* harmony import */ var _playback__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./playback */ "./src/ducks/playback.js");






const reducers = {
  categories: _categories__WEBPACK_IMPORTED_MODULE_1__["categoriesReducer"],
  loops: _loops__WEBPACK_IMPORTED_MODULE_2__["loopsReducer"],
  news: _news__WEBPACK_IMPORTED_MODULE_4__["newsReducer"],
  record: _record__WEBPACK_IMPORTED_MODULE_3__["recordReducer"],
  playback: _playback__WEBPACK_IMPORTED_MODULE_5__["playbackReducer"]
};
const combinedReducers = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(reducers);

/***/ }),

/***/ "./src/ducks/loops.js":
/*!****************************!*\
  !*** ./src/ducks/loops.js ***!
  \****************************/
/*! exports provided: SET_LOOPS, SET_LOOP_STATE, STOP_ALL_LOOPS, setLoops, setLoopState, stopAllLoops, loopsReducer, selectState, selectLoopsByCategory, selectAllLoaded */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_LOOPS", function() { return SET_LOOPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_LOOP_STATE", function() { return SET_LOOP_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STOP_ALL_LOOPS", function() { return STOP_ALL_LOOPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLoops", function() { return setLoops; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLoopState", function() { return setLoopState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopAllLoops", function() { return stopAllLoops; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loopsReducer", function() { return loopsReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectState", function() { return selectState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectLoopsByCategory", function() { return selectLoopsByCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectAllLoaded", function() { return selectAllLoaded; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../consts */ "./src/consts.js");

const SET_LOOPS = "loops/SET_LOOPS";
const SET_LOOP_STATE = "loops/SET_LOOP_STATE";
const STOP_ALL_LOOPS = "loops/STOP_ALL_LOOPS";
const initialState = [];
function setLoops(loops) {
  return {
    type: SET_LOOPS,
    payload: loops
  };
}
function setLoopState(newLoopStates) {
  return {
    type: SET_LOOP_STATE,
    payload: newLoopStates
  };
}
function stopAllLoops() {
  return {
    type: STOP_ALL_LOOPS
  };
}
function loopsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOOPS:
      return [...action.payload];

    case SET_LOOP_STATE:
      {
        const payload = action.payload;
        return state.reduce((result, loop) => {
          const newState = payload.find(({
            id
          }) => loop.id === id);

          if (newState !== undefined) {
            loop.state = newState.state;
          }

          result.push(loop);
          return result;
        }, []);
      }

    case STOP_ALL_LOOPS:
      {
        return state.map(loop => {
          loop.state = _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Off;
          return loop;
        });
      }

    default:
      return state;
  }
}
function selectState(rootState) {
  return rootState.loops;
}
function selectLoopsByCategory(rootState, categoryId) {
  return selectState(rootState).filter(loop => loop.categoryId === categoryId);
}
function selectAllLoaded(rootState) {
  const loops = selectState(rootState);
  return Boolean(loops.length) && loops.every(loop => loop.state !== _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading);
}

/***/ }),

/***/ "./src/ducks/news.js":
/*!***************************!*\
  !*** ./src/ducks/news.js ***!
  \***************************/
/*! exports provided: SET_NEWS, setNews, newsReducer, selectState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_NEWS", function() { return SET_NEWS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setNews", function() { return setNews; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newsReducer", function() { return newsReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectState", function() { return selectState; });
const SET_NEWS = "news/SET_NEWS";
const initialState = [];
function setNews(news) {
  return {
    type: SET_NEWS,
    payload: news
  };
}
function newsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEWS:
      return [...action.payload];

    default:
      return state;
  }
}
function selectState(rootState) {
  return rootState.news;
}

/***/ }),

/***/ "./src/ducks/playback.js":
/*!*******************************!*\
  !*** ./src/ducks/playback.js ***!
  \*******************************/
/*! exports provided: SET_CURSOR, setCursor, playbackReducer, selectState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CURSOR", function() { return SET_CURSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCursor", function() { return setCursor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playbackReducer", function() { return playbackReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectState", function() { return selectState; });
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const SET_CURSOR = "playback/SET_CURSOR";
const initialState = {
  timestamp: null,
  cursor: null
};
function setCursor(value) {
  return {
    type: SET_CURSOR,
    payload: value
  };
}
function playbackReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURSOR:
      return _objectSpread({}, state, {
        timestamp: action.payload !== null ? Date.now() : null,
        cursor: action.payload
      });

    default:
      return state;
  }
}
function selectState(rootState) {
  return rootState.playback;
}

/***/ }),

/***/ "./src/ducks/record.js":
/*!*****************************!*\
  !*** ./src/ducks/record.js ***!
  \*****************************/
/*! exports provided: SET_IS_RECORDING, SET_IS_PLAYING_RECORD, ADD_LOOPS, ADD_NEWS, setIsRecording, setIsPlayingRecord, addLoops, addNews, recordReducer, selectState, selectIsRecording, selectIsPlayingRecord, selectStartTimestamp, selectRecordLoops, selectRecordNews */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_IS_RECORDING", function() { return SET_IS_RECORDING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_IS_PLAYING_RECORD", function() { return SET_IS_PLAYING_RECORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_LOOPS", function() { return ADD_LOOPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_NEWS", function() { return ADD_NEWS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setIsRecording", function() { return setIsRecording; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setIsPlayingRecord", function() { return setIsPlayingRecord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLoops", function() { return addLoops; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addNews", function() { return addNews; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recordReducer", function() { return recordReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectState", function() { return selectState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectIsRecording", function() { return selectIsRecording; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectIsPlayingRecord", function() { return selectIsPlayingRecord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectStartTimestamp", function() { return selectStartTimestamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectRecordLoops", function() { return selectRecordLoops; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectRecordNews", function() { return selectRecordNews; });
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const SET_IS_RECORDING = "record/SET_IS_RECORDING";
const SET_IS_PLAYING_RECORD = "record/SET_IS_PLAYING_RECORD";
const ADD_LOOPS = "record/ADD_LOOPS";
const ADD_NEWS = "record/ADD_NEWS";
const initialState = {
  startTimestamp: null,
  isRecording: false,
  isPlayingRecord: false,
  loops: [],
  news: []
};
function setIsRecording(value) {
  return {
    type: SET_IS_RECORDING,
    payload: value
  };
}
function setIsPlayingRecord(value) {
  return {
    type: SET_IS_PLAYING_RECORD,
    payload: value
  };
}
function addLoops(loops) {
  return {
    type: ADD_LOOPS,
    payload: loops
  };
}
function addNews({
  id,
  timestamp
}) {
  return {
    type: ADD_NEWS,
    payload: {
      id,
      timestamp
    }
  };
}
function recordReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_RECORDING:
      {
        if (action.payload) {
          return _objectSpread({}, initialState, {
            isRecording: true
          });
        } else {
          return _objectSpread({}, state, {
            isRecording: false
          });
        }
      }

    case SET_IS_PLAYING_RECORD:
      {
        return _objectSpread({}, state, {
          isPlayingRecord: action.payload
        });
      }

    case ADD_LOOPS:
      {
        return _objectSpread({}, state, {
          startTimestamp: state.startTimestamp === null ? Date.now() : state.startTimestamp,
          loops: [...state.loops, action.payload]
        });
      }

    case ADD_NEWS:
      {
        return _objectSpread({}, state, {
          news: [...state.news, action.payload]
        });
      }

    default:
      return state;
  }
}
function selectState(rootState) {
  return rootState.record;
}
function selectIsRecording(state) {
  return selectState(state).isRecording;
}
function selectIsPlayingRecord(state) {
  return selectState(state).isPlayingRecord;
}
function selectStartTimestamp(state) {
  return selectState(state).startTimestamp;
}
function selectRecordLoops(state) {
  return selectState(state).loops;
}
function selectRecordNews(state) {
  return selectState(state).news;
}

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"rootContainer":"rootContainer--1fTVW"};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _ducks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ducks */ "./src/ducks/index.js");
/* harmony import */ var _ducks_loops__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ducks/loops */ "./src/ducks/loops.js");
/* harmony import */ var _ducks_categories__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ducks/categories */ "./src/ducks/categories.js");
/* harmony import */ var _ducks_news__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ducks/news */ "./src/ducks/news.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./App */ "./src/App.jsx");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _components_Player_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/Player/utils */ "./src/components/Player/utils.js");
/* harmony import */ var _ducks_record__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ducks/record */ "./src/ducks/record.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_12__);













const store = Object(redux__WEBPACK_IMPORTED_MODULE_3__["createStore"])(_ducks__WEBPACK_IMPORTED_MODULE_4__["combinedReducers"]); // valid ids are required to be able to create a share link

_data__WEBPACK_IMPORTED_MODULE_9__["loops"].forEach(({
  id
}) => Object(_components_Player_utils__WEBPACK_IMPORTED_MODULE_10__["validateLoopId"])(id)); // set initial store

store.dispatch(Object(_ducks_categories__WEBPACK_IMPORTED_MODULE_6__["setCategories"])(_data__WEBPACK_IMPORTED_MODULE_9__["categories"]));
store.dispatch(Object(_ducks_loops__WEBPACK_IMPORTED_MODULE_5__["setLoops"])(_data__WEBPACK_IMPORTED_MODULE_9__["loops"]));
store.dispatch(Object(_ducks_news__WEBPACK_IMPORTED_MODULE_7__["setNews"])(_data__WEBPACK_IMPORTED_MODULE_9__["news"])); // check if there's a record in the url query parameter

const recordHash = Object(_components_Player_utils__WEBPACK_IMPORTED_MODULE_10__["getRecordFromUrl"])();

if (recordHash !== null) {
  const playlist = Object(_components_Player_utils__WEBPACK_IMPORTED_MODULE_10__["generatePlayList"])(recordHash);

  if (playlist) {
    playlist.loops.forEach(recordedLoops => {
      store.dispatch(Object(_ducks_record__WEBPACK_IMPORTED_MODULE_11__["addLoops"])(recordedLoops));
    });
    playlist.news.forEach(recordedNews => {
      store.dispatch(Object(_ducks_record__WEBPACK_IMPORTED_MODULE_11__["addNews"])(recordedNews));
    });
  }
}

const rootNode = document.createElement("div");
rootNode.className = _index_css__WEBPACK_IMPORTED_MODULE_12__["rootCOntainer"];
const body = document.body;

if (body !== null) {
  body.appendChild(rootNode);
}

const renderApp = Component => {
  Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], {
    store: store
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Component, null)), rootNode);
};

renderApp(_App__WEBPACK_IMPORTED_MODULE_8__["App"]);

if (module.hot !== undefined) {
  module.hot.accept(/*! ./App */ "./src/App.jsx", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _App__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./App */ "./src/App.jsx");
(() => {
    renderApp(_App__WEBPACK_IMPORTED_MODULE_8__["App"]);
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}

/***/ }),

/***/ "./src/reader/Reader.js":
/*!******************************!*\
  !*** ./src/reader/Reader.js ***!
  \******************************/
/*! exports provided: Reader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reader", function() { return Reader; });
/* harmony import */ var _components_Player_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Player/utils */ "./src/components/Player/utils.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Reader {
  constructor({
    onReady,
    onProgress,
    onEnd
  }) {
    _defineProperty(this, "isReady", void 0);

    _defineProperty(this, "newsProgressInterval", void 0);

    _defineProperty(this, "onProgress", void 0);

    _defineProperty(this, "onEnd", void 0);

    _defineProperty(this, "synth", void 0);

    _defineProperty(this, "voices", void 0);

    this.isReady = false;
    this.newsProgressInterval = null;
    this.onProgress = onProgress;
    this.onEnd = onEnd;
    this.synth = window.speechSynthesis;
    this.voices = this.getRussianVoices();

    if (!this.voices.length) {
      this.synth.addEventListener("voiceschanged", () => {
        // this check is needed because "voiceschanged" is fired several times
        if (!this.isReady) {
          this.voices = this.getRussianVoices();
          this.isReady = true;
          onReady(this.getVoicesMap());
        }
      });
    } else {
      this.isReady = true;
      onReady(this.getVoicesMap());
    }
  }

  read(text, id) {
    if (!this.isReady) {
      console.error("Reader is not ready yet");
      return;
    }

    const voiceName = this.voices[Math.round(Object(_components_Player_utils__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(0, this.voices.length - 1))].name;
    const pitch = Object(_components_Player_utils__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(0.7, 1.1);
    const rate = Object(_components_Player_utils__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(0.9, 1);
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.voice = this.voices.find(voice => voice.name === voiceName) || this.voices[0];
    utterance.pitch = pitch;
    utterance.rate = rate;
    this.stop();
    this.synth.speak(utterance);
    const approximateDurationMS = text.length * 40;
    const intervalDuration = 100;
    let progressIterationIndex = 0;
    this.newsProgressInterval = setInterval(() => {
      progressIterationIndex += 1;
      const progress = Math.min(1, progressIterationIndex * intervalDuration / approximateDurationMS);

      if (progress === 1) {
        this.endProgress();
      } else {
        this.onProgress(id, progress);
      }
    }, intervalDuration);
  }

  stop() {
    this.synth.cancel();
    this.endProgress();
  }

  endProgress() {
    if (this.newsProgressInterval !== null) {
      clearInterval(this.newsProgressInterval);
    }

    this.onEnd();
  }

  getRussianVoices() {
    return this.synth.getVoices().filter(voice => voice.lang.startsWith("ru") && voice.localService);
  }

  getVoicesMap() {
    return this.voices.map(voice => ({
      name: voice.name,
      lang: voice.lang
    }));
  }

}

/***/ })

/******/ });