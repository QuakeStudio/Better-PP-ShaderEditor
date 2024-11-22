// @ts-nocheck
;(async function (Scratch) {
  if (Scratch.extensions.unsandboxed === false) {
    alert("Simple ShaderEditor must be run unsandboxed")
    throw new Error('Simple ShaderEditor must be run unsandboxed')
  }
  const config = await import('./config')
  const vm = Scratch.vm
  const runtime = vm.runtime
  const gl = runtime.renderer.gl
  const monaco = await import('./MonacoEditor/monaco')
  const MonacoEditor = new monaco.MonacoEditor(Scratch)
  await MonacoEditor.init()

  let penPlus = runtime.ext_obviousalexc_penPlus
  if (!penPlus) {
    runtime.on("EXTENSION_ADDED", () => {
      penPlus = Scratch.vm.runtime.ext_obviousalexc_penPlus;
    })
  }
  class QuakeEditor {
    getInfo() {
      return {
        id: config.id,
        name: config.name,
        blocks: [
          {
            blockType:Scratch.BlockType.LABEL,
            text:"put a random pen+"
          },
          {
            blockType: Scratch.BlockType.REPORTER,
            outputShape: 3,
            opcode: 'glslTextEditor',
            text: 'create vertex shader: [vertex] fragment shader: [fragment]',
            arguments: {
              vertex: {
                type: 'code_glsl',
                defaultValue: config.defaultVertexShader
              },
              fragment: {
                type: 'code_glsl',
                defaultValue: config.defaultFragmentShader
              }
            }
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: 'createShader',
            text: 'Create shader called [name] from [data]',
            arguments: {
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "test"
              },
              data: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "insert data from create vertex/fragment shader here"
              }
            }
          }
        ],

        menus: {
          penPlusShaders: {
            items: "shaderMenu",
            acceptReporters: true,
          }
        },

        customFieldTypes: Object.fromEntries(
          MonacoEditor.languages.map(v => [
            `code_${v}`,
            { output: 'string', outputShape: 3 }
          ])
        )
      }
    }
    shaderMenu() {
      //taken from shaded
      if (penPlus) {
        return penPlus.shaderMenu();
      }
      return ["None Yet"];
    }

    glslTextEditor({ vertex, fragment }, util) {
      return {
        vertShader: vertex.trim(),
        fragShader: fragment.trim()
      }
    }

    createShader({ name, data}) {
      penPlus.saveShader(name, data)
    }
  }
  Scratch.extensions.register(new QuakeEditor())
})(Scratch)