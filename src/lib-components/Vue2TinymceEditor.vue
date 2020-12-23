<template>
    <div :id="id">
        <textarea :id="inputId" v-model="content" :style="{'height': height+'px', 'width': width<=0?'auto':width+'px'}"></textarea>
    </div>
</template>

<script>
    // Import TinyMCE
    import tinymce from 'tinymce/tinymce'

    // A theme is also required
    import 'tinymce/themes/mobile'
    import 'tinymce/themes/silver'

    // plugins are imported
    import 'tinymce/plugins/advlist'
    import 'tinymce/plugins/autolink'
    import 'tinymce/plugins/autoresize'
    import 'tinymce/plugins/autosave'
    import 'tinymce/plugins/bbcode'
    import 'tinymce/plugins/charmap'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/codesample'
    // import 'tinymce/plugins/colorpicker'
    // import 'tinymce/plugins/contextmenu'
    import 'tinymce/plugins/directionality'
    import 'tinymce/plugins/emoticons'
    import 'tinymce/plugins/emoticons/js/emojis'
    import 'tinymce/plugins/fullpage'
    import 'tinymce/plugins/fullscreen'
    import 'tinymce/plugins/help'
    import 'tinymce/plugins/hr'
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/imagetools'
    import 'tinymce/plugins/importcss'
    import 'tinymce/plugins/insertdatetime'
    import 'tinymce/plugins/legacyoutput'
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/media'
    import 'tinymce/plugins/nonbreaking'
    import 'tinymce/plugins/noneditable'
    import 'tinymce/plugins/pagebreak'
    import 'tinymce/plugins/paste'
    import 'tinymce/plugins/preview'
    import 'tinymce/plugins/print'
    import 'tinymce/plugins/quickbars'
    import 'tinymce/plugins/save'
    import 'tinymce/plugins/searchreplace'
    import 'tinymce/plugins/spellchecker'
    import 'tinymce/plugins/tabfocus'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/template'
    // import 'tinymce/plugins/textcolor'
    import 'tinymce/plugins/textpattern'
    import 'tinymce/plugins/toc'
    import 'tinymce/plugins/visualblocks'
    import 'tinymce/plugins/visualchars'
    import 'tinymce/plugins/wordcount'


    import 'tinymce/skins/content/default/content.min.css'
    import 'tinymce/skins/ui/oxide/skin.min.css'
    import 'tinymce/icons/default'

    export default {
        name: 'Vue2TinymceEditor',
        props: {
            id: {
                default: 'vue2-tinymce-editor-' + new Date().getTime(),
                type: String,
            },
            value: {default: ''},
            options: {
                default: function () {
                    return {}
                }, type: Object
            },
            height:{
                default:300,
                type:Number
            },
            width:{
                default:0,
                type:Number
            },
        },
        data() {
            return {
                inputId: "editor-" + new Date().getTime(),
                content: '',
                editor: null,
                checkerTimeout: null,
                isTyping: false,
                plugins: 'advlist autolink charmap code codesample directionality emoticons ' +
                    'fullscreen help hr image imagetools insertdatetime link lists ' +
                    'media nonbreaking pagebreak paste preview print save searchreplace ' +
                    'table template textpattern toc visualblocks visualchars wordcount',
                toolbar: 'fontselect fontsizeselect formatselect | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | link table removeformat code',

            }
        },
        mounted() {
            this.content = this.value
            this.init()
        },
        beforeDestroy() {
            this.editor.destroy()
        },
        watch: {
            value: function (newValue) {
                if (!this.isTyping) {
                    if (this.editor !== null)
                        this.editor.setContent(newValue)
                    else
                        this.content = newValue
                }
            },
        },
        methods: {
            init() {
                let options = {
                    selector: '#' + this.inputId,
                    skin: false,
                    toolbar: this.toolbar,
                    plugins: this.plugins,
                    init_instance_callback: this.initEditor,
                }
                // copy all options keys
                for (let key in this.options) {
                    if (key === 'selector' || key ==='init_instance_callback') {
                        continue
                    }
                    options[key] = this.options[key]
                }

                tinymce.init(options)
            },
            initEditor(editor) {
                this.editor = editor
                editor.on('KeyUp', () => {
                    this.submitContent()
                })
                editor.on('Change', (e) => {
                    if (this.editor.getContent() !== this.value) {
                        this.submitContent()
                    }
                    this.$emit('editorChange', e)
                })
                editor.on('init', () => {
                    editor.setContent(this.content)
                    this.$emit('input', this.content)
                })
                this.$emit('editorInit', editor)
            },
            submitContent() {
                this.isTyping = true
                if (this.checkerTimeout !== null)
                    clearTimeout(this.checkerTimeout)
                this.checkerTimeout = setTimeout(() => {
                    this.isTyping = false
                }, 700)
                this.$emit('input', this.editor.getContent())
            }
        }
    }
</script>

<style scoped>
</style>
