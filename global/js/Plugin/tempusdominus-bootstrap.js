(function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define('/Plugin/tempusdominus-bootstrap', ['exports', 'Plugin'], factory);
    } else if (typeof exports !== "undefined") {
      factory(exports, require('Plugin'));
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.Plugin);
      //tempusdominus-bootstrap
      global.PluginTempusdominusBootstrap = mod.exports;
    }
  })(this, function (exports, _Plugin2) {
    'use strict';
  
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  
    var _Plugin3 = babelHelpers.interopRequireDefault(_Plugin2);
  
    // import $ from 'jquery';
    var NAME = 'datetimepicker';
  
    var TempusdominusBootstrap = function (_Plugin) {
      babelHelpers.inherits(TempusdominusBootstrap, _Plugin);
  
      function TempusdominusBootstrap() {
        babelHelpers.classCallCheck(this, TempusdominusBootstrap);
        return babelHelpers.possibleConstructorReturn(this, (TempusdominusBootstrap.__proto__ || Object.getPrototypeOf(TempusdominusBootstrap)).apply(this, arguments));
      }
  
      babelHelpers.createClass(TempusdominusBootstrap, [{
        key: 'getName',
        value: function getName() {
          return NAME;
        }
      }], [{
        key: 'getDefaults',
        value: function getDefaults() {
          return {
            format: 'YYYY-MM-DD HH:mm',
            // sideBySide: true
            // autoclose: true
          };
        }
      }]);
      return TempusdominusBootstrap;
    }(_Plugin3.default);
  
    _Plugin3.default.register(NAME, TempusdominusBootstrap);
  
    exports.default = TempusdominusBootstrap;
  });