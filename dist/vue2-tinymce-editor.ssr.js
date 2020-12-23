'use strict';Object.defineProperty(exports,'__esModule',{value:true});var tinymce=require('tinymce/tinymce');require('tinymce/themes/mobile'),require('tinymce/themes/silver'),require('tinymce/plugins/advlist'),require('tinymce/plugins/autolink'),require('tinymce/plugins/autoresize'),require('tinymce/plugins/autosave'),require('tinymce/plugins/bbcode'),require('tinymce/plugins/charmap'),require('tinymce/plugins/code'),require('tinymce/plugins/codesample'),require('tinymce/plugins/directionality'),require('tinymce/plugins/emoticons'),require('tinymce/plugins/emoticons/js/emojis'),require('tinymce/plugins/fullpage'),require('tinymce/plugins/fullscreen'),require('tinymce/plugins/help'),require('tinymce/plugins/hr'),require('tinymce/plugins/image'),require('tinymce/plugins/imagetools'),require('tinymce/plugins/importcss'),require('tinymce/plugins/insertdatetime'),require('tinymce/plugins/legacyoutput'),require('tinymce/plugins/link'),require('tinymce/plugins/lists'),require('tinymce/plugins/media'),require('tinymce/plugins/nonbreaking'),require('tinymce/plugins/noneditable'),require('tinymce/plugins/pagebreak'),require('tinymce/plugins/paste'),require('tinymce/plugins/preview'),require('tinymce/plugins/print'),require('tinymce/plugins/quickbars'),require('tinymce/plugins/save'),require('tinymce/plugins/searchreplace'),require('tinymce/plugins/spellchecker'),require('tinymce/plugins/tabfocus'),require('tinymce/plugins/table'),require('tinymce/plugins/template'),require('tinymce/plugins/textpattern'),require('tinymce/plugins/toc'),require('tinymce/plugins/visualblocks'),require('tinymce/plugins/visualchars'),require('tinymce/plugins/wordcount'),require('tinymce/skins/content/default/content.min.css'),require('tinymce/skins/ui/oxide/skin.min.css'),require('tinymce/icons/default');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var tinymce__default=/*#__PURE__*/_interopDefaultLegacy(tinymce);function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
var script = {
  name: 'Vue2TinymceEditor',
  props: {
    id: {
      default: 'vue2-tinymce-editor-' + new Date().getTime(),
      type: String
    },
    value: {
      default: ''
    },
    options: {
      default: function _default() {
        return {};
      },
      type: Object
    },
    height: {
      default: 300,
      type: Number
    },
    width: {
      default: 0,
      type: Number
    }
  },
  data: function data() {
    return {
      inputId: "editor-" + new Date().getTime(),
      content: '',
      editor: null,
      checkerTimeout: null,
      isTyping: false,
      plugins: 'advlist autolink charmap code codesample directionality emoticons ' + 'fullscreen help hr image imagetools insertdatetime link lists ' + 'media nonbreaking pagebreak paste preview print save searchreplace ' + 'table template textpattern toc visualblocks visualchars wordcount',
      toolbar: 'fontselect fontsizeselect formatselect | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | link table removeformat code'
    };
  },
  mounted: function mounted() {
    this.content = this.value;
    this.init();
  },
  beforeDestroy: function beforeDestroy() {
    this.editor.destroy();
  },
  watch: {
    value: function value(newValue) {
      if (!this.isTyping) {
        if (this.editor !== null) this.editor.setContent(newValue);else this.content = newValue;
      }
    }
  },
  methods: {
    init: function init() {
      var options = {
        selector: '#' + this.inputId,
        skin: false,
        toolbar: this.toolbar,
        plugins: this.plugins,
        init_instance_callback: this.initEditor
      }; // copy all options keys

      for (var key in this.options) {
        if (key === 'selector' || key === 'init_instance_callback') {
          continue;
        }

        options[key] = this.options[key];
      }

      tinymce__default['default'].init(options);
    },
    initEditor: function initEditor(editor) {
      var _this = this;

      this.editor = editor;
      editor.on('KeyUp', function () {
        _this.submitContent();
      });
      editor.on('Change', function (e) {
        if (_this.editor.getContent() !== _this.value) {
          _this.submitContent();
        }

        _this.$emit('editorChange', e);
      });
      editor.on('init', function () {
        editor.setContent(_this.content);

        _this.$emit('input', _this.content);
      });
      this.$emit('editorInit', editor);
    },
    submitContent: function submitContent() {
      var _this2 = this;

      this.isTyping = true;
      if (this.checkerTimeout !== null) clearTimeout(this.checkerTimeout);
      this.checkerTimeout = setTimeout(function () {
        _this2.isTyping = false;
      }, 700);
      this.$emit('input', this.editor.getContent());
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    attrs: {
      "id": _vm.id
    }
  }, [_vm._ssrNode("<textarea" + _vm._ssrAttr("id", _vm.inputId) + _vm._ssrStyle(null, {
    'height': _vm.height + 'px',
    'width': _vm.width <= 0 ? 'auto' : _vm.width + 'px'
  }, null) + " data-v-59c7718a>" + _vm._ssrEscape(_vm._s(_vm.content)) + "</textarea>")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = "data-v-59c7718a";
/* module identifier */

var __vue_module_identifier__ = "data-v-59c7718a";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,Vue2TinymceEditor: __vue_component__});var install = function installVue2TinymceEditor(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Default export is library as a whole, registered via Vue.use()
exports.Vue2TinymceEditor=__vue_component__;exports.default=plugin;